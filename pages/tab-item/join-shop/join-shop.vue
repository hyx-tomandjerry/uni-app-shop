<template>
	<view class="borderTop">
		<view class="shop-container">
			<view v-if="shopList.length" >
				<block v-for="(item,index) in shopList" :key="index">
					<shopListItem :item="item" :index="index" type="join" @checkShopDetail="chooseShop" cat="search"></shopListItem>
				</block>
				<uni-load-more :contentText="content" :status="loading" :showIcon="true" v-if="shopList.length>5"></uni-load-more>
			</view>
			<view v-else>
				<LxEmpty></LxEmpty>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import LxEmpty from '../../../lx_components/lx-empty.vue'
	import shopListItem from '../../../components/shop/shop-list-item.vue'
	import uniLoadMore from '../../../components/common/uni-load-more.vue'
	import {ChainShopsApi,ApplyOrInvite2JoinApi} from '../../../api/common_api.js'
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				companyID:'',
				page:1,
				shopList:[],
				shopItem:'',
				searchObj:{
					brandID:'',
					zoneID:''
				},
				content:{
					contentdown: "下拉加载更多",
						contentrefresh: "正在加载...",
						contentnomore: "没有更多数据了"
					},
					loading:'more',


			}
		},
		components: {
			LxEmpty,
			shopListItem,
			uniLoadMore
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				this.searchShop()
			}
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				this.searchObj.brandID="";
				this.searchObj.zoneID=""
				this.page=1;
				this.getShopList();
				uni.stopPullDownRefresh()
			},800)

		},

		async onReachBottom(){
			this.page++;
			this.loading='loading';
			let val={
				owner:this.companyID,
				brand:this.searchObj.brandID?this.searchObj.brandID:0,
				zone:this.searchObj.zoneID?this.searchObj.zoneID:0,
				offset:this.$utils.getOffset(this.page)
			}
			let result = await ChainShopsApi(val)
			setTimeout(()=>{
				
				if(result==''){
					setTimeout(()=>{
						this.loading='noMore'
					},600)
				}else{
					result.forEach(item=>{
						this.shopList.concat(item)
					})
					this.loading = 'loading'
					setTimeout(() => {
						this.loading = 'noMore'
					}, 900)
				}
				
			},1000)
		},
		methods: {
			searchShop(){
				uni.navigateTo({
					url:"../search-shop/search-shop?id="+this.companyID
				})
			},

			 async confirmShop(){
				 let obj={
					 org:this.companyID,
					 shop:this.shopItem.id,
					 user:this.userInfo.id
				 }
				 if(await ApplyOrInvite2JoinApi(obj)==0){
					 this.$utils.showToast(`您已成功向${this.shopItem.name}发送请求,等待店长同意`)
					 setTimeout(()=>{
					 	uni.switchTab({
					 		url:"../index/index"
					 	})
					 },800)
				 }
			},
			chooseShop(item){
				this.shopItem=item;
				uni.showModal({
				    content: `确定要加入${item.name}?`,
				    success:(res)=> {
				        if (res.confirm) {
				           this.confirmShop()
				        } 
				    }
				});
			},

			async getShopList(){
				uni.showLoading({
					title:'加载中...'
				})
				let val={
					owner:this.companyID,
					offset:this.$utils.getOffset(this.page),
					brand:this.searchObj.brandID?this.searchObj.brandID:0,
					zone:this.searchObj.zoneID?this.searchObj.zoneID:0,
					onmap:0
				}
				uni.hideLoading();
				this.shopList = await ChainShopsApi(val)
			},
		},
		onShow(){
			this.$fire.on('seach',result=>{
				this.searchObj.brandID="";
				this.searchObj.zoneID=""
				this.searchObj={
					brandID:result.brandID?result.brandID:0,
					zoneID:result.zoneID?result.zoneID:0,
				}
				this.getShopList()
			})
		},
		onLoad(params){
			if(params.id){
				this.companyID=params.id;
				this.getShopList()
			}	
		}
	}
</script>

<style scoped>
	@import url("./join-shop.css");
</style>
