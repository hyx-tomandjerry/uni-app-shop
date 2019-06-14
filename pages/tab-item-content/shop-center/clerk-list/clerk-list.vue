<template>
	<view style="position:relative">
		<view class="shop-item  borderBottom bg-white" style="padding:14px 29px 18px 14px;">
			<view class="flex justify-between" style="margin-bottom:10px;">
				<view class="text-blue">
					<text style="font-size:30rpx;">门店信息</text>
				</view>
			</view>
			<view class="flex justify-start align-center">
				<view>
					 <image :src="shopItem.coverurl"
					v-if="shopItem.coverurl"
					class="noManagePic"
					@click.stop="showModal($event)"
					data-target="imageModal"
					:class="{'shopImg':shopItem.managerName|| shopItem.telephone}"
					></image>
					<image src="../../../../static/img/default.png"
						v-else
						class="noManagePic"
						:class="{'shopImg':shopItem.contactor|| shopItem.telephone}"
					 ></image>

				</view>
				<view >
					<view class="  font-size-big font-weight-normal color-normal" style="margin-bottom:4px;" >
						{{shopItem.name || ''}} <text v-if="shopItem.brandName" style="margin-left:6px;" class="text-blue">({{shopItem.brandName}})</text> 
					</view>
					
					<view class="  font-size-small font-weight-normal color-placeholder flex justify-start" style="margin-bottom:4px;">
						<view v-if="shopItem.zoneName"><text style="margin-right:5px;">区域:</text>{{shopItem.zoneName || ''}} </view>
						<view v-if="shopItem.catalog !=0">
							<text style="margin-right:5px;margin-left:15px;">经营类别:{{shopItem.catalog | operateZn}}</text>
						</view>
						
					</view>
					
					
					<view class=" flex font-size-small font-weight-normal  color-placeholder" style="margin-bottom:5px;" v-if="shopItem.managerName">
						<image src="../../../../static/icon/client.png" style="width:13px;height:13px;vertical-align: middle;margin-right:2px;"></image>
						<view><text>{{shopItem.managerName || ''}}</text><text class="text-blue">|</text><text>{{shopItem.managerMobile || ''}}</text></view>
					</view>
					<view class=" flex font-size-small font-weight-normal color-placeholder">
						<image src="../../../../static/icon/addRepairDingwei.png" style="width:12px;height:15px;vertical-align: middle;margin-right:5px;"></image>
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
								<view class="cu-avatar lg" style="width:40px;height:40px; background: #fff;">
								<image :src="item.headurl" v-if="item.headurl" 	style="width:40px;height:40px;border-radius: 50%;"></image>
								<image
								v-else
								style="width:40px;height:40px;"
								src="../../../../static/icon/client.png" mode=""></image>
								</view>
								<view class="content">
									<view >
										<text class="text-cut clerk-name">{{item.name}}</text>
										<text class="font-size-litter font-weight-normal text-blue" style="margin-left:4px;"> {{shopItem.manager ==item.id?'（店长）' :''}}</text>
									</view>
									<view class="text-gray text-sm flex clerk-desc" >
										<text style="margin-right:5px;">联系电话:</text><text>{{item.account}}</text>
									</view>
								</view>
								<view>
									<text class="cu-tag bg-green round" v-if="item.status==salemanStatus.normal" style="font-size:13px;padding:0 20px;">
										在职
									</text>
									<text class="cu-tag bg-orange round" v-if=" item.status==salemanStatus.inviting" style="font-size:13px;">邀请中待确认</text>
									<text
										v-if=" item.status==salemanStatus.free" @click="SendInvitationEvent(item)">
										<text v-if="shopItem.manager == userInfo.id" class="cu-tag round " style="background:#00BFFF;color:white">发送邀请</text>
										<text v-else></text>
									</text>
								</view>
							</view>
						</view>

					</scroll-view>
				</view>

			</view>
		</view>


		<view class="cu-modal" :class="isShow?'show':''" >
			<view class="position_absolute" style="right:65px;top:248px;z-index:100;" @click="hideModal()">
				<image src="../../../../static/img/record-close.png" style="width:26px;height:26px;"></image>
			</view>
			<view class="cu-dialog">
				
				<view class=" bg-white justify-end borderBottom" style="padding:14px 0 8px;">
					<view class=" font-weight-bold font-size-small color-normal">{{shopItem.name}}({{shopItem.brandName}})</view>
					
				</view>
				<view style="padding-bottom:20px" class="bg-white">
						
						<view class="flex justify-start bg-white " style="padding-top:22px;padding-left:14px;">
							<view style="margin-right:5px;width:11%;margin-top:4px;">
								<image src="../../../../static/img/record-name.png" style="width:26px;height:26px;vertical-align: middle;"></image>
							</view>
							<input type="text" v-model="designer.name" style="box-shadow:0px 1px 4px 1px rgba(227,227,227,0.5);
border-radius:18px;height:35px;line-height:25px;padding-left:13px;width:78%;text-align:left"
								placeholder="请输入店员姓名"  class="join-modal-input">
						</view>

						<view class="flex justify-start bg-white " style="padding-top:17px;padding-left:14px;">
							<view style="margin-right:5px;width:11%;margin-top:4px;">
								<image src="../../../../static/img/record-shouji.png" style="width:26px;height:26px;vertical-align: middle;"></image>
							</view>
							<input type="text" v-model="designer.telephone"
								class="join-modal-input"
								style="box-shadow:0px 1px 4px 1px rgba(227,227,227,0.5);
								border-radius:18px;height:35px;line-height:25px;padding-left:13px;width:78%;text-align:left"
								placeholder="请输入手机号"  @blur="checkTelEvent(designer.telephone)">
						</view>
				</view>
				<view class="bg-white" style="padding:0 13px 15px;">
					
					<button 
					style="border-radius: 5px;"
					class=" bg-blue text-white font-size-small font-weight-normal" size="default" @tap="recordUser()">确定录入</button>
					
				</view>
			</view>
			
		</view>

		<image src="../../../../static/icon/add.png"
		v-if="shopItem.manager==userInfo.id"
		style="position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;" @click.stop="inviteJoin()"></image>

		<view class="cu-modal" :class="modalName=='imageModal'?'show':''">
			<view class="cu-dialog">
				<image :src="shopItem.coverurl" @click="hideModal()"></image>
			</view>
		</view>

		<view class="cu-modal" :class="secondModal=='nameModal'?'show':''" @click.stop="hideSecondModal()">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-center">
					<view class=" font-size-litter font-weight-normal">请输入店员姓名</view>
				</view>

			</view>
		</view>
		<view class="cu-modal" :class="secondModal=='telModal'?'show':''" @click.stop="hideSecondModal()">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-center">
					<view class=" font-size-litter font-weight-normal">电话号码不存在</view>
				</view>

			</view>
		</view>
		<view class="cu-modal" :class="secondModal=='exist'?'show':''" @click.stop="hideSecondModal()">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">工作关系已经存在,不能反复邀请或申请</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import popModal from '../../../../components/popmodal.vue'
	import {mapState} from 'vuex';
	export default{
	    computed:mapState(['userInfo']),
		data(){
			return{
				salemanStatus:this.$store.state.userStatus,
				modalName:null,
				secondModal:null,
				radio: 'radio1',
				shopItem:'',
				isShow:false,
				designer:{
					name:null,
					telephone:null
				},

				userList:[],//店员列表
				// userInfo:''
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
					this.$ajax('ShopSalesmen',{shop:this.shopItem.id},res=>{
						this.userList=res;
					})
				})



			},
			checkNameEvent(event){
				if(!event){
					// this.isWrongName=true;
				}
			},
			//验证电话号码
			checkTelEvent(event){

				if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(event))){
					console.log('llllll')
					this.secondModal='Modal'
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
				if(this.isShow){
					this.isShow=false;
				}
				if(this.modalName){
					this.modalName=null;
				}

			},
			hideSecondModal(){
				if(this.secondModal){
					this.secondModal=null;
				}
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
				if(!this.designer.name){
					this.secondModal='nameModal'
				}else if(!this.designer.telephone){
					this.secondModal='telModal'
				}else{
					if(!(/^1[345678]\d{9}$/.test(this.designer.telephone))){
						this.secondModal='telModal'

					}else{
							this.$ajax('Signup',{
							name:this.designer.name,
							mobile:this.designer.telephone,
							type:4,
							team:this.shopItem.id,
						},res=>{
							console.log(res)
							if(res==-31){
								this.secondModal='exist';
							}else{
								uni.showToast({
									title:'录入店员成功',
									icon:'none'
								});
								this.isShow=false;
								this.$ajax('ShopSalesmen',{shop:this.shopItem.id},res=>{
									this.userList=res;
								})
							}


						})
					}

				}


			},

		},
		onLoad(option){

			// this.getUserInfo()
		   if(option){
               this.checkShopDetail(option.shopID)
		   }
		}
	}
</script>

<style lang="less">
	.cu-dialog{
		max-width:263px;
	}
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
	.join-modal-item{
		line-height:50px;height:50px;padding-left:14px;
		.join-modal-input{
			margin-top:10px;text-align:left;font-size:13px;
		}
	}
</style>
