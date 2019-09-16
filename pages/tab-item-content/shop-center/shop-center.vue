<template>
	<view>
		<view class="operateItem" >
			<view class="bg-white nav" style="width:100%;">
				<view class="flex text-center justify-around">
					<view class="cu-item " :class="item.id==TabCur?'color-red cur borderBottomRed':''"
						v-for="(item,index) in statusList" :key="index" @tap="tabSelect(item)" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
			<view v-if="repairList.length">
				<view class="order_content position_relative" >
					<view class="list-item"  v-for="(item,index) in repairList" :key="index" >
							<view class=" flex justify-between align-center">
								<view class="list-item-title">{{repairTypeZn[item.type]}}-{{item.categoryName || ''}}维修</view>
								<view class="flex justify-start align-center">
									<image src="../../../static/img/shop/smile.png" style="width:15px;height:15px;vertical-align: middle;margin-right:5px;" v-if="item.status==repairStatus.waitManager"></image>
									<view 
									:class="{
									'waitManager':item.status==repairStatus.waitManager,
									'waitArea':item.status==repairStatus.waitArea,
									'waitCompany':item.status==repairStatus.waitCompany,
									'color-regular':item.status==repairStatus.loading,
									}"
									>{{item.status|repairStatus}}</view>
								</view>
							</view>
							<view class="list-content">
								<view @click="orderDetail(item)">
									<view class="list-content-item">
										<image src="../../../static/icon/icon-mengdian@2x.png" class="shopImg " style="vertical-align:middle;" ></image>
										<text style="margin-right:5px;">门店名称:</text> {{item.name}}
									</view>


									<view class="list-content-item">
										<image src="../../../static/icon/icon-time@2x.png" class="shopImg" style="vertical-align:middle;" ></image>
										<text style="margin-right:5px;">预约时间:</text> {{item.appointdate| formatTime('YMD')}}
									</view>

									<view class="list-content-item">
										<image src="../../../static/icon/icon-dneglu-zhanghu@2x.png" class="shopImg " style="vertical-align:middle;" ></image>
										<text style="margin-right:5px;">报修人:</text> {{item.creatorName}}  <text class="color-regular" style="margin:0 5px;">|</text> {{item.creatorMobile}}
									</view>
								</view>

								<view class="list-content-item"
								 style="border-top:1px solid #EEEEED;padding-top:10px;text-align:right;margin-bottom:7px;" >

								<!-- <text v-if="item.status==repairStatus.untreated"
								  class="cu-tag line-blue" @click.prevent="operateOrder(item,'edit')">修改订单</text> -->

									<text v-if="item.status==repairStatus.finish && !item.comment"
									 class="cu-tag line-blue" @click.prevent="operateOrder(item,'createComment')">去评价</text>
									<!-- <text v-if="item.status==repairStatus.refuse"
									  class="cu-tag line-red"  @click.prevent="operateOrder(item,'delete')">删除订单</text> -->
									  <!-- <text v-if="item.status==repairStatus.refuse"
									    class="cu-tag line-blue" @click.prevent="operateOrder(item,'again')">重新派单</text> -->
									   <text v-if="item.status==repairStatus.finish"
									   class="cu-tag line-blue" @click.prevent="operateOrder(item,'checkComment')">查看评价</text>
								</view>
							</view>
						</view>

				</view>
			</view>
			<view v-else>
				<lx-empty></lx-empty>
			</view>
		<uni-load-more :contentText="content" :showIcon="true" :status="loading"
		color="rgb(39, 134, 245)" v-if="repairList.length"></uni-load-more>
		<image src="../../../static/img/add.png" v-if="userInfo.type==shoperObj.type"
				style="position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;" @click.stop="createRepair()"></image>
		<showModel :isShow="modalName=='DialogModal'" @hideModel="hideModal" @confirmDel="delOrder" v-if="modalName=='DialogModal'">
			<block slot="content">确定删除该订单?</block>
		</showModel>
	</view>
</template>

<script>
	import LxEmpty from '../../../lx_components/lx-empty.vue';
	import uniLoadMore from '../../../components/uni-load-more.vue'
	import showModel from '../../../components/show-model.vue'
	import {mapState} from 'vuex'
	export default{
		computed:mapState(['userInfo','shoperObj','repairTypeZn']),
		data(){
			return{
				repairStatus:this.$store.state.repairStatus,
				statusList:[
					{id:1,
					name:"未处理",
					value:'orders'},
					{id:4,name:"处理中",value:'unfinish'},
					{id:6,name:"已完成",value:'refuse'},

				],
				TabCur:1,
				repairList:[],
				type:'',//用于区分来自门店报修还是我的报修
				page:1,
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				modalName:'',
				selectItem:{}

			}
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this.page=1;
				this.getRepairList(this.TabCur)
			},600)
		},
		onReachBottom(){
			this.page++;
			this.loading='loading';
			setTimeout(()=>{
				this.$ajax('ServiceOrders',{
					status:this.TabCur==1?[1,2,3].join(','):status,
					offset:this.$utils.getOffset(this.page),
					creator:this.type=='all'?'':this.userInfo.id,
					store:this.type=='all'?1:''
				},res=>{
					if(res==''){
						setTimeout(()=>{
							this.loading='noMore'
						},600)
					}else{
						res.forEach(item=>{
							this.repairList.concat(item)
						})
						this.loading='loading'
						setTimeout(()=>{
							this.loading='noMore'
						},900)
					}
				})
			},1000)
		},
		components:{
			LxEmpty,
			uniLoadMore,
			showModel
		},
		methods:{
			hideModal(){
				this.modalName=null;
			},
			operateOrder(item,type){
				switch(type){
					case 'edit':
					//修改订单
					uni.navigateTo({
						url:'./create-order/create-order?id='+item.id
					})
					break;
					case 'again':
					//重新派单
					uni.navigateTo({
						url:'./create-order/create-order?id='+item.id
					})
					break;
					case 'createComment':
					//进行评价
					uni.navigateTo({
						url:'./create-comment/create-comment?orderID='+item.id+'&type=create'
					})
					break;
					case 'checkComment':
					//查看评价
					uni.navigateTo({
						url:'./create-comment/create-comment?orderID='+item.id+'&type=check'
					})
					break;
					case 'delete':
					this.modalName='DialogModal';
					this.selectItem=item;
					//删除订单
					break;
				}
			},
			//重新派单
			againCreate(item){

				uni.navigateTo({
					url:'./create-order/create-order?id='+item.id
				})
			},
			//查看评价
			checkComment(item){
				uni.navigateTo({
					url:'./create-comment/create-comment?orderID='+item.id+'&type=check'
				})
			},
			delOrder(){
				this.hideModal()
				this.$ajax('RemoveServiceOrder ',{id:this.selectItem.id},res=>{
					uni.showToast({
						title:'删除订单成功',
						icon:'none'
					})
					this.getRepairList(this.TabCur)
				})
			},
			// 查看报修记录详情
			orderDetail(item){
				uni.navigateTo({
					url:'./repair-order-item/repair-order-item?id='+item.id
				})
			},
			//新增报修
			createRepair(){
				uni.navigateTo({
					url:'./create-order/create-order'
				})
			},
			tabSelect(e) {
				this.TabCur = e.id;
				this.page=1;
				this.getRepairList(this.TabCur)
			},
			//进行评价
			createComment(item){
				uni.navigateTo({
					url:'./create-comment/create-comment?orderID='+item.id+'&type=create'
				})
			},

			//报修列表
			getRepairList(status){
				this.$ajax('ServiceOrders',{
					status:status==1?[1,2,3].join(','):status,
					offset:this.$utils.getOffset(this.page),
					creator:this.type=='all'?'':this.userInfo.id,
					store:this.type=='all'?1:''
				},res=>{
					this.repairList=res
				})
			},

		},
		onShow(){
			this.page=1;
			this.getRepairList(this.TabCur)
		},
		onLoad(options){
			if(options){
				this.type=options.type
			}
			this.page=1;
			this.getRepairList(this.TabCur)
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}

	.shopImg{
		width:18px;
		height:18px;
		vertical-align: middle;
		margin-right:10px;
	}
			.operateItem{
				text-align:center;
				display: flex;
				justify-content: space-around;
				border-bottom:1px solid rgba(233,233,233,1)
			}

			.page {
				height: 87Vh;
				width: 100vw;
			}
			.page.show {
				overflow: hidden;
			}
			.list-item{
				padding:18px 16px 4px 20px;
				background: #fff;
				margin-bottom:13px;
				.list-item-title{
					font-size:16px;
					font-weight:400;
					color:rgba(42,42,42,1);
					margin-bottom:10px;

				}
			}
			
			.marginRight10{
				margin-right:10px;
			}
			.lineHeight18{
				line-height:18px;

			}
			.lineHeight20{
				line-height: 20px;

			}
			.list-content-item{
				font-size:14px;
				font-weight:400;
				color:rgba(137,136,136,1);
				margin-bottom:12px;
			}
			.waitManager{
				color:#ED7322
			}
			.waitArea{
				color:#9013FE
			}
			.waitCompany{
				color:#1D7BFF
			}
			.loading{
				color:#13C16A
			}
			.finish{
				color:#898888
			}
</style>

