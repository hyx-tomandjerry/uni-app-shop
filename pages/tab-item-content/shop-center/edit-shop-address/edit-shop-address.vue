<template>
	<view class="bg-white ">
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back"  @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >修改地址</view></block>
		</cu-custom>
		<view class="cu-form-group borderTop" >
			<view class="title color-normal" >门店名称</view>
			<input class="text-right color-regular" v-model="shopItem.name" disabled="true" ></input>
		</view>
		<view class="flex justify-between address-item borderBottom position_relative borderTop"  @click="chooseCity">
			<view class="title color-normal" style="font-size: 30upx;" >选择所在城市</view>
			<view style="padding-right:15px;" class="color-regular">
				<text>{{shopItem.provinceName ||''}}</text>
				<text v-if="shopItem.provinceName">-</text>
				<text>{{shopItem.districtName ||''}}</text>
				<text v-if="shopItem.districtName">-</text>
				<text>{{shopItem.cityName ||''}}</text>
			</view>
			<text class="cuIcon-right font-size-big" style="position:absolute;right:11px;"></text>
		</view>
		<view class="cu-form-group borderTop" >
			<view class="title color-normal">详细地址</view>
			<input class="text-right color-regular" v-model="shopItem.address"  ></input>
		</view>
		<bottomBtnOne content="确定修改" @showModal="editAddress"></bottomBtnOne>
		<cityModel :isShow="isShow" :provinceList="provinceList" @hideModel="hideModel"></cityModel>
	</view>
</template>

<script>
	import cityModel from '../../../../components/city-model.vue'
	import bottomBtnOne from '../../../../components/common/bottom-btn-one.vue'
	export default {
		data() {
			return {
				shopItem:'',//门店详情
				isShow:false,
				provinceList:[],
			}
		},
		components:{cityModel,bottomBtnOne},
		methods:{
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			getShopInfo(id){
				this.$ajax('ChainShop',{id:id},res=>{
					this.shopItem=res;
				})
			},
			chooseCity(){
				this.isShow=true;
				this.getProvinceList()
			},
			getProvinceList(){
				this.$ajax('Districts',{parent:0},res=>{
					this.provinceList=res;
				})
			},
			editAddress(){

				this.$ajax('SetShopAddress',{
					id:this.shopItem.id,
					province:this.shopItem.province,
					city:this.shopItem.city,
					district:this.shopItem.district,
					address:this.shopItem.address
				},res=>{
					uni.showToast({
						title:'门店地址修改成功',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},900)
				})
			},
			hideModel(e){
				this.isShow=false;
				this.shopItem.province=e.province;
				this.shopItem.city=e.city;
				this.shopItem.district=e.district;
				this.shopItem.provinceName=e.provinceName;
				this.shopItem.cityName=e.cityName;
				this.shopItem.districtName=e.districtName;
				this.provinceList=[];
			},
		},
		onLoad(options){
			if(options){
				this.getShopInfo(options.id)
			}
		}
	}
</script>

<style scoped>
	.cu-form-group .title{
		color:rgba(185,185,185,1);
	}
	.address-item{
		padding:0 28upx;
		font-size:30upx;
		height:110upx;
		line-height:110upx;
	}

</style>
