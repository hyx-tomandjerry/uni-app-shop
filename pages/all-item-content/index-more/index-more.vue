<template>
	<view >
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back font-size-middle" @click.stop="goBack()" ></text></block>
			<block slot="content">
				<view class="font-size-big font-weight-bold color-normal">{{title}}</view>
			</block>
		</cu-custom>
		<view class="borderTop">
			<view v-if="skillList.length">
				<view v-if="value=='skill'">
					<view class="flex justify-start align-center borderBottom position_relative more-content" v-for="(item,index) in skillList" :key="index"  @click="checkItemInfo(item)" >
						<view style="width:71%">
							<view class="font-size-big font-weight-bold more-content-name">{{item.name}} </view>
							<view class="font-size-litter font-weight-normal">{{item.applyDate | formatTime('YMDHMS')}}</view>
						</view>
						<view style="width:29%;">
							<image :src="item.coverurl" mode="aspectFill"  class="more-content-cover"></image>
						</view>
						<image src="../../../static/img/huizhi1.png"  class="position_absolute operateImg" v-if="item.report==report"></image>
					</view>
				</view>


				<view class="cu-card case example-content" v-show="value=='example'" >
					<view v-for="(item,index) in skillList" :key="index" @click="checkItemInfo(item)"  class="borderBottom position_relative example-content-list">
						<image :src="item.coverurl" mode="aspectFill" class="example-content-cover"></image>
						<view class="font-size-big font-weight-bold example-content-name" >{{item.name}}</view>
						<view class="font-size-litter font-weight-normal color-placeholder">{{item.applyDate | formatTime('YMDHMS')}}</view>
						<image src="../../../static/img/huizhi1.png"  class="position_absolute operateImg" v-if="item.report==report"></image>
					</view>
				</view>
			</view>


			<view v-else>
				<LxEmpty></LxEmpty>
			</view>
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
					res.forEach(item=>{
						this.skillList.concat(item)
					})
					this.loading='loading'
					setTimeout(()=>{
						this.loading='noMore'

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
					if(res){
						res.forEach(item=>{
							if(!item.coverurl){
								item.coverurl="../../../static/img/default.png"
							}
						})
						this.skillList=res;
					}

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
	@import url('../../../static/css/demo.less');
	page{
		background:#FFF;
	}
	.cu-card>.cu-item{
		.mixMargin(0,0,0,0);
	}
	.cu-card.article{
		.mixBorderBottom(1px;solid ;rgba(238, 238, 237, 1));
	}
	.cu-list.menu-avatar>.cu-item .content{
		left:10px;
		.mixWidth(calc(100%  - 30px - 10px))
	}
	.operateImg{
		.img(37px;37px);
		top:22px;
		right:18px;

	}
	.more-content{
		.mixPadding(23px;18px;21px;14px);
		.more-content-name{
			.mixMarginBottom(10px)
		}
		.more-content-cover{
			.mixHeight(79px);
			.mixBorderRadius(10px)
		}

	}
	.example-content{
		.mixMargin(7px;7px;7px;7px);
		.mixBorderRadius(10px);
		.example-content-list{
			.mixPadding(23px;14px;21px;14px;);
			.example-content-cover{
				width:100%;
				height:143px;
				.mixBorderRadius(10px);
				.mixMarginBottom(13px);
			}
			.example-content-name{
				.mixMarginBottom(10px);
			}
		}
	}
</style>

