
<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub"
				:class="index==TabCur?'text-orange cur':''"
				v-for="(item,index) in titleList" :key="index"
				@tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</view>
			<view v-show="TabCur==0">
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
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeList:[],
				todoList:[],
				TabCur: 0,
				scrollLeft: 0,
				isCard: false,
				titleList:[{name:'待办通知'},{name:'动态通知'},{name:'公司公告'}],
				noticeType:{}

			};
		},
		onLoad(){
			this.switchTabCur(0);
			this.noticeType=this.$store.state.noticeType
		},
		methods: {
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
						psize:-1
					},res=>{
						this.todoList=res
					})
					// uni.request({
					// 	url:this.$store.state.url+'EventFlows',
					// 	data:{
					// 		owner:0,
					// 		userId:1,
					// 		// userId:this.$store.state.userInfo.id,
					// 		// account:this.$store.state.userInfo.id,
					// 		account:1,
					// 		contract:0,
					// 		status:1,
					// 		catalog:this.$store.state.notice.todo,
					// 		psize:-1
					// 	},
					// 	success: (res) => {
					// 		this.todoList=res.data.data
					// 	}
					// })
				}else if(index==1){
					//我的待办
					this.$ajax('EventFlows',{
						account:1,
						contract:0,
						status:0,
						catalog:this.$store.state.notice.info,
					},res=>{
						this.todoList=res;
					})
					// uni.request({
					// 	url:this.$store.state.url+'EventFlows',
					// 	data:{
					// 		owner:0,
					// 		userId:1,
					// 		// userId:this.$store.state.userInfo.id,
					// 		// account:this.$store.state.userInfo.id,
					// 		account:1,
					// 		contract:0,
					// 		status:0,
					// 		catalog:this.$store.state.notice.info,
					// 	},
					// 	success: (res) => {
					// 		this.todoList=res.data.data
					// 	}
					// })
				}
			}
		}
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

