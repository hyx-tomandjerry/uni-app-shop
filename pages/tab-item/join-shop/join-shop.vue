<template>
	<view >
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left">
				<view class="font-size-back color-regular cuIcon-back" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-weight-bold font-size-big color-normal">
					加入门店
				</view>
			</block>
			<block slot="right">
				<view style="width:100px;padding-right:10px; " class="font-size-normal text-right" @click="searchShop">筛选</view>
			</block>
		</cu-custom>
		<view v-if="shopList.length">

			<block v-for="(item,index) in shopList" :key="index">
				<shopListItem :item="item" :index="index" type="join" @checkShopDetail="chooseShop" cat="search"></shopListItem>
			</block>
			<uni-load-more :contentText="content" :status="loading" :showIcon="true" ></uni-load-more>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>
		<showModel :isShow="modelName=='shop'" @hideModel="hideModel" @confirmDel="confirmShop" v-if="modelName=='shop'">
			<block slot="content">确定加入<text class="color-blue">{{shopItem.name}}</text>吗?</block>
		</showModel>
		<simpleModel :isShow="modelName=='exit'" @hideModel="hideModel" v-if="modelName=='exit'">
			<block slot="content">你已经加入该门店，不可重复操作！</block>
		</simpleModel>


	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import LxEmpty from '../../../lx_components/lx-empty.vue'
	import showModel from '../../../components/show-model.vue'
	import simpleModel from '../../../components/simple-model.vue'
	import shopListItem from '../../../components/shop-list-item.vue'
	import searchInput from '../../../components/search-input.vue'
	import uniLoadMore from '../../../components/uni-load-more.vue'
	export default {
		computed:mapState(['userInfo','constants','shopStatusZn','shoperObj']),
		data() {
			return {
				companyID:'',
				page:1,
				shopList:[],
				modelName:'',
				shopItem:'',
				searchObj:{
					brandID:'',
					zoneID:''
				},
				content:{
					contentdown: "",
						contentrefresh: "正在加载...",
						contentnomore: "没有更多数据了"
					},
					loading:'more',


			}
		},
		components: {
			LxEmpty,
			showModel,
			simpleModel,
			searchInput,
			shopListItem,
			uniLoadMore
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this.page=1;
				this.getShopList();
			},800)

		},

		onReachBottom(){
			this.page++;
			this.loading='loading';
			setTimeout(()=>{
				this.$ajax('ChainShops',{
					owner:this.companyID,
					brand:this.searchObj.brandID?this.searchObj.brandID:0,
					zone:this.searchObj.zoneID?this.searchObj.zoneID:0,
					offset:this.$utils.getOffset(this.page)
				},res=>{
					if(res==''){
						setTimeout(()=>{
							this.loading='noMore'
						},600)
					}else{
						res.forEach(item=>{
							this.shopList.concat(item)
						})
						this.loading = 'loading'
						setTimeout(() => {
							this.loading = 'noMore'
						}, 900)
					}
				})
			},1000)
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			searchShop(){
				uni.navigateTo({
					url:"../search-shop/search-shop?id="+this.companyID
				})
			},

			confirmShop(){
				this.$ajax('ApplyOrInvite2Join',{
					owner:0,
					org:this.companyID,
					shop:this.shopItem.id,
					user:this.userInfo.id
					// owner:this.companyID,
					// name: this.userInfo.name,
					// mobile: this.userInfo.mobile,
					// type: this.shoperObj.type,
					// team: this.shopItem.id
				},res=>{
					uni.showToast({
						title:`您已成功向${this.shopItem.name}发送请求,等待店长同意`,
						icon:'none'
					})
					this.hideModel();
					setTimeout(()=>{
						uni.reLaunch({
							url:"../index/index"
						})
					},800)
				},true,code=>{
					if(code==-31){
						this.modelName='exit'
					}

				})
			},
			chooseShop(item){
				this.shopItem=item;
				this.modelName='shop';

			},
			hideModel(){
				this.modelName=null;

			},
			getShopList(){
				this.$ajax('ChainShops',{
					owner:this.companyID,
					offset:this.$utils.getOffset(this.page),
					brand:this.searchObj.brandID?this.searchObj.brandID:0,
					zone:this.searchObj.zoneID?this.searchObj.zoneID:0,
				},res=>{
					this.shopList=res;
				})
			},
		},
		onLoad(params){
			if(params.id){
				this.companyID=params.id;
				this.getShopList()
			}
			this.$fire.on('seach',result=>{
				this.searchObj={
					brandID:result.brandID?result.brandID:0,
					zoneID:result.zoneID?result.zoneID:0,
				}
				this.getShopList()
			})

		}
	}
</script>

<style scoped>
	@import url("./join-shop.css");
</style>
