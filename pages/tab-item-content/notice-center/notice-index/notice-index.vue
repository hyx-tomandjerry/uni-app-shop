<template>
	<view>
		<view class="flex text-center bg-white borderBottom" >
				<view class="cu-item flex-sub font-size-normal font-weight-normal" style="padding:10px;"
				:class="index==TabCur?' cur  borderBottomRed':''"
				v-for="(item,index) in titleList" :key="index"
				@click="tabSelect($event)" :data-id="index">
					{{item.name}}
				</view>
		</view>

		<view class="notice-container">

			<view v-if="TabCur==0">
				<view v-if="todoList.length>0">
					<view style="margin-bottom:25px;" v-for="(item,index) in todoList" :key="index">
						<view class="text-center" style="margin-bottom:13px;">
							<view class="font-size-small font-weight-normal text-white" >
								<text style="background:rgba(0,0,0,0.1);padding:2px 8px 2px 9px;border-radius: 4px;;">{{item.occtime | formatTime('YMDHMS')}}</text>
							</view>
						</view>
						<view class="flex justify-start">
							<image src="../../../../static/img/notice/daiban.png" style="width:45px;height:45px;margin-right:15px;vertical-align: middle;width:14%"></image>
							<view style="width:86%;">
								<view class="font-size-litter font-weight-normal color-placeholder" style="margin-bottom:8px;">通知</view>
								<view class="notice-desc">
									<!-- <view class="font-size-big font-weight-normal  text-blue" style="margin-bottom:6px;">通知</view> -->
									<view>{{item.content}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<lx-empty></lx-empty>
				</view>




			</view>

			<view v-if="TabCur==1">

				<view v-if="todoList.length>1">
					<view style="margin-bottom:25px;" v-for="(item,index) in todoList" :key="index">
						<view class="text-center" style="margin-bottom:13px;">
							<view class="font-size-small font-weight-normal text-white" >
								<text style="background:rgba(0,0,0,0.1);padding:2px 8px 2px 9px;border-radius: 4px;;">{{item.occtime | formatTime('YMDHMS')}}</text>
							</view>
						</view>
						<view class="flex justify-start">
							<image src="../../../../static/img/notice/dongtai.png" style="width:45px;height:45px;margin-right:15px;vertical-align: middle;width:14%"></image>
							<view style="width:86%;">
								<view class="font-size-litter font-weight-normal color-placeholder" style="margin-bottom:8px;">{{item.type|todoType}}</view>
								<view class="notice-desc">
									<view class="font-size-big font-weight-normal  text-blue" style="margin-bottom:6px;">{{item.type|todoType}}</view>
									<view>{{item.content}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<lx-empty></lx-empty>
				</view>
			</view>
			<view v-if="TabCur==2">
				<view v-if="todoList.length>1">
					<view style="margin-bottom:25px;" v-for="(item,index) in todoList" :key="index">
						<view class="text-center" style="margin-bottom:13px;">
							<view class="font-size-small font-weight-normal text-white" >
								<text style="background:rgba(0,0,0,0.1);padding:2px 8px 2px 9px;border-radius: 4px;;">{{item.applyDate | formatTime('YMDHMS')}}</text>
							</view>
						</view>
						<view class="flex justify-start">
							<image src="../../../../static/img/notice/dongtai.png" style="width:45px;height:45px;margin-right:15px;vertical-align: middle;width:14%"></image>
							<view style="width:86%;">
								<view class="font-size-litter font-weight-normal color-placeholder" style="margin-bottom:8px;"><!-- {{item.title}} --></view>
								<view class="notice-desc">
									<view class="font-size-big font-weight-normal  text-blue" style="margin-bottom:6px;">{{item.title}}</view>
									<view>{{item.message}}</view>
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
		<uni-load-more :contentText="content" :showIcon="true" :status="loading" ></uni-load-more>
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
                        account:this.userInfo.id,
                        contract:0,
                        status:1,
                        catalog:this.$store.state.notice.todo,
                        psize:-1,
                        offset:this.$utils.getOffset(this.page),
                    },res=>{
                        if(res==''){
                            setTimeout(()=>{
                                this.loading='noMore'
                            },900)
                        }else {
                            setTimeout(()=>{
                                res.forEach(item=>{
                                    this.todoList=this.todoList.concat(item);
                                })
                                this.loading='loading'
                            },900)

                        }
                    },false);

				break;
				case 1:
				//我的待办

				this.$ajax('EventFlows',{
					account:1,
					contract:0,
					status:0,
					catalog:this.$store.state.notice.info,
					offset:this.$utils.getOffset(this.page),
				},res=>{
					if(res==''){
						setTimeout(()=>{
							this.loading='noMore'
						},900)
					}else {
						setTimeout(()=>{
							res.forEach(item=>{
								this.todoList=this.todoList.concat(item);
							})
							this.loading='loading'
						},900)

					}
				});
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
								this.todoList=this.todoList.concat(item);
							})
							this.loading='loading'
						},900)

					}
				})
			}
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.switchTabCur(this.TabCur)
			},
			switchTabCur(index){

				switch(Number(index)){
					case 0:
                        this.$ajax('EventFlows',{
                            account:this.userInfo.id,
                            contract:0,
                            status:1,
                            catalog:this.$store.state.notice.todo,
                            psize:-1,
                            offset:0
                        },res=>{
                            this.todoList=res
                        },false)
					break;
					case 1:
                        this.$ajax('EventFlows',{
                            account:this.userInfo.id,
                            contract:0,
                            status:1,
                            catalog:this.$store.state.notice.info,
                            offset:0
                        },res=>{
                            this.todoList=res;
                        },false)
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
	page{
		background:#F7F7F7;
	}
	.notice-container{
		padding-top:20px;
		padding-left:17px;
		padding-right:41px;
		.notice-desc{
			background:rgba(255,255,255,1);
			border-radius:4px;
			padding:10px 13px 15px 12px;
		}
	}
</style>
