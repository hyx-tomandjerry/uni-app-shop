<template>
	<view>
		<view class="flex text-center bg-white borderBottom  justify-around" >
				<view class="cu-item  font-size-normal font-weight-normal" style="padding:10px;"
				:class="index==TabCur?' cur  borderBottomRed color-red':''"
				v-for="(item,index) in titleList" :key="index"
				@click="tabSelect($event)" :data-id="index">
					{{item.name}}
				</view>
		</view>

		<view class="notice-container">
			<view>
				<view v-if="todoList.length">
					<view style="margin-bottom:25px;" v-for="(item,index) in todoList" :key="index" @click="checkMessageItem(item)">
						<view class="text-center" style="margin-bottom:13px;">
							<view class="font-size-small font-weight-normal text-white" >
								<text style="background:rgba(0,0,0,0.1);padding:2px 8px 2px 9px;border-radius: 4px;;" v-if="item.occtime">{{item.occtime | formatTime('YMDHMS')}}</text>
								<text style="background:rgba(0,0,0,0.1);padding:2px 8px 2px 9px;border-radius: 4px;;"
									  v-else-if="item.applyDate">{{item.applyDate | formatTime('YMDHMS')}}</text>
							</view>
						</view>
						<view class="flex justify-start">
							<image src="../../../../static/img/notice/daiban.png" style="width:45px;height:45px;margin-right:15px;vertical-align: middle;width:14%"></image>
							<view style="width:86%;">
								<view class="font-size-litter font-weight-normal color-placeholder" style="margin-bottom:8px;">
									<text>{{TabCur==2?'公告':'通知'}}</text>
								</view>
								<view class="notice-desc">
									<view class="font-size-big  color-blue" style="margin-bottom:6px;">{{item.title}}</view>
									<view v-html="item.content || item.message" style="
										overflow: hidden;
										text-overflow: ellipsis;
										display: -webkit-box;
										-webkit-line-clamp: 3;
										-webkit-box-orient: vertical;

									"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<lx-empty></lx-empty>
				</view>
			</view>
		</view>
		<uni-load-more :contentText="content"
					   v-if="todoList.length"
					   :showIcon="true" :status="loading" ></uni-load-more>
	</view>
</template>
<script>
	import LxEmpty from "../../../../lx_components/lx-empty.vue";
	import uniLoadMore from "../../../../components/uni-load-more.vue"
	import {mapState} from 'vuex'
	export default{
	    computed:mapState(['userInfo']),
		data(){
			return{
				TabCur: 0,
				titleList:[{name:'待办通知'},{name:'动态通知'},{name:'公司公告'}],
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
			uniLoadMore
		},
		onLoad(){
			this.switchTabCur(this.TabCur);
		},
		onShow(){
			this.switchTabCur(this.TabCur);
		},
		onPullDownRefresh(){
			//下拉刷新
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},800)
			this.switchTabCur(this.TabCur);
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
			checkMessageItem(item){
				console.log(item)
				uni.navigateTo({
					url:'../notice-item/notice-item?id='+item.id
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
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
		/*padding-top:20px;*/
		/*padding-left:17px;*/
		/*padding-right:41px;*/
		.mixPadding(20px;17px;0;41px;);
		.notice-desc{
			/*background:rgba(255,255,255,1);*/
			/*border-radius:4px;*/
			/*padding:10px 13px 15px 12px;*/
			background:@white_color;
			.mixBorderRadius(4px);
			.mixPadding(10px;13px;15px;12px);
		}
	}
</style>
