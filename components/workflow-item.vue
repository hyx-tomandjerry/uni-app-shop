<template>
	<view class=" flex justify-start align-center margin-bottom-normal animated slideInLeft" >
		<view class="tag" >
			<text v-if="workflow.id">{{workflow.id}}</text>
			<text v-else>{{Number(index)}}</text>
		</view>
		<view class=" flex-1 work-flow-item" >
			<view class="flex  justify-between">
				<view class="flex-1">
						<text v-if="workflow.department>0 && workflow.departmentName" class="margin-right-mini">{{workflow.departmentName}} </text>
						<text v-if="workflow.acceptRole>0 && workflow.acceptRoleName" class="margin-right-mini">{{workflow.acceptRoleName}} </text>
						<text v-if="workflow.acceptor && workflow.acceptorName">{{workflow.acceptorName}}</text>
				</view>
				<view v-if="workflow.reviewDate " class="flex-1 " style="font-size:22upx;">{{workflow.reviewDate | formatTime('YMDHMS')}}</view>
			</view>
			<view style="margin-top:5px;margin-bottom:5px;"><text class="color-blue">{{workflow.status | approvalStatusPipe}}</text></view>
			<view class="color-regular" v-if="workflow.comment">备注：{{workflow.comment|| ''}}</view>
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
			workflow:Object,
			index:String
		}
	}
</script>

<style scoped>
.tag{
	width:30px;
	height:30px;
	background:orange;
	margin-right:15px;
	border-radius:50%;
	line-height:30px;
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
