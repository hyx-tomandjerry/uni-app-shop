<template>
	<view class="operateItem">
		<view v-for="(item,index) in options" :key="index" @click="operateItem(item.value)" style="position: relative;">
			<view><image :src="item.image"
				:class="{
					'operateIcon':index==0 || index==3,
					'repairImg':index==1 || index==2
				}"
			></image></view>
			<view>{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import {getShopList} from '../../../api/common_api.js'
	export default{
		data(){
			return {
				options:[
					{image:'../../../static/img/index/index-repair.png',text:'门店报修',value:'repair'},
					{image:'../../../static/img/index/index-express.png',text:'快递包裹',value:'express'},
					{image:'../../../static/img/index/index-shop.png',text:'我的门店',value:'shop'},
					{image:'../../../static/img/index/index-statistics.png',text:'销售绩效',value:'statistics'},
					]
			}
		},
		computed:mapState(['shopCount','shopOnlyObj']),
		methods:{
			//获得门店数量
			async getShopCount(){
				let result=await getShopList();
				this.setShopCount(result.length);
				if(result.length==1) this.setShopOnlyObj(result[0])
			},
			operateItem(type){
				this.getShopCount()
				if(this.shopCount==1){
					//只有一个门店
					switch(type){
						case 'repair':
							uni.navigateTo({
								url:'../../tab-item-content/shop-center/shop-center?type=all&id='+this.shopOnlyObj.id
							})
						break;
						case 'express':
							uni.navigateTo({
								url:'../../tab-item-content/work-center/express-center/express-index/express-index?id='+this.shopOnlyObj.id
							})
						break;
						case 'shop':
						uni.navigateTo({
							url:"../../tab-item-content/shop-center/clerk-list/clerk-list?shopID="+this.shopOnlyObj.id
						})
						break;
						case 'statistics':
						uni.navigateTo({
							url:"../../tab-item-content/work-center/statistics-center/shop-statistics-item/shop-statistics-item?id="+this.shopOnlyObj.id
						})
						break;
					}
				}else{
					//有多条门店
					switch(type){
						case 'repair':
							uni.navigateTo({
								url:'../../tab-item-content/shop-center/shop-list/shop-list?type='+type
							})
						break;
						case 'express':
							uni.navigateTo({
								url:'../../tab-item-content/shop-center/shop-list/shop-list?type='+type
							})
						break;
						case 'shop':
						uni.navigateTo({
							url:'../../tab-item-content/shop-center/shop-list/shop-list?type=shop'
						})
						break;
						case 'statistics':
						uni.navigateTo({
							url:'../../tab-item-content/shop-center/shop-list/shop-list?type=statistics'
						})
						break;
					}	
				}
			},
			...mapMutations(['setShopCount','setShopOnlyObj'])
		}
	}
</script>

<style scoped>
	.repairImg{
		width: 120upx;
		height: 120upx;
		flex-shrink: 0;
	}
	.operateIcon{
		width: 116upx;
		height: 116upx;
		flex-shrink: 0;
	}
	.operateItem{
		padding-top:16px;
		padding-left:10px;
		padding-right:9px;
		display: flex;
		justify-content: space-between;
	}
</style>
