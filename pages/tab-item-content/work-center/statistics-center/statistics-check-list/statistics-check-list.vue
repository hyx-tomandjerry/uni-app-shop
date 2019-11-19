<template>
	<view>
		<cu-custom :is-back="true" bg-color="bg-white">
			<block slot="left"><view class="cuIcon-back "  @click="goBack()"></view></block>
			<block slot="content"><view class="font-size-big  font-weight-bold">{{shopItem.name || ''}}绩效审核</view></block>
		</cu-custom>
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
	import uniLoadMore from '../../../../../components/uni-load-more.vue'
	import saleCheckListItem from '../../../../../components/statistics/sale-check-list-item.vue'
	export default {
		data() {
			return {
				shopItem:{},
				shopID:'',
				page:1,
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
				console.log(item.bgndate)
				let year=new Date(item.bgndate).getFullYear();
				let month=new Date(item.bgndate).getMonth()+1;
				let day=new Date(item.bgndate).getDate()
				uni.navigateTo({
					url:"../statistics-check/statistics-check?shopID="+this.shopID+"&year="+year+"&month="+month+"&day="+day+"&managerID="+this.shopItem.manager
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			getCheckList(){
				this.$ajax('ShopUnconfirmedDays',{shop:this.shopID},res=>{
					if(res){
						this.checkList=res;
					}
				})
			},
			//获得门店信息
			getShopInfo(id){
				this.$ajax('ChainShop',{id:id},res=>{
					this.shopItem=res;
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
		},
		onReachBottom(){
			// this.$ajax('MyShops',{
			// 	address:'',
			// 	offset:this.$utils.getOffset(this.page)
			// },res=>{
			// 	if(res==''){
			// 		setTimeout(()=>{
			// 			this.loading='noMore'
			// 		},900)
			// 	}else{
			// 		res.forEach(item=>{
			// 			this.shopList=this.shopList.concat(item)
			// 		})
			// 		this.loading='loading';
			// 		setTimeout(()=>{
			// 			this.loading='noMore'
			// 		},900)
			// 	}
			
			// })							
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
