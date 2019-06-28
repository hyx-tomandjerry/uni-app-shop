<template>
	<view >
		<cu-custom :isBack="true">
			<block slot="left"><text class="cuIcon-back " @click="goBack()" style="font-size:20px;"></text></block>
			<block slot="content">
				<view class="font-size-big font-weight-bold">{{title}}</view>
			</block>
		</cu-custom>
		<view class="more-content borderTop" v-if="skillList.length>0">
			
			<view v-if="value=='skill'">
				<view class="flex justify-start align-center borderBottom position_relative" v-for="(item,index) in skillList" :key="index"  @click="checkItemInfo(item)" style="padding:23px 18px 21px 14px;">
					
					<view style="width:71%">
						<view class="font-size-big font-weight-bold" style="margin-bottom:10px;">{{item.name}} </view>
						<view class="font-size-litter font-weight-normal">{{item.applyDate | formatTime('YMDHMS')}}</view>
					</view>
					<view style="width:29%;">
						<image :src="item.coverurl" mode="aspectFill" style="height:79px;border-radius: 10px;;"></image>
					</view>
					<image src="../../../static/img/huizhi1.png"  class="position_absolute operateImg" v-if="item.report==report"></image>
				</view>
			</view>
			<view class="cu-card case" v-show="value=='example'"  style="margin:7px;border-radius: 10px;">
				<view v-for="(item,index) in skillList" :key="index" @click="checkItemInfo(item)" style="padding:23px 18px 21px 14px;" class="borderBottom position_relative">
					<image :src="item.coverurl" mode="aspectFill" style="width:100%;height:109px;border-radius: 10px;margin-bottom:13px;"></image>
					<view class="font-size-big font-weight-bold" style="margin-bottom:10px;">{{item.name}}</view>
					<view class="font-size-litter font-weight-normal">{{item.applyDate | formatTime('YMDHMS')}}</view>
					<image src="../../../static/img/huizhi1.png"  class="position_absolute operateImg" v-if="item.report==report"></image>
				</view>
			</view>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>

		<uni-load-more :contentText="content" :showIcon="true" :status="loading"></uni-load-more>
	</view>
</template>

<script>
	import LxEmpty from '../../../lx_components/lx-empty.vue';
	import uniLoadMore from '../../../components/uni-load-more.vue'
	import {mapState} from 'vuex'
	export default{
		computed:mapState(['report']),
		data(){
			return{
				exampleList:[],
				skillList:[],
				title:'',
				value:'',
				isLoading:false,
				isFinish:false,
				page:1,
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more'
			}
		},
		components:{
			LxEmpty,
			uniLoadMore
			
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},800)
			this.getArticleList()
		},
		onReachBottom(){
		
			this.page++;
			this.$ajax('MyArticles',{
				type:this.value=='skill'?1:2,
				offset:this.$utils.getOffset(this.page)
			},res=>{
				
				if(res==''){
					
					setTimeout(()=>{
							this.loading='noMore'
					},900)
			
				}else{
					setTimeout(()=>{
						res.forEach(item=>{
							this.skillList.concat(item)
						})
						this.loading='loading'
					},900)
					
				}
			
			})

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
	page{
		background:rgba(247,247,247,1);
	}
	.operateImg{
		width:37px;
		height:37px;
		top:22px;
		right:18px;
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

