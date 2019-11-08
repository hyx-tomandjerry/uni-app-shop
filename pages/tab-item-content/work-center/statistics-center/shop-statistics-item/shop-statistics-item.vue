<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-color-blue" >
			<block slot="left"><text class="cuIcon-back text-white"  @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold text-white" >销售绩效</view></block>
		</cu-custom>
		<view class="sale-container">
			
			<operateTabItem  :show="userInfo.id==managerID"
			name="绩效分解"
			value="resolve"
			@goToItem="goToItem"
			:sale_resolve_img="true"
			:border_left_y="true"
			:src="'../../../../../static/img/work/statistics/tab/resolve.png'"></operateTabItem>
			
			<operateTabItem 
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
		</view>
		<positionImg :src="'../../../../../static/img/edit.png'" :record_img="true" @createOperate="record"></positionImg>
	
	</view>
</template>
<script>
	import {mapState} from 'vuex';
	import operateTabItem from '../../../../../components/operate-tab-item.vue'
	import positionImg from '../../../../../components/position_img.vue'
	export default{
		computed:mapState(['userInfo']),
		data(){
			return{
				shopID:'',//门店id
				shopZone:'',//门店区域
				managerID:'',//店长id
			}
		},
		components:{
			operateTabItem,
			positionImg
		},
		onLoad(options){
			if(options.id){
				this.shopID=options.id;	
			}
			this.managerID=options.manager?options.manager:0
			this.shopZone=options.zone?options.zone:0;
		},
		methods:{
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			goToItem(type){
				switch(type){
					case 'resolve':
					uni.navigateTo({
						url:"../shop-statistics-aim-resolve/shop-statistics-aim-resolve?id="+this.shopID
					})
					break;
					case 'check':
					uni.navigateTo({
						url:"../statistics-check/statistics-check?id="+this.shopID+'&managetID='+this.managerID
					})
					break;
					case 'rank':
					uni.navigateTo({
						url:"../sale-statistics-center/sale-statistics-start/sale-statistics-start?id="+this.shopID+"&zone="+this.shopZone
					})
					break;
					case 'count':
					uni.navigateTo({
						url:"../sale-statistics-center/sale-statistics/sale-statistics?id="+this.shopID
					
					})
					break;
				}
			},
			//记一笔
			record(){
				uni.navigateTo({
					url:"../record-money/record-money?id="+this.shopID
				})
			}
				
		}
	}
</script>
<style lang="less">
	page{
		background-color: rgba(247,247,247,1)
	}
	.sale-container{
		padding-top:160upx;
		display: flex;
		height:300upx;
		flex-direction: column;
		align-items: center;
		background:url(../../../../../static/img/sale_bg.png) no-repeat ;
		background-size:cover;
	}
		
</style>