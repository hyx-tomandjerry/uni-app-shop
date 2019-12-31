<template>
	<view class="bg-white common-content position_relative" 
		:class="{'comment-content':isLogin,'design-content':isDesign}"
	:style="{height:screenHeight+'px'}">
		<!-- 头部start -->
		<view class="head-container" >
			<view class="head-title">{{title}}</view>
			<slot name="head-extra">
				
			</slot>
			
		</view>
		<!-- 头部end -->
		<!-- body start -->
		<slot name="content"></slot>
		<!-- body end -->
		<!-- proto start -->
		<view 
			@tap="toPro"
			class="bottom-content text-center font-size-mini color-regular position_absolute"
			v-show="tabbar">
			登录/注册即表示同意<text class="color-blue">《乐象工程管家服务协议》</text>
		</view>
		<!-- proto end -->
	</view>
</template>

<script>
	export default{
		props:{
			title:'',
			tabbar:Boolean,
			isDesign:false,
			isLogin:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return{
				screenHeight:500,
			}
		},
		created(){
			uni.getSystemInfo({
				success: (res) => {
					this.screenHeight=res.windowHeight;
				}
			})
		},
		methods:{
			toPro(){
				this.$emit('toPro')
			}
		}
	}
</script>

<style scoped>
	.common-content{
		padding:150upx 40upx 40upx;
	}
	.design-content{
		padding:100upx 40upx 40upx;
	}
	.head-container{
		margin-bottom:100upx;
	}
	.head-title{
		font-size:30px;
		font-weight:600;
		color:rgba(42,42,42,1);
	}
	
	.bottom-content{
		bottom:40upx;
		left:30upx;
		right:30upx;
	}
</style>
