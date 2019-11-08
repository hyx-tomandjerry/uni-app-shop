<template>
	<view>
		<view class="cu-modal" :class="isShow?'show':''">
			<view class="cu-dialog ">
				<view class="cu-bar bg-white justify-end borderBottom">
					<view class="content font-size-big font-weight-normal color-normal">
						<slot name="title">提示</slot>
					</view>
				</view>
				<view class="padding-xl font-size-big font-weight-normal color-normal bg-white borderBottom" style="padding:25px 20upx 27px;">
					<slot name="content"></slot>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action flex justify-around" style="width:100%;">
						<view style="width:50%;border-right:1px solid #EEEEED;padding:12px;"  @tap="hideModal" 
						:class="{'text-red':isRed}"
						>{{cancel_btn}}</view>
						<view style="width:50%;padding:12px;"  @tap="confirmModel" class="text-blue">{{save_btn}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			isShow:Boolean,
			save_btn:{
				type:String,
				default:'确定'
			},
			cancel_btn:{
				type:String,
				default:'取消'
			},
			isRed:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			hideModal(){
				// this.isShow=false;
				this.$emit('hideModel')
			},
			confirmModel(){
				// this.isShow=false;
				this.$emit('confirmDel')
			}
		}
	}
</script>

<style>
	
</style>
