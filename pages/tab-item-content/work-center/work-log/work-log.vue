<template>
	<view >

	<view class="flex text-center">
		<view class="cu-item flex-sub font-size-big bg-white borderBottom" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect($event)" :data-id="index" style="padding:9px  0;">
			{{item}}
		</view>
	</view>
		<view v-if="TabCur==0">
			<view class="work-item" @click="itemDetail(item)" v-for="(item,index) in list" :key="index" style="margin-bottom:13px">
				<view class="user flex justify-start">
					<image src="../../../../static/img/avatar.jpg" style="width:45px;height:45px;margin-right:13px;vertical-align: middle;"></image>
					<view class="user-info">
						<view  style="margin-bottom:4px;">
							<text class="user-name">{{userInfo.name}}</text>
						</view>
						<view class="work-date  tag-name">{{item.title}}</view>
					</view>
				</view>
				<view class="work-content">
					<text class="user-name ellipsis-2">{{item.summary}}</text>
				</view>
			</view>
		</view>
		<view v-if="TabCur==1">

		</view>
		<view class="cu-load bg-gray loading" v-if="isLoading"></view>
		<view class="cu-load bg-gray over" v-if="isFinish"></view>
		<image src="../../../../static/icon/add.png"
				style="position:fixed;right:12px;bottom:45px;width:68px;height:68px;z-index:100;" @click.stop="createWork()" v-if="TabCur==1"></image>
	</view>
</template>

<script>
	export default {
        data() {
			return {
				page:0,
				list:[],
				userInfo:'',
				isLoading:false,
				isFinish:false,
				tabList:['工作汇报','日常日志'],
				TabCur:0,
			}
		},
		onReachBottom(){
			this.page++;
			this.isLoading=true;
			setTimeout(()=>{
				this.$ajax('WorkReportsByShop',{
				     zone:-1,
					 brand:0,
					 offset:this.$utils.getOffset(this.page)
				},res=>{
					if(res==''){
                        this.isLoading=false;
                        setTimeout(()=>{
                            this.isFinish=true;
                        },600)

                    }else{
						res.forEach(item=>{
							this.list=this.list.concat(item);
						})

					}
				})
			},500)


		},
        onLoad(){
			this.getList();
			this.getUserInfo();
			this.$fire.on('logRefresh',res=>{
				console.log(res)
			})
        },
		methods: {
			tabSelect(event){
				this.TabCur=event.currentTarget.dataset.id;
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
				uni.navigateTo({
					url:`../log-detail/log-detail?id=${event.id}`
				})
			},
			//获取列表数据
			getList(){
			    this.$ajax('WorkReportsByShop',{
                     zone:-1,
					 brand:0,
					 offset:this.$utils.getOffset(this.page)
				},res=>{
					 this.list = res;
				})
			},
			getUserInfo(){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						this.userInfo=res.data;
					}
				})
			}
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


		padding:18px 12px 13px 17px;
		background: #fff;
	}
	.user-info{
		margin-top:4px;
		margin-bottom:8px;
		.user-name{
			font-size:15px;
			font-family:PingFangSC-Medium;
			font-weight:500;
			color:rgba(42,42,42,1);
		}
		.work-date{
			font-size:13px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(164,164,164,1);
		}
	}
	.work-content{
		margin-bottom:8px;
	}
	.tag-name{
		display: inline-block;
		font-size:10px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1);
		padding:2px 8px;
		background:rgba(246,238,253,1);
		width: auto;
		max-width:100%;
	}
</style>
