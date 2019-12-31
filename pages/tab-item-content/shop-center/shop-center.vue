<template>
	<view>
		<common-tab-nav 
			:isShowBorder="false"
			:tabList="statusList" 
			:TabCur="TabCur" 
			@tabSelect="tabSelect"
		></common-tab-nav>
		<template v-if="repairList.length">
			<view class="order_content position_relative" >
				<block v-for="(item,index) in repairList" :key="index">
					<repairListItem :item="item" :index="index" @orderDetail="orderDetail"></repairListItem>
				</block>
				<uni-load-more :contentText="content" :showIcon="true" :status="loading" color="rgb(39, 134, 245)"></uni-load-more>
			</view>	
		</template>

		<template v-else>
			<lx-empty></lx-empty>
		</template>

		<positionImg @createOperate="createRepair"
		:position_img="true"
		:src="'../../../static/img/add.png'"></positionImg>
		
	</view>
</template>

<script>
	import LxEmpty from '../../../lx_components/lx-empty.vue'
	import uniLoadMore from '../../../components/common/uni-load-more.vue'
	import repairListItem from '../../../components/shop/repair/repair-list-item.vue'
	import positionImg from '../../../components/common/position_img.vue'
	import commonTabNav from '../../../components/common/common-tab-nav.vue'
	import {ChainShopApi,ShopServiceOrdersApi} from '../../../api/shop_api.js'
	export default{
		data(){
			return{
				statusList:[
					{name:'已报修',id:this.config.repairStatus.submit},
					{name:'执行中',id:this.config.repairStatus.executing},
					{name:'已完成',id:this.config.repairStatus.finished},
				],
				TabCur:1,
				repairList:[],
				type:'',//用于区分来自门店报修还是我的报修
				page:1,
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				modalName:'',
				selectItem:{},
				shopID:'',
				shopItem:{},

			}
		},
		
		onPullDownRefresh(){
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this.page=1;
				this.getRepairList(this.TabCur)
			},600)
		},
		components:{
			LxEmpty,uniLoadMore,repairListItem,positionImg,commonTabNav
		},
		methods:{

			// 查看报修记录详情
			orderDetail(id){
				uni.navigateTo({
					url:'./repair-order-item/repair-order-item?id='+id+"&type=repair"
				})
			},
			//新增报修
			createRepair(){
				uni.navigateTo({
					url:'./create-order/create-order?newOrEdit=create&id='+this.shopID
				})
			},
			tabSelect(e) {
				this.TabCur = e.id;
				this.page=1;
				this.getRepairList(this.TabCur)
			},
			
			//获得门店详情
			async getShopItem(id){
				this.shopItem = this.shopItem = await ChainShopApi(id)	
				uni.setNavigationBarTitle({
					title:this.shopItem.name
				})
				uni.setNavigationBarColor({
				    frontColor: '#000000',
				    backgroundColor: '#FFFFFF'
				})

			},
			//报修列表
			async getRepairList(status){
				this.repairList = await ShopServiceOrdersApi(status,this.shopID,this.page);
			},

		},
		onShow(){
			this.page=1;
			this.getRepairList(this.TabCur)
		},
		onLoad(options){
			if(options){
				this.type=options.type;
				this.shopID=options.id;
				this.getShopItem(this.shopID)
			}
			this.page=1;
			this.getRepairList(this.TabCur)
		}
	}
</script>

<style scoped>
	page{
		background:rgba(247,247,247,1);
	}
	.cu-progress.xs{
		height:2upx;
	}
</style>

