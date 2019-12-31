<template>
	<view>
		<view class="task-container">
			<template v-if="taskList.length">
				<view class="task-list">
					<block v-for="(task,index) in taskList" :key="index">
						<task-list-item :task="task" :index="index" @checkItemDetail="checkItemDetail"></task-list-item>
					</block>
					<uni-load-more :contentText="content" :showIcon="true" v-if="taskList.length>=5" :status="loading"></uni-load-more>
				</view>
			</template>
			<template v-else>
				<lx-empty />
			</template>
		</view>
	</view>
</template>

<script>
	import taskListItem from '../../../../../components/task/task-list-item.vue'
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	import uniLoadMore from '../../../../../components/common/uni-load-more.vue'
	
	import {ReceivedTasksApi} from '../../../../../api/task.js'
	export default {
		components:{taskListItem,LxEmpty,uniLoadMore},
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
		onPullDownRefresh(){
			this.page=1;
			this.init_list();
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},800)
		},
		async onReachBottom(){
			this.page++;
			this.loading='loading';
			let result =  await ReceivedTasksApi(this.page)
			if(result.length){
				result.forEach(item=>{
					this.taskList=[...this.taskList,item]
				})			
				this.loading = 'loading'
				setTimeout(() => {
					this.loading = 'noMore'
				}, 900)
			}else{
				setTimeout(()=>{
					this.loading='noMore'
				},600)
			}
			
		},
		methods: {
			/*获得任务列表*/
			async init_list(){
				this.taskList= await ReceivedTasksApi(this.page)
			},
			/*查看单个任务详情*/
			checkItemDetail(item){
				uni.navigateTo({
					url:"../task-item-detail/task-item-detail?id="+item.id+"&type=list"
				})
			},
			
			
		},
		onLoad(){
			this.page=1;
			this.init_list()
		},
		onShow(){
			this.page=1;
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
