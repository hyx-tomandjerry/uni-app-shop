<template>
	<view style="position:relative">
		<view class="shop-info  borderTop bg-white">
			<image :src="shopItem.coverurl?shopItem.coverurl:'../../../../static/img/default.png'" class="shop-img" @click="showModal($event)" data-target="imageModal"></image>

			<view class="flex justify-start" style="margin-bottom:8px;">
				<view class="color-normal font-size-middle font-weight-bold" style="margin-right:8px;">{{shopItem.name || ''}}</view>
				<view >

					<text class="cu-tag shop-tag" style="background:#FFF1EB;color:#F2735B;margin-right:10px;">{{shopItem.type | shopTypeFilter}}</text>
					<text  class="shop-tag  cu-tag" :class="{
								'shop-business':shopItem.status==shopStatusZn.businessing,
								'shop-execution':shopItem.status==shopStatusZn.ready,
								'shop-prepare':shopItem.status==shopStatusZn.processing,
								'shop-canceled':shopItem.status==shopStatusZn.canceled,
								'shop-renovated':shopItem.status==shopStatusZn.renovated,
								'shop-moved':shopItem.status==shopStatusZn.moved,
							}">{{shopItem.status | shopStatus}}</text>
				</view>
			</view>

			<view style="padding-bottom:14px;" class="borderBottom">
				<view class="flex justify-start align-center color-normal" style="margin-bottom:5px;">
					<view>店长 ：</view>
					<view v-if="shopItem['managerName']">{{shopItem['managerName'] || ''}}/{{shopItem['managerMobile'] || ''}}</view>
					<view v-else>无</view>


				</view>

				<view class="flex justify-start color-normal align-center" style="margin-bottom:5px;">
					<view>品牌名称 :</view><view class=" text-blue font-weight-bold" style="margin-left:10px;">{{shopItem.brandName || ''}}</view>
				</view>

				<view class="flex justify-start color-normal align-center" >
					<view class="flex justify-start" style="width:40%;">
						<view>所属区域 :</view><view style="margin-left:10px;">{{shopItem.zoneName || ''}}</view>
					</view>
					<view class="flex justify-start" v-if="shopItem.catalog">
						<view>经营类别 :</view><view style="margin-left:10px;">{{shopItem.catalog |operateZn}}</view>
					</view>


				</view>

				<view class="flex justify-start color-normal align-center" v-if="shopItem.catalog">

				</view>

			</view>

			<view class="shop-time flex justify-start align-center borderBottom">
				<view class="flex justify-start shop-duedate" >
					<view class="cuIcon-time color-placeholder" style="font-size:18px;" ></view>
					<view style="margin-left:7px;">开业日期 : </view><view style="margin-left:7px;">{{shopItem.duedate | formatTime('YMD')}}</view>
				</view>
				<view class="flex justify-start " style="padding-left:20px;">
					<view class="cuIcon-time color-placeholder" style="font-size:18px;" ></view>
					<view style="margin-left:7px;">营业天数 : </view><view style="margin-left:7px;">{{shopItem.days>0? shopItem.days:0}}</view>
				</view>

			</view>

			<view class="flex justify-start shop-address">
				<view class="cuIcon-location color-placeholder" style="font-size:18px;"></view>
				<view style="margin-left:7px;">{{shopItem.provinceName  || '' }}{{shopItem.cityName  || '' }}{{shopItem.districtName  || ''}}{{shopItem.address || ''}}</view>
			</view>


		</view>

		<view class="margin-top member-container">
			<view class="flex justify-between">
				<view class="font-size-big font-weight-bold">
					店员列表
				</view>
				<view style="color:#42B0ED" v-if="shopItem.manager==userInfo.id" @click="deleteMember()">删除</view>
			</view>
			<view class="member-list borderBottom flex justify-start align-center position_relative" v-for="(item ,index) in userList" :key="index">
				<view style="width:15%;">
					<image :src="item.headurl?item.headurl:'../../../../static/img/default.png'"  	style="width:40px;height:40px;border-radius: 50%;vertical-align: middle;"></image>

				</view>
				<view style="margin-left:10px;margin-right:15px;">
					{{item.name}}/{{item.account}}
				</view>
				<view>
					<text class="cu-tag round" v-if="shopItem.manager==item.id && item.status==salemanStatus.normal"
						  style="font-size:12px;padding:0 10px;height:22px;background:#42B0ED;color:#fff;">
						店长
					</text>
					<text class="cu-tag bg-green round" v-if="shopItem.manager!=item.id && item.status==salemanStatus.normal"
						  style="font-size:12px;padding:0 10px;height:22px;">
						在职
					</text>
					<text class="cu-tag bg-orange round" v-if=" item.status==salemanStatus.inviting" style="font-size:12px;padding:0 10px;height:22px;">邀请中待确认</text>
					<text
							v-if=" item.status==salemanStatus.free" @click="SendInvitationEvent(item)">
						<text v-if="shopItem.manager == userInfo.id" class="cu-tag round " style="font-size:12px;padding:0 10px;height:22px;background:#00BFFF;color:white">发送邀请</text>
						<text v-else></text>
					</text>
				</view>
				<view style="position:absolute;right:12px;">
					<view v-if="shopItem.manager==item.id"></view>
					<view v-else>
						<image :src="item.isCheck?'../../../../static/icon/xuanze.png':'../../../../static/icon/weixuanze.png'"
							   style="width:20px;height:20px;" @click="chooseMemberOperate(item)"></image>
					</view>

				</view>
			</view>
		</view>
		<!--<view  class=" cu-list menu menuBorder  sm-border  margin-top">-->
			<!--<view class="cu-item position_relative" style="margin-bottom:20rpx;">-->
				<!--<view class="content padding-tb-sm">-->
					<!--<view class="flex justify-between">-->
						<!--<view class="font-size-big font-weight-bold">-->
							<!--店员列表-->
						<!--</view>-->
					<!--</view>-->
					<!--<scroll-view :scroll-y="true" class="page show" style="min-height:460px;">-->
						<!--<view class="cu-list menu-avatar">-->
							<!--<view class="cu-item" v-for="(item ,index) in userList" :key="index">-->
								<!--<view class="cu-avatar lg" style="width:40px;height:40px; background: #fff;">-->
									<!--<image :src="item.headurl?item.headurl:'../../../../static/img/default.png'"  	style="width:40px;height:40px;border-radius: 50%;"></image>-->
								<!--</view>-->
								<!--<view class="content">-->
									<!--<view class="font-size-small">{{item.name}}/{{item.account}}</view>-->
									<!--&lt;!&ndash;<view >&ndash;&gt;-->
										<!--&lt;!&ndash;<text class="text-cut clerk-name">{{item.name}}</text>&ndash;&gt;-->
										<!--&lt;!&ndash;<text class="font-size-litter font-weight-normal text-blue" style="margin-left:4px;"> {{shopItem.manager ==item.id?'（店长）' :''}}</text>&ndash;&gt;-->
									<!--&lt;!&ndash;</view>&ndash;&gt;-->
									<!--&lt;!&ndash;<view class="text-gray text-sm flex clerk-desc" >&ndash;&gt;-->
										<!--&lt;!&ndash;<text style="margin-right:5px;">联系电话:</text><text>{{item.account}}</text>&ndash;&gt;-->
									<!--&lt;!&ndash;</view>&ndash;&gt;-->
								<!--</view>-->
								<!--<view>-->
									<!--<text class="cu-tag bg-green round" v-if="item.status==salemanStatus.normal" style="font-size:13px;padding:0 20px;">-->
										<!--在职-->
									<!--</text>-->
									<!--<text class="cu-tag bg-orange round" v-if=" item.status==salemanStatus.inviting" style="font-size:13px;">邀请中待确认</text>-->
									<!--<text-->
										<!--v-if=" item.status==salemanStatus.free" @click="SendInvitationEvent(item)">-->
										<!--<text v-if="shopItem.manager == userInfo.id" class="cu-tag round " style="background:#00BFFF;color:white">发送邀请</text>-->
										<!--<text v-else></text>-->
									<!--</text>-->
								<!--</view>-->
							<!--</view>-->
						<!--</view>-->

					<!--</scroll-view>-->
				<!--</view>-->

			<!--</view>-->
		<!--</view>-->


		<view class="cu-modal" :class="isShow?'show':''" >

			<view class="cu-dialog">
				
				<view class=" bg-white justify-end borderBottom" style="padding:14px 0 8px;">
					<view class=" font-weight-bold font-size-small color-normal">{{shopItem.name}}({{shopItem.brandName}})</view>
					<text class="cuIcon-close font-size-big position_absolute" style="right:10px;top:10px;" @click="hideModal()"></text>
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

						<view class="flex justify-start bg-white position_relative" style="padding-top:17px;padding-left:14px;">
							<view style="margin-right:5px;width:11%;margin-top:4px;">
								<image src="../../../../static/img/record-shouji.png" style="width:26px;height:26px;vertical-align: middle;"></image>
							</view>
							<input type="text" v-model="designer.telephone"
								class="join-modal-input"
								style="box-shadow:0px 1px 4px 1px rgba(227,227,227,0.5);
								border-radius:18px;height:35px;line-height:25px;padding-left:13px;width:78%;text-align:left"
								 maxlength="11"
								placeholder="请输入手机号"  @blur="checkTelEvent(designer.telephone)">
							<text class="position_absolute color-placeholder" style="right:30px;top:27px;">{{designer.telephone?designer.telephone.length:0}}/11</text>
						</view>
				</view>
				<view class="bg-white" style="padding:0 13px 15px;">
					
					<button 
					style="border-radius: 5px;"
					class=" bg-blue text-white font-size-small font-weight-normal" size="default" @tap="recordUser()">确定录入</button>
					
				</view>
			</view>
			
		</view>

		<!--<image src="../../../../static/icon/add.png"-->
		<!--v-if="shopItem.manager==userInfo.id"-->
		<!--style="position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;" @click.stop="inviteJoin()"></image>-->

		<view class="operate-btn flex justify-start" v-if="shopItem.manager==userInfo.id">
			<view class="set-btn text-center" style="width:40%;" @click="setManager()">设为店长</view>
			<view class="record-btn text-center" style="width:55%;" @click="inviteJoin()">录入店员</view>
		</view>

		<view class="cu-modal" :class="modalName=='imageModal'?'show':''" @click="hideModal()">
			<view class="cu-dialog">
				<view class="bg-img" :style="[{ backgroundImage:'url(' + shopItem.coverurl+ ')' }]" style="min-height:200px;">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="downImg()">
							<text class="cuIcon-down " style="font-size:20px;"></text>
						</view>
					</view>
				</view>
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
		
		<view class="cu-modal" :class="secondModal=='download'?'show':''"  @click="hideSecondModal()">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class=" content" style="font-size:12px;">下载成功</view>
				</view>
		
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='setModel'?'show':''">
			<view class="cu-dialog ">
				<view class="cu-bar bg-white justify-end borderBottom">
					<view class="content font-size-big font-weight-normal color-normal">提示</view>
				</view>
				<view class="padding-xl font-size-big font-weight-normal color-normal bg-white borderBottom" style="padding:25px 0 27px;">
					确定要将{{shoper.name}}设置店长吗?
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action flex justify-around" style="width:100%;">
						<view style="width:50%;border-right:1px solid #EEEEED;padding:12px;"  @tap="hideModal()">取消</view>
						<view style="width:50%;padding:12px;"  @tap="setShoper()" class="text-blue">确定</view>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='deleteModel'?'show':''">
			<view class="cu-dialog ">
				<view class="cu-bar bg-white justify-end borderBottom">
					<view class="content font-size-big font-weight-normal color-normal">提示</view>
				</view>
				<view class="padding-xl font-size-big font-weight-normal color-normal bg-white borderBottom" style="padding:25px 0 27px;">
					确定要将店员删除吗?
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action flex justify-around" style="width:100%;">
						<view style="width:50%;border-right:1px solid #EEEEED;padding:12px;"  @tap="hideModal()">取消</view>
						<view style="width:50%;padding:12px;"  @tap="confirmDelete()" class="text-blue">确定</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import popModal from '../../../../components/popmodal.vue'
	import {mapState} from 'vuex';
	import downloader from '../../../../common/img-downloader.js'
	export default{
	    computed:mapState(['userInfo','shopTypeZn','shopStatusZn']),
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
				shopID:'',//门店ID
				userList:[],//店员列表
				// userInfo:''
				operateID:[],//选中店员的id,
				shoper:''
			}
		},
		components:{
			popModal
		},
		methods:{
			confirmDelete(){
				console.log(this.operateID.join(','))
				this.$ajax('RemoveSalesman',{
					shop:this.shopItem.id,
					users:this.operateID.join(','),
				},res=>{
					uni.showToast({
						title:'删除店员成功',
						icon:'none'
					})
					this.hideModal();
					this.checkShopDetail(this.shopID);
				})

			},
			deleteMember(){

				this.userList.forEach(item=>{
					if(item.isCheck){
						this.operateID.push(item.id)
					}

				})
				if(this.operateID.length<1){
					uni.showToast({
						title:'选择一项进行操作',
						icon:'none'
					})

				}else{
					this.modalName='deleteModel';
					console.log(this.operateID)
				}
			},
			chooseMemberOperate(item){
				item.isCheck=!item.isCheck;
			},
			//设置店长
			setShoper(){
				console.log(this.shoper)
				this.$ajax('SetShopManager',{
					shop:this.shopItem.id,
					user:this.shoper.id
				},res=>{
					uni.showToast({
						title:'设置店长成功',
						icon:'none'
					})
					this.hideModal()
					this.checkShopDetail(this.shopID);
					this.operateID=[];

				})
			},
			setManager(){
				this.userList.forEach(item=>{
					if(item.isCheck){
						this.operateID.push(item.id)
					}
				})
				if(this.operateID.length>1){
					uni.showToast({
						title:'只能选择一个',
						icon:'none'
					})
					this.userList.forEach(it=>{
						it.isCheck=false;
					})
					this.operateID=[]
				}else if(this.operateID.length==1){
					this.modalName='setModel';
					this.shoper=this.userList.find(shop=>shop.id==this.operateID.join(''))

				}else if(this.operateID.length<1){
					uni.showToast({
						title:'选择一项进行操作',
						icon:'none'
					})
				}

			},
			downImg(){
				 uni.getImageInfo({
					 src:this.shopItem.coverurl,
					 success:(res)=>{
						let promise=downloader.load(res.path,res.path);
						promise.then(([err, res])=>{ 
							console.log(res)
							console.log(res.statusCode)//下载结果 
							if(res){
								this.secondModal='download';
								this.hideModal()
							}
						});
					 }
				 })
			},
			SendInvitationEvent(item){
				this.$ajax('SendInvitation',{user:item.id},res=>{
					// item.isSend=true;
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
				if(this.operateID){
					this.operateID=[];
					this.userList.forEach(item=>{
						item.isCheck=false;
					})
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
						// item.isSend=false;
						item.isCheck=false;
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
								this.checkShopDetail(this.shopID)
							}


						})
					}

				}


			},

		},
		onLoad(option){

			// this.getUserInfo()
		   if(option){
		   		this.shopID=option.shopID;
               this.checkShopDetail(option.shopID)
		   }
		}
	}
</script>

<style lang="less">
	//营业中
	.shop-business{
		background:#E5FFF5;color:#16B176;
	}
	//筹备中
	.shop-prepare{
		background:#F6ECFF;color:#9013FE;
	}
	//施工中
	.shop-execution{
		background:#FFF3DE;color:#F58123;
	}
	//已撤柜
	.shop-canceled{
		background:#FFECE9;color:#E2391A;
	}
	//已重装
	.shop-renovated{
		background:#EBFFFA;color:#3FD7B5;
	}
	//已移位
	.shop-moved{
		background:#EBF4FF;color:#2786F5;
	}
	page{
		background:rgba(247,247,247,1);
	}
	.shop-info{
		padding:10px 22px 0;
		.shop-img{
			width:100%;max-height:142px;border-radius:10px;margin-bottom:15px;
		}
		.shop-time{
			padding:19px 0 20px;
			.shop-duedate{
				border-right:1px solid #EEEEED;padding-right:20px;
			}
		}
		.shop-address{
			padding:19px 0 22px;
		}
	}

	//新开门店
	.shop-new{
		background:#FFF1EB;color:#F2735B;
	}
	//原有门店
	.shop-original{
		background:#EBFFFA;color:#3FD7B5;
	}
	//原味重装
	.shop-original-restruct{
		background:#F6ECFF;color:#9013FE;
	}
	//移位重装
	.shop-remove-restruct{
		background:#EBFFFA;color:#3FD7B5;
	}
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

	.member-container{
		padding:18px 15px 15px 23px;
		margin-bottom:40px;
		background:#fff;
		.member-list{
			padding:18px 0 15px;
		}
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
	.operate-btn{
		position:fixed;
		bottom:0;
		width:100%;
		background:#fff;
		padding:11px 14px;
		.set-btn{
			border-radius:5px;
			border:1px solid rgba(66,176,237,1);
			color:#42B0ED;
			font-size:16px;
			padding:9px 0;
			margin-right:12px;
		}
		.record-btn{
			color:#fff;
			font-size:16px;
			padding:9px 0;
			background:rgba(66,176,237,1);
			border-radius:5px;

		}

	}
</style>
