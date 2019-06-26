<template>
	<view >
	
	<view class="flex text-center" v-if="userInfo.type==shoperObj.type">
		<view class="cu-item flex-sub font-size-big bg-white borderBottom" :class="item.id==TabCur?'borderBottomRed cur':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect(item)" :data-id="index" style="padding:9px  0;">
			{{item.name}}
		</view>
	</view>
		<view v-if="list.length>0">
			<view class="work-item" @click="itemDetail(item)" v-for="(item,index) in list" :key="index" style="margin-bottom:13px" >
				<view class="user flex justify-start">
					<image :src="userInfo.headurl?userInfo.headurl:'../../../../static/img/default.png'" style="width:45px;height:45px;margin-right:13px;vertical-align: middle;border-radius: 50%;"></image>
					
					<view class="user-info">
						<view  style="margin-bottom:4px;">
							<text class="user-name">{{userInfo.name}}</text>
						</view>
						<!-- <view class="work-date  tag-name">{{item.title}}</view> -->
						<view class="work-date ">{{item.rptdate | formatTime('YMDHMS')}}</view>
					</view>
				</view>
				<view class="work-content">
					<view>
						<text class="user-name ellipsis-2 font-size-normal font-weight-normal color-normal">{{item.summary}}</text>
					</view>
					<view v-if="item.files">
						<view class="bg-white " style="padding:16px 0;">
				<view class="grid col-4 grid-square">
					<view class="bg-img" v-for="(img,index) in item.files" :key="index" :style="[{ backgroundImage:'url(' + img.url + ')' }]"></view>
				</view>
			</view>
					</view>
				</view>
				<view class="share-content flex justify-start">
					<view class="font-size-small font-weight-normal" style="margin-right:34px;" @click.stop="operateLog(item,'comment')">
						<image src="../../../../static/img/work/log/pinglun.png" style="width:20px;height:19px;vertical-align: middle;"></image>
						<text style="margin-left:10px;color:rgba(92,99,127,1);">{{item.comments}}</text>
					</view>
					<view class="font-size-small font-weight-normal" style="margin-right:34px;"  @click.stop="operateLog(item,'share')">
						<image src="../../../../static/img/work/log/fenxiang.png" style="width:20px;height:19px;vertical-align: middle;"></image>
						<text style="margin-left:10px;color:rgba(92,99,127,1);">{{item.forwards}}</text>
					</view>
					<view class="font-size-small font-weight-normal"   @click.stop="operateLog(item,'praise')">
						<image src="../../../../static/img/work/log/dianzan.png" style="width:20px;height:19px;vertical-align: middle;" v-if="item.isLiker!=1"></image>
						<image src="../../../../static/img/work/log/dianzan_color.png" style="width:20px;height:19px;vertical-align: middle;" v-else></image>
						<text style="margin-left:10px;color:rgba(92,99,127,1);">{{item.likes}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>
		<image src="../../../../static/icon/add.png"
				style="position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;" @click.stop="createWork()" v-if="TabCur==2 && userInfo.type==shoperObj.type "></image>
				<uni-load-more :contentText="content" :status="loading" :showIcon="true"></uni-load-more>
	</view>
</template>

<script>
	import LxEmpty from '../../../../lx_components/lx-empty.vue';
	import uniLoadMore from '../../../../components/uni-load-more.vue'
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['userInfo','shoperObj']),
        data() {
			return {
				page:0,
				list:[],

				isLoading:false,
				isFinish:false,
				tabList:[{id:1,name:'工作回执'},{id:2,name:'工作日志'}],
				TabCur:1,
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				avatar:''
			}
		},
		components:{
			LxEmpty,
			uniLoadMore
		},
		onPullDownRefresh(){
			this.getList()
		},
		onReachBottom(){
			this.page++;
			this.$ajax('WorkReportsByShop',{
			     zone:-1,
				 brand:0,
				  type:this.userInfo.type==this.shoperObj?this.TabCur:'',
				 offset:this.$utils.getOffset(this.page)
			},res=>{
				if(res==''){
					setTimeout(()=>{
							this.loading='noMore'
					},900)

			    }else{
					setTimeout(()=>{
						res.forEach(item=>{
							this.list=this.list.concat(item);
						})
						this.loading='loading'
					},900)


				}
			})

		},
        onLoad(){
			this.getList();
        },
		onShow(){
			this.getList();
		},
		methods: {
			operateLog(item,type){
				switch(type){
					case 'comment':
					this.itemDetail(item)
					// uni.navigateTo({
					// 	url:`../log-detail/log-detail?id=${item.id}&type=article`
					// })
					break;
					case 'share':
					this.$ajax('ForwardWorkReportByShop',{id:item,id},res=>{
						uni.showToast({
							title:'分享成功',
							icon:'none'
						})
					})
					break;
					case 'praise':
					console.log(item)
					item.likes+=1;
					this.$ajax('LikeWorkReportByShop',{
						id:item.id
					},res=>{
						uni.showToast({
							title:'点赞成功',
							icon:'none'
						})
					})
					break;
				}
			},
			tabSelect(item){
				this.TabCur=item.id;
				this.getList()

			},
			//新建
			createWork(event){
				uni.navigateTo({
					url:'../create-log/create-log?type=log'
				})
			},
			//查看详情
			itemDetail(event){
				
				if(event.type==1){
					uni.navigateTo({
						url:`../log-detail/log-detail?id=${event.id}&type=article`
					})
				}else if(event.type==2){
					uni.navigateTo({
						url:`../log-detail/log-detail?id=${event.id}&type=log`
					})
				}
				
			},
			//获取列表数据
			getList(){
			    this.$ajax('WorkReportsByShop',{
                     zone:-1,
					 brand:0,
					 type:this.userInfo.type==this.shoperObj?this.TabCur:'',
					 offset:this.$utils.getOffset(this.page)
				},res=>{
					 this.list = res;
				})
			},

		}
	}
</script>

<style lang="less">
	
	.empty-middle{
		position: absolute;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		top: 50%;
		width: 100%;
	}
	.ellipsis-2{
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.work-item{


		padding:18px 12px 13px 15px;
		background: #fff;
	}
	.user-info{
		margin-top:4px;
		margin-bottom:8px;
		.user-name{
			font-size:15px;

			font-weight:500;
			color:rgba(42,42,42,1);
		}
		.work-date{
			font-size:13px;

			font-weight:400;
			color:rgba(164,164,164,1);
		}
	}
	.work-content{
		margin-bottom:15px;
	}
	.tag-name{
		display: inline-block;
		font-size:10px;

		font-weight:400;
		color:rgba(42,42,42,1);
		padding:2px 8px;
		background:rgba(246,238,253,1);
		width: auto;
		max-width:100%;
	}
</style>
