<template>
	<view class="borderTop">
		<common-flex
			leftContent="门店名称"
			:rightContent="shopItem.name"
			 :isLeftCb="true"></common-flex>	
		
		<common-flex
			leftContent="所在城市" 
			type="navigate"
			:isLeftCb="true"
			@operateItem="chooseCity"
			:rightContent="`${shopItem.provinceName}-${shopItem.cityName }-${shopItem.districtName}`"></common-flex>
		
		<cityModel :isShow="isShow" :provinceList="provinceList" @hideModel="hideModel"></cityModel>
		<common-btn-one
					type="primary" 
					content="确定"
					@operateBtn="submitForm" :isPos="true"></common-btn-one>
	</view>
</template>

<script>
	import commonFlex from '../../../../../components/common/common-flex.vue'
	import cityModel from '../../../../../components/common/city-model.vue'
	import commonBtnOne from '../../../../../components/common/common-btn-one.vue'
	import {ChainShopApi} from '../../../../../api/shop_api.js'
	import {DistrictsApi} from '../../../../../api/common_api.js'
	export default {
		components:{commonFlex,cityModel,commonBtnOne},
		data() {
			return {
				shopItem:{},
				isShow:false,
				provinceList:[],
				cityObj:{}
			}
		},
		methods: {
			submitForm(){
				this.$fire.fire('city',this.cityObj)
				uni.navigateBack({
					delta:1
				})
			},
			async getShopInfo(id){
				this.shopItem =await ChainShopApi(id)

			},
			hideModel(e){
				this.isShow=false;
				this.cityObj={
					province:e.province,
					city:e.city,
					district:e.district,
					provinceName:e.provinceName,
					cityName:e.cityName,
					districtName:e.districtName
				}
				this.shopItem.province=e.province;
				this.shopItem.city=e.city;
				this.shopItem.district=e.district;
				this.shopItem.provinceName=e.provinceName;
				this.shopItem.cityName=e.cityName;
				this.shopItem.districtName=e.districtName;
				this.provinceList=[];
			},
			chooseCity(){
				this.isShow=true;
				this.getProvinceList()
			},
			async getProvinceList(){
				this.provinceList = await DistrictsApi(0)

			},
		},
		onLoad(options){
			if(options.id){
				this.getShopInfo(options.id)
			}
		}
	}
</script>

<style>

</style>
