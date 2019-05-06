<template>
	<view>
		<view >
			<form>
				<view class="text-gray text-sm">
						<view class="cu-form-group ">
							<view class="title text-gray" >选择城市</view>
							<text style="margin-left:100rpx;">{{cityLobal ||''}}</text>
							<text class="cuIcon-right" @click="showMulLinkageThreePicker"></text>
						</view>
						<view class="cu-form-group ">
									<view class="title text-gray" >品牌类别</view>
									<picker @change="PickerChange" :value="index" :range="shoplist">
										<view class="picker">
											{{index>-1?shoplist[index]:'未选择'}}
										</view>
									</picker>
						</view>
						<view class="cu-form-group ">
								<view class="title text-gray" ><text class="text-red" style="margin-right:4rpx;">*</text>门店名称</view>
								<picker @change="PickerChange" :value="index" :range="shoplist">
									<view class="picker">
										{{index>-1?shoplist[index]:'未选择'}}
									</view>
								</picker>
						</view>
						
						<view class="cu-form-group">
							<view class="title text-gray" >门店地址</view>
							<input type="text" name="address">
						</view>
						
						
				</view>
			</form>
			<view  >
				<button type="default"  
				style="width:94%;bottom:37px;position:absolute;background:rgba(66,176,237,1);
border-radius:5px;color:#fff;left:15px;">确定</button>
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
	import cityData from '../../../../static/js/city.data.js'
	import mpvuePicker from '../../../../components/city/mpvue-picker/mpvuePicker.vue'
	import mpvueCityPicker from '../../../../components/city/mpvue-citypicker/mpvueCityPicker.vue'
	export default{
		components:{
			mpvuePicker,
			mpvueCityPicker
		},
		data(){
			return{
				index:-1,
				 mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				cityLobal:'',
				 themeColor: '#007AFF',
				  mode: '',
				  deepLength: 1,
				 pickerValueDefault: [0],
				 pickerValueArray:[],
				  shoplist: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				  titleValue:''

			}
		},
		onLoad(option){
			if(option.name=='record'){
				//录入门店
				this.titleValue='录入门店'
			}else if(option.name=='join'){
				this.titleValue='加入门店'
			}
		},
		methods:{
			 // 三级联动选择
			showMulLinkageThreePicker() {
			    this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				
				this.cityLobal=e.label
			    this.pickerText = JSON.stringify(e)
				
			
			
			},
			 onCancel(e) {
			    
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
			//选中门店
			PickerChange(e){
				console.log(e)
			},
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	.cu-btn{
		border-radius: 30rpx;
		margin: 0 40rpx !important;
	}
	.title{
		font-size:15px;
		font-family:'PingFangSC-Regular';
		font-weight:400;
		color:rgba(42,42,42,1);
	}
</style>
