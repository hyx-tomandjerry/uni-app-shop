<template>
    <view >
		<view class="index-container">
			
			<view>
				<view v-if="userInfo.owner==0 && userInfo.status==2">
					<text class="cu-tag bg-green" @click="joinCompanyEvent()">点击加入公司</text>
				</view>
				<view class="flex justify-start" v-else>
					<image :src="company.cover" style="width:35px;height:35px;margin-right:8px;
					border-radius: 50%;
					vertical-align: middle;"></image>
					<view><text class="company">{{company.name || ''}}</text></view>
				</view>

			</view>

		<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in shopList" :key="index">
				<image :src="item.url" mode="aspectFill"></image>
				
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
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							
							<text class="card-title">销售技巧</text>
						</view>
						<view class="action">
							<text class="card-more" @click="showMoreInfo('skill')">更多<text class="cuIcon-right" style="margin-left:4px;"></text></text>
						</view>
					</view>
					<view class="flex justify-start align-center position_relative borderBottom" v-for="(item,index) in noticeList1" :key="index" @click="detailContent(item,'skill')" style="padding:23px 0 21px;;">
						<view style="width:40%;margin-right:20px;">
							<image :src="item.coverurl" mode="aspectFill" style="height:79px;border-radius: 10px;vertical-align: middle;"></image>
						</view>
						<view>
							<view class="font-weight-bold font-size-big" style="margin-bottom:20rpx;">{{item.title}}</view>
							<view class="font-size-small font-weight-normal color-normal">{{item.applyDate | formatTime('YMDHMS')}}</view>
						</view>
						<image src="../../../static/img/huizhi.png"  class="position_absolute operateImg" v-if="item.report==1"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white" style="margin-top:13px;padding-right:14px;
	padding-left:18px;">
			<view class="cu-bar bg-white solid-bottom" >
				<view class="action">
					
					<text class="card-title">陈列案例</text>
				</view>
				<view class="action">
					<text class="card-more" @click="showMoreInfo('example')">更多<text class="cuIcon-right" style="margin-left:4px;"></text></text>
				</view>
			</view>
			<view class="example-list borderBottom position_relative" style="padding:21px 0 18px;" v-for="(item,index) in noticeList2 " :key="index" @click="detailContent(item,'example')">
				<image :src="item.coverurl"
					  style="width:100%;height:41vw;border-radius: 10px;margin-bottom:13px;"></image>
				<view class="example-item-title font-size-normal font-weight-bold" style="margin-bottom:2px;">{{item.title}}</view>
				<view class="font-size-litter font-weight-normal color-normal">{{item.applyDate | formatTime('YMDHMS')}}</view>
				<image src="../../../static/img/huizhi.png" class="operateImg position_absolute" style="top:18px;" v-if="item.report==1"></image>
			</view>
		</view>
		<view class="cu-modal" :class="isShowJoinModal?'show':''">
			<view class="cu-dialog">
				<view class="padding-xl">
					<text class="fontWeight500 font14 text-blue">{{shop.shopName}}</text>门店邀请你加入
				</view>
				<view class="cu-bar bg-white justify-around">
					<view class="action btn">
						<view style="padding:11px 38px;border-right:1px solid #EEEEED;" @click="hideModal('shop')">不同意</view>
						<view style="padding:11px 38px;color:#42B0ED;" @click="aggressJoin()">同意</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="isShowJoinCompany?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end" style="border-bottom:1px solid #EEEEED">
					<view class="content">选择公司</view>
				</view>
				<view class="padding-xl text-left">
					<view class="flex justify-start">
						<input type="text" 
						v-model="eid"
						placeholder="输入公司EID" style="border:1px solid #EEEEED;border-radius: 4px;padding:0px 55px 0 15px;"/> <text class="cu-tag bg-blue" style="margin-left:10px;border-radius: 4px;padding:0 15px" @click="searchCompany()">搜索</text>
					</view>
					
					<view style="padding-left:6px; font-size:13px;" v-if="companyObj" >
						<view style="padding-top:8px;" >公司名称 : <text style="margin-left:10px;" class="text-blue font-weight-bold">{{companyObj.name}}</text></view>
						<view  style="padding-top:8px;" >
							联系人 : <text style="margin-left:3px;">{{companyObj.contactor}}</text>
							
						</view>
						<view   style="padding-top:8px;" >
							联系电话 : <text style="margin-left:3px;">{{companyObj.telephone}}</text>
						</view>
						<view  style="padding-top:8px;font-size:12px;" >公司地址 : {{companyObj.provinceName || ''}}{{companyObj.cityName || ''}} {{companyObj.districtName ||''}}{{companyObj.address ||''}}</view>
						
					</view>
				</view>
				
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal('company')">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="joinCompany()">确定</button>
					</view>
				</view>
			</view>
		</view>
		
    </view>
</template>
<script>
	var _this;
	import uniGrid from '../../../components/uni-grid/uni-grid.vue'
	import NAUIcard from '../../../components/NAUI-card/NAUI-card.vue'
	import axbCheckBox from '../../../components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.vue'
	export default{
		data(){
			return{
				userInfo:'',
				eid:'',
				companyObj:'',
				dotStyle: false,
				cardCur:0,
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
				isShowJoinModal:false,//是否加入门店
				isShowJoinCompany:false,//是否加入公司
				current:1,
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
				}
			}
		},
		computed:{

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
					res.forEach(item=>{
						if(item.type==1){
							this.noticeList1.push(item)
						}else if(item.type==2){
							this.noticeList2.push(item)
						}
					})
					
				})
			},
			//加入公司
			joinCompany(){
				if(!this.companyObj.id){
					uni.showToast({
						title:'请搜索公司',
						icon:'none'
					})
				}else{
					uni.getStorage({
						key:'userInfo',
						success: (res) => {
							this.$ajax('ApplyOrInvite2Join',{
								user:res.data.id,
								org:this.companyObj.id
							},res=>{
								uni.showToast({
									title:'申请结果将会发您手机，请注意查收',
									icon:'none'
								});
								this.hideModal('company');
							})
						}
					})
				}
				
			},
			//搜素公司
			searchCompany(){
				
				this.$ajax('Customer',{
					eid:this.eid
				},res=>{
					this.companyObj=res
				})
			},
			showWorkClick(){
				uni.navigateTo({
					url:'../work/work'
				})
			},
			showMessageClick(){
				uni.navigateTo({
					url:'../message/message'
				})
			},
			showMineClick(){
				uni.navigateTo({
					url:'../mine/mine'
				})
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			change(e){
				this.current=e.detail.current;
			},
			radioChangeType(e){
				// console.log(e)
			},
			//同意加入门店
			aggressJoin(){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						this.$ajax('JoinOrg',{
							user:res.data.id
						},res=>{
							uni.showToast({
								title:'您已成功加入该门店',
								icon:'none'
							})
							this.isShowJoinModal=false;
							this.$ajax('RefreshOnlineUser',{},res=>{
								this.company={
									name:res.ownerName,
									cover:res.ownerLogoUrl
								}
								uni.setStorage({
									key:'userInfo',
									data:res,
									success: (res) => {
										console.log(res)
									}
								})
							})
							
						})
					}
				})
			},
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
				}
				
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			detailContent(item,type){
				
					uni.navigateTo({
						url:'../../all-item-content/detail-content/detail-content?type='+type+'&id='+item.id
					})
			},
			//加入门店
			toJoinShop(){
				uni.navigateTo({
					url:'../../tab-item-content/shop-center/join-shop/join-shop'
				})
			},
			showOperateItem(event){
				if(this.userInfo.status!=1){
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
			getShopInfo(id){
				this.$ajax('ProprietorShop',{id:id},res=>{
					this.shop.shopName=res.name;
					console.log(this.shop)
				})
			}
		},
		components:{
			axbCheckBox,
			uniGrid,
			NAUIcard
		},
		onLoad(){
			this.getTodoList()
			this.showArticles();
			
				uni.getStorage({
				key:'userInfo',
				success: (res) => {
					this.userInfo=res.data
					// console.log(this.userInfo)
					 if(res.data.owner!=0 && res.data.status==3){
						this.isShowJoinModal=true;
						this.shop.shopID=res.data.department;
						this.getShopInfo(this.shop.shopID)
					}else if(res.data.owner==0 && res.data.status==2){
						
						this.isShowJoinCompany=true;//显示EID
					}else{
						this.company={
							name:res.data.ownerName,
							cover:res.data.ownerLogoUrl
						}
					}
					
				}
			})
		},
		onReady(){
			
			//owner=0,显示加入公司
			//owenr=0&&status=3显示邀请
			uni.getStorage({
				key:'userInfo',
				success: (res) => {
					this.userInfo=res.data
					// console.log(this.userInfo)
					 if(res.data.owner!=0 && res.data.status==3){
						this.isShowJoinModal=true;
						this.shop.shopID=res.data.department;
						this.getShopInfo(this.shop.shopID)
					}else if(res.data.owner==0 && res.data.status==2){
						
						this.isShowJoinCompany=true;//显示EID
					}else{
						this.company={
							name:res.data.ownerName,
							cover:res.data.ownerLogoUrl
						}
					}
					
				}
			})
		},
	}
</script>
<style scoped>
	.operateImg{
		width:37px;height:37px;top:22px;left:0;
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
	padding:54px 14px 9px 18px;

}
.notice_container{
	margin-top:13px;
	background:#fff;
	padding-top:12px;
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
	display: flex;
	justify-content: space-around;
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
	line-height:44px;
	height:44px;
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
	height:20px;
font-size:14px;

font-weight:400;
color:rgba(42,42,42,1);
line-height:20px;
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
	
}

.padding-xl{
	font-size:15px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(42,42,42,1);
	border-bottom:1px solid #EEEEED;
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
</style>


 
 