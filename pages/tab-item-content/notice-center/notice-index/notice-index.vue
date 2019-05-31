
<template>
	<view class="bg-white">
		<view class="flex text-center" style="padding:10px;">
				<view class="cu-item flex-sub font-size-big font-weight-normal"
				:class="index==TabCur?'text-orange cur':''"
				v-for="(item,index) in titleList" :key="index"
				@click="tabSelect($event)" :data-id="index">
					{{item.name}}
				</view>
		</view>
		<view v-show="TabCur==0" >
				<view class="cu-card dynamic" :class="isCard?'no-card':''">
					<view class="cu-list menu-avatar comment solids-top">
						<view class="cu-item" style="margin-top:20rpx;margin-right:15px;margin-left:15px;border-radius: 10px;" v-for="(item,index) in todoList" :key="index">
							<view class="content">
								<view class="text-grey">
									<text class="lg text-gray cuIcon-notification " style="color:#1296DB"></text>
									<text style="margin-left:20rpx;font-size:13px;">{{item.content}}</text>
								</view>
								<view class="margin-top-sm flex justify-between">
									<view>
										{{item.occtime | formatTime('YMDHMS')}}
									</view>
									<view
											class="cu-tag  round"
											:class="{
												'bg-gradual-blue':item.type==noticeType.resignWork || item.type==noticeType.editWork || item.type==noticeType.newApplyCopy,
												'bg-blue':item.type==noticeType.distributeWork || item.type==noticeType.point,
												'bg-green':item.type==noticeType.agressWork || item.type==noticeType.agressDelay || item.type==noticeType.shenqiPass,
												'bg-purple':item.type==noticeType.passCheck || item.type==noticeType.checkFinish,
												'bg-gradual-red':item.type==noticeType.refuseWork || item.type==noticeType.unpassCheck || item.type==noticeType.unagressDelay|| item.type==noticeType.applyRefuse,
												'bg-pink':item.type==noticeType.unSign,
												'bg-orange':item.type==noticeType.applyCheck || item.type==noticeType.applyDelay || item.type==noticeType.applyEnd|| item.type==noticeType.applyShenpi,
												'bg-red':item.type==noticeType.deleteWork
												}"
											>{{item.type|todoType}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
		
		</view>

		<view v-show="TabCur==1">
			
				<view class="cu-card dynamic" :class="isCard?'no-card':''">
					<view class="cu-list menu-avatar comment solids-top">
						<view class="cu-item" style="margin-top:20rpx;margin-right:15px;margin-left:15px;border-radius: 10px;" v-for="(item,index) in todoList" :key="index">
							<view class="content">
								<view class="text-grey">
									<text class="lg text-gray cuIcon-notification " style="color:#1296DB"></text>
									<text style="margin-left:20rpx;font-size:13px;">{{item.content}}</text>
								</view>
								<view class="margin-top-sm flex justify-between">
										<view>
											{{item.occtime | formatTime('YMDHMS')}}
										</view>
										<view
										class="cu-tag  round"
										:class="{
											'bg-gradual-blue':item.type==noticeType.resignWork || item.type==noticeType.editWork || item.type==noticeType.newApplyCopy,
											'bg-blue':item.type==noticeType.distributeWork || item.type==noticeType.point,
											'bg-green':item.type==noticeType.agressWork || item.type==noticeType.agressDelay || item.type==noticeType.shenqiPass,
											'bg-purple':item.type==noticeType.passCheck || item.type==noticeType.checkFinish,
											'bg-gradual-red':item.type==noticeType.refuseWork || item.type==noticeType.unpassCheck || item.type==noticeType.unagressDelay|| item.type==noticeType.applyRefuse,
											'bg-pink':item.type==noticeType.unSign,
											'bg-orange':item.type==noticeType.applyCheck || item.type==noticeType.applyDelay || item.type==noticeType.applyEnd|| item.type==noticeType.applyShenpi,
											'bg-red':item.type==noticeType.deleteWork
											}"
										>{{item.type|todoType}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			
		</view>
			
			<view v-show="TabCur==2">
				
					<view class="cu-card dynamic" :class="isCard?'no-card':''">
						<view class="cu-list menu-avatar comment solids-top">
							<view class="cu-item" style="margin-top:20rpx;margin-right:15px;margin-left:15px;border-radius: 10px;" v-for="(item,index) in todoList" :key="index" @click="checkNoticeItem(item)">
								<view class="content">
									<view class="text-grey">
										<text class="lg text-gray cuIcon-notification " style="color:#1296DB"></text>
										<text style="margin-left:20rpx;font-size:13px;">{{item.title}}</text>
									</view>
									<view class="margin-top-sm">
										<view style="height:50px;overflow: hidden;">
												{{item.message}}
										</view>
									</view>
									<view class="margin-top-sm flex justify-between">
										<view  style="font-size:13px;">{{item.pubdate | formatTime('YMDHMS')}}</view>
										<view>{{item.senderName}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
			
			</view>
			<view class="cu-load bg-gray loading" v-if="loadingType==2"></view>
			<view class="cu-load bg-gray over" v-if="loadingType==4"></view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadingType:0,
				noticeList:[],
				todoList:[],
				TabCur: 0,
				scrollLeft: 0,
				isCard: false,
				titleList:[{name:'待办通知'},{name:'动态通知'},{name:'公司公告'}],
				noticeType:{},
				page:1,

			};
		},
		onLoad(){
			this.switchTabCur(0);
			this.noticeType=this.$store.state.noticeType
		},
		onPullDownRefresh:function() {
			this.switchTabCur(this.TabCur)
		},
		onReachBottom(){
			this.loadingType=2;
			this.page++;
			setTimeout(()=>{
				if(this.TabCur==0){
					//我的通知
					this.$ajax('EventFlows',{
						account:1,
						contract:0,
						status:1,
						catalog:this.$store.state.notice.todo,
						psize:-1,
						offset:this.$utils.getOffset(this.page)
					},res=>{
						if(res==''){
							this.loadingType=4;
						}else{
							this.loadingType!=2
							res.forEach(item=>{
								this.todoList=this.todoList.concat(item)
							})
						}
						
					})
				}else if(this.TabCur==1){
					//我的待办
					this.$ajax('EventFlows',{
						account:1,
						contract:0,
						status:0,
						catalog:this.$store.state.notice.info,
						offset:this.$utils.getOffset(this.page)
					},res=>{
						if(res==''){
							this.loadingType=4;
						}else{
							this.loadingType!=2
							res.forEach(item=>{
								this.todoList=this.todoList.concat(item)
							})
						}
					})
				}else if(this.TabCur==2){
					this.$ajax('Messages',{offset:this.$utils.getOffset(this.page)},res=>{
						if(res==''){
								this.loadingType=4;
							}else{
								this.loadingType!=2
								res.forEach(item=>{
									this.todoList=this.todoList.concat(item)
								})
							}
				
					})
				}
			},1000)
			
		},
		methods: {
			checkNoticeItem(item){
				uni.navigateTo({
					url:"../notice-item/notice-item?id="+item.id
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.switchTabCur(this.TabCur)
			},
			IsCard(e) {
				this.isCard = e.detail.value
			},
			switchTabCur(index){
				if(index==0){
					//我的通知
					this.$ajax('EventFlows',{
						account:1,
						contract:0,
						status:1,
						catalog:this.$store.state.notice.todo,
						psize:-1,
						offset:0
					},res=>{
						this.todoList=res
					})
				}else if(index==1){
					//我的待办
					this.$ajax('EventFlows',{
						account:1,
						contract:0,
						status:0,
						catalog:this.$store.state.notice.info,
						offset:0
					},res=>{
						this.todoList=res;
					})
				}else if(index==2){
					this.$ajax('Messages',{offset:0},res=>{
						console.log(res)
						this.todoList=res;
					})
				}
			}
		},
		
	}
</script>

<style lang="less">
	
	.cu-card.dynamic{
		background:#e7ebed;
	}
	.nav{
		white-space:normal !important
	}
	.cu-list.menu-avatar.comment>.cu-item{
		padding:16px;
	}
	.unSign{
		background:#8c8c8c
	}
	.distributeWork{
		background:#5cdbd3
	}
	.agressWork{
		background:#096dd9
	}
	.refuseWork{
		background:#ff7a45
	}
	.applyCheck{
		background:#9254de
	}
	.passCheck{
		background:#52c41a
	}
	.unpassCheck{
		background:#f5222d
	}
	.applyDelay{
		background:#d46b08
	}

	.applyEnd{
		background:#ffa940
	}
	.agressDelay{
		background:#614700
	}
	.unagressDelay{
		background:#612500
	}
	.endWork{
		background:#002329
	}
	.unagreeEndWork{
		background:#ad8b00
	}
	.deleteWork{
		background:#cf1322
	}


	.resignWork{
		background:#69c0ff
	}
	.editWork{
		background:#14B4F2
	}
	.shenpiPass{
		background:#14B4F2
	}
	.applyRefuse{
		background:#14B4F2
	}
	.unagreeEndWork{
		background:#14B4F2
	}
	.newApplyCopy{
		background:#14B4F2
	}
	.checkFinish{
		background:#7cb305
	}
	.myRed{
		background-color: #5cdbd3
	}
</style>

