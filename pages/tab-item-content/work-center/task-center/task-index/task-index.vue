<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><view class="cuIcon-back"  @click="goBack()"></view></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >任务管理</view></block>
		</cu-custom>
		<view class="task-container">
			<view class="task-list">
				<block v-for="(task,index) in taskList" :key="index">
					<task-list-item :task="task" :index="index" @checkItemDetail="checkItemDetail"></task-list-item>
				</block>
				<uni-load-more :contentText="content" :showIcon="true" v-if="taskList.length>5" :status="loading"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import commonItem from "../../../../../components/common-item.vue"
	import taskListItem from '../../../../../components/task/task-list-item.vue'
	import {mapState} from 'vuex'
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	import uniLoadMore from '../../../../../components/uni-load-more.vue'
	export default {
		computed:mapState(['taskStatus']),
		components:{commonItem,taskListItem,LxEmpty,uniLoadMore},
		data() {
			return {
				taskList:[],
				page:1,
				content:{
					contentdown: "下拉加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
			}
		},
		methods: {
			/*获得任务列表*/
			init_list(){
				this.$ajax('ReceivedTasks',{
					status:0,
					offset:this.$utils.getOffset(this.page)
				},res=>{
					if(res){this.taskList=res;}
				})
			},
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			/*查看单个任务详情*/
			checkItemDetail(item){
				uni.navigateTo({
					url:"../task-item-detail/task-item-detail?id="+item.id+'&status='+item.status
				})
			},
			
			
		},
		onLoad(){
			this.init_list()
		}
	}
</script>

<style scoped>
	page{
		background-color: #F7F7F7;
	}
	.task-list{
		margin-top: 30upx;
		
	}
</style>
