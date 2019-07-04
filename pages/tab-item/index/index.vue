<template>
    <view >
		<view class="index-container">
			<view v-if="userInfo && (userInfo.type==shoperObj.type)">
				<view v-if="userInfo.status==userStatus.free">
					<text class="cu-tag bg-green round" @click="joinCompanyEvent()">点击加入公司</text>
				</view>
				<view class="flex justify-start" v-else>
					<image :src="company.cover" style="width:35px;height:35px;margin-right:8px;
					border-radius: 50%;
					vertical-align: middle;"></image>
					<view style="padding-top:3px;"><text class="company">{{company.name || ''}}</text></view>
				</view>

			</view>
			
			<view v-if=" userInfo && (userInfo.type==replacerObj.type)">
			
				<view class="flex justify-start" >

					<image :src="company.cover?company.cover:'../../../static/img/default.png'" style="width:35px;height:35px;margin-right:8px;

					border-radius: 50%;
					vertical-align: middle;"></image>

					<view style="padding-top:3px;"><text class="company">{{company.name || ''}}</text></view>
				</view>
			</view>
		<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in shopList" :key="index">
				<image :src="item.url" mode="aspectFill" style="border-radius:8px;"></image>
				
			</swiper-item>
		</swiper>
			

			<view class="operateItem">
				<view v-for="(item,index) in options" :key="index" @click="showOperateItem(index)" style="position: relative;">
					<view><image :src="item.image" style="width:55px;height:55px;"></image></view>
					<view><text class="operate-title">{{item.text}}</text></view>
					<view  v-if="item.num && todoNum>0" class="notice-tag">{{todoNum }}</view>
				</view>
			</view>
		</view>

		<view class="notice_container">
			<view style="margin-bottom;10px;">
				<view>
					<view class="cu-bar bg-white ">
						<view class="action">
							
							<text class="card-title">销售技巧</text>
						</view>
						<view class="action">
							<text class="card-more" @click="showMoreInfo('skill')">更多<text class="cuIcon-right" ></text></text>
						</view>
					</view>
					<view v-if="noticeList1.length==0" style="text-align: center;padding:42px 0 68px;">
						<image src="../../../static/img/noticeNo.png" style="width:125px;height:92px;"></image>
						<view class="font-size-small font-weight-normal " style="color:rgba(137,136,136,1);">暂无数据哦~</view>
					</view>
					
					<view class="flex justify-start  position_relative borderBottom" v-for="(item,index) in noticeList1" :key="index" @click="detailContent(item,'skill')" style="padding:23px 0 25px;;width:100%;align-items:center"  v-if="noticeList1.length>0">
						
						
						<view style="width:70%;margin-right:7px;">
							<view class="font-weight-super font-weight-middle color-normal" style="margin-bottom:14rpx;">{{item.name}}</view>
							<view class="font-size-small font-weight-normal " style="color:rgba(137,136,136,1);">{{item.applyDate | formatTime('YMDHMS')}}</view>
						</view>
						<view style="width:29%;margin-right:15px;">
							<image :src="item.coverurl" mode="aspectFill" style="
							
							height:79px;border-radius: 10px;vertical-align: middle;"></image>
						</view>
						
						<image src="../../../static/img/huizhi1.png"  
						style="right:15px;"
						mode="aspectFill"
						class="position_absolute operateImg" v-if="item.report==1"></image>
					</view>
					
					
				</view>
			</view>
		</view>
		<view class="bg-white" style="margin-top:13px;padding-right:14px;
	padding-left:18px;">
			<view class="cu-bar bg-white " >
				<view class="action">
					<text class="card-title">陈列案例</text>
				</view>
				<view class="action">
					<text class="card-more" @click="showMoreInfo('example')">更多<text class="cuIcon-right" ></text></text>
				</view>
			</view>
			
			<view v-if="noticeList2.length==0" style="text-align: center;padding:42px 0 68px;">
				<image src="../../../static/img/noticeNo.png" style="width:125px;height:92px;"></image>
				<view class="font-size-small font-weight-normal " style="color:rgba(137,136,136,1);">暂无数据哦~</view>
			</view>
			<view class="example-list borderBottom position_relative" style="padding:21px 0 18px;" v-for="(item,index) in noticeList2 " :key="index" @click="detailContent(item,'example')" v-if="noticeList2.length!=0">
				<div 	class="coverImg"
						:style="[{ backgroundImage:'url(' + item.coverurl+ ')' }]"></div>

				<!--<image :src="item.coverurl" mode="scaleToFill"-->
					  <!--style="width:100%;height:41vw;border-radius: 10px;margin-bottom:13px;"></image>-->
				<view class=" font-weight-super font-weight-middle color-normal" style="margin-bottom:3px;">{{item.name}}</view>
				<view class="font-size-small font-weight-normal" style="color: rgb(137, 136, 136)">{{item.applyDate | formatTime('YMDHMS')}}</view>
				<image src="../../../static/img/huizhi1.png"  mode="aspectFill" class="operateImg position_absolute" style="top:20px;right:0;" v-if="item.report==report"></image>
			</view>
			
			
		</view>
		
		<!-- <view class="cu-modal" :class="isShowJoinModal?'show':''">
			
			<view class="cu-dialog borderBottom">
				<view class="cu-bar bg-white justify-end borderBottom">
					<view class="content font-size-big font-weight-normal color-normal">提示</view>
				</view>
				<view class="padding-xl font-size-big font-weight-normal color-normal bg-white borderBottom" style="padding:25px 0 27px;">
					{{shop.shopName}}</text>门店邀请你加入
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action flex justify-around" style="width:100%;">
						<view style="width:50%;border-right:1px solid #EEEEED;padding:12px;"   @click="hideModal('shop')">不同意</view>
						<view style="width:50%;padding:12px;"  @click="aggressJoin()" class="text-blue">同意</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="cu-modal" :class="isShowJoinCompany?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end " style="border-bottom:1px solid #EEEEED">
					<view class="content font-size-big  font-weight-normal color-normal ">选择公司</view>
					<text class="cuIcon-close font-size-big position_absolute"  style="right:10px;" @click="hideModal('company')"></text>
				</view>
				<view class="padding-xl text-left">
					<view class="flex justify-start borderBottom" style="padding-bottom:10px;">
						<input type="text" 
						v-model="eid"
						placeholder="输入公司EID" style="border:none;border-radius: 4px;padding:0px 55px 0 15px;font-size:14px;"/>
						<text class="cu-tag bg-blue " style="margin-left:10px;border-radius: 13px;padding:0 15px;font-size:12px;" @click="searchCompany()">搜索</text>
					</view>
					
					<view style="padding:20px 0 0 21px;" v-if="companyObj" class="font-size-small font-weight-normal">
						<view class="flex justify-start company-info-item" >
							<view class="company-info-desc">公司名称 : </view>
							<view  class="company-info-content font-weight-bold">{{companyObj.name}}</view></view>
						<view class="flex justify-start company-info-item">
							<view class="company-info-desc">	联系人 : </view>
						<view class="company-info-content ">{{companyObj.contactor}}</view>
							
						</view>
						<view  class="flex justify-start company-info-item">
							<view class="company-info-desc">联系电话 :</view>
							 <view class="company-info-content ">{{companyObj.telephone}}</view>
						</view>
						<view class="flex justify-start company-info-item">
							
							<view class="company-info-desc">地址 : </view>
						
							<view class="company-info-content ">
							<view v-if="companyObj.provinceName || companyObj.cityName ||companyObj.districtName ">
								{{companyObj.provinceName}}{{companyObj.cityName}} {{companyObj.districtName}}{{companyObj.address ||''}}
							</view>
							<view v-else>
								暂未登记
							</view>
						</view>
						</view>
						
					</view>
				</view>
				
				<view  style="padding:0 13px 14px 13px;" >
					<view  style="width:100%;background:#42B0ED;border:1px solid #EEEEED;padding:4px 0 5px;border-radius: 8px;" @tap="joinCompany()" class="font-size-small text-white" >确定</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='noEIDModal'?'show':''" @click.stop="hideModal('eid')">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请输入EID</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='noSearch'?'show':''" @click.stop="hideModal('search')">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请搜索公司</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='exist'?'show':''" @click.stop="hideModal('exist')">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">工作关系已经存在,不能反复邀请或申请</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='company'?'show':''" @click.stop="hideModal('exist')">
			<view class="cu-dialog">
				<view class=" bg-white justify-end" style="padding:8px ">
					<view class="text-center">该公司是装修公司，不能加入</view>
				</view>
			</view>
		</view>
    </view>
</template>
<script>

	import uniGrid from '../../../components/uni-grid/uni-grid.vue'
	import NAUIcard from '../../../components/NAUI-card/NAUI-card.vue'
	import axbCheckBox from '../../../components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.vue';
	import {mapState,mapMutations} from 'vuex'
	export default{
		computed:mapState(['userInfo','userStatus','replacerObj','shoperObj','report','companyType']),
		data(){
			return{
				eid:'',
				companyObj:'',
				// dotStyle: false,
				// cardCur:0,
				shopList:[
					{id:0,url:"../../../static/img/shop-img/shop1.jpg"},
					{id:1,url:"../../../static/img/shop-img/shop2.jpg"},
					{id:2,url:"../../../static/img/shop-img/shop3.jpg"},
					{id:3,url:"../../../static/img/shop-img/shop4.jpg"},
					{id:4,url:"../../../static/img/shop-img/shop5.jpg"},
					{id:5,url:"../../../static/img/shop-img/shop6.jpg"}
				],
				company:{
					name:'',
					cover:''
				},//公司名称
				// isShowJoinModal:false,//是否加入门店
				isShowJoinCompany:false,//是否加入公司
				current:0,
				noticeList1:[],
				noticeList2:[],
				options:[
					{image:'../../../static/img/index-tab/tab1.png',text:'通知公告',num:1},
					{image:'../../../static/img/index-tab/tab2.png',text:'门店报修'},
					{image:'../../../static/img/index-tab/tab4.png',text:'快递包裹'},
					{image:'../../../static/img/index-tab/tab3.png',text:'我的门店'},
					
					],
				noticeID:0,
				todoNum:0,
				shop:{
					shopID:'',
					shopName:''
				},
				modalName:'',
				
				
			}
		},
		
		methods:{
			//获得代办数量
			getTodoList(){
				this.$ajax('MyEventNumbers',{},res=>{
					this.todoNum=res;
				})
			},
			joinCompanyEvent(){
				this.isShowJoinCompany=true;
				this.eid='';
				this.companyObj=null;
			},
			showArticles(){
				this.$ajax('MyArticles',{
					offset:0,
					type:0
				},res=>{
					console.log('kkkkk')
					let array1=[],array2=[]
					res.forEach(item=>{
						if(item.type==1){
							array1.push(item)
						}else if(item.type==2){
							array2.push(item)
						}
					})
					this.noticeList1=Array.from(new Set(array1));
					this.noticeList2=Array.from(new Set(array2));
					
					
					
				})
			},
			//加入公司
			joinCompany(){
				if(!this.companyObj){
					this.modalName='noSearch'
				}else{
						this.$ajax('ApplyOrInvite2Join',{
						user:this.userInfo.id,
						org:this.companyObj.id
					},res=>{
						if(res==-31){
							this.modalName='exist';
							this.hideModal('company');
						}else{
						uni.showToast({
							title:'等待同意中',
							icon:'none'
						});
						this.hideModal('company');
						uni.setStorage({
								key:'showJoin',
								data:false
						})
								
						}
						
					})
					
				}
				
			},
			//搜素公司
			searchCompany(){
				if(!this.eid){
					this.modalName='noEIDModal'
				}else{
					this.$ajax('Customer',{
						eid:this.eid
					},res=>{
						if(res.type!=this.companyType){
							this.modalName='company'
						}else{
							this.companyObj=res
						}
						
					})
				}
				
			},
			// DotStyle(e) {
			// 	this.dotStyle = e.detail.value
			// },
			// change(e){
			// 	this.current=e.detail.current;
			// },
			//同意加入门店
			// aggressJoin(){
			// 	this.$ajax('JoinOrg',{
			// 		user:this.userInfo.id
			// 	},res=>{
			// 		uni.showToast({
			// 			title:'您已成功加入该门店',
			// 			icon:'none'
			// 		})
			// 		this.isShowJoinModal=false;
			// 		this.$ajax('RefreshOnlineUser',{},userInfo=>{
			// 			this.userInfo=userInfo;
			// 			this.company={
			// 				name:this.userInfo.ownerName,
			// 				cover:this.userInfo.ownerLogoUrl
			// 			}
			// 			this.getTodoList();
			// 			this.showArticles()
			// 			
			// 		})
			// 		
			// 	})
			// 	
			// },
			toNoticeContent(item){
				this.noticeID=id;
				uni.navigateTo({
					url:'../../all-item-content/index-more/index-more?value='+item.value
				})
			},
			showMoreInfo(type){
				if(type=='skill'){
					uni.navigateTo({
						url:'../../all-item-content/index-more/index-more?value='+type
					})
					//销售技巧
				}else if(type=='example'){
					uni.navigateTo({
						url:'../../all-item-content/index-more/index-more?value='+type
					})
				}
			},
			//关闭弹出框
			hideModal(type){
				if(type=='company'){
					this.isShowJoinCompany=false;
					
				}else if(type=='shop'){
					this.isShowJoinModal=false;
				}else if(type=='eid' || type=='search' || type=='exist'){
					this.modalName=null;
					if(this.eid){
						this.eid=''
					}
				}
				
			},
			// cardSwiper(e) {
			// 	this.cardCur = e.detail.current
			// },
			detailContent(item,type){
				
					uni.navigateTo({
						url:'../../all-item-content/detail-content/detail-content?type='+type+'&id='+item.id
					})
			},
			//加入门店
			// toJoinShop(){
			// 	uni.navigateTo({
			// 		url:'../../tab-item-content/shop-center/join-shop/join-shop'
			// 	})
			// },
			showOperateItem(event){
				if(this.userInfo.status!=this.userStatus.normal){
					uni.showToast({
						title:'您没有操作的权限',
						icon:'none'
					})
				}else{
					switch(event){
						case 0:
						//通知公告
						uni.navigateTo({
					
							url:'../../tab-item-content/notice-center/notice-index/notice-index'
						})
						break;
						case 1:
						//门店报修
						uni.navigateTo({
					
							url:'../../tab-item-content/shop-center/shop-center?type=all'
						})
						break;
						case 2:
						//我的门店
						uni.navigateTo({
							url:'../../tab-item-content/work-center/express-center/express-index/express-index'
						})
						break;
						case 3:
						//工作日志
						uni.navigateTo({
							url:'../../tab-item-content/shop-center/shop-list/shop-list'
						})
					}
				}
				
			},
			// getShopInfo(id){
			// 	this.$ajax(' ChainShop',{id:id},res=>{
			// 		this.shop.shopName=res.name;
			// 		
			// 	})
			// },
			...mapMutations(['login'])
		
		},
		components:{
			axbCheckBox,
			uniGrid,
			NAUIcard
		},
		onReady(){
			
		},
		onLoad(){
			this.companyObj=null;
			this.eid='';
			this.getTodoList()
			this.showArticles();
		},

		onShow(){
			this.companyObj=null;
			this.eid='';
			this.getTodoList()
			this.showArticles();
			if(this.userInfo){
				if(this.userInfo.type==this.shoperObj.type){
						this.$ajax('RefreshOnlineUser',{},res=>{
							if(res.owner==0 && res.status==this.userStatus.free){
								if(this.current==0){
									this.isShowJoinCompany=true;//显示EID
									this.current+=1;
								}
							}else if(res.status==this.userStatus.normal){
								this.login(res);
								this.company={
									name:res.ownerName,
									cover:res.ownerLogoUrl
								}
							}
						})
					//
					// if(this.userInfo.owner==0 && this.userInfo.status==this.userStatus.free ){
					// 		if(this.current==0){
					// 			this.isShowJoinCompany=true;//显示EID
					// 			this.current+=1;
					// 		}
					//
					// }else{
					//
					// 		this.$ajax('RefreshOnlineUser',{},res=>{
					// 			if(res.status==this.userStatus.normal){
					// 				this.login(res);
					// 				 this.company={
					// 					name:this.userInfo.ownerName,
					// 					cover:this.userInfo.ownerLogoUrl
					// 				}
					// 			}
					// 		})
					//
					// }
					
				}else if(this.userInfo.type==this.replacerObj.type){
				
						this.$ajax('Customer',{
							id:this.userInfo.owner
						},res=>{
							this.company={
								name:res.name,
								cover:res.logourl
							}
							console.log(this.company)
						})
				
				}
			}else {
				uni.navigateTo({
					url:'../../login-design/login/login'
				})
			}
			
				
			
			 
		},
		
	}
</script>
<style scoped>
	.active{
		right:66px;top:213px;
	}
	.noActive{
		right:66px;top:213px;
	}
	.operateImg{
		width:37px;height:37px;top:23px;
	}
	.notice-tag{
		position: absolute;
		top: 1px;
		font-size: 10px;
		right: -5px;
		color: #fff;
		background: #f43f3b;
		border-radius: 10px;
		padding: 0px 8px;
	}
	.header-content{
		height:44px;
		line-height:44px;
	}
	.cu-btn{
		height:28px;
		font-size:13px;
	}
.screen-swiper{
	min-height:120px;
	margin-top:10px;
}
.uni-swiper .uni-swiper-wrapper{
	min-height:120px;
}
.uni-swiper .uni-swiper-dots-horizontal{
	bottom:38px;
}
.index-container{
	padding:54px 14px 15px 18px;

}
.notice_container{
	margin-top:13px;
	background:#fff;
	
	padding-right:14px;
	padding-left:18px;
	
}
.notice_title{
		display: flex;
		padding: 0 10rpx;
		justify-content: space-between;
		font-size:30rpx;
		line-height:34px;
		border-bottom: 1px solid #eee
	}
	.cu-bar .action:first-child{
		margin-left:0;
	}
	.notice_content{}
.operateItem{
	padding-top:16px;
	padding-left:10px;
	padding-right:9px;
	display: flex;
	justify-content: space-between;
}
.location{
	font-weight:400;
	height:20px;
	font-size:14px;
	color:rgba(42,42,42,1);
	line-height:20px;
}
.title{
	height:25px;
font-size:18px;

font-weight:600;
color:rgba(64,64,64,1);
line-height:25px;
}
.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
}

.cu-bar .content{
	font-size:12px;
	font-weight: 400;
	color:rgba(42,42,42,1);
	width:calc(100%-84px)
}
.card-swiper{
	height:120px !important;
}
.card-swiper .uni-swiper-item{
	padding:0;
}
.index-container{
	background:#fff;
}
.operate-title{
	
font-size:14px;

font-weight:400;
color:rgba(42,42,42,1);

}
.card-title{
	font-size:18px;

font-weight:600;
color:rgba(42,42,42,1);
}
.card-more{
	font-size:14px;

font-weight:400;
color:rgba(137,136,136,1);
}
.cu-card.article>.cu-item .content{
	padding:0;
}
.cu-card.article>.cu-item .title{
	padding:0;
}
.text-cut{
	font-size:16px;
	line-height: 21px;
}
.cu-dialog{
	background:#fff;
	max-width:263px;
	
}
.cu-bar{
	min-height:42px;
}
.cu-bar .action:last-child{
	margin-right:0;
}
.padding-xl{
	font-size:15px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(42,42,42,1);
	padding:28px 16px 0px 13px;
	margin-bottom:17px;
}

.btn{
	font-size:15px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(42,42,42,1);
}
.company{
	font-size:18px;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(64,64,64,1);
}
.desc >>>span{
	padding:3px;
	font-size:12px !important;
}
	.coverImg{
		width:100%;height:143px;background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border-radius:6px;
	}
	.company-info-item{
		margin-bottom:6px;
	}
	.company-info-desc{
		color:#898888;width:30%;text-align:right
	}
	.company-info-content{
		margin-left:5px;color:#2A2A2A;flex:1;text-align:left;
	}
</style>


 
 