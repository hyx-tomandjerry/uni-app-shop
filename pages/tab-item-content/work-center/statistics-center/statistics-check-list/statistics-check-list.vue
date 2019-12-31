<template>
	<view>
		<view class="list-container">
			<template v-if="checkList.length">
				<block v-for="(item,index) in checkList" :key="index" >
					<sale-check-list-item :item="item" :index="index" @checkItem="checkItem"></sale-check-list-item>
				</block>
				
				<uni-load-more :contentText="content" :showIcon="true" v-if="checkList.length>9" :status="loading"></uni-load-more>
			</template>
			<template v-else>
				<lx-empty></lx-empty>
			</template>
		</view>
	</view>
</template>

<script>
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	import uniLoadMore from '../../../../../components/common/uni-load-more.vue'
	import saleCheckListItem from '../../../../../components/statistics/sale-check-list-item.vue'
	
	import {ChainShopApi} from '../../../../../api/shop_api.js'
	import {ShopUnconfirmedDaysApi} from '../../../../../api/statistics_api.js'
	export default {
		data() {
			return {
				shopItem:{},
				shopID:'',
				content:{
					contentdown: "下拉加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},					
				loading:'more',
				checkList:[]
			}
		},
		components:{LxEmpty,uniLoadMore,saleCheckListItem},
		methods: {
			checkItem(item){
				let year=new Date(item.bgndate).getFullYear();
				let month=new Date(item.bgndate).getMonth()+1;
				let day=new Date(item.bgndate).getDate()
				uni.navigateTo({
					url:"../statistics-check/statistics-check?shopID="+this.shopID+"&year="+year+"&month="+month+"&day="+day+"&managerID="+this.shopItem.manager
				})
			},
			async getCheckList(){
				this.checkList = await ShopUnconfirmedDaysApi(this.shopID)

			},
			//获得门店信息
			async getShopInfo(id){
				
				this.shopItem = await ChainShopApi(id)
				uni.setNavigationBarTitle({
					title:this.shopItem.name
				})

			}
		},
		onLoad(options){
			if(options.id){
				this.shopID=options.id;
				this.getCheckList()
				this.getShopInfo(this.shopID)
			}
		},
		onShow(){
			this.getCheckList()
			this.getShopInfo(this.shopID)
		}
	}
</script>

<style scoped>
	page{
		background:#F7F7F7;
	}
	.list-container{
		padding:30upx;
	}
	
</style>
