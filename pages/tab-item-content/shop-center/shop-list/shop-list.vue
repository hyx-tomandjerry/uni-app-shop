<template>
	<view>
		<view class="header-content flex justify-between bg-white bg-white">
			<view><text class="cuIcon-back" style="font-size:20px;" @click="goBack()"></text></view>
			<view><text class="header-title">门店列表</text></view>
			<view></view>
		</view>
		<view class="operateItem" style="border-top:1px solid lightgray;border-bottom:1px solid rgba(233,233,233,1);">
			<view class="cu-bar search bg-white">
				<!--<view class="action">-->
					<!--<text>广州</text>-->
					<!--<text class="cuIcon-triangledownfill"></text>-->
				<!--</view>-->
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus()" @blur="InputBlur()" :adjust-position="false" type="text" placeholder="输入门店姓名" confirm-type="search" />
				</view>
			</view>
		</view>


		<view style="background:#fff;">
			<scroll-view scroll-y="true" >
				<view class="shop-item flex justify-start borderBottom"  :key="index" v-for="(item,index) in shopList"
					  style="padding:24px 20px 18px 14px;" @click="checkShopDetail(item)">
					<view>
						<image
						v-if="item.coverurl"
						:src="item.coverurl" class="noManagePic" :class="{' shopImg':item.managerMobile || item.managerName}">
						</image>
						<image
						v-else src="../../../../static/img/default.png"
						 class="noManagePic" :class="{' shopImg':item.managerMobile || item.managerName}">
						</image>
					</view>
					<view style="width:100%">
						<view class="shop-name" style="position:relative"
						:class="{'noManager':item.managerMobile || item.managerName}">
							{{item.name}}
							<view style="position:absolute;right:50px;top:2px; font-size:12px;color:#1296DB" v-if="item.catalogName">
								<text class="cuIcon-brand line-blue"></text>{{item.catalogName}}
							</view>
						</view>
						<view class="shop-desc" style="white-space: nowrap;" v-if="item.managerName || item.managerMobile">
							<image src="../../../../static/icon/shop-list/icon-dianzhang@2x.png" class="img15"></image>
							<text style="margin-right:3px;">店长:TomAndJerry</text>|<text style="margin-left:3px;"> 19939290499</text>
						</view>
						<view class="shop-desc">
							<image src="../../../../static/icon/addRepairDingwei.png" class="img15"></image>
							<text class="ellipse" >{{item.provinceName || ''}}{{item.cityName  || ''}}{{item.districtName  || ''}}{{item.address||''}}</text>

						</view>
					</view>
				</view>
				<button class="cu-btn block bg-blue margin-tb-sm lg" style="position:fixed;bottom:23px;z-index:100;width:100%;padding:8px 0;" @click="recordShop()">
					<text class="record-shop" >录入门店</text>
				</button>
			</scroll-view>

		</view>
	</view>
</template>

<script>
var _this;
	export default {
		data() {
			return {
				CustomBar:0,
				inputValue:0,
				shopList:[]
			};
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
				_this=this;
				uni.getSystemInfo({
					success: (res) => {
						_this.CustomBar=res.windowTop
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
			    uni.request({
					url:this.$store.state.url+'ProprietorShops',
					data:{
					 //    owner:this.$store.state.userInfo.owner,
						// userId:this.$store.state.userInfo.id
						owner:18,
						userId:49,
						catalog:-1
					},
					success:(res)=>{
					    this.shopList=res.data.data;
					}
				})
			}
		},
		onLoad(){
			this.systemInfo();
			this.getShopList();
		}
	}
</script>

<style lang="less">
.header-content{
		padding:15px 14px;
		border-bottom:1px solid #EEEEED;
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
