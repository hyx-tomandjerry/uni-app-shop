<template>
	<view>
		<!-- <view class="operateItem" style="border-top:1px solid lightgray;border-bottom:1px solid rgba(233,233,233,1);padding-top:10px;">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus()" @blur="InputBlur()" :adjust-position="false" type="text" placeholder="输入门店姓名" confirm-type="search" />
				</view>
			</view>
		</view> -->


		<view style="background:#fff;">
			<scroll-view scroll-y="true" >
				<view class="shop-item flex justify-start borderBottom"  :key="index" v-for="(item,index) in shopList"
					  style="padding:24px 10px 18px 14px;" @click="checkShopDetail(item)">
					<view style="width:30%;"> 
						<image
						v-if="item.coverurl"
						:src="item.coverurl" class="noManagePic" :class="{' shopImg':item.contactor || item.managerName}">
						</image>
						<image
						v-else src="../../../../static/img/default.png"
						 class="noManagePic" :class="{' shopImg':item.contactor || item.telephone}">
						</image>
					</view>
					<view style="width:70%">
						<view class="shop-name" style="position:relative"
						:class="{'noManager':item.contactor || item.telephone}">
							{{item.name}}
							<view style="position:absolute;right:50px;top:2px; font-size:12px;color:#1296DB" v-if="item.catalogName">
								<text class="cuIcon-brand line-blue"></text>{{item.catalogName}}
							</view>
						</view>
						<view class="shop-desc" style="white-space: nowrap;" v-if="item.contactor || item.telephone">
							<image src="../../../../static/icon/shop-list/icon-dianzhang@2x.png" style="width:15px;height:15px;vertical-align: middle;margin-right:5px;"></image>
							<text style="margin-right:6px;">店长:{{item.contactor}}</text><text class="text-blue">|</text><text style="margin-left:3px;"> {{item.telephone}}</text>
						</view>
						<view class="shop-desc">
							<image src="../../../../static/icon/addRepairDingwei.png" class="img15"></image>
							<text class="ellipse" >
								{{item.provinceName || ''}}{{item.cityName  || ''}}{{item.districtName  || ''}}{{item.address||''}}
							</text>

						</view>
					</view>
				</view>
				
			</scroll-view>

		</view>
		<image src="../../../../static/icon/add.png"
		style="position:fixed;right:12px;bottom:23px;width:68px;height:68px;z-index:100;" @click="recordShop()"></image>
	</view>
</template>

<script>
var _this;
import headTab from '../../../../components/head-tab.vue'
	export default {
		data() {
			return {
				title:'门店列表',
				CustomBar:0,
				inputValue:0,
				shopList:[],
				fromType:'',//判断从快递还是从我的门店
			};
		},
		components:{
			headTab
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			InputFocus(e) {
				this.inputValue = e.detail.height
			},
			InputBlur(e) {
				this.inputValue = 0
			},
			searchShop(e) {
				let key = e.detail.value.toLowerCase();
				let list = this.icon;
				for (let i = 0; i < list.length; i++) {
					let a = key;
					let b = list[i].name.toLowerCase();
					if (b.search(a) != -1) {
						list[i].isShow = true
					} else {
						list[i].isShow = false
					}
				}
				this.icon = list
			},
			systemInfo(){
				uni.getSystemInfo({
					success: (res) => {
						this.CustomBar=res.windowTop
					}
				})
			},
			
			recordShop(){
				uni.navigateTo({
					url:'../record-shop/record-shop'
				})
			},
			checkShopDetail(item){
				//查看门店人员列表
				uni.navigateTo({
					url:'../clerk-list/clerk-list?shopID='+item.id
				})
			},
			//获得门店列表
			getShopList(){
				this.$ajax('MyShops',{address:''},res=>{
					this.shopList=res;
				})
			}
		},
		onLoad(options){
		
			this.systemInfo();
			this.getShopList();
			this.$fire.on('record-shop',res=>{
				this.getShopList()
			})
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
	}
.header-content{
		padding:15px 14px;
		border-bottom:0.5px solid #EEEEED;
		.header-title{
			font-size:16px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:rgba(42,42,42,1);
		}
		.headers-submit{
			font-size:14px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(66,176,237,1);
		}
	}
	.cu-bar .search-form{
		margin-right:15px;
		margin-left:10px;
	}
	.shopImg{
		width:103px;
		height:79px;
		margin-right:17px;
	}
	.noManagePic{
		width:95px !important;
		height:71px !important;
		margin-right:17px;
	}
	.shop-name{
		font-size:16px;
		font-family:'PingFangSC-Regular';
		font-weight:400;
		color:rgba(42,42,42,1);
		margin-bottom:20px;

	}
	.shop-desc{
		font-size:14px;
		display: flex;
		font-weight:400;
		color:rgba(137,136,136,1);
		margin-bottom:10px;
	}
	.img15{
		width:15px;
		height:19px;
		vertical-align: middle;
		margin-right:5px;
	}
	.record-shop{
		font-size:17px;
		font-family:'PingFangSC-Regular';
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.noManager{
		margin-bottom:10px !important;
	}
	.ellipse{
		width:80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
