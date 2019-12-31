<template>
	<view>
		
		<view class="borderTop">
			<template v-if="list.length">
				<block v-for="(item,index) in list" :key="index" >
					<applyListItem :item="item" :index="index" @checkDetail="checkDetail" :type="type"></applyListItem>
				</block>
				<uni-load-more :contentText="content" :showIcon="true" :status="loading" v-if="list.length>8"></uni-load-more>
			</template>
			<template v-else>
				<LxEmpty></LxEmpty>
			</template>

		</view>
	</view>

</template>

<script>
	import {mapState} from 'vuex'
	import uniLoadMore from '../../../../../components/common/uni-load-more.vue'
	import applyListItem from '../../../../../components/work-apply/apply-list-item.vue'
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	import {WorkflowInstancesApi,ApprovalRecordsApi} from '../../../../../api/apply_api.js'
	export default {
		components:{applyListItem,uniLoadMore,LxEmpty},
		computed:mapState(['userInfo']),
		data() {
			return {
				type:'',
				list:[],
				applyType:this.config.approvalMode,
				page:1,
				content:{
					contentdown: "下拉加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more'

			}
		},
		async onReachBottom(){
			this.page++;
			let result =[]
			switch(this.type){
				case 'apply':
					result = await WorkflowInstancesApi(this.userInfo.id,this.page)

				break;
				case 'check':
					result = await ApprovalRecordsApi(this.page);
				break;
			}
			if(result==''){
				setTimeout(()=>{
					this.loading='noMore'
				},900)
			}else{
				result.forEach(item=>{
					switch(Number(item.formType)){
						//报修
						case this.config.approvalMode.repair_service:
							item.img="../../../../../static/img/work/apply/my-apply/repair_icon.png"
						break;
						//通用报销
						case this.config.approvalMode.common:
							item.img="../../../../../static/img/work/apply/my-apply/common_icon.png"
						break;
						//请假报销
						case this.config.approvalMode.absence:
							item.img="../../../../../static/img/work/apply/my-apply/qingjia_icon.png"
						break;
						//报销报销
						case this.config.approvalMode.expense:
							item.img="../../../../../static/img/work/apply/my-apply/baoxiao_icon.png"
						break;
					}
					this.list=this.list.concat(item);
				})
				this.loading='loading';
				setTimeout(()=>{
					this.loading='noMore'
				},900)
						
			}
		},
		onPullDownRefresh(){
			this.getList();
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			checkDetail(item){
				switch(Number(item.formType)){

					// 报修
					case this.config.approvalMode.repair_service:
					uni.navigateTo({
						url: '../../../shop-center/repair-order-item/repair-order-item?id='+item.form+"&type=check"
					});

					break;
					default:
					uni.navigateTo({
						url: '../apply-detail/apply-detail?id='+item.form+'&formType='+item.formType
					});
					break;
				}
			},
			async getList(){
				let result =[]
				switch(this.type){
					case 'apply':
						result = await WorkflowInstancesApi(this.userInfo.id,this.page)
						result.forEach(item=>{
							switch(Number(item.formType)){
								//报修
								case this.config.approvalMode.repair_service:
									item.img="../../../../../static/img/work/apply/my-apply/repair_icon.png"
								break;
								//通用报销
								case this.config.approvalMode.common:
									item.img="../../../../../static/img/work/apply/my-apply/common_icon.png"
								break;
								//请假报销
								case this.config.approvalMode.absence:
									item.img="../../../../../static/img/work/apply/my-apply/qingjia_icon.png"
								break;
								//报销报销
								case this.config.approvalMode.expense:
									item.img="../../../../../static/img/work/apply/my-apply/baoxiao_icon.png"
								break;
							}
						})
						this.list = result;
					break;
					case 'check':
					 result = await ApprovalRecordsApi(this.page);
					 result.forEach(item=>{
					 	switch(Number(item.formType)){
					 		//报修
					 		case this.config.approvalMode.repair_service:
					 			item.img="../../../../../static/img/work/apply/my-apply/repair_icon.png"
					 		break;
					 		//通用报销
					 		case this.config.approvalMode.common:
					 			item.img="../../../../../static/img/work/apply/my-apply/common_icon.png"
					 		break;
					 		//请假报销
					 		case this.config.approvalMode.absence:
					 			item.img="../../../../../static/img/work/apply/my-apply/qingjia_icon.png"
					 		break;
					 		//报销报销
					 		case this.config.approvalMode.expense:
					 			item.img="../../../../../static/img/work/apply/my-apply/baoxiao_icon.png"
					 		break;
					 	}
					 })
					 this.list=result;

					break;
				}
			}
		},
		onLoad(options){
			if(options){
				this.type=options.type;
				this.getList()
				uni.setNavigationBarTitle({
				    title: this.type=='apply'?'我的申请':'我的审批'
				});
			}
		},
		onShow(){
			this.page=1;
			this.getList()
		}
	}
</script>

<style scoped>


</style>
