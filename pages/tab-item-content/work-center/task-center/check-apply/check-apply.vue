<template>
	<view class="borderTop position_relative">
		<view class="input-container margin-bottom-normal bg-white">
			<textarea value="" placeholder="请输入完工说明......" v-model="inputValue" :class="{
				'color-normal':inputValue,
				'color-regular':!inputValue
			}"/>
		</view>
		<view class="img-content margin-top-13">
		    <view class="cu-bar bg-white margin-top">
		        <view class="action color-normal font-size-small font-weight-normal">
		            上传附件
		        </view>
		        <view class="action">
		
		        </view>
		    </view>
			<uploadImg  :xType="$store.state.doc.workReportShop" @success="success($event)" :src="'../../../../../static/img/work/camera.png'"></uploadImg>
		</view>
		
		<view class="btn-container">
			申请验收
		</view>
	</view>
</template>

<script>
	import uploadImg from '../../../../../components/upload-img.vue'
	export default {
		data() {
			return {
				inputValue:''
			}
		},
		methods: {
			
		},
		components:{uploadImg}
	}
</script>

<style lang="less">
	.input-container{
		
	}
	uni-textarea{
		width:100%;
		padding:12px 14px;
	}
	.img-content {
	    background: #fff;
		max-height:200px;
	}
	.btn-container{
		position:fixed;
		bottom:14px;
		width:95%;
		margin:14px;
		height:40px;
		line-height:40px;
		font-size:16px;
		background:rgba(66,176,237,1);
		border-radius:5px;
		color:#fff;
		text-align: center;
	}
</style>
