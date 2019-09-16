<template>
	<view class="borderTop position_relative">
		<view style="padding:20px 16px 10px;" class="bg-white margin-bottom-normal borderBottom">
			<view class="flex justify-between align-center" >
				<view class="position_relative" style="width:88%;">
					<input type="number" placeholder="搜索公司EID"  class="search-input" v-model="eid" @focus="hideTabbar">
					<image src="../../../static/icon/icon-yanshou-sousuo@2x.png" 
					class="search-img"></image>
				</view>
				<view class="font-size-big font-weight-normal color-placeholder" style="margin-left:6px;" @click="searchCompany">搜索</view>
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
		
		
		<view class="btn-container" v-if="tabbar">
			<view class="submit-btn font-size-big" @click="joinShop">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eid:'',
				companyObj:'',
				tabbar:true,
			}
		},
		methods: {
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
				if(!this.eid){
					uni.showToast({
						title:'请输入公司EID',
						icon:'none'
					})
				}else{
					this.$ajax('Customer',{
						eid:this.eid
					},res=>{
						if(res.id==0){
							uni.showToast({
								title:'公司不存在',
								icon:'none'
							})
							this.eid='';
							this.companyObj=''
						}else if(res.type==1){
							uni.showToast({
								title:'该公司是装修公司，不可加入',
								icon:'none'
							})
							this.eid=''
							this.companyObj=''
						}else{
							this.companyObj=res;
							this.showTabbar()
						}
						
					})
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
	}
	.search-input{
		background:rgba(247,247,247,1);
		border-radius:17px;padding-left:52px;height:34px;
	}
	.search-img{
		width:17px;height:17px;vertical-align: middle;position: absolute;left:22px;bottom:8px;
	}
	.search-close{
		width:17px;height:17px;vertical-align: middle;position: absolute;right:10px;bottom:8px;
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
