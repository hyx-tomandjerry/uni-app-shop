<template>
	<view class="borderTop">
		<common-flex 
				leftContent="运单号" 
				:rightContent="complaintItem.seq" 
				:isRed="false" :isLeftCb="true"></common-flex>
		<common-flex leftContent="投诉人" :rightContent="complaintItem.creatorName" :isRed="false" :isLeftCb="true"></common-flex>
		<common-flex leftContent="电话号码" :rightContent="complaintItem.creatorMobile || ''" :isRed="false" :isLeftCb="true"></common-flex>
		<common-flex leftContent="投诉时间" :rightContent="complaintItem.applydate | formatTime('YMDHMS')" :isRed="false" :isLeftCb="true"></common-flex>
		<view class="cu-form-group font-size-normal color-regular">
			<view>投诉状态</view>
			<view 
				:class="{
					'color-red':complaintItem.status==complaintStatus.todo,
					'color-blue':complaintItem.status==complaintStatus.down,
					'color-purple':complaintItem.status==complaintStatus.doing,
					}"
			>{{complaintItem.status | complaintStatusZnPipe}}</view>
		</view>
		<view class="margin-top-13 bg-white ">
			<common-flex leftContent="投诉类型" 
			:isColorBlue="true"
			:rightContent="complaintItem.reason || ''" :isRed="false" :isLeftCb="true"></common-flex>
			<view class="item-reason">
				<view class="item-reason-item">
					{{complaintItem.summary || ''}}
				</view>
			</view>
		</view>
		
		<view class="check flex justify-end color-blue">
			<view @click="checkItem"> <text class="cuIcon-info font-size-litter"></text>查看快递详情</view>
		</view>
		<common-btn-one :isPos="true" content="标记解决" type="primary"></common-btn-one>
	</view>
</template>

<script>
	import commonFlex from '../../../../../../components/common/common-flex.vue'
	import commonBtnOne from '../../../../../../components/common/common-btn-one.vue'

	import {ComplaintApi} from '../../../../../../api/express_api.js'
	export default {
		components:{commonFlex,commonBtnOne},
		computed:{
			complaintStatus(){return this.config.complaintStatus}
		},
		data() {
			return {
				complaintItem:{}
			}
		},
		methods: {
			async getComplaintItem(id){
				this.complaintItem = await ComplaintApi(id)
			},
			checkItem(){
				uni.navigateTo({
					url:"../../express-item/express-item?id="+this.complaintItem.target
				})
			}
		},
		onLoad(options){
			if(options.id){
				this.getComplaintItem(options.id)
			}
		}
	}
</script>

<style>
	
	.item-reason{
		padding:30upx 40upx;
	}
	.item-reason-item{
		min-height:180upx;
		border-radius: 10upx;
		background:#F7F7F7;
		padding:16upx 20upx;
	}
	.check{
		margin:40upx 0 100upx;
		padding:30upx;
	}
</style>
