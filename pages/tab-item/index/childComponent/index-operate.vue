<template>
	<view class="operateItem">
		<view v-for="(item,index) in options" :key="index" @click="operateItem(item)" style="position: relative;">
			<view>
				<image :src="item.image"
				:class="{
					'operateIcon':index==0 || index==3,
					'repairImg':index==1 || index==2
				}"
			></image></view>
			<view>{{item.text}}</view>
			<image src="../../../../static/img/try.png" mode="widthFix" class="try-img" v-if="authorArr.includes(item.author)"></image>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import {getShopList} from '../../../../api/common_api.js'
	export default{
		data(){
			return {
				options:[
					{image:'../../../static/img/index/index-shop.png',text:'我的门店',value:'shop'},
					{image:'../../../static/img/index/index-repair.png',text:'门店报修',value:'repair',author:this.config.tryZn.decorate},
					{image:'../../../static/img/index/index_work.png',text:'任务管理',value:'work'},
					{image:'../../../static/img/index/index_apply.png',text:'工作申请',value:'apply',},
					// {image:'../../../static/img/index/index-express.png',text:'快递包裹',value:'express',author:this.config.tryZn.express},
					// {image:'../../../static/img/index/index-statistics.png',text:'销售绩效',value:'statistics',author:this.config.tryZn.sale},
					]
			}
		},
		computed:mapState(['shopCount','shopOnlyObj','authorArr']),
		methods:{
			//获得门店数量
			async getShopCount(){
				let result=await getShopList();
				this.setShopCount(result.length);
				if(result.length==1) this.setShopOnlyObj(result[0])
			},
			operateItem(item){
				this.getShopCount()
				if(this.shopCount==1){
					//只有一个门店
					switch(item.value){
						
						case 'repair':
						if(this.authorArr.includes(this.config.tryZn.decorate) || this.authorArr.includes(this.config.authorZn.decorate)){
							//正在试用或者已经购买了
							uni.navigateTo({
								url:'../../tab-item-content/shop-center/shop-center?type=all&id='+this.shopOnlyObj.id
							})
						}else{
							//没有购买
							uni.showModal({
								content:'目前尚未购买该功能'
							})
						}
						break;
						case 'express':
							if(this.authorArr.includes(this.config.authorZn.express) || this.authorArr.includes(this.config.tryZn.express)){
								uni.navigateTo({
									url:'../../tab-item-content/work-center/express-center/express-index/express-index?id='+this.shopOnlyObj.id
								})
							}else{
								uni.showModal({
									content:'目前尚未购买该功能'
								})
							}
							
						break;
						case 'shop':
							uni.navigateTo({
								url:"../../tab-item-content/shop-center/clerk-list/clerk-list?shopID="+this.shopOnlyObj.id
							})
						break;
						case "work":
						uni.navigateTo({
							url:"../../tab-item-content/work-center/task-center/task-index/task-index"
						})
						//任务管理
						break;
						case "apply":
						uni.navigateTo({
							url:'../../tab-item-content/work-center/work-apply-center/work-apply-index/work-apply-index'
						})
						//任务管理
						break;
						case 'statistics':
						if(this.authorArr.includes(this.config.authorZn.sale) || this.authorArr.includes(this.config.tryZn.sale)){
							uni.navigateTo({
								url:"../../tab-item-content/work-center/statistics-center/shop-statistics-item/shop-statistics-item?id="+this.shopOnlyObj.id
							})
						}else{
							uni.showModal({
								content:'目前尚未购买该功能'
							})
						}
						break;
					}
				}else{
					//有多条门店
					switch(item.value){
						case 'repair':
							if(this.authorArr.includes(this.config.tryZn.decorate) || this.authorArr.includes(this.config.authorZn.decorate)){
								uni.navigateTo({
									url:'../../tab-item-content/shop-center/shop-list/shop-list?type=repair'
								})
							}else{
								uni.showModal({
									content:"目前尚未购买该功能"
								})
							}
							
						break;
						case 'express':
							if(this.authorArr.includes(this.config.authorZn.express) || this.authorArr.includes(this.config.tryZn.express)){
								uni.navigateTo({
									url:'../../tab-item-content/shop-center/shop-list/shop-list?type=express'
								})
							}else{
								uni.showModal({
									content:"目前尚未购买该功能"
								})
							}
							
						break;
						case 'shop':
						uni.navigateTo({
							url:'../../tab-item-content/shop-center/shop-list/shop-list?type=shop'
						})
						break;
						case "work":
						uni.navigateTo({
							url:"../../tab-item-content/work-center/task-center/task-index/task-index"
						})
						//任务管理
						break;
						case "apply":
						uni.navigateTo({
							url:'../../tab-item-content/work-center/work-apply-center/work-apply-index/work-apply-index'
						})
						case 'statistics':
							if(this.authorArr.includes(this.config.authorZn.sale) || this.authorArr.includes(this.config.tryZn.sale)){
								uni.navigateTo({
									url:'../../tab-item-content/shop-center/shop-list/shop-list?type=statistics'
								})
							}else{
								uni.showModal({
									content:"目前尚未购买该功能"
								})
							}
							
						break;
					}	
				}
			},
			...mapMutations(['setShopCount','setShopOnlyObj'])
		}
	}
</script>

<style scoped>
	.repairImg{
		width: 120upx;
		height: 120upx;
		flex-shrink: 0;
	}
	.operateIcon{
		width: 116upx;
		height: 116upx;
		flex-shrink: 0;
	}
	.operateItem{
		padding-top:16px;
		padding-left:10px;
		padding-right:9px;
		display: flex;
		justify-content: space-between;
	}
	.try-img{
		width:20px;
		height:20px !important;
		position:absolute;
		top:0;
		right:0;
	}
</style>
