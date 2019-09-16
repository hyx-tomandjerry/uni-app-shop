<template>
    <view class="position_relative">
	
		<view class="head-container" >
			<!-- header start  -->
			<!-- 如果type=4&&status=2 加入门店-->
			<view v-if="userInfo && (userInfo.type==shoperObj.type)">
				
				<view v-if="userInfo.status==userStatus.applying">
					<text class=" text-orange ">申请加入中</text>
				</view>
				<view class="flex justify-start"  v-else>
					<image :src="company.cover?company.cover:'../../../static/img/default.png'" class="companyImg"></image>
					<view style="padding-top:3px;"><text class="company">{{company.name || ''}}</text></view>
				</view>
			</view>
			<!-- header end -->
		</view>
		<view class="index-container">
			
			<!-- swiper start -->
			<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in shopList" :key="index">
					<image :src="item.url" mode="aspectFill" style="border-radius:8px;"></image>	
				</swiper-item>
			</swiper>
			<!-- swiper end -->
			<!-- tab start -->
			<view class="operateItem">
				<view v-for="(item,index) in options" :key="index" @click="showOperateItem(index)" style="position: relative;">
					<view><image :src="item.image" 
						:class="{
							'operateIcon':index==0 || index==3,
							'repairImg':index==1 || index==2
						}"
					></image></view>
					<view><text class="operate-title">{{item.text}}</text></view>
					<view  v-if="todoNum>0 && item.isCheck" class="notice-tag">{{todoNum }}</view>
				</view>
			</view>
			<!-- tab end -->
		</view>
		
		<!-- article start -->
		<view class="notice_container">
			<view style="margin-bottom:10px;">
				<view>
					<view class="cu-bar bg-white ">
						<view class="action">
							
							<text class="card-title">销售公告</text>
						</view>
						<view class="action">
							<text class="card-more" @click="showMoreInfo('skill')">更多<text class="cuIcon-right" ></text></text>
						</view>
					</view>
					
					<view v-if="noticeList1.length==0" style="text-align: center;padding:42px 0 68px;">
						
						<image src="../../../static/img/noticeNo.png" style="width:125px;height:92px;"></image>
						<view class="font-size-small font-weight-normal " style="color:rgba(137,136,136,1);">暂无数据哦~</view>
					</view>
					<view class="flex justify-start  position_relative borderBottom" v-for="(item,index) in noticeList1" :key="index" @click="detailContent(item,'skill')" style="padding:23px 0 25px;;width:100%;align-items:center"  v-else>
						
						<view style="width:70%;margin-right:7px;">
							<view class="font-weight-super font-weight-middle color-normal" style="margin-bottom:7px;">{{item.name}}</view>
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
		<view class="bg-white" style="margin-top:13px;padding-right:14px;padding-left:18px;">
			<view class="cu-bar bg-white " >
				<view class="action">
					<text class="card-title">陈列公告</text>
				</view>
				<view class="action">
					<text class="card-more" @click="showMoreInfo('example')">更多<text class="cuIcon-right" ></text></text>
				</view>
			</view>
			
			<view v-if="noticeList2.length==0" style="text-align: center;padding:42px 0 68px;">
				<image src="../../../static/img/noticeNo.png" style="width:125px;height:92px;"></image>
				<view class="font-size-small font-weight-normal " style="color:rgba(137,136,136,1);">暂无数据哦~</view>
			</view>
			<view class="example-list  position_relative" style="padding:21px 0 18px;" v-for="(item,index) in noticeList2 " :key="index" @click="detailContent(item,'example')" v-else>
				<div 	class="coverImg"
						:style="[{ backgroundImage:'url(' + item.coverurl+ ')' }]"></div>
				<view class=" font-weight-super font-weight-middle color-normal" style="margin-bottom:3px;margin-top:5px;">{{item.name}}</view>
				<view class="font-size-small font-weight-normal" style="color: rgb(137, 136, 136)">{{item.applyDate | formatTime('YMDHMS')}}</view>
				<image src="../../../static/img/huizhi1.png"  mode="aspectFill" class="operateImg position_absolute" style="top:21px;right:0;"
					   v-if="item.report==report"></image>
			</view>
			
			
		</view>
		<!-- article end -->
		<image src="../../../static/img/edit.png"
			   style="position:fixed;right:12px;bottom:40px;width:80px;height:80px;z-index:100;" @click.stop="recordMoney"></image>
    </view>
</template>
<script>
	import simpleModel from '../../../components/simple-model.vue';
	import showModel from '../../../components/show-model.vue'
	import {mapState,mapMutations} from 'vuex'
	export default{
		computed:mapState(['userInfo','userStatus','shoperObj','report']),
		data(){
			return{
				shopList:[
					{id:0,url:"https://i01piccdn.sogoucdn.com/73d5a112b17c6806"},
					{id:1,url:"https://i01piccdn.sogoucdn.com/4a0fbf1cf00509d2"},
					{id:2,url:"https://i03piccdn.sogoucdn.com/c3a5ff7cbecc25f3"},
					{id:3,url:"https://i02piccdn.sogoucdn.com/eb3f0b525a56d51c"},
					{id:4,url:"https://i01piccdn.sogoucdn.com/1c6f37b86d604fb1"},
					{id:5,url:"https://i02piccdn.sogoucdn.com/1a49f133f0b2edb5"}
				],
				company:{
					name:'',
					cover:''
				},//公司名称
				noticeList1:[],//销售技巧
				noticeList2:[],//陈述案例
				options:[
					{image:'../../../static/img/index/index-message.png',text:'通知公告',isCheck:true},
					{image:'../../../static/img/index/index-repair.png',text:'门店报修'},
					{image:'../../../static/img/index/index-express.png',text:'快递包裹'},
					{image:'../../../static/img/index/index-shop.png',text:'我的门店'},
					
					],
				todoNum:0,
				statusBarHeight:''
			}
		},
		
		methods:{
			
			/*记一笔*/
			recordMoney(){
				uni.navigateTo({
					url:"../../tab-item-content/work-center/statistics-center/record-money/record-money"
				})
			},

			/*获得代办数量*/
			getTodoList(){
				this.$ajax('MyEventNumbers',{},res=>{
					this.todoNum=res;
				})
			},
			
			/*文章列表*/
			showArticles(){
				this.$ajax('MyArticles',{
					offset:0,
					type:0
				},res=>{
					if(res){
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
					}
				})
			},
			/*
			*查看详情
			toNoticeContent(item){
				console.log(item.value)
				uni.navigateTo({
					url:'../../all-item-content/index-more/index-more?value='+item.value
				})
			},
			*/
		   
		   /*点击更多*/
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
			/*查看文章详情*/
			detailContent(item,type){
					uni.navigateTo({
						url:'../../all-item-content/detail-content/detail-content?type='+type+'&id='+item.id
					})
			},
			/*刷新*/
			refreshInfo(){
				this.$ajax('RefreshOnlineUser',{},res=>{
					if(res.status==this.userStatus.normal){
						this.login(res);
						this.company={
							name:res['ownerName'],
							cover:res['ownerLogoUrl']
						}
						this.getTodoList()
						this.showArticles();
						
					}
				})
			},
			/*nav操作*/
			showOperateItem(event){
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
							url:'../../tab-item-content/shop-center/shop-list/shop-list?type=shop'
						})
				}
				
			},
			
			...mapMutations(['login'])
		
		},
		components:{
			simpleModel,
			showModel
		},
	
		onLoad(){
			this.getTodoList()
			this.showArticles();
			
		},
		onShow(){
			this.refreshInfo();
			
		}
		
	}
</script>
<style scoped>
	.head-container{
		padding-top:48px;
		padding-bottom:10px;
		position:fixed;left:16px;z-index:100;background:#fff;width:100%;top:48p
	}
	.companyImg{
		width:35px;height:35px;margin-right:8px;

		border-radius: 50%;
		vertical-align: middle;
	}
	.operateImg{
		width:40px;height:36px;top:22px;
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
	padding:89px 14px 15px 18px;

}
.notice_container{
	margin-top:13px;
	background:#fff;
	
	padding-right:14px;
	padding-left:18px;
	
}

	.cu-bar .action:first-child{
		margin-left:0;
	}

.operateItem{
	padding-top:16px;
	padding-left:10px;
	padding-right:9px;
	display: flex;
	justify-content: space-between;
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

font-weight:800;
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
	
	.repairImg{
		width: 60px;
		height: 60px;
	}
	.operateIcon{
		width: 58px;
		height: 58px;
	}
</style>


 
 