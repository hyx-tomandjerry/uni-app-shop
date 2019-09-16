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
				<view style="margin-right:15px;" @click="searchShop">筛选</view>
			</block>
		</cu-custom>
		<view class="borderTop input-container">

			<!--<searchInput :placeholder="'请输入门店名称'" @getSearchList="getSearchList"-->
						 <!--:searchImg="'../../../static/icon/icon-sousuo2.png'"></searchInput>-->
		</view>



		<view v-if="shopList.length">

			<scroll-view scroll-y="true" >
				<view class="shop-list-item flex justify-start align-center bg-white" v-for="(item,index) in shopList"
					  :key="index" @click="chooseShop(item)">

					<view class="shop-img-area">
						<image :src="item.coverurl?item.coverurl:'../../../static/img/default.png'" class="shop-img"></image>
					</view>
					<view class="shop-info-area flex-1 " >
						<view class="flex justify-start font-size-normal font-weight-bold align-center">
							<view class=" text-ellipse flex-litter">{{item.name || ''}}</view>
							<view>({{item.brandName || ''}})</view>
							<image src="../../../static/img/shop/businessing.png" class="shop-tag" v-if="item.status==shopStatusZn.businessing"></image>
							<image src="../../../static/img/shop/ready.png" class="shop-tag" v-if="item.status==shopStatusZn.ready"></image>
							<image src="../../../static/img/shop/processing.png" class="shop-tag" v-if="item.status==shopStatusZn.processing"></image>
							<image src="../../../static/img/shop/canceled.png" class="shop-tag-canceled" v-if="item.status==shopStatusZn.canceled"></image>
							<image src="../../../static/img/shop/renovated.png" class="shop-tag-canceled" v-if="item.status==shopStatusZn.renovated"></image>
							<image src="../../../static/img/shop/moved.png" class="shop-tag-canceled" v-if="item.status==shopStatusZn.moved"></image>
						</view>

						<view class="font-size-litter color-regular " style="margin:7px 0;width:75%">
							<text style="margin-right:7px;">店长:</text>{{item.managerName || ''}}/{{item.managerMobile || ''}}
						</view>
						<view class="font-size-litter color-regular text-ellipse " style="width:75%;">
							<text style="margin-right:7px;">地址:</text>{{item.provinceName || ''}}{{item.cityName || ''}}{{item.districtName||''}}{{item.address}}
						</view>
					</view>

				</view>
			</scroll-view>
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

	import searchInput from '../../../components/search-input.vue'
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
				}

				
			}
		},
		components: {
			LxEmpty,
			showModel,
			simpleModel,
			searchInput
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
				this.$ajax('Signup',{
					owner:this.companyID,
					name: this.userInfo.name,
					mobile: this.userInfo.mobile,
					type: this.shoperObj.type,
					team: this.shopItem.id
				},res=>{
					uni.showToast({
						title:`您已成功加入${this.shopItem.name}门店`,
						icon:'none'
					})
					this.hideModel();
					setTimeout(()=>{
						uni.switchTab({
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

<style lang="less">

	@import "../../../static/css/demo";

	page{
		background:rgba(247,247,247,1);
	}





	.shop-list-item{
		margin-bottom:13px;
		padding:18px 10px 23px 14px;
		width:100%;
		.shop-img-area{
			width:30%;
			margin-right: 10px;
			.shop-img{

				height:86px;
				border-radius:6px;
			}
		}
		.shop-info-area{
			margin-top:-10px;
			.shop-tag{
				width:18px;
				height: 18px;
				margin-left: 5px;
			}
			.shop-tag-canceled{
				width: 56px;
				height: 18px;
				margin-left: 5px;
			}
		}

	}
</style>
