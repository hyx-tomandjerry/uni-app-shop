<template>
	<view>
		<cu-custom  :isBack="true" bgColor="bg-white" >
			<block slot="left"><text class="cuIcon-back"  @click="goBack()"></text></block>
			<block slot="content" ><text class="title">门店筛选</text></block>
		</cu-custom>
		<view class="search-content">
			<view class="cu-form-group">
				<view class="title text-gray" >选择城市</view>
				<text style="margin-left:100rpx;">{{cityLobal ||''}}</text>
				<text class="cuIcon-right" @click="showMulLinkageThreePicker()"></text>
			</view>
			<view class="cu-form-group ">
				<view class="title text-gray" >品牌类别</view>
				<picker  :value="index" :range="brandNameList" @change="PickerChange($event)">
					<view class="picker">
						{{index>-1?brandNameList[index]:'未选择'}}
					</view>
				</picker>
			</view>
		</view>
		<mpvue-picker :themeColor="themeColor"
		ref="mpvuePicker" :mode="mode"
		 :deepLength="deepLength"
		 :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm"
		  @onCancel="onCancel"
		  :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	// import cityData from '../../../../static/js/city.data.js'
	// import mpvuePicker from '../../../../components/city/mpvue-picker/mpvuePicker.vue'
	// import mpvueCityPicker from '../../../../components/city/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		data() {
			return {
				index:-1,
				 mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				cityLobal:'',
				 themeColor: '#007AFF',
				  mode: '',
				  deepLength: 1,
				 pickerValueDefault: [0],
				 pickerValueArray:[],
				  provinceID:0,
				  cityID:0,
				  districtID:0,
				  brandList:[],
				  brandNameList:[],
				  brandID:0

			}
		},
		components:{
			// mpvuePicker,
			// mpvueCityPicker
		},
		methods: {
			provinceChange(event){
				conosle.log('111')
				console.log(event)
			},
			//获得省份
			getProvince(){
				var _this=this;
				uni.request({
					url:this.$store.state.url+'Districts',
					data:{
						// owner:18,
						owner:this.$store.state.userInfo.owner,
						userId:this.$store.state.userInfo.id,
						parent:0
					},
					success: (res) => {
						this.provinceData=res.data.data;

					}
				})
			},
			bingChange(event){

			},
			 // 三级联动选择
			showMulLinkageThreePicker() {
			    this.$refs.mpvueCityPicker.show()
			},

			PickerChange(event){
				this.index = event.detail.value;
				this.brandList.forEach(item=>{
					if(item.value==this.brandNameList[this.index]){
						this.brandID=item.id;
					}
				})
			},
			onConfirm(e) {
				var _this=this;
				this.cityLobal=e.label
			    this.pickerText = JSON.stringify(e)
				var array=this.cityLobal.split('-')
				var provinceItem=array[0];
				var cityItem=array[1];
				var district=array[2];
				this.provinceData.forEach(item=>{
					if(item.name==provinceItem){
						this.provinceID=item.id;
						uni.request({
							url:this.$store.state.url+'Districts',
							data:{
								// owner:18,
                                owner:this.$store.state.userInfo.owner,
                                userId:this.$store.state.userInfo.id,
								parent:item.id
							},
							success: (res1) => {
								res1.data.data.forEach(citys=>{
									if(citys.name==cityItem){
										_this.cityID=citys.id;
										uni.request({
											url:this.$store.state.url+'Districts',
											data:{
												// owner:18,
                                                owner:this.$store.state.userInfo.owner,
                                                userId:this.$store.state.userInfo.id,
												parent:citys.id
											},
											success: (res2) => {
												res2.data.data.forEach(districts=>{
													if(districts.name==district){
														_this.districtID=districts.id;
													}
												})
											}
										})
									}
								})
							}
						})
					}
				})


			},
			 onCancel(e) {
			    console.log(e)
			},
			onBackPress() {
			  if (this.$refs.mpvuePicker.showPicker) {
			    this.$refs.mpvuePicker.pickerCancel();
			    return true;
			  }
			  if (this.$refs.mpvueCityPicker.showPicker) {
			    this.$refs.mpvueCityPicker.pickerCancel();
			    return true;
			  }
			},
			onUnload() {
			    if (this.$refs.mpvuePicker.showPicker) {
			        this.$refs.mpvuePicker.pickerCancel()
			    }
			    if (this.$refs.mpvueCityPicker.showPicker) {
			        this.$refs.mpvueCityPicker.pickerCancel()
			    }
			},
			//获得品牌类别
			getBrandClass(){
				var _this=this;
				uni.request({
					url:this.$store.state.url+'Constants',
					data:{
						// owner:8,
                        owner:this.$store.state.userInfo.owner,
                        userId:this.$store.state.userInfo.id,
						type:this.$store.state.constants.brand_type,
						objects:-1,
						parent:-1
					},
					success: (res) => {
						var arr=res.data.data;
						for(var index  in arr){
							_this.brandList.push({
								id:index,
								value:arr[index]
							});
							_this.brandNameList.push(arr[index])
						}
						console.log(_this.brandNameList)
					}
				})
			},
			goBack(){
				uni.navigateTo({
					url:'../near-shop-list/near-shop-list?brandID='+this.brandID+"&province="+this.provinceID+"&city="+this.cityID+"&district="+this.districtID
				})
			}

		},
		onLoad(){
			this.getProvince();
			this.getBrandClass();
		}
	}
</script>

<style lang="less">
	.search-content{
		padding-top:41px;
	}
</style>
