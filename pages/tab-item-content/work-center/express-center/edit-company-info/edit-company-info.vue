<template>
	<view class="borderTop">
		<view class="cu-form-group">
			<view class="title">{{formType=='company'?'公司名称':'仓库名称'}}</view>
			<view>{{itemInfo.name}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">姓名</view>
			<input class="text-right" v-model="editName"></input>			
		</view>
		<view class="cu-form-group">
			<view class="title">联系方式</view>
			<input class="text-right" v-model="editTel"></input>			
		</view>
		<view class="cu-form-group">
			<view class="title flex-litter">地址</view>
			<view class="text-ellipse">{{itemInfo.provinceName || ''}}{{itemInfo.cityName || ''}}{{itemInfo.districtName || ''}}{{itemInfo.address || ''}}</view>	
		</view>
		<common-btn-one
			type="primary"
			content="修改"
			@operateBtn="editItem" :isPos="true"></common-btn-one>				
	</view>
</template>

<script>
	import commonBtnOne from '../../../../../components/common/common-btn-one.vue'
	
	import {ExpressAddressesApi,WarehousesApi} from '../../../../../api/express_api.js'
	export default {
		components:{commonBtnOne},
		computed:{
			editName:{
				get(){
					return this.formType=='company'?this.itemInfo.contactor:this.itemInfo.managerName
				},
				set(val){
					switch(this.formType){
						case 'company':
						this.itemInfo.contactor=val;
						break;
						case 'store':
						this.itemInfo.managerName=val;
						break;
					}
				}
				
			},
			editTel:{
				get(){
					return this.formType=='company'?this.itemInfo.mobile:this.itemInfo.telephone
				},
				set(val){
					switch(this.formType){
						case 'company':
						this.itemInfo.mobile=val;
						break;
						case 'store':
						this.itemInfo.telephone=val;
						break;
					}
				}
				
			}
		},
		data() {
			return {
				itemInfo:{},
				formType:''
			}
		},
		methods: {
			editItem(){
				uni.navigateBack({
					delta:2,
					success:(res)=>{
						this.$fire.fire('supplierShop',{
							shop:{
								name:this.itemInfo.name,
								id:this.itemInfo.id,
								provinceName:this.itemInfo.provinceName,
								cityName:this.itemInfo.cityName,
								districtName:this.itemInfo.districtName
							},
							man:{
								name:this.formType=='company'?this.itemInfo.contactor:this.itemInfo.managerName,
								mobile:this.formType=='company'?this.itemInfo.mobile:this.itemInfo.telephone
							},
							target:this.formType=='company'?this.config.expressItem.company:this.config.expressItem.store,
						})
					}
				})
			},
			async getItemInfo(id){
				let result ={}
				switch(this.formType){
					case 'company':
						result =await ExpressAddressesApi();
						this.itemInfo=result.find(item=>item.id==id);
					break;
					case 'store':
						result = await WarehousesApi();
						this.itemInfo=result.find(item=>item.id==id);
					break;
				}
				

			}
		},
		onLoad(options){
			if(options){
				this.formType=options.type;
				this.getItemInfo(options.id)
				uni.setNavigationBarTitle({
					title:this.formType=='company'?'公司信息':'仓库信息'
				})			
							
			}
		}
	}
</script>

<style>

</style>
