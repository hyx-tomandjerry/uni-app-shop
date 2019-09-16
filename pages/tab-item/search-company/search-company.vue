<template>
	<view class="borderTop">
		<view class="search-container">
			<view class="serch-intro">
				<view class="title">加入你的团队</view>
				<view class="color-regular">你可以通过以下方式，加入你的团队。</view>
			</view>
			<view class="input-container flex justify-between align-center" @click="searchCompany">
				<view class="flex justify-start align-center">
					<image src="../../../static/img/sousuo.png" class="search-img"></image>
					<view class="font-size-big">搜索团队号EID加入</view>
				</view>
				<view >
					<image src="../../../static/icon/search-right.png" class="search-icon" ></image>
				</view>
			</view>
		</view>
		
		<view class="company-container" v-if="companyObj">
			<view class="company-container-item flex justify-between borderBottom">
				<view>公司名称</view>
				<view>{{companyObj.name}}</view>
			</view>
			<view class="company-container-item flex justify-between borderBottom">
				<view>联系人</view>
				<view>{{companyObj.contactor}}</view>
			</view>
			<view class="company-container-item flex justify-between borderBottom">
				<view>联系电话</view>
				<view>{{companyObj.telephone}}</view>
			</view>
			<view class="company-container-item flex justify-between borderBottom">
				<view>公司地址</view>
				<view>
					<text v-if="companyObj.provinceName || companyObj.cityName ||companyObj.districtName">
						{{companyObj.provinceName}}{{companyObj.cityName}} {{companyObj.districtName}}{{companyObj.address ||''}}
					</text>
					<text v-else>暂无登记</text>
				</view>
			</view>
		</view>
		
		<view class="btn-container" v-if="companyObj && tabbar">
			<view class="submit-btn font-size-big" @click="joinShop">确定</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				eid:'',
				companyObj:'',
				tabbar:true,
			}
		},
		components:{
			
		},
		onLoad(){
			
		},
		methods:{
			joinShop(){
				uni.navigateTo({
					url:"../join-shop/join-shop?id="+this.companyObj.id
				})
				
			},
			hideTabbar(){
				this.tabbar=false;
			},
			showTabbar(){
				this.tabbar=true;
			},
			searchCompany(){
				uni.navigateTo({
					url:"../search-company-next/search-company-next"
				})

			}
		}
	}
</script>
<style lang="less">
		page{
			background-color: #fff;
		}
		.search-container{
			padding-top:27px;
			padding-left:23px;
			.serch-intro{
				margin-bottom: 39px;
				.title{
					font-size:27px;
					font-weight: bold;
					margin-bottom: 3px;
				}
			}
			
		}
		.input-container{
			margin-right: 26px;
			padding-bottom: 18px;
			border-bottom:1px solid #EEEEED;
			.search-img{
				width: 50px;
				height: 50px;
				vertical-align: middle;
				margin-right: 18px;
			}
			.search-icon{
				width: 13px;
				height: 13px;
			}
		}
		.company-container{
			.company-container-item{
				padding:18px 12px 15px 14px;
			}
		}
		.btn-container{
			padding-right:12px;
			padding-left:15px;
			text-align: center;
			width:100%;
			position:fixed;
			bottom:22px;
			.submit-btn{
				height:40px;
				line-height:40px;
				background:rgba(66,176,237,1);
				border-radius:5px;
				color:#fff;
			}
		}
</style>