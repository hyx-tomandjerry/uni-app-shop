<template>
	<view >
		<view v-if="list.length" class="borderTop">
			<block v-for="(item,index) in list" :key="index">
				<work-receipt-item :item="item" :index="index" @itemDetail="itemDetail"></work-receipt-item>
			</block>
			<uni-load-more :contentText="content" :status="loading" :showIcon="true" v-if="list.length>4" ></uni-load-more>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>
		

	</view>
</template>

<script>
	import LxEmpty from '../../../../../lx_components/lx-empty.vue';
	import uniLoadMore from '../../../../../components/common/uni-load-more.vue'
	import workReceiptItem from '../../../../../components/work-receipt/work-receipt-item.vue'
	
	import {WorkReportsByShopApi} from '../../../../../api/index_api.js'
	var canvaArcbar1;
	export default {
        data() {
			return {
				page:1,
				list:[],
				content:{
					contentdown: "上拉加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
			}
		},
		components:{
			LxEmpty,
			uniLoadMore,
			workReceiptItem
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this.page=1;
				this.getList()
			},800)
		},
		async onReachBottom(){
			this.page++;
			let result = await WorkReportsByShopApi(this.page);
			if(result.length== []){
				setTimeout(()=>{
					this.loading='noMore'
				},900)
			}else{
				result.forEach(item=>{
					this.list.concat(item);
				})
				this.loading='loading'
				setTimeout(()=>{
					this.loading='noMore'
				},900)
				
			}


		},
        onLoad(){
			this.page=1;
			this.getList();
        },
		onShow(){
			this.page=1;
			this.getList();
		},
		methods: {
			/*查看任务详情*/
			checkItem(item){
				uni.navigateTo({
					url:"../work-log-item/work-log-item?id=2"
				})
			},
			//查看详情
			itemDetail(event){
				uni.navigateTo({
					url:`../log-detail/log-detail?id=${event.article}&shop=${event.shop}`
				})
			},
			//获取列表数据
			async getList(){
			    let result = await WorkReportsByShopApi(this.page);
			    result.forEach(item=>{
			    	if(item.files && item.files.length){
			    		item.files= item.files.map(it=>it.url)
			    	}
			    })
			    this.list = result;
			},

		}
	}
</script>

<style scoped>
	page{
		background:rgba(247,247,247,1);
	}
</style>
