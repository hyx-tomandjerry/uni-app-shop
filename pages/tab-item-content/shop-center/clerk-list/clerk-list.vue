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
					:class="{'shopImg':shopItem.managerName|| shopItem.managerMobile}"
					></image>
					<image src="../../../../static/img/default.png"
						v-else
						class="noManagePic"
						:class="{'shopImg':shopItem.managerName|| shopItem.managerMobile}"
					 ></image>

				</view>
				<view >
					<view class="shop-name flex justify-between" style="width:100%;">
						{{shopItem.name}}
						<!-- <view style="font-size:12px;" class="line-blue">
							<text class="cuIcon-brand" style="margin-right:3px;"></text>
							<text>{{shopItem.catalogName}}</text>
						</view> -->
					</view>
					<view class="shop-desc" :class="{'hasManager':shopItem.managerName|| shopItem.managerMobile}" style="white-space: nowrap;" v-if="shopItem.managerName|| shopItem.managerMobile">
						<image src="../../../../static/icon/shop-list/icon-dianzhang@2x.png" class="img15"></image>
						<text style="margin-right:3px;">店长:{{shopItem.managerName}}</text>|<text style="margin-left:3px;"> {{shopItem.managerMobile}}</text>
					</view>
					<view class="shop-desc flex ">
						<image src="../../../../static/icon/addRepairDingwei.png" class="img15"></image>
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
					<scroll-view :scroll-y="true" class="page show" style="height:424px;">
						<view class="cu-list menu-avatar">
							<view class="cu-item" >
								<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
								<view class="content">
									<view class="flex justify-between">
										<text class="text-cut clerk-name">{{shopItem.managerName}}</text>
										<text class="cu-tag bg-cyan">店长</text>
									</view>
									<view class="text-gray text-sm flex clerk-desc" >
										<text style="margin-right:5px;">性别:</text><text style="margin-right:27px;">男</text><text style="margin-right:5px;">电话:</text><text>{{shopItem.managerMobile}}</text>
									</view>
								</view>
							</view>

							<view class="cu-item" v-for="(item ,index) in userList" :key="index">
								<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
								<view class="content">
									<view>
										<text class="text-cut clerk-name">{{item.name}}</text>
									</view>
									<view class="text-gray text-sm flex clerk-desc" >
										<text style="margin-right:5px;">联系电话:</text><text>{{item.telephone}}</text>
									</view>
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
					<view class="content text-black"><text class="text-gray">{{shopItem.name}}</text>(店员录入)</view>
					<view class="action" @tap="hideModal()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<form >
						<!-- <view class="flex justify-start bg-white"
						style="line-height:50px;height:50px;border-bottom:1px solid #EEEEED;">
							<view class="title" style="width:20%;"></view>
							<view style="width:70%;text-align:center;">{{shopItem.name}}</view>
						</view> -->
						<view class="cu-form-group">
							<view class="title"><image src="../../../../static/icon/shop-list/icon-dianzhang@2x.png" style="width:15px;height:15px;margin-right:15px;"></image></view>
							<input type="text" v-model="designer.name" placeholder="请输入店员姓名">
						</view>

						<view class="cu-form-group position_relative">
							<view class="text-gray"><text class="cuIcon-mobile text-gray" style="font-size:22px;margin-right:15px;"></text></view>
							<input placeholder="请输入手机号" v-model="designer.telephone"  type="phone"  />
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
				modalName:null,
				radio: 'radio1',
				shopItem:'',
				isShow:false,
				designer:{
					name:'',
					telephone:''
				},
				userList:[],//店员列表
			}
		},
		components:{
			popModal
		},
		methods:{
			//验证电话号码
			checkTelEvent(event){
				console.log(event)
				if(event){
					if(!(/^1[34578]\d{9}$/.test(event))){
							console.log('222')
							uni.showModal({
								content:'电话号码不存在,请重新'
							})
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
			    uni.request({
					url:this.$store.state.url+'ProprietorShop',
					data:{
					    id:id,
						// userId:this.$store.state.userInfo.id,
						// owner:this.$store.state.userInfo.owner
						userId:49,
						owner:18
					},
					success:(res)=>{
					    this.shopItem=res.data.data;
					    console.log(this.shopItem)
					}
				})
			},
			//录入店员
			recordUser(){
				if((/^1[34578]\d{9}$/.test(event))){
						this.isShow=false;
						uni.showToast({
							title:'电话号码不存在',
							icon:'none'
						})

				}else if(!this.designer.name){
					uni.showToast({
						title:'请输入店员姓名',
						icon:'none'
					})
				}else{
					uni.request({
						url:this.$store.state.url+'Signup',
						data:{
							name:this.designer.name,
							mobile:this.designer.telephone,
							type:this.$store.state.userInfo.type,
							team:this.shopItem.id
						},
						success: (res) => {
							uni.showToast({
								title:'录入店员成功',
								icon:'none'
							});
							let obj={
								name:this.designer.name,
								telephone:this.designer.telephone,
								id:res.data.data
							}
							this.userList=[obj,...this.userList];
							console.log(this.userList)
							this.isShow=false;
						}
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

<style>
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
		margin-bottom:20px;
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
