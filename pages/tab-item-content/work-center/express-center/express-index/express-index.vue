<template>
	<view style="font-size:0;">

		<view class="express-container">
			<image src="../../../../../static/img/work/express/tab/banner.png" style="width:100%;height:120px;"></image>
			<view class="express-tab">
				<view class="flex justify-between borderBottom" >
					<view class="flex justify-start align-center" style="width:50%;border-right:1px solid #EEEEED;padding:37px;" @click="expressTabClick('speed')">
						<image src="../../../../../static/img/work/express/tab/speed_send.png" style="margin-right:9px;width:39px;height:38px;vertical-align: middle"></image>
						<view class="font-size-normal">速递寄件</view>
					</view>
					<view class="flex justify-start align-center" style="width:50%;padding-left:40px;"  @click="expressTabClick('logistics')">
						<image src="../../../../../static/img/work/express/tab/wuliu_send.png" style="margin-right:9px;width:39px;height:38px;vertical-align: middle"></image>
						<view class="font-size-normal">物流寄件</view>
					</view>
				</view>
				<view class="flex justify-between borderBottom" >
					<view class="flex justify-start align-center" style="width:50%;border-right:1px solid #EEEEED;padding:37px;" @click="expressTabClick('local')">
						<image src="../../../../../static/img/work/express/tab/local_email.png" style="margin-right:9px;width:38px;height:40px;vertical-align: middle"></image>
						<view class="font-size-normal">同城寄件</view>
					</view>
					<view class="flex justify-start align-center" style="width:50%;padding-left:40px;" @click="expressTabClick('distribute')">
						<image src="../../../../../static/img/work/express/tab/distribute_goods.png" style="margin-right:9px;width:38px;height:38px;vertical-align: middle"></image>
						<view class="font-size-normal">调拨下单</view>
					</view>
				</view>
				<view class="flex justify-between borderBottom" >
					<view class="flex justify-start align-center" style="width:50%;border-right:1px solid #EEEEED;padding:37px;" @click="expressTabClick('distribute_work')">
						<image src="../../../../../static/img/work/express/tab/replace_send.png" style="margin-right:9px;width:38px;height:36px;vertical-align: middle"></image>
						<view class="font-size-normal">调拨任务</view>
					</view>
					<view class="flex justify-start align-center" style="width:50%;padding-left:40px;"  @click="expressTabClick('check')">
						<image src="../../../../../static/img/work/express/tab/order_check.png" style="margin-right:9px;width:38px;height:38px;vertical-align: middle"></image>
						<view class="font-size-normal">查快递</view>
					</view>
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
			expressTabClick(type){
				switch(type){
					case 'speed':
						//速记寄件
					uni.navigateTo({
						url:"../create-express/create-express?type=speed"
					})
					//速记
					break;
					case 'logistics':
					//物流
					uni.navigateTo({
						url:"../create-express/create-express?type=logistics"
					})
					break;
					case 'local':
					// 同城寄件
						uni.navigateTo({
							url:"../create-express/create-express?type=local"
						})
					break;
					case 'distribute':
						//调拨下单
						uni.navigateTo({
							url:"../distribute-work-list/distribute-work-list?type=distribute-order"
						})

					//调拨代发
					break;
					case 'distribute_work':
						//调拨任务
						uni.navigateTo({
							url:"../distribute-work-list/distribute-work-list?type=distribute-work"
						})
					 break;
					case 'check':
						//调拨任务
						uni.navigateTo({
							url:"../express-list/express-list"
						})
					 break;

				}
			}
			
		}
	}
</script>
<style lang="less" scoped>
	page{
		background:rgba(247,247,247,1);
	}
	.express-container{
		background:#fff;
		.express-tab{
			.express-tab-item{
				padding:26px 40px 37px 39px;
			}
		}
		
	}
</style>