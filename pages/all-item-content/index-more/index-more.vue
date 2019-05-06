<template>
	<view >
		<cu-custom  :isBack="true" bgColor="bg-white" >
			<block slot="left"><text class="cuIcon-back"  @click="goBack()"></text></block>
			<block slot="content" ><text class="title">{{title}}</text></block>
		</cu-custom>
		
		<view class="more-content" style="padding-top:44px;">
			
			<view class="cu-card article" v-for="(item ,index) in skillList" :key="index" v-show="value=='skill'">
				<view class="cu-item shadow">
					<view class="title"><view class="text-cut">{{item.title}}</view></view>
						<view class="content">
							<image :src="item.img"
							 mode="aspectFill"></image>
							<view class="desc">
								<view class="text-content">{{item.content}}</view>
								<view>
									<view class="cu-tag bg-red light sm round">{{item.date}}</view>
									<view class="cu-tag bg-green light sm round">{{item.time}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-card case" v-show="value=='example'"  v-for="(item ,i) in exampleList" :key="i" >
				<view class="cu-item shadow">
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
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				exampleList:[
					{
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						title:'我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
						date:'2019/02/20',
						time:'21:21'
					},
					{
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						title:'我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
						date:'2019/02/20',
						time:'21:21'
					},
					{
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						title:'我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
						date:'2019/02/20',
						time:'21:21'
					},
					{
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						title:'我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
						date:'2019/02/20',
						time:'21:21'
					},
					{
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						title:'我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
						date:'2019/02/20',
						time:'21:21'
					}
				],
				skillList:[
					{
						title:'有时我觉得自己很无知，世界这么大，我竟然不知道拿什么来爱',
						content:'折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						date:'2019/5/20',
						time:'20:00'
					},
					{
						title:' 爱情就是一个将陌生人变成情侣，又将情侣变成陌生人的游戏。',
						content:'折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						date:'2019/5/20',
						time:'20:00'
					},
					{
						title:' 世间有什么缘分不缘分，都是撑来的。',
						content:'折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						date:'2019/5/20',
						time:'20:00'
					},
					{
						title:' 电影开场，我们的爱情却已散场ゞ',
						content:'折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						date:'2019/5/20',
						time:'20:00'
					},
					{
						title:'真心喜欢一个人，就会想，如果我可以再漂亮一点就好了。',
						content:'折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！',
						img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						date:'2019/5/20',
						time:'20:00'
					}
				],
				title:'',
				value:'',
			}
		},
		methods:{
			goBack(){
				uni.navigateBack({
					delta:1,
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
