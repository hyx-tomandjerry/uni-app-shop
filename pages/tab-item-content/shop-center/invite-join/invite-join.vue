<!-- <template>
	<view>
		<form >
			<view class="cu-form-group flex justify-between">
				<view class="text-gray"><text class="cuIcon-shop text-blue" style="margin-right:20rpx;"></text>门店名称</view>
				<view><text class="text-black">{{shop.shopName}}</text></view>
			</view>

			<view class="cu-form-group">
				<view class="text-gray"><text class="cuIcon-people text-blue" style="margin-right:20rpx;"></text>姓名</view>
				<input placeholder="姓名" name="input"></input>
			</view>

			<view class="cu-form-group">
				<view class="text-gray"><text class="cuIcon-phone text-blue" style="margin-right:20rpx;"></text>联系方式</view>
				<input placeholder="联系方式" name="telephone"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>

			<view class="cu-form-group">
				<view class="text-gray"><text class="cuIcon-male text-blue" style="margin-right:20rpx;"></text>性别</view>
				<picker @change="PickerChange" :value="index" :range="sex">
					<view class="picker">
						<text style="font-size:24rpx;" class="text-gray">{{index>-1?picker[index]:'性别'}}</text>
					</view>
				</picker>
			</view>

			<view class="text-center" style="margin-top:40rpx;">
				<button class="cu-btn block bg-green margin-tb-sm lg">邀请加入</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				index: -1,
				sex: ['男', '女', '保密'],
				shop:{
                    shopName:'',
					shopID:''
				}
			}
		},
		methods:{
			PickerChange(e) {
				this.index = e.detail.value
			},
		},
		onLoad(option){
		    this.shop.shopName=option.shopName
		}
	}
</script>

<style lang="less">
	.cu-form-group uni-input{
		text-align: right;
		font-size:24rpx;
	}
	.cu-btn{
		border-radius: 30rpx;
		margin: 0 40rpx !important;
	}
</style>
 -->
 <template>
 	<view>
 		<form >
			<view class="cu-form-group">
				<view class="title"><image src="../../../../static/icon/shop-list/icon-dianzhang@2x.png" style="width:15px;height:15px;margin-right:15px;"></image></view>
				<input type="text" v-model="designer.name" placeholder="请输入店员姓名">
			</view>
			
			<view class="cu-form-group position_relative">
				<view class="text-gray"><text class="cuIcon-mobile text-gray" style="font-size:22px;margin-right:15px;"></text></view>
				<input placeholder="请输入手机号" v-model="designer.telephone"  type="phone" @blur="checkTelEvent(designer.telephone)" />
			</view>
		</form>
 	</view>
 </template>
 <script>
 	export default{
 		data(){
 			return{
				designer:{
					name:'',
					telephone:''
				},
				isShow:false
 			}
 		},
 		components:{
 			
 		},
 		onLoad(){
 			
 		},
		methods:{
			hideModal(e) {
				this.modalName = null
			},
			//验证电话号码
			checkTelEvent(event){
				console.log(event)
				if(event){
					if(!(/^1[34578]\d{9}$/.test(event))){ 
						
							uni.showToast({
								title:'电话号码不存在',
								icon:'none'
							})
						}
					}
				},
		}
 	}
 </script>
 <style>
 		
 </style>