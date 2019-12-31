<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >消息</view></block>
		</cu-custom>
		<common-tab-nav 
					:isShowBorder="false"
					:tabList="titleList" 
					:TabCur="TabCur" 
					@tabSelect="tabSelect"></common-tab-nav>
		<view class="notice-container">
			<view>
				<view v-if="todoList.length">
					<block v-for="(item,index) in todoList" :key="index">
						<noticeItem :item="item" :index="index" :TabCur="TabCur" @checkItem="checkMessageItem"></noticeItem>
					</block>
					<uni-load-more :contentText="content"
								   v-if="todoList.length>=5"
								   :showIcon="true" :status="loading" ></uni-load-more>
				</view>
				<view v-else>
					<lx-empty></lx-empty>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import LxEmpty from "../../../../lx_components/lx-empty.vue";
	import uniLoadMore from "../../../../components/common/uni-load-more.vue"
	import noticeItem from '../../../../components/notice/notice-item.vue'
	import commonTabNav from '../../../../components/common/common-tab-nav.vue'
	import {mapState,mapMutations} from 'vuex'
	import {getNoticeList,getMsgList} from '../../../../api/notice_api.js'
	import {getTodoList} from '../../../../api/common_api.js'
	export default{
	    computed:mapState(['userInfo']),
		data(){
			return{
				TabCur: 0,
				titleList:[{name:'待办通知',id:0},{name:'动态通知',id:1},{name:'公司公告',id:2}],
				todoList:[],
				page:1,
				content:{
					contentdown: "下拉加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more'
			}
		},
		components:{
			LxEmpty,
			uniLoadMore,
			noticeItem,
			commonTabNav
		},
		onLoad(){
			this.page=1;
			this.switchTabCur(this.TabCur);
			this.getTodoList()
		},
		onShow(){
			this.page=1;
			this.switchTabCur(this.TabCur);
			this.getTodoList()
		},
		onPullDownRefresh(){
			//下拉刷新
			this.page=1;
			this.switchTabCur(this.TabCur);
			this.getTodoList()
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},800)

		},
		async onReachBottom(){
			let obj={};
			let result=[];
			this.page++;
			switch(Number(this.TabCur)){
				case 0:
				//我的通知
				obj={
					owner:0,
					contract:0,
					status:0,
					account:this.userInfo.id,
					catalog:this.config.notice.todo,
					offset:this.$utils.getOffset(this.page)	
				}
				 result =await getNoticeList(obj)
				break;
				case 1:
				//我的待办
				obj={
					account:this.userInfo.id,
					owner:0,
					contract:0,
					status:0,
					catalog:this.config.notice.info,
					offset:this.$utils.getOffset(this.page)
				}
				result =await getNoticeList(obj)
				break;
				case 2:
				obj={offset:this.$utils.getOffset(this.page)};
				result=await getMsgList(obj)
			}
			if(result==''){
				this.loading='noMore'
			}else{
				result.forEach(item=>{
					this.todoList.concat(item);
				})
				this.loading='loading'
				setTimeout(()=>{
					this.loading='noMore'
				},900)
			}
		},
		methods:{
			/*获得代办数量*/
			async getTodoList(){
				let result=await getTodoList();
				if(result>0){
					uni.setTabBarBadge({
					  index: 1,
					  text:result.toString()
					})
				}else{
					uni.hideTabBarRedDot({
						index:1
					})
				}
			},
			checkMessageItem(item){
				switch(this.TabCur){
					case 0:
					//1-15都是任务
					if(item.type<=this.config.notifyType.modified && item.type>=this.config.notifyType.assigned){
						uni.navigateTo({
							url:"../../work-center/task-center/task-item-detail/task-item-detail?id="+item.target+"&type=notice"
						})
					}else if(item.type>=this.config.notifyType.e_wf_approval && item.type<=this.config.notifyType.e_wf_finished){
						//16-20是保修或者工作申请
						switch(item.formType){
							//请假申请
							case this.config.approvalMode.repair_service:
							uni.navigateTo({
								url:"../../shop-center/repair-order-item/repair-order-item?id="+item.target+"&type=notice"
							})
							break;
							default:
							 uni.navigateTo({
							 	url: '../../work-center/work-apply-center/apply-detail/apply-detail?id='+item.target+'&formType='+item.formType+"&cat=notice"+"&noticeID="+item.id
							 });
							 break;
						}
					}					
					

					break;
					case 1:
					break;
					case 2:
					uni.navigateTo({
						url:'../notice-item/notice-item?id='+item.id
					})
					break;
				}

			},
			tabSelect(e) {
				this.TabCur = e.id;
				this.switchTabCur(this.TabCur)
			},
			 async switchTabCur(index){
				let  obj={};
				switch(Number(index)){
					case 0:
						obj={
							account:this.userInfo.id,
							owner:0,
							contract:0,
							status:0,
							catalog:this.config.notice.todo,
							offset:this.$utils.getOffset(this.page)
						}
						this.todoList=await getNoticeList(obj);
					break;
					case 1:
						obj={
							account:this.userInfo.id,
							owner:0,
							contract:0,
							status:0,
							catalog:this.config.notice.info,
							offset:this.$utils.getOffset(this.page)
						}
						this.todoList=await getNoticeList(obj);
					break;
					case 2:
					this.todoList=await getMsgList(obj);
					break;
				}
				
			}
		}
	}
</script>
<style scoped>

	page{
		background:rgba(247,247,247,1);
	}
	.notice-container{
		padding:40upx 20upx 10upx;
		
	}
	.notice-desc{
		background:#FFFFFF;
		border-radius: 8upx;
		padding:20upx 26upx 30upx 24upx;
	}
</style>
