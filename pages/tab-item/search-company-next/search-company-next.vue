<template>
	<view class="borderTop">
		<view class="search-input flex justify-between align-center">
			<view class="eid-input"><input type="number" placeholder="请输入公司EID" v-model="eid"></view>
			<view class="color-regular search-btn" @click="searchCompany">搜索</view>
		</view>
		<view class="company-container borderTop bg-white"  v-if="companyObj">
			<view class="company-info-item borderBottom">
				<view>客户名称</view>
				<view>{{companyObj.name}}</view>
			</view>
			<view class="company-info-item borderBottom">
				<view>联系人</view>
				<view>{{companyObj.contactor}}</view>
			</view>
			<view class="company-info-item borderBottom">
				<view>联系电话</view>
				<view>{{companyObj.telephone}}</view>
			</view>
			<view class="company-info-item ">
				<view>地址</view>
				<view>
					<text v-if="companyObj.provinceName || companyObj.cityName ||companyObj.districtName">
						{{companyObj.provinceName}}{{companyObj.cityName}} {{companyObj.districtName}}{{companyObj.address ||''}}
					</text>
					<text v-else>暂无登记</text>
				</view>
			</view>
		</view>
		<view v-else class="noCompany" :style="{height:screenHeight+'px'}">
			
		</view>
		<common-btn-one v-if="companyObj && tabbar"
			content="确定"
			type="primary"
			@operateBtn="joinShop" :isPos="true"></common-btn-one>
	</view>
</template>

<script>
	import commonBtnOne from '../../../components/common/common-btn-one.vue'
	import {getCompanyInfoApi} from '../../../api/common_api.js'
	export default {
		components:{commonBtnOne},
		data() {
			return {
				eid:'',
				companyObj:'',
				tabbar:true,
				screenHeight:500
				
			}
		},
		methods: {
			getSystem(){
				uni.getSystemInfo({
					success: (res) => {
						this.screenHeight=res.windowHeight;
					}
				})
			},
			clearInput(){
				// // #ifdef APP-PLUS
				//  let webView=this.$mp.page.$getAppWebview();
				//  webView.setTitleNViewSearchInputText("")
				// // #endif
				this.eid=''
			},
			async searchCompany(){
				let result =await getCompanyInfoApi(this.eid);
				console.log(result)
				if(!result){
					this.clearInput()
					this.companyObj=''
				}
				this.companyObj=result;
				this.showTabbar()
			},
			hideTabbar(){
				this.tabbar=false;
			},
			showTabbar(){
				this.tabbar=true;
			},
			joinShop(){
				uni.navigateTo({
					url:"../join-shop/join-shop?id="+this.companyObj.id
				})

			},
		},
		onNavigationBarButtonTap(event) {
			if(event.index==0){
				this.clearInput()
			}
		},
		onNavigationBarSearchInputConfirmed(){
			if(!this.eid){
				this.$utils.showToast('请输入公司EID')
				return;
			}
			this.searchCompany()
		},
		onNavigationBarSearchInputChanged(event) {
			if(isNaN(event.text)){
				this.$utils.showToast('请输入数字')	
				this.clearInput()
			}else{
				this.eid=event.text
			}
			
		},
		onLoad(){
			this.getSystem()
		}
	}
</script>

<style scoped>
	page{
		background-color: rgba(247,247,247,1);
	}
	.company-container{
		border-top:26upx solid #EEEEED;
	}
	.company-info-item{
		height:106upx;
		line-height:106upx;
		padding:0 24upx 0 28upx;
		display: flex;
		justify-content: space-between;
		font-size:14px;
		color:#2A2A2A;
	}
	.noCompany{
		width:100%;
		background:url("../../../static/img/kongzhuangtai@2x.png") no-repeat center center;
		background-size:165px 113px;
	}
	.search-input{
		padding:6upx 0 6upx 20upx;
		background:#FFFFFF;
		border-bottom:1px solid #EEEEED;
	}
	.eid-input{
		width:100%;
		/* padding-bottom:20upx;
		border-bottom:1px solid #EEEEED; */
	}
	.eid-input>input{
		background:rgba(247,247,247,1);
		border-radius:17px;
		height:68upx;
		padding-left:20upx;
		color:#898888
	}
	.search-btn{
		width:60px;
		text-align: center;
	}
</style>



