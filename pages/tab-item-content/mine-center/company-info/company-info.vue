<template>
	<view>
		<company-info-head :companyInfo="companyInfo" />
		
		
		<view class="company-info-content">
			<common-flex  leftContent="公司名称" :isRed="false" :rightContent="companyInfo.name || ''"/>
			<common-flex  leftContent="公司简称" :isRed="false" :rightContent="companyInfo.alias || ''"/>
			<common-flex  leftContent="公司EID" :isRed="false" :rightContent="companyInfo.eid || ''"/>
			<common-flex  leftContent="联系人" :isRed="false" :rightContent="companyInfo.contactor || ''"/>
			<common-flex  leftContent="联系电话" :isRed="false" :rightContent="companyInfo.telephone || ''"/>
			<common-flex  leftContent="公司地址" :isRed="false" :rightContent="`${companyInfo.provinceName || '暂无登记'}${companyInfo.cityName || ''}${companyInfo.districtName || ''}${companyInfo.address || ''}`"/>
			<common-flex  leftContent="工商信息" :isRed="false" :rightContent="companyInfo.license || '暂无'"/>
			<common-flex  leftContent="成立时间" :isRed="false" :rightContent="companyInfo.regdate | formatTime('YMD')"/>
		</view>
	</view>
</template>

<script>
	import CompanyInfoHead from './childComponent/CompanyInfoHead.vue'
	import CommonFlex from '../../../../components/common/common-flex.vue'
	import {mapState} from 'vuex'
	import {RefreshOnlineUser} from '../../../../api/common_api.js'
	import {CustomerApi} from '../../../../api/mine_api.js'
	export default {
		components:{CompanyInfoHead,CommonFlex},
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
