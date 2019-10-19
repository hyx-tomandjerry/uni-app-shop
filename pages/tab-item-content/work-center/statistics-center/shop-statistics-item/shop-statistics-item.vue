<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-color-blue" >
			<block slot="left"><text class="cuIcon-back" style="font-size:22px;color:white" @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold text-white" >销售绩效</view></block>
		</cu-custom>
		<view class="sale-container">
			<view class="sale_resolve sale_common" @click="goToItem('resolve')" v-if="userInfo.id==managerID">
				绩效分解
				<image src="../../../../../static/img/work/statistics/tab/resolve.png" mode=""  class="sale_resolve_img"></image>
			</view>
			<view class="sale_check sale_common"  @click="goToItem('check')">
				绩效审核
				<image src="../../../../../static/img/work/statistics/tab/check.png" mode=""  class="sale_check_img"></image>
			</view>
			<view class="sale_rank sale_common"  @click="goToItem('rank')">
				绩效榜单
				<image src="../../../../../static/img/work/statistics/tab/rank.png" mode=""  class="sale_resolve_img"></image>
			</view>
			<view class="sale_count sale_common"  @click="goToItem('count')">
				绩效统计
				<image src="../../../../../static/img/work/statistics/tab/count.png" mode=""  class="sale_resolve_img"></image>
			</view>
		</view>
		
		<image src="../../../../../static/img/edit.png" mode="" class="record_img"  @click="record"></image>
	</view>
</template>
<script>
	import {mapState} from 'vuex';
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
			
		},
		onLoad(options){
			console.log(options)
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
			padding-top:80px;
			display: flex;
			flex-direction: column;
			align-items: center;
			height:160px;
			
			background:url(../../../../../static/img/sale_bg.png) no-repeat ;
			background-size:cover;
			.sale_common{
				background:#fff;
				width:90%;
				padding-left: 33px;
				height:88px;
				line-height:88px;
				border-radius:6px;
				font-size:16px;
				font-weight: bold;
				margin-bottom:13px;
				color:#3B4152;
				position:relative;
			}
			.sale_resolve{
				
				border-left:6px solid #FFB126;	
				
			}
			.sale_resolve_img{
				position:absolute;
				right:30px;
				top:20px;
				width:50px;
				height:50px;
			}
			.sale_check{
				border-left:6px solid #FF4C4C;	
			}
			.sale_check_img{
				width: 36px;
				height: 38px;
				position:absolute;
				right:30px;
				top:20px;
			}
			.sale_rank{
				border-left:6px solid #15AFA1;	
			}
			.sale_rank_img{
				position:absolute;
				right:30px;
				top:20px;
				width: 45px;
				height: 45px;
			}
			.sale_count{
				border-left:6px solid #FFB126;	
			}
			.sale_count_img{
				position:absolute;
				right:30px;
				top:20px;
				width: 38px;
				height:38px;
			}
		}
		.record_img{
			width:84px;
			height: 84px;
			position:fixed;
			z-index:100;
			bottom:32px;
			right:20px;
		}
</style>