<template>
	<view>
		<common-tab-nav 
					:isShowBorder="false"
					:tabList="navTabList" 
					:TabCur="navTabCur" 
					@tabSelect="tabSelect"></common-tab-nav>
		<view class="list-container" v-if="distributeWorkList.length">
			<block v-for="(item,index) in distributeWorkList" :key="index" >
				<distribute-list-item :item="item" :index="index" @checkDistributeItem="checkDistributeItem"></distribute-list-item>
			</block>
			<uni-load-more
				:contentText="content"
				v-if="distributeWorkList.length>5"
				:showIcon="true" :status="loading" color="rgb(39, 134, 245)"></uni-load-more>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>
		<positionImg 
		@createOperate="createDistributeWork" 
		:position_img="true" 
		 src="../../../../../static/img/add.png"></positionImg>
		
		
	</view>
</template>

<script>
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	import uniLoadMore from '../../../../../components/common/uni-load-more.vue'
	import commonTabNav from '../../../../../components/common/common-tab-nav.vue'
	import distributeListItem from '../../../../../components/express/distribute-list-item.vue'
	import positionImg from '../../../../../components/common/position_img.vue'
	
	import {mapState} from 'vuex'
	import {RequisitionsApi} from '../../../../../api/express_api.js'
	import {ChainShopApi} from '../../../../../api/shop_api.js'
	export default {
		computed:mapState(['shopCount','shopOnlyObj']),
		components:{LxEmpty,uniLoadMore,commonTabNav,distributeListItem,positionImg},
		data() {
			return {
				navTabCur:1,
				navTabList:[
					{id:this.config.distributeTab.my,name:'我调拨的'},
					{id:this.config.distributeTab.work,name:'调拨任务'}
				],
				distributeWorkList:[],
				page:1,
				content:{
					contentdown: "下拉记载更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				shopItem:{}
				
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
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			/*nav选择*/
			tabSelect(item){
				this.navTabCur=item.id;
				this.page=1;
				this.getRequisitionsList()
			},
			/**
			 * 查看调拨单详情
			 */
			checkDistributeItem(item){
				let value=this.navTabCur==1?'my':'alone';
				uni.navigateTo({
					url:'../distribute-order-item/distribute-order-item?id='+item.id+"&itemType="+value

				})
			},
			/**
			 * 新建调拨单
			 */
			createDistributeWork(){
				uni.navigateTo({
					url:"../create-distribute/create-distribute?id="+this.shopItem.id
				})
			},
			/**
			 * 获得调拨数据
			 */
			async getRequisitionsList(){
				this.distributeWorkList = await RequisitionsApi(this.navTabCur,this.page)

			},
			//获得门店详情
			async checkShopDetail(id){
				this.shopItem = await ChainShopApi(id);
				uni.setNavigationBarTitle({
					title:this.shopItem.name
				})
			},		
		},
		async onReachBottom(){
			this.page++;
			let result = await RequisitionsApi(this.navTabCur,this.page);
			if(result.length==0){
				setTimeout(()=>{
					this.loading='noMore'
				},900)
			}else{
				result.forEach(item=>{
					this.distributeWorkList.concat(item);
				})
				this.loading='loading'
				setTimeout(()=>{
					this.loading='noMore'
				},900)
			}
			/**
			 * @param {Object} optionsthis.$ajax('Requisitions',{
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
			 */
				
		},
		
		onLoad(options){
			if(this.shopCount==1){
				this.shopItem=this.shopOnlyObj;
				uni.setNavigationBarTitle({
					title:this.shopItem.name
				})
			}else{
				this.checkShopDetail(options.id)
			}
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

	}
</style>
