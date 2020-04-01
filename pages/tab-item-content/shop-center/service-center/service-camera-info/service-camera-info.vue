<template>
	<view class="borderTop">
		<!-- <cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left">
				<view @tap="goBack" class="cuIcon-back font-size-back"></view>
			</block>
			<block slot="content"><view>摄像头详情</view></block>
			<block slot="right" v-if="shopItem.manager == userInfo.id">
				<view @tap="unbindService" style="margin-right:20upx;">
					解绑
				</view>
			</block>
		</cu-custom> -->
		<common-flex leftContent="设备名称"  :isLeftCb="true" :rightContent="serviceItem.name || ''" :isRed="false"/>
		<common-flex leftContent="绑定门店"  :isLeftCb="true"  :rightContent="serviceItem.targetName || ''" :isRed="false"/>
		<common-flex leftContent="设备序列号"  :isLeftCb="true"  :rightContent="serviceItem.uuid || ''" :isRed="false"/>
		<common-flex leftContent="出库时间"  :isLeftCb="true"  :rightContent="serviceItem.outDate | formatTime('YMDHMS')" :isRed="false"/>
		<common-flex leftContent="签收时间"  :isLeftCb="true"  :rightContent="serviceItem.accDate | formatTime('YMDHMS')" :isRed="false"/>
		<common-flex leftContent="绑定时间"  :isLeftCb="true"  :rightContent="serviceItem.actDate | formatTime('YMDHMS')" :isRed="false"/>
		<view class="cu-form-group">
			<view class="color-regular">设备状态</view>
			<view :class="{
				'inventory':serviceItem.status == serviceStatus.unsign,
				'delivered':serviceItem.status == serviceStatus.unactive,
				'activated':serviceItem.status == serviceStatus.binding,
				'stopped':serviceItem.status == serviceStatus.unbind,
				'stpowed':serviceItem.status == serviceStatus.payment,
				'canceled':serviceItem.status == serviceStatus.wrong
			}" class="font-weight-bold">{{serviceItem.status | serviceStatusZnPipe}}</view>
		</view>
		<common-btn-one :isPos="true" type="primary" content="解绑" @operateBtn="unbindService" v-if="shopItem.manager == userInfo.id"></common-btn-one>
	</view>
</template>

<script>
	import commonFlex from '../../../../../components/common/common-flex.vue'
	import CommonBtnOne from '../../../../../components/common/common-btn-one.vue'
	import {mapState} from 'vuex'
	import {CameraApi,UninstallCameraApi,ChainShopApi} from '../../../../../api/shop_api.js'
	export default {
		
		components:{commonFlex,CommonBtnOne},
		computed:{
			...mapState(['userInfo']),
			serviceStatus(){
				return this.config.serviceStatus
			}
		},
		data() {
			return {
				serviceItem:{},
				shopItem:{}
			}
		},
		methods: {
			unbindService(){
				uni.showModal({
					title:'解绑',
					content:'设备将与门店解除绑定，是否确认解绑？?',
					success:(res)=>{
						if(res.confirm){
							if(UninstallCameraApi(this.serviceItem.id)){
								this.$utils.showToast('解绑设备成功');
								this.$utils.goBack()
								this.$utils.hide()
							}
						}
					}
				})
			},
			//获得设备详情
			async serviceItemInfo(seq){
				this.serviceItem = await CameraApi(seq)
			},
			//获得门店详情
			async getShopItemInfo(id){
				this.shopItem = await ChainShopApi(id)
			},
			goBack(){
				console.log('kkkkk')
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(options){
			if(options){
				this.serviceItemInfo(options.seq)
				this.getShopItemInfo(options.shopID)
			}
		}
	}
</script>

<style scoped>
@import url("../../../../../common/css/service.css");
</style>
