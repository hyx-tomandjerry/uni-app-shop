<template>
	<view>
		<view class="sale-container">

			<operateTabItem :show="userInfo.id==shopItem.manager"
			name="绩效分解"
			value="resolve"
			@goToItem="goToItem"
			:sale_resolve_img="true"
			:border_left_y="true"
			:src="'../../../../../static/img/work/statistics/tab/resolve.png'"></operateTabItem>

			<operateTabItem  :show="userInfo.id==shopItem.manager"
			name="绩效审核"
			value="check"
			@goToItem="goToItem"
			:sale_check_img="true"
			:border_left_r="true"
			:src="'../../../../../static/img/work/statistics/tab/check.png'"></operateTabItem>

			<operateTabItem
			name="绩效榜单"
			value="rank"
			@goToItem="goToItem"
			:sale_resolve_img="true"
			:border_left_g="true"
			:src="'../../../../../static/img/work/statistics/tab/rank.png'"></operateTabItem>

			<operateTabItem
			name="绩效统计"
			value="count"
			@goToItem="goToItem"
			:sale_resolve_img="true"
			:border_left_y="true"
			:src="'../../../../../static/img/work/statistics/tab/count.png'"></operateTabItem>

			<operateTabItem 
			name="退货处理"
			value="quit"
			@goToItem="goToItem"
			:sale_resolve_img="true"
			:border_left_p="true"
			:src="'../../../../../static/img/work/statistics/tab/return.png'"></operateTabItem>
		</view>
		<positionImg :src="'../../../../../static/img/edit.png'" :record_img="true" @createOperate="record"></positionImg>

	</view>
</template>
<script>
	import {mapState} from 'vuex';
	import operateTabItem from '../../../../../components/common/operate-tab-item.vue'
	import positionImg from '../../../../../components/common/position_img.vue'
	import {ChainShopApi} from '../../../../../api/shop_api.js'
	export default{
		computed:mapState(['userInfo']),
		data(){
			return{
				shopItem:{}
			}
		},
		components:{
			operateTabItem,
			positionImg
		},
		onLoad(options){
			if(options.id){
				this.getShopItem(options.id)
			}
		},
		methods:{
			async getShopItem(id){
				this.shopItem = await ChainShopApi(id);
				uni.setNavigationBarColor({
				    frontColor: '#ffffff',
				    backgroundColor: '#42B0ED',
				    animation: {
				        duration: 400,
				        timingFunc: 'easeIn'
				    }
				})
				uni.setNavigationBarTitle({
					title:this.shopItem.name
				})

			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			goToItem(type){
				switch(type){
					case 'resolve':
					uni.navigateTo({
						url:"../shop-statistics-aim-resolve/shop-statistics-aim-resolve?id="+this.shopItem.id
					})
					break;
					case 'check':
					uni.navigateTo({
						url:"../statistics-check-list/statistics-check-list?id="+this.shopItem.id
					})
					break;
					case 'rank':
					uni.navigateTo({
						url:"../sale-statistics-center/sale-statistics-start/sale-statistics-start?id="+this.shopItem.id+"&zone="+this.shopItem.zone
					})
					break;
					case 'count':
					uni.navigateTo({
						url:"../sale-statistics-center/sale-statistics/sale-statistics?id="+this.shopItem.id

					})
					break;
					case 'quit':
					uni.navigateTo({
						url:"../sale-return-center/sale-return-form/sale-return-form?shopID="+this.shopItem.id+"&type=index"
					})
					//退货处理
					break;
				}
			},
			//记一笔
			record(){
				uni.navigateTo({
					url:"../record-money/record-money?type=save&shopID="+this.shopItem.id
				})
			}

		}
	}
</script>
<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}
	.sale-container{
		padding-top:40upx;
		display: flex;
		height:200upx;
		flex-direction: column;
		align-items: center;
		background:url(../../../../../static/img/sale_bg.png) no-repeat ;
		background-size:cover;
	}

</style>
