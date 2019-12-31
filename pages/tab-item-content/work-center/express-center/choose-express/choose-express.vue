<template>
	<view class="borderTop position_relative">
		<view >
			<view class="save-price-container  bg-white">
				<view class="text-center">
					<view class="font-size-big color-normal" >物品声明价值</view>
					<view class="input-container">
						<input type="number" placeholder="请输入物品实际价格（元）"
						:class="{
							'font-weight-bold':price,
							'font-size-supper':price,
							'color-blue':price
						}"
						 class="inputStyle" v-model="price">
					</view>
				</view>

				<view class="intro-container">
					<view class="font-size-normal marginB color-regular">温馨提示：:</view>
					<view class="intro-item color-regular font-size-normal">
						<view class="marginB">1.请按物品实际价值来填写物品声明价值；</view>
						<view class="marginB">
							2.运送过程中出现丢失或破损，会按物品声明的实际价值进行一定比例赔付。<strong class="color-red">保价不超过2万元（含），超额保价部分无法理赔；</strong>
						</view>
						<view class="marginB">
							3.客户寄递货物时向我司声明货物价值，并支付相应费用。若配送过程中由于京东责任造成损失的，京东会按照声明价值和损失比例进行赔偿；
						</view>
						<view class="marginB">
							4.保费费率的计算规则：单票声明价值500元（含）以下：1元/票；500-1000元（含）以下：2元/票；1000元以上：5%。（价格进位规则：四舍五入取整），保价上限2万。
						</view>
					</view>
				</view>
			</view>
		</view>
		<common-btn-one
					type="primary" 
					content="确定"
					@operateBtn="savePrice" :isPos="true"></common-btn-one>
	</view>
</template>
<script>
	import commonBtnOne from '../../../../../components/common/common-btn-one.vue'
	export default{
		components:{commonBtnOne},
		data(){
			return{
				price:'',
				type:''
			}
		},
		methods:{
			savePrice(){
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						this.$fire.fire('price',this.price)
					}
				})
			}
		},
		onLoad(options){
			if(options){
				this.type=options.type;
			}
		},
	}
</script>
<style scoped>
		page{
			background:rgba(247,247,247,1);
		}
	.save-price-container{

		padding:46upx 32upx 78upx;
		

	}
	.marginB{
			margin-bottom:20upx;
		}
	.input-container{
		padding:28upx 0 60upx;
		
	}
	.inputStyle{
		width:100%;
		background:rgba(245,245,245,1);
		border-radius:44upx;
		line-height:108upx;
		height:108upx
		
	}
</style>