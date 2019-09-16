<template>
	<view style="font-size:0;">
		<cu-custom :isBack="true"  bgColor="bg-white">
				<block slot="left">
					<view class="cuIcon-back " style="font-size:20px;" @click="goBack"></view>
				</block>
				<block slot="content">
					<view class=" font-size-big color-normal font-weight-bold">快递包裹</view>
				</block>
		</cu-custom>
		<view class="express-container">
			<image src="../../../../../static/img/work/express/tab/banner.png" style="width:100%;height:120px;"></image>
			<view class="express-tab">
				<view class="flex justify-between borderBottom first-tab" >
					<view class="borderRight flex-1  color-normal font-size-normal text-center"  @click="expressTabClick('speed')">
						<image src="../../../../../static/img/work/express/tab/speed_send.png" style="width:38px;height:38px;vertical-align: middle;margin-right:10px;"></image>
						<text >速递寄件</text>
					</view>
					<view class="flex-1 text-center logistics-tab color-normal font-size-normal  "  @click="expressTabClick('logistics')">
						<image src="../../../../../static/img/work/express/tab/wuliu_send.png" style="width:38px;height:38px;vertical-align: middle;margin-right:9px;"></image>
						<text>物流寄件</text>
					</view>
				</view>
				<view class="flex justify-between  first-tab" >
					<view class="borderRight flex-1  color-normal font-size-normal text-center"  @click="expressTabClick('distribute')">
						<image src="../../../../../static/img/work/express/tab/distribute_goods.png" style="width:38px;height:38px;vertical-align: middle;margin-right:10px;"></image>
						<text >调拨单</text>
					</view>
					<view class="flex-1 text-center logistics-tab color-normal font-size-normal  "  @click="expressTabClick('check')">
						<image src="../../../../../static/img/work/express/tab/check_order.png" style="width:38px;height:38px;vertical-align: middle;margin-right:9px;"></image>
						<text>查快递</text>
					</view>
				</view>
			</view>
		</view>
		<showModel :isShow="modalName=='showModal'" @hideModel="hideModal('cancel')" @confirmDel="hideModal('agree')" v-if="modalName=='showModal'">
			<block slot="content">没有身份证号不能寄快递，请填写个人信息!</block>
		</showModel>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	import showModel from '../../../../../components/show-model.vue'
	export default{
		computed:mapState(['userInfo']),
		data(){
			return{
				modalName:''
				
			}
		},
		components:{
			showModel
		},
		onLoad(){
			
		},
		methods:{
			hideModal(type){
				switch(type){
					case 'cancel':
						this.modalName=null;
						break;
					case 'agree':
						uni.navigateTo({
							url:'../../../mine-center/basic-setting/basic-setting'
						})
						this.modalName=null;
						break;
				}

			},
			toShowList(){
				uni.navigateTo({
					url:'../express-list/express-list'
				})
			},
			goBack(){
				uni.switchTab({
					url:"../../../../tab-item/index/index"
				})
			},
			expressTabClick(type){
				if(!this.userInfo.idnum){
					this.modalName='showModal'
				}else{

					switch(type){
						case 'speed':
							//速记寄件
							uni.navigateTo({
								url:"../create-express/create-express?type=speed"
							})
							//速记
							break;
						case 'logistics':
							// //物流
							// uni.navigateTo({
							// 	url:"../create-express/create-express?type=logistics"
							// })
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
								url:"../distribute-work-list/distribute-work-list"
							})

							//调拨代发
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

		
	}
</script>
<style lang="less" scoped>
	page{
		background:rgba(247,247,247,1);
	}
	.express-container{
		background:#fff;
		.express-tab{
			.first-tab{
				height:154px;
				line-height:154px;


			}
		}
		
	}
	
</style>