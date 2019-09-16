<template>
	<view class="borderTop position_relative" :style="{height:windowHeight+'px'}">
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
					<view class="font-size-small " style="margin-bottom:5px;color:#000;">温习提示:</view>
					<view class="intro-item color-regular font-size-small">
						<view v-if="type=='logistics'">
							<view>
								请按物品实际价值保价，足额支付保费后生效。保价不超过100万元（含）。超额保价部分无法理赔
							</view>
						</view>
						<view v-else>
							<view style="margin-bottom:5px;">1.请按物品实际价值来填写物品声明价值；</view>
							<view style="margin-bottom:5px;">
								2.运送过程中出现丢失火破损，会按物品声明的实际价值进行一定 比例赔付。保价不超过2万元（含），超额保价部分无法理赔；
							</view>
							<view style="margin-bottom:5px;">
								3.客户寄递货物时像我司声明货物价值，并支付相应费用。若配送 过程中由于京东责任造成损失的，京东会按照声明价值和损失比例 进行赔偿；
							</view>
							<view style="margin-bottom:5px;">
								4.保费费率的计算规则：单票声明价值500元（含）以下：1元/票 ；500-1000元（含）以下：2元/票；1000元以上：5%。（价格 进位规则：四舍五入取整），保价上限2万。
							</view>
						</view>


					</view>
				</view>
			</view>
		</view>
		<view class="bg-white submit-area position_absolute" style="bottom:0;width:100%">
			<view class="submit-btn" @click="savePrice()">确定</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				price:'',
				type:'',
				windowHeight:''
			}
		},
		components:{

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
			uni.getSystemInfo({
				success:res=>{
					this.windowHeight=res.windowHeight;
				}
			})
		},
	}
</script>
<style lang="less">
		page{
			background:rgba(247,247,247,1);
		}
	.save-price-container{

		padding:23px 16px 39px;
		.input-container{
			margin-bottom:30px;
			margin-top:14px;
			.inputStyle{
				width:100%;
				background:rgba(245,245,245,1);
				border-radius:22px;
				line-height:54px;
				height:54px;
				padding-top:10px;
				
			}
		}

	}
	.submit-area{
		padding:10px 15px;
		.submit-btn{
			width:100%;
			background:rgba(66,176,237,1);
			border-radius:5px;
			padding-top:8px;
			padding-bottom:8px;
			color:white;
			text-align: center;
			font-size:17px;
		}
	}
</style>