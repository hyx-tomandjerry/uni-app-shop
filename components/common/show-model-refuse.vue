<template>
	<view class="cu-modal" :class="isShow?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end borderBottom">
				<view class="content ">{{content}}</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<textarea  placeholder="请输入拒绝理由" v-model="reason" />
			<view class="borderTop cu-dialog-b bg-white" >
				<view class="cu-dialog-btn" @tap="operateOrder">确定</view>
			</view>		
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			isShow:Boolean,
			content:{
				type:String,
				default:'拒绝理由'
			}
		},
		data(){
			return{
				reason:''
			}
		},
		methods:{
			hideModal(){
				this.$emit('hideModal')
			},
			operateOrder(){
				if(!this.reason){
					this.$utils.showToast('请输入拒绝理由')
					return;
				}
				this.$emit('refuse',this.reason)
			}
		}
	}
</script>

<style scoped>
	.cu-dialog-b{
		padding:20upx;
		
	}
	.cu-dialog-btn{
		height:40px;
		line-height:40px;
		border-radius: 10upx;
		color:#fff;
		font-size:15px;
		text-align: center;
		background-color: #42B0ED;
	}
	.cu-dialog textarea{
		height:200upx;
		text-align: left;padding:20upx;
	}
</style>
