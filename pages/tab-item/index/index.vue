<template>
    <view style="position:relative">
		<view class="index-container">
			<view>
				<view   v-if="isShowJoinModal">
					<text style="color:rgba(66,176,237,1);" @click="toJoinShop()">你还没有加入门店，请搜索加入</text>
				</view>
				<view class="flex justify-start" v-else >
					<image :src="company.cover" style="width:35px;height:35px;margin-right:8px;vertical-align: middle;"></image>
					<view><text class="company">{{company.name || ''}}</text></view>
				</view>

			</view>

		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in shopList" :key="index">
				<image :src="item.url" mode="aspectFill" style="height:120px;width:100%;"></image>
				
			</swiper-item>
		</swiper>
			

			<view class="operateItem">
				<view v-for="(item,index) in options" :key="index" @click="showOperateItem(index)">
					<view><image :src="item.image" style="width:55px;height:55px;"></image></view>
					<view><text class="operate-title">{{item.text}}</text></view>
				</view>
			</view>
		</view>

		<view class="notice_container">
			<view style="margin-bottom;10px;">
				<view v-for="(card,cardID) in noticeList1" :key="cardID">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-titles text-blue"></text>
							<text class="card-title">{{card.head}}</text>
						</view>
						<view class="action">
							<text class="card-more" @click="showMoreInfo(card)">更多&gt;</text>
						</view>
					</view>
					<view class="cu-card article no-card" v-for="(item,index) in card.content" :key="index" @click="detailContent(item)">
						<view class="cu-item shadow" style="padding-top:19px;padding-bottom:10px;border-bottom:1px solid rgba(238, 238, 237, 1);">
							<view class="title"><view class="text-cut">{{item.title}}</view></view>
							<view class="content">

								<view class="desc">
									<view class="text-content"> {{item.text}}</view>
									<view>
										<view class="cu-tag bg-red light sm round">{{item.date}}</view>
										<view class="cu-tag bg-green light sm round">{{item.time}}</view>
									</view>
								</view>
								<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
								 mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

			<view class="notice_container" v-for="(card,cardID) in noticeList2" :key="cardID">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text>{{card.head}}
					</view>
					<view class="action">
						<text class="card-more" @click="showMoreInfo(card)">更多&gt;</text>
					</view>
				</view>
				<view class="cu-card case" v-for="(item,index) in card.content" :key="index">
					<view class="cu-item shadow">
						<view class="image">
							<image :src="item.image"
							 mode="widthFix"></image>
							<view class="cu-tag bg-blue">案例</view>
							<view class="cu-bar bg-shadeBottom"> <text class="text-cut"></text></view>
						</view>
						<view class="cu-list">
							<view class="cu-item">
								<view class="content flex-sub">
									<view class="text-gray text-sm flex justify-between margin-top-sm">
										<view>
											<text class="cu-tag bg-red light sm round" style="margin-right:10px;">{{item.date}}</text>
											<text class="cu-tag bg-green light sm round">{{item.time}}</text>
										</view>
										<view class="text-gray text-sm">
											<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
											<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
											<text class="cuIcon-messagefill margin-lr-xs"></text> 30
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
		</view>

		<!-- <view class="cu-modal" :class="isShowJoinModal?'show':''">
			<view class="cu-dialog">
				<view class="padding-xl">
					您还没有加入门店，请搜索加入
				</view>
				<view class="cu-bar bg-white justify-around">
					<view class="action btn">
						<view style="padding:11px 40px;border-right:1px solid #EEEEED;" @click="hideModal()">取消</view>
						<view style="padding:11px 40px;color:#42B0ED;" @click="toJoinShop()">确定</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="cu-modal" :class="isShowJoinModal?'show':''">
			<view class="cu-dialog">
				<view class="padding-xl">
					南风不才邀请您加入独白伊利门店
				</view>
				<view class="cu-bar bg-white justify-around">
					<view class="action btn">
						<view style="padding:11px 38px;border-right:1px solid #EEEEED;" @click="hideModal()">不同意</view>
						<view style="padding:11px 38px;color:#42B0ED;" @click="aggressJoin()">同意</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box" style="position:fixed;bottom:0px;width:100%;">
			<view class="cu-bar tabbar bg-white">
				<view class="action" style="padding-top:5px;" @click="showIndexClick()">
					<view class="cuIcon-cu-image">
						<image src="../../../static/img/tab_img/shouye_color.png"></image>
						
					</view>
					<view class="text-blue">首页</view>
				</view>
				<view class="action" style="padding-top:5px;">
					<view class="cuIcon-cu-image" @click="showMessageClick()">
						<image src="../../../static/img/tab_img/xiaoxi.png" ></image>
						<view class="cu-tag badge">99</view>
					</view>
					<view class="text-gray">消息</view>
				</view>
				<view class="action" style="padding-top:5px;" @click="showMineClick()">
					<view class="cuIcon-cu-image">
						
						<image src="../../../static/img/tab_img/mine.png"></image>
					</view>
					<view class="text-gray">我的</view>
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
				current:1,
				noticeList1:[
					{
						value:'skill',
						head:'销售技巧',
						content:[
							{
								title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
								text:'折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
								date:'2019/03/20',
								time:'20:00'
							},
							{
								title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
								text:'折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
								date:'2019/03/20',
								time:'20:00'
							},
							{
								title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
								text:'折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
								date:'2019/03/20',
								time:'20:00'
							},{
								title:'无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。',
								text:'折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
								date:'2019/03/20',
								time:'20:00'
							},
						]
					}
				],
				noticeList2:[
					{
						value:'example',
						head:'陈列案例',
						content:[
							{
								secondHead:'京东最近发生了什么了，为什么裁员降薪？',
								image:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
								date:'2019/3/21',
								time:'20:59'
							},


						]
					}
				],
				options:[{image:'../../../static/img/index-tab/tab1.png',text:'通知公告'},
					{image:'../../../static/img/index-tab/tab2.png',text:'门店报修'},
					{image:'../../../static/img/index-tab/tab3.png',text:'我的门店'},
					{image:'../../../static/img/index-tab/tab4.png',text:'我的工作'}],
				noticeID:0
			}
		},
		computed:{

		},
		methods:{
			showMessageClick(){
				this.showIndex=this.showMine=false;
				this.showMessage=true;
				uni.navigateTo({
					url:'../message/message'
				})
			},
			showMineClick(){
				this.showIndex=this.showMessage=false;
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
				console.log(e)
			},
			//同意加入门店
			aggressJoin(){
				uni.request({
					url:this.$store.state.url+'ApplyOrInvite2Join',
					data:{
						owner:this.$store.state.userInfo.owner,//假数据
						user:this.$store.state.userInfo.id,
						shop:20
					},
					success: (res) => {
						uni.showToast({
							title:'您已成功加入独白伊利门店',
							icon:'none'
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
			showMoreInfo(item){
				console.log(item);
				if(item.value=='skill'){
					uni.navigateTo({
						url:'../../all-item-content/index-more/index-more?value'+item.value
					})
					//销售技巧
				}else if(item.value=='example'){
					uni.navigateTo({
						url:'../../all-item-content/index-more/index-more?value'+item.value
					})
				}
			},
			//关闭弹出框
			hideModal(){
				this.isShowJoinModal=false;
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			detailContent(item){
					uni.navigateTo({
						url:'../../all-item-content/detail-content/detail-content?item='+item
					})
			},
			//加入门店
			toJoinShop(){
				uni.navigateTo({
					url:'../../tab-item-content/shop-center/join-shop/join-shop'
				})
			},
			showOperateItem(event){
				switch(event){
					case 0:
					//通知公告
					uni.navigateTo({

						url:'../../tab-item-content/notice-center/notice-center'
					})
					break;
					case 1:
					//门店报修
					uni.navigateTo({

						url:'../../tab-item-content/shop-center/shop-center'
					})
					break;
					case 2:
					//我的门店
					uni.navigateTo({
						url:'../../tab-item-content/shop-center/shop-list/shop-list'
					})
					break;
					case 3:
					//工作日志
					uni.navigateTo({
						url:'../../tab-item-content/work-center/work-index/work-index'
					})
				}
			}
		},
		components:{
			axbCheckBox,
			uniGrid,
			NAUIcard
		},
		onLoad(){
			if(this.$store.state.userInfo.status===this.$store.state.userStatus.inviting){
				this.isShowJoinModal=true;
			}else{
				this.isShowJoinModal=false;
				this.company.name=this.$store.state.userInfo.ownerName
				this.company.cover=this.$store.state.userInfo.ownerLogoUrl
			}
		},
	}
</script>
<style lang="less">
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
	padding:16px 14px 9px 18px;

}
.notice_container{
	margin-top:13px;
	background:#fff;
	padding-top:12px;
	padding-right:14px;
	padding-left:18px;
	.notice_title{
		display: flex;
		padding: 0 20rpx;
		justify-content: space-between;
		font-size:30rpx;
		line-height:34px;
		border-bottom: 1px solid #eee
	}
	.notice_content{}
}
.operateItem{
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
	padding-top:34px;
}

.padding-xl{
	font-size:15px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(42,42,42,1);
	border-bottom:1px solid #EEEEED;
}
.cu-dialog{
	width:264px;
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
</style>

