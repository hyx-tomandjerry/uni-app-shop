<template>
	<view class="borderTop">
		<view class=" bg-white" >
			<view class="flex justify-between address-item borderBottom">
				<view style="border-right:1px solid #EEEEED;" >
					<view>收件人</view>
					<view>
						<input type="text" placeholder="姓名名称(必填)" style="font-size:13px;" v-model="shop.name">
					</view>
				</view>
				<view>
					<view>电话</view>
					<input type="number" placeholder="手机号电话(必填)" style="font-size:13px;"
					maxlength="11"
					 v-model="shop.telephone" @blur="checkTelEvent($event)">
				</view>
			</view>
			<view class="flex justify-between address-item borderBottom position_relative"  @click="chooseCity">
				<view class="title" style="color:gray;font-size: 12px;" >选择所在城市</view>
				<!-- <addressed @changes="childClick($event)"></addressed> -->
				<view style="padding-right:15px;">
					<text>{{shop.provinceName ||''}}</text>
					<text v-if="shop.provinceName">-</text>
					<text>{{shop.districtName ||''}}</text>
					<text v-if="shop.districtName">-</text>
					<text>{{shop.cityName ||''}}</text>
				</view>
				<text class="cuIcon-right font-size-big" style="position:absolute;right:11px;"></text>
			</view>
			
			<view class="address-item borderBottom">
				<input type="text" placeholder="详细地址(详细到门牌,街道)" style="font-size:13px;" v-model="shop.address">
			</view>
		</view>
		
		
		<view style="width:100%;position:absolute;bottom:7px;left:0;padding:10px 15px;background:#fff;">
			<view class="cu-btn bg-blue" style="width:100%;border-radius: 8px;" @click="addAddress()">保存</view>
		</view>
		<cityModel :isShow="isShow" :provinceList="provinceList" @hideModel="hideModel"></cityModel>
	</view>
</template>

<script>
	import cityModel from '../../../../../components/city-model.vue';
	import {mapState} from 'vuex';
	export default {
		computed:mapState(['expressItem']),
		data() {
			return {
				isShow:false,
				isTel:true,
				shop:{
					province:'',
					provinceName:'',
					city:'',
					cityName:'',
					district:'',
					districtName:'',
					name:'',
					telephone:'',
					address:'',
					isPay:false
				},
				provinceList:[],
				modelName:''
			}
		},
		components: {
			cityModel
		},
		methods: {
			
			hideModel(e){
				this.isShow=false;
				this.shop.province=e.province;
				this.shop.city=e.city;
				this.shop.district=e.district;
				this.shop.provinceName=e.provinceName;
				this.shop.cityName=e.cityName;
				this.shop.districtName=e.districtName
			},
			getProvinceList(){
				this.$ajax('Districts',{parent:0},res=>{
					this.provinceList=res;
				})
			},
			checkTelEvent(event){
				if(event){
					if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(event.detail.value))){
							uni.showToast({
								title:'电话号码不存在',
								icon:'none'
							})
							
					}
					return
						
				}
			},
			addAddress(){
				if(!this.shop.name  || !this.shop.province || !this.shop.address || !this.shop.telephone){
					uni.showToast({
						title:'请填写完成信息',
						icon:'none'
					})
				}else if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.shop.telephone))){
					uni.showToast({
						title:'电话号码不存在',
						icon:'none'
					})
				}else{
					setTimeout(()=>{
						uni.navigateBack({
							delta:1,
							success:(res)=>{
								this.$fire.fire('address',{
									shoper:this.shop,
									target:this.expressItem.customer
								})
							}
						})
					},600)
				}
			},
			childClick(e) {
			        
					this.shop.province=e.provinceID;
					this.shop.city=e.cityID;
					this.shop.district=e.districtID;
					this.shop.provinceName=e.province;
					this.shop.cityName=e.city;
					this.shop.districtName=e.district
			    },
			chooseCity(){
				this.isShow=true;
				this.getProvinceList()
			}
		},
		onLoad(){
			
			
		}
	}
</script>

<style lang="less" >
	.address-item{
		padding:16px 13px 13px 29px;
	}
</style>
