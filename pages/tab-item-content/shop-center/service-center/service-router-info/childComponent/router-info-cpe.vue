<template>
	<view>
		
		<view class="router-info  bg-white margin-bottom-normal">
			<common-title-intro title="CPE信息" />
			<normal-detail-item :leftPadding="true" leftIntro="设备名称"
				:marginBottom="true"
				:rightContent="serviceItem.name "></normal-detail-item>	
			<normal-detail-item :leftPadding="true" leftIntro="绑定门店"
				:marginBottom="true"
				:rightContent="serviceItem.targetName "></normal-detail-item>		
			<normal-detail-item :leftPadding="true" leftIntro="CPE厂商"
					:marginBottom="true"
					:rightContent="serviceItem.vendorName "></normal-detail-item>			
			<normal-detail-item :leftPadding="true" leftIntro="IMEI"
				:marginBottom="true"
				:rightContent="serviceItem.seq"></normal-detail-item>
			<normal-detail-item :leftPadding="true" leftIntro="激活时间"
				:marginBottom="true"
				:rightContent="serviceItem.actDate | formatTime('YMD')"></normal-detail-item>
		</view>
		<view class="router-info  bg-white">
			<common-title-intro title="SIM卡信息" />
			<normal-detail-item :leftPadding="true" leftIntro="SIM卡运营商"
				:marginBottom="true"
				rightContent="暂无"></normal-detail-item>	
				
			<normal-detail-item :leftPadding="true" leftIntro="ICCID"
					:marginBottom="true"
					:rightContent="serviceItem.sim "></normal-detail-item>	
		
		</view>
	</view>
</template>

<script>
	import normalDetailItem from '../../../../../../components/common/normal-detail-item.vue'
	import CommonTitleIntro from '../../../../../../components/common/common-title-intro.vue'
	export default{
		components:{normalDetailItem,CommonTitleIntro},
		props:{
			serviceItem:{
				type:Object,
				default(){return {}}
			}
		}
	}
</script>

<style scoped>
	.router-info{
		padding:0 30upx 24upx;
	}
	.margin-right-mini{
		margin-right:20upx;
	}
</style>
