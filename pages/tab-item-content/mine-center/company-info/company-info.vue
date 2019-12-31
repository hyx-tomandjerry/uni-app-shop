<template>
	<view>
		<view class="img-content position_relative">
			<image :src="companyInfo.logourl?companyInfo.logourl:'../../../../static/bgimg/1.jpg'" mode="widthFix" lazy-load></image>
			<view class="company-info position_absolute">
				<view class="font-size-supper  font-weight-bold text-white">{{companyInfo.name}}</view>
			</view>
		</view>
		<view class="company-info-content">
			<normal-detail-item 
				:leftPadding="true"
				width="25%"
				 leftIntro="公司名称"
				:marginBottom="true"
				:rightContent="companyInfo.name || ''"	></normal-detail-item>
			<normal-detail-item
				:leftPadding="true"
				width="25%"
				 leftIntro="公司简称"
				:marginBottom="true"
				:rightContent="companyInfo.alias || ''"></normal-detail-item>
			<normal-detail-item
				width="25%"
				:leftPadding="true"
				 leftIntro="成立时间"
				:marginBottom="true"
				:rightContent="companyInfo.regdate | formatTime('YMD')"></normal-detail-item>	
				<normal-detail-item
					width="25%"	
					:leftPadding="true"
					 leftIntro="公司EID"
					:marginBottom="true"
					:rightContent="companyInfo.eid || ''"	></normal-detail-item>
				<normal-detail-item
						width="25%"
						:leftPadding="true"
						 leftIntro="联系人"
						:marginBottom="true"
						:rightContent="companyInfo.contactor || ''"	></normal-detail-item>
				<normal-detail-item
					width="25%"
					:leftPadding="true"
					 leftIntro="联系电话"
					:marginBottom="true"
					:rightContent="companyInfo.telephone || ''"	></normal-detail-item>	
				<normal-detail-item
					width="25%"
					:leftPadding="true"
					 leftIntro="公司地址"
					:marginBottom="true"
					:rightContent="`${companyInfo.provinceName || '暂无登记'}${companyInfo.cityName || ''}${companyInfo.districtName || ''}${companyInfo.address || ''}`"	></normal-detail-item>	
				
		</view>
	</view>
</template>

<script>
	import normalDetailItem from '../../../../components/common/normal-detail-item.vue'
	import {mapState} from 'vuex'
	import {RefreshOnlineUser} from '../../../../api/common_api.js'
	import {CustomerApi} from '../../../../api/mine_api.js'
	export default {
		components:{normalDetailItem},
		computed:mapState(['userInfo']),
		data() {
			return {
				companyInfo:{}
			}
		},
		methods: {
			async init_info(){
				let result =await RefreshOnlineUser();
				this.companyInfo = await CustomerApi(result.owner)

				
			}
		},
		onShow(){
			this.init_info()
		},
		onLoad(){
			
			this.init_info()
		}
	}
</script>

<style scoped>
	.img-content{
		height:500upx !important;
		width:100%;
	}
	.img-content>image{
		width:100%;
		height:500upx !important;
	}
	.company-info{
		left:40upx;
		bottom:40upx;
	}
	.company-info-content{
		padding:20upx 30upx;
		background: #FFFFFF;
	}
</style>
