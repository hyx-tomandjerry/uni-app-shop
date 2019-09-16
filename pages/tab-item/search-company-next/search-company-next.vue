<template>
	<view class="borderTop">
		<view class="search-container flex align-center bg-white">
			<view class="search-input flex-1 position_relative">
				<image src="../../../static/icon/icon-sousuo2.png" class="search-img"></image>
				<input type="number"
					   placeholder="请输入公司EID"
					   class="input-style"
					   v-model="eid"
					   :class="{
					   	'color-regular':!eid,
					   	'color-normal':eid
					   }"
					   autofocus="autofocus"
				>
				<image src="../../../static/icon/icon-search-guanbi@2x.png" class="close-img"></image>
			</view>
			<view style="width:10%;margin-left:10px;" @click="searchCompany">搜索</view>
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
				<view>公司地址</view>
				<view>
					<text v-if="companyObj.provinceName || companyObj.cityName ||companyObj.districtName">
						{{companyObj.provinceName}}{{companyObj.cityName}} {{companyObj.districtName}}{{companyObj.address ||''}}
					</text>
					<text v-else>暂无登记</text>
				</view>
			</view>
		</view>
		<view v-else class="noCompany">

		</view>
		<view class="btn-container" v-if="companyObj && tabbar">
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
		}
	}
</script>

<style lang="less">
	page{
		background-color: rgba(247,247,247,1);
	}
	.search-container{
		height:54px;
		line-height:34px;
		width:100%;
		padding:10px 15px 10px 15px;

	}
	.input-style{
		font-size:14px;
		height:34px;
		background:rgba(247,247,247,1);
		border-radius:17px;
		line-height:34px;
		padding-left: 33px;
	}
	.search-img{
		width: 17px;
		height: 17px;
		position:absolute;
		top:9px;
		left:9px;
	}
	.close-img{
		width: 17px;
		height: 17px;
		position:absolute;
		top:9px;
		right:9px;
	}
	.company-info-item{
		height:53px;
		line-height:53px;
		padding:0 12px 0 14px;
		display: flex;
		justify-content: space-between;
		font-size:14px;
		color:#2A2A2A;
	}
	.noCompany{
		min-height:550px;
		width:100%;
		background:url("../../../static/img/kongzhuangtai@2x.png") no-repeat center center;
		background-size:165px 113px;
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



