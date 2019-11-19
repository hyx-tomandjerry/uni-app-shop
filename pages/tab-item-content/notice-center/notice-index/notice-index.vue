<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >消息</view></block>
		</cu-custom>
		<view class="flex text-center bg-white borderBottom  justify-around" >
			<block  v-for="(item,index) in titleList" :key="index">
				<tabNav :item="item" :index="index" :TabCur="TabCur" @tabSelect="tabSelect"></tabNav>
			</block>
		</view>

		<view class="notice-container">
			<view>
				<view v-if="todoList.length">
					<block v-for="(item,index) in todoList" :key="index">
						<noticeItem :item="item" :index="index" :TabCur="TabCur" @checkItem="checkMessageItem"></noticeItem>
					</block>
					<uni-load-more :contentText="content"
								   v-if="todoList.length"
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
	import tabNav from '../../../../components/common/tab-nav.vue'
	import LxEmpty from "../../../../lx_components/lx-empty.vue";
	import uniLoadMore from "../../../../components/uni-load-more.vue"
	import noticeItem from '../../../../components/notice/notice-item.vue'
	import {mapState,mapMutations} from 'vuex'
	export default{
	    computed:mapState(['userInfo','approvalMode']),
		data(){
			return{
				TabCur: 0,
				titleList:[{name:'待办通知',id:0},{name:'动态通知',id:1},{name:'公司公告',id:2}],
				todoList:[],
				page:1,
				content:{
					contentdown: "",
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
			tabNav,
		},
		onLoad(){
			this.switchTabCur(this.TabCur);
			this.getTodoList()
		},
		onShow(){
			this.switchTabCur(this.TabCur);
			this.getTodoList()
		},
		onPullDownRefresh(){
			//下拉刷新
			this.switchTabCur(this.TabCur);
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},800)

		},
		onReachBottom(){
			this.page++;
			switch(Number(this.TabCur)){
				case 0:
				//我的通知
						this.$ajax('EventFlows',{
							owner:0,
							contract:0,
							status:0,
							account:this.userInfo.id,
							catalog:this.$store.state.notice.todo,
							offset:this.$utils.getOffset(this.page)
						},res=>{
							if(res==''){
								this.loading='noMore'
							}else{
								res.forEach(item=>{
									this.todoList.concat(item);
								})
								this.loading='loading'
								setTimeout(()=>{
									this.loading='noMore'
								},900)
							}
						})
				break;
				case 1:
				//我的待办
						this.$ajax('EventFlows',{
							account:this.userInfo.id,
							owner:0,
							contract:0,
							status:0,
							catalog:this.$store.state.notice.info,
							offset:this.$utils.getOffset(this.page)
						},res=>{
							if(res==''){
								setTimeout(()=>{
									this.loading='noMore'
								},900)
							}else{
								setTimeout(()=>{
									res.forEach(item=>{
										this.todoList.concat(item);
									})
									this.loading='loading'
								},900)
							}
						})
				break;
				case 2:
				this.$ajax('Messages',{offset:this.$utils.getOffset(this.page)},res=>{
					if(res==''){
						setTimeout(()=>{
							this.loading='noMore'
						},900)
					}else {
						setTimeout(()=>{
							res.forEach(item=>{
								this.todoList.concat(item);
							})
							this.loading='loading'
						},900)

					}
				})
			}
		},
		methods:{
			/*获得代办数量*/
			getTodoList(){
				this.$ajax('MyEventNumbers',{},res=>{
					if(res>0){
						uni.setTabBarBadge({
						  index: 1,
						  text:res.toString()
						
						})
					}
				})
			},
			checkMessageItem(item){
				switch(this.TabCur){
					case 0:
					switch(item.formType){
						//请假申请
						case this.approvalMode.repair_service:
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
			switchTabCur(index){

				switch(Number(index)){
					case 0:
						this.$ajax('EventFlows',{
							account:this.userInfo.id,
							owner:0,
							contract:0,
							status:0,
							catalog:this.$store.state.notice.todo,
							offset:this.$utils.getOffset(this.page)
						},res=>{
							this.todoList=res
						})
					break;
					case 1:
						this.$ajax('EventFlows',{
							account:this.userInfo.id,
							owner:0,
							contract:0,
							status:0,
							catalog:this.$store.state.notice.info,
							offset:this.$utils.getOffset(this.page)
						},res=>{
							this.todoList=res
						})
					break;
					case 2:

					this.$ajax('Messages',{offset:0},res=>{
						this.todoList=res;
					})
					break;
				}

			}
		}
	}
</script>
<style lang="less">
	@import "../../../../static/css/demo";
	page{
		background: @bg_color;
	}
	.notice-container{
		.mixPadding(20px;17px;0;40upx;);
		.notice-desc{
			background:@white_color;
			.mixBorderRadius(4px);
			.mixPadding(10px;13px;15px;12px);
		}
	}
</style>
