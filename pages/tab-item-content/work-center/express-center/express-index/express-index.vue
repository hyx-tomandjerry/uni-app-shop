<template>
	<view>
		<view class="express-tab-container">
			<operateTabItem  
			name="速递寄件"
			value="speed"
			@goToItem="expressTabClick"
			:sale_resolve_img="true"
			:border_left_y="true"
			src="../../../../../static/img/work/express/tab/speed_send.png"></operateTabItem>
			<operate-tab-item
				name="物流寄件"
				value="logistics"
				@goToItem="expressTabClick"
				:express_item="true"
				:border_left_p="true"
				src="../../../../../static/img/work/express/tab/wuliu_send.png"
			></operate-tab-item>
			
			<operate-tab-item
				name="调拨单"
				value="distribute"
				@goToItem="expressTabClick"
				:express_item="true"
				:border_left_r="true"
				src="../../../../../static/img/work/express/tab/distribute_goods.png"
			></operate-tab-item>
			
			<operate-tab-item
				name="物流查询"
				value="check"
				@goToItem="expressTabClick"
				:express_item="true"
				:border_left_g="true"
				src="../../../../../static/img/work/express/tab/check_order.png"
			></operate-tab-item>
			
		</view>
	</view>
</template>
<script>
	import operateTabItem from '../../../../../components/common/operate-tab-item.vue'
	
	import {mapState} from 'vuex'
	import {ChainShopApi} from '../../../../../api/shop_api.js'
	export default{
		computed:mapState(['shopCount','shopOnlyObj']),
		components:{operateTabItem},
		data(){
			return{
				shopItem:{}
			}
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				uni.navigateTo({
					url:"../complaint/complaint-list/complaint-list"
				})
			}
		},
		methods:{
			async getShopItem(id){
				this.shopItem = await ChainShopApi(id);
				uni.setNavigationBarTitle({
					title:this.shopItem.name
				})
				uni.setNavigationBarColor({
				    frontColor: '#ffffff',
				    backgroundColor: '#42B0ED'
				})

			},
			expressTabClick(type){
				switch(type){
					case 'speed':
						//速记寄件
						uni.navigateTo({
							url:"../create-express/create-express?newOrEdit=new&id="+this.shopItem.id+"&type=speed"
						})
						//速记
						break;
					case 'logistics':
						// //物流
						// uni.navigateTo({
						// 	url:"../create-express/create-express?type=logistics"
						// })
						break;
					case 'distribute':
						//调拨下单
						uni.navigateTo({
							url:"../distribute-work-list/distribute-work-list?id="+this.shopItem.id
						})
				
						//调拨代发
						break;
					case 'check':
						//调拨任务
						uni.navigateTo({
							url:"../express-list/express-list?id="+this.shopItem.id
						})
						
						break;
				
				}	
			}
		},
		onLoad(options){
			if(options.id){
				this.getShopItem(options.id)
			}
		}
	}
	
</script>
<style scoped>
	.express-tab-container{
		padding-top:40upx;
		display: flex;
		height:200upx;
		flex-direction: column;
		align-items: center;
		background:url(../../../../../static/img/sale_bg.png) no-repeat ;
		background-size:cover;
	}
</style>