<template>
	<view >
		<cu-custom :isBack="true">
			<block slot="left"><text class="cuIcon-back " @click="goBack()" style="font-size:20px;"></text></block>
			<block slot="content">
				<view class="font-size-big font-weight-bold">{{title}}</view>
			</block>
		</cu-custom>
		<view class="more-content borderTop">
			<view v-if="value=='skill'">
				<view class="flex justify-start align-center borderBottom position_relative" v-for="(item,index) in skillList" :key="index"  @click="checkItemInfo(item)" style="padding:23px 18px 21px 14px;">
					<view style="width:40%;margin-right:20px;">
						<image :src="item.coverurl" mode="aspectFill" style="height:79px;border-radius: 10px;;"></image>
					</view>
					<view>
						<view class="font-size-big font-weight-bold" style="margin-bottom:10px;">{{item.title}} </view>
						<view class="font-size-litter font-weight-normal">{{item.applyDate | formatTime('YMDHMS')}}</view>
					</view>
					<image src="../../../static/img/huizhi.png"  class="position_absolute operateImg" v-if="item.report==1"></image>
				</view>
			</view>
			<view class="cu-card case" v-show="value=='example'"  style="margin:7px;border-radius: 10px;">
				<view v-for="(item,index) in skillList" :key="index" @click="checkItemInfo(item)" style="padding:23px 18px 21px 14px;" class="borderBottom position_relative">
					<image :src="item.coverurl" mode="aspectFill" style="width:100%;height:109px;border-radius: 10px;margin-bottom:13px;"></image>
					<view class="font-size-big font-weight-bold" style="margin-bottom:10px;">{{item.title}}</view>
					<view class="font-size-litter font-weight-normal">{{item.applyDate | formatTime('YMDHMS')}}</view>
					<image src="../../../static/img/huizhi.png"  class="position_absolute operateImg" v-if="item.report==1"></image>
				</view>
			</view>
		</view>

		<view class="cu-load bg-gray loading" v-if="isLoading"></view>
		<view class="cu-load bg-gray over" v-if="isFinish"></view>
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
				isLoading:false,
				isFinish:false,
				page:1,
			}
		},
		components:{
			headTab
		},
		onReachBottom(){
			console.log('到达底部')
			this.page++;
			setTimeout(()=>{
				this.$ajax('MyArticles',{
					type:this.value=='skill'?1:2,
					offset:this.$utils.getOffset(this.page)
				},res=>{
					this.isLoading=true;
					if(res==''){
						this.isLoading=false;
						setTimeout(()=>{
								this.isFinish=true;
						},600)

					}else{
						res.forEach(item=>{
							this.skillList.concat(item)
							// if(this.value=='skill'&& item.type==1){
							// 	this.skillList.concat(item)
							// }else if(this.value=='example' && item.type==2){
							// 	this.skillList.concat(item)
							// }
						})
					}

				})
			},500)

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
				this.$ajax('MyArticles',{
					type:this.value=='skill'?1:2,
					offset:this.$utils.getOffset(this.page)
				},res=>{
					this.skillList=res;
					// res.forEach(item=>{
					// 	if(this.value=='skill'&& item.type==1){
					// 		this.skillList.push(item)
					// 	}else if(this.value=='example' && item.type==2){
					// 		this.skillList.push(item)
					// 	}
					// })
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
	.operateImg{
		width:37px;
		height:37px;
		top:21px;
		left:14px;
	}
	page{
		background:#fff;
	}
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

