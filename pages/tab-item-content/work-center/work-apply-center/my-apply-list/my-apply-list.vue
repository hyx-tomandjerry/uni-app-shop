<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><view class="cuIcon-back"  @tap="goBack()"></view></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >{{type=='apply'?'我的申请':'我的审核'}}</view></block>
		</cu-custom>
		<view class="borderTop">
			
			<template v-if="list.length">
				<block v-for="(item,index) in list" :key="index" >
					<applyListItem :item="item" :index="index" @checkDetail="checkDetail" :type="type"></applyListItem>
				</block>
				<uni-load-more :contentText="content" :showIcon="true" :status="loading"></uni-load-more>
			</template>
			<template v-else>
				<LxEmpty></LxEmpty>
			</template>
			
		</view>
	</view>
	
</template>

<script>
	import {mapState} from 'vuex'
	import applyListItem from '../../../../../components/apply-list-item.vue'
	import uniLoadMore from '../../../../../components/uni-load-more.vue'
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	export default {
		components:{applyListItem,uniLoadMore,LxEmpty},
		computed:mapState(['applyStatusZn','userInfo','approvalMode']),
		data() {
			return {
				type:'',
				list:[],
				applyType:this.$store.state.approvalMode,
				page:1,
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more'
				
			}
		},
		onReachBottom(){
			this.page++;
			switch(this.type){
				case 'apply':
				this.$ajax('WorkflowInstances',{
					type:-1,
					status:0,
					offset:this.$utils.getOffset(this.page),
					applier:this.userInfo.id
				},res=>{
					console.log(res)
					if(res==''){
						setTimeout(()=>{
							this.loading='noMore'
						},900)
					}else{
						res.forEach(item=>{
							switch(Number(item.formType)){
								//报修
								case this.approvalMode.repair_service:
									item.img="../../../../../static/img/work/apply/my-apply/repair_icon.png"		
								break;
								//通用报销
								case this.approvalMode.common:
									item.img="../../../../../static/img/work/apply/my-apply/common_icon.png"
								break;
								//请假报销
								case this.approvalMode.absence:
									item.img="../../../../../static/img/work/apply/my-apply/qingjia_icon.png"
								break;	
								//报销报销
								case this.approvalMode.expense:
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
					
				})
				break;
				case 'check':
				this.$ajax('ApprovalRecords',{offset:this.$utils.getOffset(this.page)},res=>{
					if(res==''){
						setTimeout(()=>{
							this.loading='noMore'
						},900)
					}else{
						res.forEach(item=>{
							switch(Number(item.formType)){
								//报修
								case this.approvalMode.repair_service:
									item.img="../../../../../static/img/work/apply/my-apply/repair_icon.png"		
								break;
								//通用报销
								case this.approvalMode.common:
									item.img="../../../../../static/img/work/apply/my-apply/common_icon.png"
								break;
								//请假报销
								case this.approvalMode.absence:
									item.img="../../../../../static/img/work/apply/my-apply/qingjia_icon.png"
								break;	
								//报销报销
								case this.approvalMode.expense:
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
				})
				break;
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
					case this.approvalMode.repair_service:
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
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			getList(){
				switch(this.type){
					case 'apply':
					this.$ajax('WorkflowInstances',{
						type:-1,
						status:0,
						offset:this.$utils.getOffset(this.page),
						applier:this.userInfo.id
					},res=>{
						if(res){
							res.forEach(item=>{
								switch(Number(item.formType)){
									//报修
									case this.approvalMode.repair_service:
										item.img="../../../../../static/img/work/apply/my-apply/repair_icon.png"		
									break;
									//通用报销
									case this.approvalMode.common:
										item.img="../../../../../static/img/work/apply/my-apply/common_icon.png"
									break;
									//请假报销
									case this.approvalMode.absence:
										item.img="../../../../../static/img/work/apply/my-apply/qingjia_icon.png"
									break;	
									//报销报销
									case this.approvalMode.expense:
										item.img="../../../../../static/img/work/apply/my-apply/baoxiao_icon.png"
									break;
								}
							})
						
							this.list=res;
						}
						
					})
					break;
					case 'check':
					this.$ajax('ApprovalRecords',{offset:this.$utils.getOffset(this.page)},res=>{
						if(res){
							res.forEach(item=>{
								switch(Number(item.formType)){
									//报修
									case this.approvalMode.repair_service:
										item.img="../../../../../static/img/work/apply/my-apply/repair_icon.png"		
									break;
									//通用报销
									case this.approvalMode.common:
										item.img="../../../../../static/img/work/apply/my-apply/common_icon.png"
									break;
									//请假报销
									case this.approvalMode.absence:
										item.img="../../../../../static/img/work/apply/my-apply/qingjia_icon.png"
									break;	
									//报销报销
									case this.approvalMode.expense:
										item.img="../../../../../static/img/work/apply/my-apply/baoxiao_icon.png"
									break;
								}
							})
						
							this.list=res;
						}
					})
					break;
				}
			}
		},
		onLoad(options){
			if(options){
				this.type=options.type;
				this.getList()
				// uni.setNavigationBarTitle({
				//     title: this.type=='apply'?'我的申请':'我的审核'
				// });
			}
		},
		onShow(){
			this.getList()
		}
	}
</script>

<style scoped>
	
	
</style>
