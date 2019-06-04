<template>
	<view style="font-size:0;">
		<cu-custom :isBack="true" bgColor="white">
			<block slot="left">
				<text class="cuIcon-back" @click="goBack()" style="font-size:22px;"></text>
			</block>
			<block slot="content"><view class="font-size-big font-weight-bold">快递包裹</view></block>
			<block slot="right"><view class="font-size-normal font-weight-normal" @click="toShowList()">寄件记录</view></block>
		</cu-custom>
		<view class="express-container">
			<image src="../../../../../static/img/work/express/log1.png" style="width:100%;height:120px;"></image>
			<view class="express-tab flex justify-around" style="flex-wrap: wrap;">
				
				<view class="express-tab-item1 express-tab-item" @click="expressTabClick(1)">
					<view><image src="../../../../../static/img/work/express/tab/sudiTab.png" class="tab-img"></image></view>
					<view class="font-size-normal font-weight-normal tab-name">速递寄件</view>
					<view class="tab-desc font-weight-normal">3KG以下小件商品 急件速递订单</view>
				</view>
				
				<view class="express-tab-item2 express-tab-item"  @click="expressTabClick(2)">
					<view><image src="../../../../../static/img/work/express/tab/wuliuTab.png" class="tab-img"></image></view>
					<view class="font-size-normal font-weight-normal tab-name">物流寄件</view>
					<view class="tab-desc font-weight-normal">大件商品公路运输慢 件物流订单</view>
				</view>
				
				<view class="express-tab-item3 express-tab-item"  @click="expressTabClick(3)">
					<view><image src="../../../../../static/img/work/express/tab/diaoboTab.png" class="tab-img"></image></view>
					<view class="font-size-normal font-weight-normal tab-name">调拨商品</view>
					<view class="tab-desc font-weight-normal">请求第三方门店、仓库将指定 商品发货到本店 或发货至指定的其它收件人</view>
				</view>
				
				<view class="express-tab-item4 express-tab-item"  @click="expressTabClick(4)">
					<view><image src="../../../../../static/img/work/express/tab/daifaTab.png" class="tab-img"></image></view>
					<view class="font-size-normal font-weight-normal tab-name">代发任务</view>
					<view class="tab-desc font-weight-normal">收到第三方门店、仓库的调拨 请求，按照请求将 商品发货到指定的收件人</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				
				
			}
		},
		components:{
			
		},
		onLoad(){
			
		},
		methods:{
			toShowList(){
				uni.navigateTo({
					url:'../express-list/express-list'
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			expressTabClick(index){
				switch(index){
					case 1:
					uni.navigateTo({
						url:"../create-express/create-express?type=express"
					})
					//速记
					break;
					case 2:
					//物流
					uni.navigateTo({
						url:"../create-express/create-express?type=logistics"
					})
					break;
					case 3:
					// 调拨
					break;
					case 4:
					//代发
					break;
				}
			}
			
		}
	}
</script>
<style lang="less" scoped>
	
	.express-container{
		.express-tab{
			background:#fff;
			.express-tab-item{
				text-align: center;
				width:50%;
				
			}
			.express-tab-item2{
				padding:41px 51px 38px 46px;
			}
			.express-tab-item1{
				padding:41px 55px 39px 50px;border-bottom:1px solid #EEEEED;border-right:1px solid #EEEEED
			}
			.express-tab-item3{
				padding:27px 27px 36px 29px;border-right:1px solid #EEEEED
			}
			.express-tab-item4{
				padding:30px 35px 36px 22px;border-top:1px solid #EEEEED
			}
			.tab-img{
				width:39px;
				height:38px;
				
			}
			.tab-name{
				margin-top:6px;
				margin-bottom:5px;
			}
			.tab-desc{
				font-size:10px;
				color:rgba(137,136,136,1);
			}
			
		}
		
	}
</style>