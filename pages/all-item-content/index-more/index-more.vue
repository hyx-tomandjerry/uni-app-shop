<template>
	<view >
		<cu-custom :isBack="true">
			<block slot="left"><text class="cuIcon-back" @click="goBack()"></text></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="more-content">
			<view v-if="value=='skill'">
				<view class="cu-card article " v-for="(item,index) in skillList" :key="index"  @click="checkItemInfo(item)">
					<view class="cu-item shadow" 
					style="padding-top:19px;padding-bottom:10px;border-bottom:1px solid rgba(238, 238, 237, 1);margin:5px;">
						<!-- <view class="title"><view class="text-cut">{{item.title}}</view></view> -->
						<view class="content">
				
							<view class="desc">
								<view class="text-content" style="font-size:18px;color:#000;font-weight: 600;">{{item.title}} </view>
								
								<view>
									<view class="cu-tag bg-red light sm round">
										<!-- {{item.createdate | formatTime('YMD','/')}} -->
										{{item.creatorName}}
									</view>
									<view class="cu-tag bg-green light sm round">{{item.shopName}}</view>
								</view>
							</view>
							<image :src="item.coverurl"
							 mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card case" v-show="value=='example'"  style="margin:7px;border-radius: 10px;">
				
				<view class="cu-card article no-card" v-for="(item,index) in skillList" :key="index" @click="checkItemInfo(item)">
					<view class="cu-item shadow" style="padding-top:19px;padding-bottom:10px;border-bottom:1px solid rgba(238, 238, 237, 1);">
						<view class="title"><view class="text-cut">{{item.title}}</view></view>
						<view class="content ">
								
							<view class="desc  ">
								<view class="text-content  ellipse" style="width:46%;" v-html="item.summary"> </view>
								<view class="flex justify-between">
									<view>
										<view class="cu-tag bg-blue light sm round">{{item.creatorName}}</view>
										<view class="cu-tag bg-green light sm round">{{item.shopName}}</view>
									</view>
									<view style="width:65%">
										<view class="cu-tag bg-red light sm round">{{item.createdate | formatTime('YMD','/')}}</view>
									</view>
									
								</view>
							</view>
							<!-- <image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
							 mode="aspectFill"></image> -->
						</view>
					</view>
				</view>
				<!-- <view class="cu-item shadow">
					<view class="image">
							<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="widthFix"></image>
							<view class="cu-tag bg-blue">案例</view>
							<view class="cu-bar bg-shadeBottom"> 
								<text class="text-cut">{{item.title}}</text>
							</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="content flex-sub">
								<view class="text-gray text-sm flex justify-between">
									<view>
										<view class="cu-tag bg-red light sm round">{{item.date}}</view>
										<view class="cu-tag bg-green light sm round">{{item.time}}</view>
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
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import headTab from '../../../components/head-tab.vue'
	export default{
		data(){
			return{
				exampleList:[],
				skillList:[],
				title:'',
				value:'',
			}
		},
		components:{
			headTab
		},
		methods:{
			checkItemInfo(item){
				uni.navigateTo({
					url:"../detail-content/detail-content?id="+item.id+"&type="+this.value
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1,
				})
			},
			//获得销售技巧列表
			getArticleList(){
				this.$ajax('Articles',{
					zone:-1
				},res=>{
					res.forEach(item=>{
						if(this.value=='skill'&& item.type==1){
							this.skillList.push(item)
						}else if(this.value=='example' && item.type==2){
							console.log('----')
							this.skillList.push(item)
						}
					})
					console.log(this.skillList)
				})
			}
		},
		onLoad(option){
			
			if(option.value=='skill'){
				this.title='销售技巧';
				this.value=option.value;
				
			}else if(option.value=='example'){
				this.title='陈述案例';
				this.value=option.value;
			
			}
			this.getArticleList()
		
		}
	}
</script>

<style lang="less">
	
	.notice_title{
		font-size:34rpx;
		height:100rpx;
		line-height: 100rpx;
		text-align: center;
	}
	.noticeItem{
		width:100%;
		margin:20rpx 0;
		image{
			width:100%;
		}
		.noticeInfo{
			font-size:28rpx;
		}
	}
	.title{
		font-size:16px;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(42,42,42,1);
	}
	.cu-card>.cu-item{
		margin:0;
	}
	.cu-card.article{
		border-bottom:1px solid rgba(238, 238, 237, 1);
	}
	.cu-list.menu-avatar>.cu-item .content{
		left:10px;
		width:calc(100%  - 30px - 10px);
	}
</style>

