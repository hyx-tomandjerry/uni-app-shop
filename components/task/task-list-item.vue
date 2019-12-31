<template>
	<view class="task-list-item bg-white position_relative font-size-mini" @click="checkItemDetail" hover-class="bg-color-normal">
		<view class="task-item-title margin-bottom-normal font-size-big  font-weight-bold color-blue">
			{{task.name}}
		</view>
			<normal-detail-item
				leftIntro="执行人 : "
				width='25%'
				:marginBNo="true"
				:leftPadding="true"
				
				:rightContent="task.executorName"
				></normal-detail-item>
				
				<normal-detail-item
					leftIntro="派发人 : "
					width='25%'
					:leftPadding="true"
					:marginBNo="true"
					:rightContent="task.assignerName"
					></normal-detail-item>
				
				<normal-detail-item
					leftIntro="开始时间 : "
					:leftPadding="true"
					:marginBNo="true"
					:rightContent="task.bgndate | formatTime('YMDHMS')"
					></normal-detail-item>
				
				<normal-detail-item
					leftIntro="结束时间 : "
					:leftPadding="true"
					:marginBNo="true"
					:rightContent="task.duedate | formatTime('YMDHMS')"
					></normal-detail-item>
		<view class="item-tag "
				:class="{
						'created':task.status==taskStatus.created,
						'assigned':task.status==taskStatus.assigned,
						'refused':task.status==taskStatus.refused,
						'accepted':task.status==taskStatus.accepted,
						'delayed':task.status==taskStatus.delayed,
						'finished':task.status==taskStatus.finished,
						'rejected':task.status==taskStatus.rejected,
						'receipted':task.status==taskStatus.receipted,
						'aborted':task.status==taskStatus.aborted,
						'canceled':task.status==taskStatus.canceled,
					}"
	
		>{{task.status | taskStatusZnPipe}}</view>
	</view>
</template>

<script>
	import normalDetailItem from '../common/normal-detail-item.vue'
	export default{
		components:{normalDetailItem},
		computed:{
			taskStatus(){return this.config.taskStatus}
		},
		props:{
			task:Object,
			index:Number
		},
		methods:{
			checkItemDetail(){
				this.$emit('checkItemDetail',this.task)
			}
		}
	}
</script>

<style scoped>
	@import url("../../common/css/task.css");
	.task-list-item{
		margin:0 26upx 28upx;
		padding:10upx 20upx;
		border-radius:26upx;
	}
	.item-tag{
		width:180upx;height:66upx;line-height:66upx;text-align: center;
		color:#fff;
		border-radius:34upx 0px 0px 37upx;position:absolute;top:50%;right:0;transform:translateY(-50%);font-size:15px;
	}
</style>
