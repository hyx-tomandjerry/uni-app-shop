<template>
	<view>
		<cu-custom isBack="true" bgColor="bg-white">
			<block slot="left">
				<view class="cuIcon-back font-size-back color-normal" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-size-big color-normal color-normal">查快递</view>
			</block>
			<block slot="right">
				<image src="../../../../../static/icon/icon-yanshou-sousuo1@2x.png"
					   class="img-search"
					   @click="searchExpress"
				></image>
			</block>
		</cu-custom>
		<view  class="bg-white nav">
			<view class="flex text-center justify-around">
				<view class="cu-item  font-size-big "
					  :class="item.id==navTabCur?'color-red borderBottomRed':'color-regular'" v-for="(item,index) in navList" :key="index"
					  @tap="tabSelect(item)">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="list-container" v-if="expressList.length">
			<view class="list-item position_relative" v-for="(item,index) in expressList" :key="index" @click="checkItemDetail(item)">
				<view class="list-card flex justify-between align-center ">
					<view class="flex justify-start align-center">
						<image src="../../../../../static/img/work/express/other/tag-speed.png" class="img-tag" v-if="item.type==expressType.speed"></image>
						<image src="../../../../../static/img/work/express/other/tag-price.png" class="img-tag" v-if="item.type==expressType.price"></image>
						<view>运单号 : {{item.seq || 'oks 2019 888 345(暂无)'}}</view>
					</view>
					<view>
						<image src="../../../../../static/img/work/express/other/express-sign.png" class="sign-img" v-if="item.type==expressStatusZn.sign"></image>
						<view v-else class="font-weight-bold"
							  :class="{
							  	'unpick':item.status==expressStatusZn.unSign,
							  	'pick':item.status==expressStatusZn.pick,
							  	'travel':item.status==expressStatusZn.travel,
							  	'arrive':item.status==expressStatusZn.arrive
							  }"
						>
							{{item.status | expressStatusPipe}}
						</view>
					</view>
				</view>
				<view class="list-content ">
					<view class="list-shop flex justify-between borderBottom align-center">

						<view class="flex-1 text-ellipse font-size-normal">
							<view class="font-size-mini font-weight-bold color-normal" style="margin-bottom:5px;">{{item.depname || ''}}</view>
							<view class="font-size-mini color-regular">({{item.senderName || ''}}/{{item.senderMobile || ''}})</view>
						</view>
						<image src="../../../../../static/img/work/express/other/express-arrow.png" style="width:44px;height:11px;margin:0 5px;"></image>
						<view class="flex-1 text-ellipse font-size-normal" style="padding-left:10px;">
							<view v-if="item.destype==expressItem.shop">
								<view class="font-size-mini font-weight-bold color-normal" style="margin-bottom:5px;">{{item.desname || ''}}</view>
								<view class="font-size-mini color-regular">({{item.recverName || ''}}/{{item.recverMobile || ''}})</view>
							</view>
							<view v-if="item.destype==expressItem.customer">
								<view class="font-size-mini color-normal" style="margin-bottom:5px;">({{item.recverName || ''}}/{{item.recverMobile || ''}})</view>
								<view class="font-size-mini color-regular">({{item.desaddr || ''}})</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list-time color-regular flex justify-between">
					<view>下单时间：{{item.orderdate | formatTime('YMDHMS')}}</view>
					<view class="travel-tag text-center" @click.stop="checkTrack(item)" v-if="item.status!=expressStatusZn.unSign">物流跟踪</view>
				</view>
			</view>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>
		<uni-load-more :contentText="content"
					   :showIcon="true"
					   v-if="expressList.length>1"
					   :status="loading"
					   color="rgb(39, 134, 245)"></uni-load-more>
	</view>
</template>
<script>
	import {mapState} from 'vuex';
	import uniLoadMore from '../../../../../components/uni-load-more.vue'
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	export default{
		computed:mapState(['expressGive','expressType','expressItem','expressStatusZn']),
		data(){
			return{
				navTabCur:1,
				navTabValue:'send',
				navList:[
					{id:1,name:'我的寄件',value:'send'},
					{id:3,name:'我的收件',value:'receive'},
					{id:2,name:'我的代发',value:'replace'},
				],
				page:1,
				expressList:[],
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
			}
		},
		components:{
			LxEmpty,uniLoadMore
		},
		onLoad(){
			this.getExpressList()
		},
		methods:{
			/*跟踪物流*/
			checkTrack(item){
				uni.navigateTo({
					url:"../package-tracking/package-tracking?id="+item.id
				})
			},
			/*返回上一级*/
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			/*nav选择*/
			tabSelect(item){
				this.navTabCur=item.id;
				this.navTabValue=item.value;
				this.page=1;
				this.getExpressList();
			},
			/*获得快递列表*/
			getExpressList(){
				this.$ajax('ShopWaybills',{
					type:this.navTabCur,
					offset:this.$utils.getOffset(this.page)
				},res=>{
					res.forEach(item=>{
						if(item.destype==this.expressItem.customer){
							
							if(item.desaddr){
								let val=item.desaddr.split('市');
								item.desaddr=`${val[0]}市`
							}
						}
					})
					this.expressList=res;

				})
			},
			/*查找快递*/
			searchExpress(){
				uni.navigateTo({
					url:"../search-express/search-express"
				})
			},
			/*查看单个快递内容*/
			checkItemDetail(item){
				uni.navigateTo({
					url:"../express-item/express-item?id="+item.id+'&status='+item.status+"&type="+this.navTabValue
				})
			}
		},
		onReachBottom(){
			this.page++;
			this.$ajax('ShopWaybills',{
				type:this.navTabCur,
				offset:this.$utils.getOffset(this.page)
			},res=>{
				if(res==''){
					setTimeout(()=>{
						this.loading='noMore'
					},900)

				}else{
					res.forEach(item=>{
						this.expressList.concat(item);
					})
					this.loading='loading'
					setTimeout(()=>{
						this.loading='noMore'
					},900)


				}
			})
		},
		onShow(){
			this.page=1;
			this.getExpressList();
		},
		onPullDownRefresh(){
			//下拉刷新
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this.page=1;
				this.getExpressList();
			},800)

		}
	}
</script>
<style lang="less">
	page{
		background:rgba(247,247,247,1)
	}
	.img-search{
		width:17px;height:17px;margin-right:15px;
	}
	.list-container{
		margin-top:11px;
		padding-right: 12px;
		padding-left: 13px;
		background-color: rgba(247,247,247,1);
		.list-item{
			padding:13px 16px 0 14px;
			background-color: #fff;
			margin-bottom: 13px;
			border-radius:4px;
			.list-card{
				height:43px;
				line-height:43px;
				border-bottom:1px solid #EEEEED;
				.img-tag{
					width: 20px;
					height: 20px;
					vertical-align: middle;
					margin-right: 5px;
				}
				.sign-img{
					width:69upx;height:84upx;position: absolute;right:0;top:0
				}
			}
			.list-time{
				padding-bottom: 11px;
				padding-top: 13px;
				.travel-tag{
					width:63px;
					height:23px;
					line-height: 23px;
					border-radius:12px;
					border:1px solid rgba(66,176,237,1);
					font-size:12px;
					color:#42B0ED;

				}
			}
			.list-content{
				padding-top:12px;


				.list-shop{
					padding-bottom: 10px;
				}

			}

		}
	}
	//待取件
	.unpick{
		color:#FF5C4D;
	}
	//已取件
	.pick{
		color:#FE992B;
	}
	//已发运
	.travel{
		color:#188FFF
	}
	.arrive{
		color:#B82BFE
	}
</style>