<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back font-size-back font-weight-bold"  @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >报修记录</view></block>
		</cu-custom>
		<view class="flex text-center bg-white borderBottom  justify-around" >
			<block  v-for="(item,index) in statusList" :key="index">
				<tabNav :item="item" :index="index" :TabCur="TabCur" @tabSelect="tabSelect"></tabNav>
			</block>	
		</view>
		<template v-if="repairList.length">
				<view class="order_content position_relative" >
					<block v-for="(item,index) in repairList" :key="index">
						<repairListItem :item="item" :index="index" @orderDetail="orderDetail"></repairListItem>
					</block>
					<uni-load-more :contentText="content" :showIcon="true" :status="loading" color="rgb(39, 134, 245)"></uni-load-more>
				</view>
		</template>
			
		<template v-else>
			<lx-empty></lx-empty>
		</template>
		
		<positionImg @createOperate="createRepair" 
		:position_img="true"
		:src="'../../../static/img/add.png'"></positionImg>
		<showModel :isShow="modalName=='DialogModal'" @hideModel="hideModal" @confirmDel="delOrder" v-if="modalName=='DialogModal'">
			<block slot="content">确定删除该订单?</block>
		</showModel>
	</view>
</template>

<script>
	import tabNav from '../../../components/common/tab-nav.vue'
	import LxEmpty from '../../../lx_components/lx-empty.vue';
	import uniLoadMore from '../../../components/uni-load-more.vue'
	import showModel from '../../../components/show-model.vue'
	import repairListItem from '../../../components/repair-list-item.vue'
	import positionImg from '../../../components/position_img.vue'
	export default{
		data(){
			return{
				statusList:[
					{id:this.$store.state.repairStatus.submit,name:"已报修",value:'orders'},
					{id:this.$store.state.repairStatus.executing,name:"执行中",value:'unfinish'},
					{id:this.$store.state.repairStatus.finished,name:"已完成",value:'refuse'},

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
			this.$ajax('MyServiceOrders',{
				status:status,
				offset:this.$utils.getOffset(this.page),
				mine:this.type=='all'?0:1
			},res=>{
				if(res){
					res.forEach(item=>{
						this.repairList.concat(item)
					})
					this.loading='loading'
					setTimeout(()=>{
						this.loading='noMore'
					},900)
				}else{
					setTimeout(()=>{
						this.loading='noMore'
					},600)
				}
			})
		},
		components:{
			LxEmpty,
			uniLoadMore,
			showModel,
			repairListItem,
			positionImg,
			tabNav
		},
		methods:{
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
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
			orderDetail(id){
				uni.navigateTo({
					url:'./repair-order-item/repair-order-item?id='+id+"&type=repair"
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

				this.$ajax('MyServiceOrders',{
					status:status,
					offset:this.$utils.getOffset(this.page),
					mine:this.type=='all'?0:1
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

<style scoped>
	page{
		background:rgba(247,247,247,1);
	}

	/* // .page {
	// 	height: 87Vh;
	// 	width: 100vw;
	// }
	// .page.show {
	// 	overflow: hidden;
	// } */		

</style>

