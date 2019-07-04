<template>
	<view>
		<view class="shop-list bg-white borderTop" v-if="shopList.length>0">
			<view class="shop-list-item font-size-normal font-weight-normal borderBottom " v-for="(item,index) in shopList" :key="index">
				<image :src="TabCur==item.id?'../../../../static/icon/xuanze.png':'../../../../static/icon/duihao.png'" style="width:20px;height:20px;vertical-align: middle;" @click="chooseShop(item)"></image>
				<text style="margin-left:10px;">{{item.name}}</text>
			</view>
		</view>
		<view v-else class="borderTop">
			<LxEmpty></LxEmpty>
		</view>
		<uni-load-more :contentText="content" :showIcon="true" :status="loading"></uni-load-more>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import uniLoadMore from '../../../../components/uni-load-more.vue'
	import LxEmpty from '../../../../lx_components/lx-empty.vue'
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				shopList:[],
				articleID:'',
				page:1,
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				TabCur:0,
			}
		},
		components:{
			uniLoadMore,
			LxEmpty
		},
		onReachBottom(){
			this.page++;
			this.loading='loading';
			setTimeout(()=>{
				this.$ajax('ShopsByReport',{
					user:this.userInfo.id,
					id:this.articleID,
					offset:this.$utils.getOffset(this.page)
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
			},1000)
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				this.page=1;
				uni.stopPullDownRefresh();
				this.getReturnShop(this.articleID)
			},900)
		},
		methods: {
			chooseShop(shop){
				this.TabCur=shop.id;
				uni.navigateBack({
					delta:1,
					success:()=>{
						this.$fire.fire('articleShop',{
							id:this.TabCur,
							name:shop.name
						})
					}
				})
				
			},
			//获得要回值的门店
			getReturnShop(id){
				this.$ajax('ShopsByReport',{
					user:this.userInfo.id,
					id:id,
					offset:this.$utils.getOffset(this.page)
				},res=>{
					res.forEach(item=>{
						item.isCheck=false;
					})
					this.shopList=res;
					
				})
			},
		},
		onLoad(options){
			console.log(options)
			if(options.id){
				this.articleID=options.id;
				this.getReturnShop(options.id)
			}
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}
	.shop-list{
		padding:10px 15px;
		.shop-list-item{
			padding:10px 5px;
		}
	}
</style>
