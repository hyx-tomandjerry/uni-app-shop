<template>
	<view>
		<view class="operateItem" >
			<view class="bg-white nav" style="width:100%;">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.id==TabCur?'text-red cur':''"
						v-for="(item,index) in statusList" :key="index" @tap="tabSelect(item)" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
			<view v-if="repairList.length>0">
				<view class="order_content position_relative" >
					<view class="list-item"  v-for="(item,index) in repairList" :key="index" >
							<view class=" flex justify-between">
								<view class="list-item-title">{{item.catalogName}}</view>
								<view>

									<view class='cu-tag radius bg-red'
									:class="{
									'bg-gradual-orange':item.status==repairStatus.untreated,
									'bg-blue':item.status==repairStatus.treating,
									'bg-red':item.status==repairStatus.refuse,
									'bg-green':item.status==repairStatus.finish}"
									>{{item.status|repairStatus}}</view>
								</view>
							</view>
							<view class="list-content">
								<view @click="orderDetail(item)">
									<view class="list-content-item">
										<image src="../../../static/icon/shop.png" class="shopImg " style="vertical-align:middle;" ></image>
										<text style="margin-right:5px;">门店名称:</text> {{item.shopname}}
									</view>


									<view class="list-content-item">
										<image src="../../../static/icon/time.png" class="shopImg" style="vertical-align:middle;" ></image>
										<text style="margin-right:5px;">预约时间:</text> {{item.appointdate| formatTime('YMD')}}
									</view>

									<view class="list-content-item">
										<image src="../../../static/icon/client.png" class="shopImg " style="vertical-align:middle;" ></image>
										<text style="margin-right:5px;">报修人:</text> {{item.creatorName}}  <text class="text-blue" style="margin:0 5px;">|</text> {{item.creatorMobile}}
									</view>
								</view>

								<view class="list-content-item"
								v-if="userInfo.type==shoperObj.type"
								 style="border-top:1px solid #EEEEED;padding-top:10px;text-align:right;margin-bottom:7px;" >

								<text v-if="item.status==repairStatus.untreated"
								  class="cu-tag line-blue" @click.prevent="operateOrder(item,'edit')">修改订单</text>

									<text v-if="item.status==repairStatus.finish && !item.comment"
									 class="cu-tag line-blue" @click.prevent="operateOrder(item,'createComment')">进行评价</text>
									<text v-if="item.status==repairStatus.refuse"
									  class="cu-tag line-red"  @click.prevent="operateOrder(item,'delete')">删除订单</text>
									  <text v-if="item.status==repairStatus.refuse"
									    class="cu-tag line-blue" @click.prevent="operateOrder(item,'again')">重新派单</text>
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
		<uni-load-more :contentText="content" :showIcon="true" :status="loading"></uni-load-more>
		<image src="../../../static/icon/add.png" v-if="userInfo.type==shoperObj.type"
				style="position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;" @click.stop="createRepair()"></image>

			<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog ">
				<view class="cu-bar bg-white justify-end borderBottom">
					<view class="content font-size-big font-weight-normal color-normal">提示</view>
				</view>
				<view class="padding-xl font-size-big font-weight-normal color-normal bg-white borderBottom" style="padding:25px 0 27px;">
					确定删除该订单?
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action flex justify-around" style="width:100%;">
						<view style="width:50%;border-right:1px solid #EEEEED;padding:12px;"  @tap="hideModal()">取消</view>
						<view style="width:50%;padding:12px;"  @tap="delOrder()" class="text-blue">确定</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import LxEmpty from '../../../lx_components/lx-empty.vue';
	import uniLoadMore from '../../../components/uni-load-more.vue'
	import {mapState} from 'vuex'
	export default{
		computed:mapState(['userInfo','shoperObj']),
		data(){
			return{
				repairStatus:this.$store.state.repairStatus,
				statusList:[
					{id:1,
					name:"未处理",
					value:'orders',
					status:this.$store.state.repairStatus.untreated},
					{id:2,name:"处理中",value:'unfinish',status:this.$store.state.repairStatus.treating},
					{id:3,name:"无效",value:'during',status:this.$store.state.repairStatus.refuse},
					{id:4,name:"已完成",value:'refuse',status:this.$store.state.repairStatus.finish},

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
			uni.stopPullDownRefresh();
			this.getRepairList(this.TabCur)
		},
		onReachBottom(){

			this.page++;
			this.loading='loading';
			setTimeout(()=>{

				if(this.type=='all'){
						this.$ajax('ServiceOrders',{
						catalog:-1,
						status:this.TabCur,
						psize:15,
						offset:this.$utils.getOffset(this.page),
						creator:this.userInfo.id
						},res=>{
							if(res==''){
								setTimeout(()=>{
									this.loading='noMore'
								},600)
							}else{
								res.forEach(item=>{
									this.repairList.concat(item)
								})
							}
					})

				}else if(this.type=='alone'){
					this.$ajax('ServiceOrdersBySalesman',{
						catalog:-1,
						status:this.TabCur,
						offset:this.$utils.getOffset(this.page),
						creator:this.userInfo.id
						},res=>{
                        if(res==''){
                            setTimeout(()=>{
                                this.loading='noMore'
                            },600)
                        }else{
                            res.forEach(item=>{
                                this.repairList.concat(item)
                            })
                        }
					})
				}



			},1000)
		},
		components:{
			LxEmpty,
			uniLoadMore
		},
		methods:{
			hideModal(){
				this.modalName=null;
			},
			operateOrder(item,type){
				switch(type){
					case 'edit':
					//修改订单
					console.log('kkkk')
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
					console.log('kkkkk')
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
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			//进行评价
			createComment(item){
				uni.navigateTo({
					url:'./create-comment/create-comment?orderID='+item.id+'&type=create'
				})
			},

			//报修列表
			getRepairList(status){
				if(this.type=='all'){

					this.$ajax('ServiceOrders',{
						catalog:-1,
						status:status,
						offset:this.$utils.getOffset(this.page),
						creator:this.userInfo.id
						},res=>{
						this.repairList=res
					})
				}else if(this.type=='alone'){
					this.$ajax('ServiceOrdersBySalesman',{
						catalog:-1,
						status:status,
						creator:this.userInfo.id,
						offset:this.$utils.getOffset(this.page)
						},res=>{
						this.repairList=res
					})
				}



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
			console.log(this.type)
			this.page=1;
			this.getRepairList(this.TabCur)
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
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
				padding:18px 16px 17px 20px;
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
			.finishBlue{
				background:#42B0ED;
			}
</style>

