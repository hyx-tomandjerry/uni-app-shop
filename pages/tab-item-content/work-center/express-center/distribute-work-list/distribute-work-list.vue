<template>
	<view>
		<view  class="bg-white nav">
			<view class="flex text-center justify-around">
				<view class="cu-item  font-size-big"
					  v-for="(item,index) in navTabList"
					  :key="index"
					  @tap="tabSelect(item)" :data-id="index">
					<view  :class="item.id==navTabCur?'color-red cur borderBottomRed':''">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="list-container" v-if="distributeWorkList.length">
			<view class="list-item position_relative" v-for="(item,index) in distributeWorkList" :key="index" @click="checkDistributeItem(item)">
				<view class="list-card flex justify-between align-center ">
					<view class="flex justify-start align-center">
						<image src="../../../../../static/img/work/express/other/tag-replace.png" class="img-tag" v-if="item.recverMobile && item.recverName"></image>
						<image src="../../../../../static/img/work/express/other/tag-shop.png" class="img-tag" v-else></image>
						<view>运单号 : {{item.seq}}</view>
					</view>
					<view>
						<view
							:class="{
								'color-red':item.status==distributeStatusZn.unHandle,
								'color-blue':item.status==distributeStatusZn.finish
							}"
						>
							{{item.status | distributeStatusPipe}}
						</view>
					</view>
				</view>
				<view class="list-content ">

					<view class="list-shop flex justify-between ">

						<view class="flex-1 text-ellipse font-size-normal">
							<view class="font-size-normal color-normal" style="margin-bottom:5px;">
								{{item.applyShopName || ''}}
							</view>
							<view class="font-size-mini color-regular">
								({{item.applierName || ''}}/{{item.applierMobile || ''}})
							</view>
						</view>
						<view><image src="../../../../../static/img/work/express/other/express-arrow.png" style="width:44px;height:11px;margin:0 15px;"></image></view>
						<view class="flex-1 text-ellipse font-size-normal" style="padding-left:10px;">
							<view class="font-size-normal color-normal" style="margin-bottom:5px;">{{item.supplyShopName || ''}}</view>
							<view class="font-size-mini color-regular">({{item.supplierName || ''}}/{{item.supplierMobile || ''}})</view>
						</view>
					</view>

				</view>
				<view class="list-time color-regular">下单时间：{{item.applyDate |  formatTime('YMDHMS')}}</view>
			</view>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>
		<image src="../../../../../static/img/add.png" v-if="navTabCur==1"
			   style="position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;" @click.stop="createDistributeWork()"></image>
		<uni-load-more :contentText="content"
					   v-if="distributeWorkList.length>1"
					   :showIcon="true" :status="loading" color="rgb(39, 134, 245)"></uni-load-more>
	</view>
</template>

<script>
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	import uniLoadMore from '../../../../../components/uni-load-more.vue'
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['distributeStatusZn']),
		data() {
			return {
				navTabCur:1,
				navTabValue:'my',
				navTabList:[
					{id:1,name:'我调拨的',value:'my'},
					{id:0,name:'调拨任务',value:'alone'}
				],
				distributeWorkList:[],
				page:1,
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				
			}
		},
		onPullDownRefresh(){
			setTimeout(()=>{
					uni.stopPullDownRefresh();
					this.page=1;
					this.getRequisitionsList()
			},800)
			
		},
		methods: {

			/*nav选择*/
			tabSelect(item){
				this.navTabCur=item.id;
				this.navTabValue=item.value;
				this.page=1;
				this.getRequisitionsList()
			},
			/**
			 * 查看调拨单详情
			 */
			checkDistributeItem(item){

				uni.navigateTo({
					url:'../distribute-order-item/distribute-order-item?id='+item.id+"&itemType="+this.navTabValue

				})
			},
			/**
			 * 新建调拨单
			 */
			createDistributeWork(){
				uni.navigateTo({
					url:"../create-distribute/create-distribute"
				})
			},
			/**
			 * 获得调拨数据
			 */
			getRequisitionsList(){
				this.$ajax('Requisitions',{
					isApplier:this.navTabCur,
					offset:this.$utils.getOffset(this.page)
				},res=>{
					this.distributeWorkList=res;
				})
			}
		},
		onReachBottom(){
			this.page++;
			this.$ajax('Requisitions',{
				isApplier:this.navTabCur,
				offset:this.$utils.getOffset(this.page)
			},res=>{
				if(res==''){
					setTimeout(()=>{
						this.loading='noMore'
					},900)

				}else{
					res.forEach(item=>{
						this.distributeWorkList.concat(item);
					})
					this.loading='loading'
					setTimeout(()=>{
						this.loading='noMore'
					},900)


				}
			})
		},
		components:{
			LxEmpty,
			uniLoadMore
		},
		onLoad(){

			this.getRequisitionsList()
		},
		onShow(){
			this.page=1;
			this.getRequisitionsList()
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1)
	}

	.distribute-work-container{
		padding-top:13px;
		padding-right:12px;
		padding-left:14px;
		.distribute-work-item{
			background:rgba(255,255,255,1);
			border-radius:6px;
			padding:9px 16px 13px 15px;
			margin-bottom:13px;
		}
		.check-tag{
			padding:3px 10px;border:1px solid rgba(177,177,177,1);border-radius:4px;color:rgba(177,177,177,1)
		}
	}
	.cu-tag{
		height:16px;
		font-size:10px;
		line-height:16px;
		border-radius: 8px;
	}
	.bg-toShop{
		background:#FFB633;
		color:#fff;
		
	}
	.bg-replace{
		background:#188FFF;
		color:#fff;
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
			}
			.list-content{
				padding-top:13px;
				padding-bottom: 10px;
				border-bottom:1px solid #EEEEED;
				.travel-container{
					padding-top: 6px;
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
			}

		}
	}
</style>
