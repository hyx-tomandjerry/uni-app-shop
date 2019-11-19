<template>
	<view style="position:relative">
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back"  @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >门店详情</view></block>
		</cu-custom>
		<view class="shop-info  borderTop bg-white">
			<image :src="shopItem.coverurl?shopItem.coverurl:'../../../../static/img/default.png'" class="shop-img" @click="showModal($event)" data-target="imageModal" mode="aspectFill" lazy-load></image>

			<view class="flex justify-start" style="margin-bottom:8px;">
				<view class="color-normal font-size-middle font-weight-bold" style="margin-right:8px;">{{shopItem.name || ''}}</view>
				<view >
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
				<template v-if="shopItem.managerName">
					<common-item intro="店长" :content="`${shopItem.managerName || ''}/${shopItem.managerMobile || ''}`" type="unNormal"></common-item>
				</template>
				<common-item intro="品牌名称:" :content="shopItem.brandName || ''" type="normal" :isPadding="false"></common-item>
				<common-item intro="所属区域:" :content="shopItem.zoneName || ''" type="normal" :isPadding="false"></common-item>
				<template v-if="shopItem.catalog">
					<common-item intro="经营类别:" :content="shopItem.catalog || ''" type="normal" :isPadding="false"></common-item>
				</template>

			</view>

			<view class="shop-time flex justify-start align-center borderBottom">
				<view class="flex justify-start shop-duedate align-center" >
					<view class="cuIcon-time color-placeholder" style="font-size:18px;" ></view>
					<view style="margin:0 2px;">开业日期:</view><view >{{shopItem.duedate | formatTime('YMD')}}</view>
				</view>
				<view class="flex justify-start align-center " style="padding-left:20px;">
					<view class="cuIcon-time color-placeholder" style="font-size:18px;" ></view>
					<view style="margin:0 2px;">营业天数:</view><view >{{shopItem.days>0? shopItem.days:0}}</view>
				</view>

			</view>

			<view class="flex justify-between shop-address align-center">
				<view class="flex justify-start flex-1">
					<view class="cuIcon-location color-placeholder" style="font-size:18px;"></view>
					<view style="margin-left:7px;">{{shopItem.provinceName  || '' }}{{shopItem.cityName  || '' }}{{shopItem.districtName  || ''}}{{shopItem.address || ''}}</view>
				</view>
				<view class="color-blue" @tap="editAddress" style="width:100px;">
					<text class="cuIcon-edit"></text>
					<text>修改地址</text>
				</view>
			</view>
		</view>
		<view class="flex text-center bg-white borderBottom  justify-around" >
			<block  v-for="(item,index) in tabList" :key="index">
				<tabNav :item="item" :index="index" :TabCur="clerkTab" @tabSelect="chooseClerkTab"></tabNav>
			</block>
		</view>
		<view class="member-container">
			<block v-for="(item ,index) in userList" :key="index" >
				<ClerkListItem :item="item" :index="index"
				@joinSuccess="joinSuccess"
				@checkItemInfo="checkItemInfo"
				:shopItem="shopItem" @joinrefuse="joinrefuse"></ClerkListItem>
			</block>
		</view>

		<!-- 录入店员 start-->
		<recordShoper :isShow=" (modalName=='recordModel')" :shopID="shopID"
		@hideModal="hideModal"
		@recordUser="recordUser" :shopItem="shopItem"></recordShoper>
		<!-- 录入店员end -->
		<view style="height:200upx;"></view>
		<template v-if="shopItem &&  (shopItem.manager==userInfo.id)">
			<BottomBtnTwo refuse_btn_con="录入店员"
			agree_btn_con="记一笔"
			 refuse_data_target="recordModel"
			 @refuseBtn="inviteJoin"
			 @agressBtn="record"
			 ></BottomBtnTwo>
		</template>
		<template v-else>
			<bottomBtnOne content="记一笔" @showModal="record"></bottomBtnOne>
		</template>
		<imageModel :isShow="modalName=='imageModal'" @hideModel="hideModal" @downImg="downImg" :url="shopItem.coverurl"></imageModel>
		<simpleModel :isShow="secondModal=='exist'" @hideSimpleModel="hideSecondModal()" v-if="secondModal=='exist'">
			<block slot="content">工作关系已经存在,不能反复邀请或申请</block>
		</simpleModel>

		<simpleModel :isShow="secondModal=='download'" @hideSimpleModel="hideSecondModal()" v-if="secondModal=='download'">
			<block slot="content">下载成功</block>
		</simpleModel>

		<showModel :isShow="modalName=='refuseModal'" @hideModel="hideModal"
				   v-if="modalName=='refuseModal'"
				   @confirmDel="confirmDelete">
			<block slot="content">确定要拒绝{{unNormalItem.name}}吗?</block>
		</showModel>
	</view>
</template>

<script>

	import {mapState} from 'vuex';
	import downloader from '../../../../common/img-downloader.js'
	import simpleModel from '../../../../components/simple-model.vue'
	import showModel from'../../../../components/show-model.vue'
	import imageModel from '../../../../components/image-model.vue'
	import recordShoper from '../../../../components/shop/record-shoper.vue'
	import BottomBtnTwo from '../../../../components/common/bottom-btn-two.vue'
	import bottomBtnOne from '../../../../components/common/bottom-btn-one.vue'
	import ClerkListItem from '../../../../components/shop/clerk-list-item.vue'
	import commonItem from '../../../../components/common-item.vue'
	import normalTitle from '../../../../components/common/normal-title.vue'
	import tabNav from '../../../../components/common/tab-nav.vue'
	export default{
	    computed:mapState(['userInfo','shopStatusZn','userStatus','shoperObj']),
		data(){
			return{
				modalName:null,
				secondModal:null,
				shopItem:{},
				shopID:'',//门店ID
				userList:[],//店员列表
				tabList:[{id:1,name:'门店人员'},{id:2,name:'区域人员'}],
				clerkTab:1,
				clerkItem:{},
				unNormalItem:{}
			}
		},
		components:{
			simpleModel,
			showModel,
			imageModel,
			recordShoper,
			BottomBtnTwo,
			bottomBtnOne,
			ClerkListItem,
			commonItem,
			normalTitle,
			tabNav
		},
		methods:{
			confirmDelete(){
				this.$ajax('AcceptSalesman',{
					shop:this.shopItem.id,
					user:this.unNormalItem.id,
					reject:1
				},res=>{
					uni.showToast({
						title:'拒绝加入成功',
						icon:'none'
					})
					this.hideModal()
					this.checkClerkList(this.shopID)
					this.checkShopDetail(this.shopID)
				})
			},
			joinrefuse(item){
				this.unNormalItem=item;
				this.modalName='refuseModal'
			},
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			//修改地址
			editAddress(){
				uni.navigateTo({
					url:"../edit-shop-address/edit-shop-address?id="+this.shopID
				})
			},
			//查看店员详情
			checkItemInfo(item){
				if(item.status!=this.userStatus.normal) return;
				let obj={
					shopItem:this.shopItem,
					clerkItem:item,

				}
				uni.navigateTo({
					url:"../clerk-item-info/clerk-item-info?shopID="+this.shopID+"&clerkItem="+JSON.stringify(item)
					
				})
			},
			//记一笔
			record(){
				uni.navigateTo({
					url:"../../work-center/statistics-center/record-money/record-money?type=save&shopID="+this.shopID
				})
			},
			downImg(){
				 uni.getImageInfo({
					 src:this.shopItem.coverurl,
					 success:(res)=>{
						let promise=downloader.load(res.path,res.path);
						promise.then(([err, res])=>{
							if(res){
								this.secondModal='download';
								this.hideModal()
							}
						});
					 }
				 })
			},


			//录入店员
			inviteJoin(event){
				this.modalName=event;
			},
			hideModal(){
				this.modalName=null;
			},
			hideSecondModal(){
				this.secondModal=null;
			},
			chooseClerkTab(item){
				this.clerkTab=item.id;
				this.clerkItem=item;
				this.checkClerkList(this.shopID)
			},





			/**
			 *
			  RadioChange(e) {
				this.radio = e.detail.value
			  },
			  //确认删除店员
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
			 */
			// joinrefuse(item){
			// 	this.modalName='refuseModel'
			// },
			joinSuccess(){
				this.checkClerkList(this.shopID)
				this.checkShopDetail(this.shopID)
			},
			//获得门店详情
			checkShopDetail(id){
				this.$ajax('ChainShop',{id:id},res=>{
					this.shopItem=res;
				})

			},
			checkClerkList(id){
				this.$ajax('ShopSalesmen',{shop:id},res=>{
					let arr1=[];
					let arr2=[]
					res.forEach(item=>{
						if(item.motto=='manager'){
							//区域 人员
							arr1.push(item);
						}else{
							arr2.push(item)
						}
					})
					this.userList=this.clerkTab==1?arr2:arr1;


				})
			},
			//录入店员
			recordUser(event){
				this.$ajax('Signup',{
						name:event.name,
						mobile:event.telephone,
						type:this.shoperObj.type,
						team:this.shopItem.id,
				},res=>{
					this.hideModal()
					uni.showToast({
						title:'录入店员成功',
						icon:'none'
					});

					this.checkShopDetail(this.shopID)
					this.checkClerkList(this.shopID)
				},true,code=>{
					if(code==-31){
						this.secondModal='exist';
					}
				})
			},

		},
		onLoad(option){
		   if(option){
		   		this.shopID=option.shopID;
               this.checkShopDetail(option.shopID);
			   this.checkClerkList(option.shopID)
		   }
		},
		onShow(){
			this.checkShopDetail(this.shopID)
			this.checkClerkList(this.shopID)
		}
	}
</script>

<style lang="less">
	.clerk-container{
		padding-top:46upx;
		padding-left:40upx;
	}
	.clerk-container-tab{
		// border:1upx solid #EEEEED;
		// border-radius:20upx;
		flex:1
	}
	// .clerk-container-tab>view{
	// 	flex:1;
	// 	padding:10upx 4upx;
	// }
	// .clerk-container-tab>view:first-child{
	// 	border-right: 1upx solid #EEEEED;
	// 	border-radius: 20upx 0 0 20upx;
	// }
	// .clerk-container-tab>view:last-child{
	// 	border-radius:  0 20upx   20upx 0;
	// }

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
	.member-container{
		padding:18px 15px 15px 23px;
		margin-bottom:60px;
		background:#fff;

	}



</style>
