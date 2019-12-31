<template>
	<view class=" flex justify-start align-center margin-bottom-normal animated slideInLeft" >
		<view class="tag" >
			<text v-if="workflow.id">{{workflow.id}}</text>
			<text v-else>{{Number(index)}}</text>
		</view>
		<view class=" flex-all work-flow-item " >
			<view class="flex justify-between align-center">
				<view>
					<text v-if="workflow.department>0 && workflow.departmentName" >{{workflow.departmentName}}/ </text>
					<text v-if="workflow.acceptRole>0 && workflow.acceptRoleName">{{workflow.acceptRoleName}}/ </text>
					<text v-if="workflow.acceptor && workflow.acceptorName">{{workflow.acceptorName}}</text>
				</view>
				<view><text class="color-blue  font-weight-bold font-size-mini"
					:class="{
						'text-green':workflow.status==approvalStatus.wait,
						'color-red':workflow.status==approvalStatus.rejected,
						'color-purple':workflow.status==approvalStatus.applied,
						'color-blue':workflow.status==approvalStatus.accepted
					}"
				>{{workflow.status | approvalStatusPipe}}</text></view>
			</view>
			<view class="color-regular font-size-mini" v-if="workflow.comment" style="margin:14upx 0;word-break: break-word;">
				<text>{{workflow.status==approvalStatus.rejected?'拒绝理由':'备注'}}</text>
				：<text>{{workflow.comment|| ''}}</text></view>
			<view v-if="workflow.reviewDate " class="flex-1 font-size-mini text-right">{{workflow.reviewDate | formatTime('YMDHMS')}}</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			approvalStatus(){return this.config.approvalStatus}
		},
		props:{
			workflow:Object,
			index:String
		}
	}
</script>

<style scoped>
.tag{
	width:60upx;
	height:52upx;
	background:orange;
	margin-right:15px;
	border-radius:50%;
	line-height:52upx;
	color:#fff;
	text-align: center;
	font-weight: bold;
}
.work-flow-item{
	background-color: #EEEEED;
	padding:5px 7px;
	border-radius:8px;
	margin-right:15px;
			
}
.margin-right-mini{
	margin-right:10upx;
}
</style>
