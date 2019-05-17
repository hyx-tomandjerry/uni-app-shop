<template>
	<view style="position:relative">
		<view class="shop-item  borderBottom bg-white" style="padding:14px 29px 18px 14px;">
			<view class="flex justify-between" style="margin-bottom:10px;">
				<view class="text-blue">
					<text style="font-size:30rpx;">门店信息</text>
				</view>
				<!--<view>-->
					<!--<text class="text-green cuIcon-friendfamous"></text>-->
					<!--<text style="margin-left:20rpx;" class="text-green" @click="showModal($event)"  data-target="RadioModal" >设置店长</text>-->
				<!--</view>-->
			</view>
			<view class="flex justify-start">
				<view>
					 <image :src="shopItem.coverurl"
					v-if="shopItem.coverurl"
					class="noManagePic"
					:class="{'shopImg':shopItem.managerName|| shopItem.telephone}"
					></image>
					<image src="../../../../static/img/default.png"
						v-else
						class="noManagePic"
						:class="{'shopImg':shopItem.contactor|| shopItem.telephone}"
					 ></image>

				</view>
				<view >
					<view class="shop-name flex justify-between" style="width:100%;">
						{{shopItem.name || ''}}
						<!-- <view style="font-size:12px;" class="line-blue">
							<text class="cuIcon-brand" style="margin-right:3px;"></text>
							<text>{{shopItem.catalogName}}</text>
						</view> -->
					</view>
					<view class="shop-desc" :class="{'hasManager':shopItem.contactor|| shopItem.telephone}" style="white-space: nowrap;" v-if="shopItem.contactor|| shopItem.telephone">
						<image src="../../../../static/icon/shop-list/icon-dianzhang@2x.png" class="img15"></image>
						<text style="margin-right:6px;">店长:{{shopItem.contactor}}</text>
						<text class="line-blue">|</text>
						<text style="margin-left:3px;"> {{shopItem.telephone}}</text>
					</view>
					<view class="shop-desc flex ">
						<image src="../../../../static/icon/addRepairDingwei.png" style="width:18px;height:18px;vertical-align: middle;margin-right:5px;"></image>
						<text>{{shopItem.provinceName  || '' }}{{shopItem.cityName  || '' }}{{shopItem.districtName  || ''}}{{shopItem.address || ''}}</text>

					</view>
				</view>
			</view>

		</view>
		<view  class=" cu-list menu menuBorder  sm-border  margin-top">
			<view class="cu-item position_relative" style="margin-bottom:20rpx;">
				<view class="content padding-tb-sm">
					<view class="flex justify-between">
						<view class="text-blue">
							<text style="font-size:30rpx;padding:5px;">店员信息</text>
						</view>
					</view>
					<scroll-view :scroll-y="true" class="page show" style="min-height:460px;">
						<view class="cu-list menu-avatar">
							<view class="cu-item" v-for="(item ,index) in userList" :key="index">
								<view class="cu-avatar lg" style="width:40px;height:40px;border-radius: 50%; background: #fff;border:1px solid #EEEEED"> 
								<image :src="item.headurl" v-if="item.headurl" 	style="width:30px;height:30px;"></image>
								<image 
								v-else
								style="width:30px;height:30px;"
								src="../../../../static/icon/client.png" mode=""></image>
								</view>
								<view class="content">
									<view >
										<text class="text-cut clerk-name">{{item.name}}</text>
									</view>
									<view class="text-gray text-sm flex clerk-desc" >
										<text style="margin-right:5px;">联系电话:</text><text>{{item.account}}</text>
									</view>
								</view>
								<view>
									<text class="cu-tag bg-green round" v-if="item.status==salemanStatus.normal" style="font-size:13px;">在职</text>
									<text class="cu-tag bg-orange round" v-if="item.status==salemanStatus.inviting" style="font-size:13px;">邀请中待确认</text>
									<text class="cu-tag round " style="background:#00BFFF;color:white" 
									v-if="item.status==salemanStatus.free" @click="SendInvitationEvent(item)">发送邀请</text>
								</view>
							</view>
						</view>
						
					</scroll-view>
				</view>

			</view>
		</view>


		<view class="cu-modal" :class="isShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content text-black">(店员录入)</view>
				</view>
				<view class="padding-xl">
					<form >
						<view class="flex justify-start bg-white"
						style="line-height:50px;height:50px;border-bottom:1px solid #EEEEED;">
							<view class="title" style="width:12%;"><text class="cuIcon-shop" style="font-size:15px;"></text></view>
							<view style="width:80%;text-align:center;" class="text-blue">{{shopItem.name}}</view>
						</view>
						<view class="cu-form-group">
							<view class="title"><image src="../../../../static/icon/shop-list/icon-dianzhang@2x.png" style="width:15px;height:15px;margin-right:15px;"></image></view>
							<input type="text" v-model="designer.name" 
							:style="{color:isWrongName?'red':'gray'}"
							@blur="checkNameEvent($event)"
							placeholder="请输入店员姓名">
						</view>

						<view class="cu-form-group position_relative">
							<view class="text-gray"><text class="cuIcon-mobile text-gray" style="font-size:22px;margin-right:15px;"></text></view>
							<input placeholder="请输入手机号" v-model="designer.telephone" 
							
							:style="{color:isWrongTel?'red':'gray'}"

							 type="phone" @blur="checkTelEvent($event)" />
						</view>
					</form>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-blue text-blue" @tap="hideModal()" style="margin-right:20px;border-radius:25px;">取消</button>
						<button class="cu-btn bg-blue text-white" @tap="recordUser()">确定</button>

					</view>
				</view>
			</view>
		</view>
		
		<image src="../../../../static/icon/add.png"
		style="position:fixed;right:12px;bottom:23px;width:68px;height:68px;z-index:100;" @click.stop="inviteJoin()"></image>
	</view>
</template>

<script>
	import popModal from '../../../../components/popmodal.vue'
	export default{
		data(){
			return{
				salemanStatus:this.$store.state.userStatus,
				modalName:null,
				radio: 'radio1',
				shopItem:'',
				isShow:false,
				designer:{
					name:'',
					telephone:''
				},
				manager:this.$store.state.userInfo,
				userList:[],//店员列表
				isWrongName:false,
				isWrongTel:false
			}
		},
		components:{
			popModal
		},
		methods:{
			SendInvitationEvent(item){
				this.$ajax('SendInvitation',{user:item.id},res=>{
					item.isSend=true;
					uni.showToast({
						title:'已发送短信邀请',
						icon:'none'
					})
				})
			},
			checkNameEvent(event){
				if(!event){
					this.isWrongName=true;
				}
			},
			//验证电话号码
			checkTelEvent(event){
				if(this.isWrongTel){
					this.isWrongTel=false;
				}
				if(event.detail.value){
					if(!(/^1[345678]\d{9}$/.test(event.detail.value))){
							this.isWrongTel=true;
						}
					}
					
				},
			//设置店长
			setShopManager(){},
			//邀请加入
			inviteJoin(){
				this.isShow=true;
				this.designer.name='';
				this.designer.telephone=''
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(){
				this.isShow=false;
			},

			RadioChange(e) {
				this.radio = e.detail.value
			},
			//获得门店详情
			checkShopDetail(id){
				this.$ajax('ProprietorShop',{id:id},res=>{
					this.shopItem=res;
				})
				this.$ajax('ShopSalesmen',{shop:id},res=>{
					res.forEach(item=>{
						item.isSend=false;
					})
					this.userList=res;
				})
			},
			//录入店员
			recordUser(){
				console.log(this.isWrongName,this.isWrongTel)
				if(!this.isWrongName && !this.isWrongTel){
					this.$ajax('Signup',{
						name:this.designer.name,
						mobile:this.designer.telephone,
						type:4,
						team:this.shopItem.id,
					},res=>{
						uni.showToast({
							title:'录入店员成功',
							icon:'none'
						});
						this.isShow=false;
						this.$ajax('ShopSalesmen',{shop:this.shopItem.id},res=>{
							this.userList=res;
						})
						
					})
				}

			}
		},
		onLoad(option){
		   if(option){
               this.checkShopDetail(option.shopID)
		   }
		}
	}
</script>

<style lang="less">
	
	.cu-list.menu-avatar>.cu-item .content{
		width:70%;
	}
	.cu-list.menu-avatar>.cu-item .action{
		width:25%;
	}
	.cu-list.menu-avatar>.cu-item{
		border-bottom:1px solid lightgray;
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
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1);
		margin-bottom:6px;
	}
	.hasManager{
		margin-bottom:10px !important
	}
	.shop-desc{
		font-size:14px;

		font-weight:400;
		color:rgba(137,136,136,1);
		margin-bottom:10px;
	}
	.img15{
		width:15px;
		height:19px;
		margin-right:5px;
		vertical-align: middle;
	}
	.clerk-desc{
		font-size:14px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(137,136,136,1);
	}
	.clerk-name{
		font-size:15px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1);
	}
	.ellipse{
		width:80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.padding-xl{
		border-top:1px solid #EEEEED;
		border-bottom:1px solid #EEEEED;
		padding:0;
	}
</style>
