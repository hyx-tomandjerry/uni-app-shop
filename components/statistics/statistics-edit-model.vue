<template>
	<view class="cu-modal" :class="isShow?'show':''" style="z-index:1000 !important">
		<view class="cu-dialog">
			<view class=" bg-white justify-end" >
				<view class="content text-left font-size-big">
					目标金额: <text class="color-blue font-weight-bold font-size-big">{{monthTabCur.mon || monthTabCur.num | numStyle}}
				</text></view>
			</view>
	
			<view class=" bg-white borderBottom " >
				<view class="flex justify-between" style="padding: 3px 23px 14px 21px;">
					<view class="flex justify-start align-center">
						<view style="width:30%;font-size:16px;color:#2A2A2A">金额 <text class="font-size-big color-blue font-weight-bold">￥</text></view>
						<input type="number" placeholder="请输入金额" style="text-align:left;margin-left:10upx;"
							   :class="{
							   	'color-blue':num,
							   	'color-regular':!num,
							   	'font-weight-bold':num
							   	}" v-model="num">
					</view>
					<image src="../../static/icon/icon-bianji.png" style="width:16px;height:19px;"></image>
				</view>
			</view>
			<view class="cu-bar bg-white justify-end">
				<view class="action flex justify-around" style="width:100%;">
					<view style="flex:1" @tap="hideModal">取消</view>
					<view style="flex:1" @tap="setShopAim" class="color-blue">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num:'',
				
			}
		},
		props:{
			isShow:Boolean,//是否显示
			monthTabCur:{
				type:Object,
				
			},//选择的月份
			
		},
		
		methods:{
			hideModal(){
				this.$emit('hideModal')
				setTimeout(()=>{
					this.num=""
				},1000)
			},
			setShopAim(){
				this.$emit('setShopAim',this.num);
				setTimeout(()=>{
					this.num=""
				},1000)
			}
		}
	}
</script>

<style scoped>
	.cu-dialog{
		min-width: 540upx;
	}
	.content{
		padding:40upx;
	}
</style>
