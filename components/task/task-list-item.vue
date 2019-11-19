<template>
	<view class="task-list-item bg-white position_relative font-size-mini" @click="checkItemDetail" hover-class="bg-color-normal">
		<view class="task-item-title margin-bottom-normal font-size-big  font-weight-bold color-blue">
			{{task.name}}
		</view>
			<common-item :content="task.executorName" intro="执行人 : " :bottomLitterStyle="true"></common-item>
			<common-item :content="task.assignerName" intro="派发人 : "  :bottomLitterStyle="true"></common-item>
			<common-item :content="task.bgndate | formatTime('YMD')" intro="开始时间 : "  :bottomLitterStyle="true"></common-item>
			<common-item :content="task.duedate | formatTime('YMD')" intro="截止时间 : " :bottomLitterStyle="true"></common-item>
		<view class="item-tag "
				:class="{
					'waiting':task.status==taskStatus.waiting,
					'noReceive':task.status==taskStatus.unReceive,
					'received':task.status==taskStatus.received,
					'checkpass':task.status==taskStatus.pass,
					'checknopass':task.status==taskStatus.noPass,
					'rejected':task.status==taskStatus.rejected,
					'overdue':task.status==taskStatus.overdue,
	
	
					}"
	
		>{{task.status | taskStatusZnPipe}}</view>
	</view>
</template>

<script>
	import commonItem from "../common-item.vue"
	import {mapState} from 'vuex'
	export default{
		components:{commonItem},
		computed:mapState(['taskStatus']),
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
		border-radius:34upx 0px 0px 37upx;position:absolute;top:50%;right:0;transform:translateY(-50%);font-size:15px;
	}
</style>
