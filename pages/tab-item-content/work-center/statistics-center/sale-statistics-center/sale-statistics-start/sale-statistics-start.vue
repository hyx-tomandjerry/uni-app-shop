<template>
	<view class="bg-white">
		<cu-custom :isBack="true" bg-color="bg-white">
			<block slot="left">
				<view class="cuIcon-back" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-weight-bold font-size-big color-normal">
					<text class="color-blue">{{timeObj.year}}年<text class="color-blue">{{timeObj.month}}月</text></text>门店销售榜
				</view>
			</block>
			<block slot="right" >
				<view @click="searchEvent" style="margin-right:20px;" class="color-normal">筛选</view>
			</block>
		</cu-custom>
		<view class="shop-rank-container borderTop bg-white">
			<view class="rank-tab-container flex justify-between">
				<view class="rank-tab-l">
					<block  v-for="(item,index) in tabList"  :key="index">
						<view  @click="tabSelect(item)" :class="{'tab-active':tabCur==item.value}">{{item.title}}</view>
					</block>
				</view>
				<view class="rank-tab-r" @tap="changeDesc">
					<view>
						<image
							:src="desc?'../../../../../../static/img/up.png':'../../../../../../static/img/down.png'"
							mode="widthFix"
							lazy-load>
						</image>
					</view>
					<view>{{desc?'降序':'升序'}}</view>
				</view>
			</view>
			<template v-if="desc">
				<view v-if="threeList[0]&&threeList[0].name">
					<view class="rank-three-container flex justify-start " >
						<view class=" second-rank flex-litter bg-white">
							<image src="../../../../../../static/img/work/statistics/rank/two.png" mode="" class="rank-second-img"></image>
							<!-- 头像-->
							 <image :src="threeList[1]&&threeList[1].field?threeList[1].field:'../../../../../../static/img/default.png'" mode="widthFix" class="rank-avatar"></image>
							<!--tag-->
							 <image src="../../../../../../static/img/work/statistics/rank/two_tag.png" class="rank-tag"></image>
					
							<view class="tank-intro position_absolute font-size-litter font-weight-bold color-normal" style="bottom:-40upx;">
								<view>{{threeList[1]?threeList[1].name : ''}}</view>
								<view class="color-red font-weight-bold">￥{{threeList[1]&&threeList[1].actual || 0}}</view>
							</view>
						</view>
						<view class=" first-rank flex-1">
							<image src="../../../../../../static/img/work/statistics/rank/one.png" mode="" class="rank-one-img"></image>
							<image :src="threeList[0]&&threeList[0].field?threeList[0].field:'../../../../../../static/img/default.png'" mode="" class="rank-one-avatar"></image>
							<image src="../../../../../../static/img/work/statistics/rank/one_tag.png" class="one-tag"></image>
					
							<view class="tank-intro position_absolute font-size-litter font-weight-bold color-normal" style="bottom:-30upx;">
								<view>{{threeList[0]?threeList[0].name : ''}}</view>
								<view class="color-red font-weight-bold">￥{{threeList[0]&&threeList[0].actual || 0}}</view>
							</view>
						</view>
						<view class=" three-rank flex-litter">
							<image src="../../../../../../static/img/work/statistics/rank/three.png" mode="" class="rank-three-img"></image>
							<!--&lt;!&ndash; 头像&ndash;&gt;-->
							<image :src="threeList[2]&&threeList[2].field?threeList[2].field:'../../../../../../static/img/default.png'" mode="" class="rank-avatar"></image>
					
							<image src="../../../../../../static/img/work/statistics/rank/three_tag.png" class="rank-tag"></image>
							<view class="tank-intro position_absolute font-size-litter font-weight-bold color-normal" style="bottom:-40upx;">
								<view>{{threeList[2]?threeList[2].name : ''}}</view>
								<view class="color-red font-weight-bold">￥{{threeList[2]&&threeList[2].actual || 0}}</view>
							</view>
						</view>
					</view>
					
				</view>
			</template>
			<template v-if="otherList.length">
				<view class="rank-list-container">
					<view class="rank-list-item borderBottom" v-for="(item,index) in otherList" :key="index">
						<view class="flex justify-start align-center">
							<view class="margin-right">{{desc?index+3:index+1}}</view>
							<view>
								<image :src="item.field?item.field:'../../../../../../static/img/default.png'" class="sale-avatar"></image>
								<text>{{item?item.name :''}}</text>
							</view>
						</view>
						<view>
							<image src="../../../../../../static/img/work/statistics/rank/gold.png" mode="" class="gold-img"></image>
							<text class="font-weight-bold color-red">{{item.actual}}</text>
						</view>
					</view>
				</view>
			</template>
			<view v-else>
				<LxEmpty></LxEmpty>
			</view>
		</view>
	</view>
</template>
<script>
	import LxEmpty from '../../../../../../lx_components/lx-empty.vue'
	export default{
		data(){
			return{
				tabList:[
						{value:'year',title:'年度榜单'},
						{value:'month',title:'月度榜单'}
						],
				tabCur:'year',
				timeObj:{
					year:new Date().getFullYear(),
					month:new Date().getMonth()+1,
					// day:new Date().getDate()
				},
				shopZone:'',
				threeList:[],
				otherList:[],
				desc:true,//降序
				brandID:''
			}
		},
		components:{
			LxEmpty
		},
		methods:{
			//升序还是降序
			changeDesc(){
				this.desc=!this.desc;
				this.getShopRank()
			},
			//选择年度帮单还是月度帮单
			tabSelect(item){
				this.tabCur=item.value;
				this.getShopRank()
			},
			//返回
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//筛选
			searchEvent(){
				uni.navigateTo({
					url:"../sale-statistics-search/sale-statistics-search"
				})
			},
			//获得门店列表
			getShopRank(){
				this.$ajax('ShopRanking',{
					year:this.timeObj.year,
					month:this.tabCur=='month'?this.timeObj.month:'',
					zone:this.shopZone,//门店区域
					brand:this.brandID,//门店品牌
					desc:this.desc,
					
				},res=>{
					if(res){
						if(this.desc){
							//降序
							let arr=[];
							arr[0]=res[0]?res[0]:{};
							arr[1]=res[1]?res[1]:{};
							arr[2]=res[2]?res[2]:{};
							this.threeList=arr;
							this.otherList=res.splice(3);
						}else{
							//升序
							
							this.otherList=res
						}
						
					}
				})
			}
		},
		onLoad(options){
			if(options){
				this.shopZone=options.zone;
			}
			this.$fire.on('search',result=>{
				if(result){
					this.tabCur='year'
					this.timeObj.year=result.year;
					this.timeObj.month=result.month;
					this.shopZone=result.target;
					this.brandID=result.brand;
					this.getShopRank()
				}
				
			})
			this.getShopRank()
		},
	}
</script>
<style lang="less">
	.rank-tab-container{
		padding:20upx 10upx 20upx 20upx;
		align-content: center;
	}
	.rank-tab-l{
		flex:1;
		border:1upx solid #42B0ED;
		border-radius: 10upx;
		height:70upx;
		line-height:70upx;
		text-align: center;
		display: flex;
		justify-content: flex-start;
		align-content: center;
	}
	.rank-tab-l>view{
		flex:1
	}
	.rank-tab-l>view:first-child{
		border-radius: 10upx 0 0 10upx;
	}
	.rank-tab-l>view:last-child{
		border-radius: 0 10upx 10upx 0;
	}
	.rank-tab-r{
		width:100upx;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		text-align: center;
	}
	.rank-tab-r>view:first-child{
		display: flex;
		align-content: center;
		justify-content: center;
	}
	.rank-tab-r>view:first-child>image{
		width:40upx;
		height:40upx !important;
		
	}
	page{
		background-color: #fff;
	}
	.shop-rank-container{
		.shop-rank-t{
			margin:15px 12px 10px 14px;
			height: 34px;
			line-height:34px;
			border-radius:6px;
			border:1px solid rgba(66,176,237,1);

		}
		.rank-three-container{
			height:180px;
			padding: 10px;
			.second-rank{
				padding-top:20px;
				position:relative;
				/*margin-top: 30px;*/

				/*background:url("../../../../../../static/img/work/statistics/rank/one.png") no-repeat;*/
				/*background-size:contain;*/
				.rank-second-img{
					height: 120px;
					position:absolute;
					top:30px;
					left:0;
				}

			}
			.first-rank{
				position:relative;
				.rank-one-img{
					height: 180px !important;
					position:absolute;
					top:-20px;
					left:0;
				}
				/*height: 180px;*/
				/*background:url(../../../../../../static/img/work/statistics/rank/two.png) no-repeat;*/
				/*background-size:contain;*/
			}
			.three-rank{
				padding-top:20px;
				position: relative;
				/*margin-top: 30px;*/
				/*height: 120px;*/
				/*background:url(../../../../../../static/img/work/statistics/rank/two.png) no-repeat;*/
				/*background-size:contain;*/
				.rank-three-img{
					height: 120px;
					position:absolute;
					top:30px;
					left:0;
				}
			}
			.rank-avatar{
				width: 42px;
				height: 42px;
				border-radius:50%;
				position:absolute;
				left:50%;
				top:56%;
				transform:translate(-50%,-50%);

			}
			.rank-one-avatar{
				width: 60px;
				height: 60px;
				border-radius:50%;
				position:absolute;
				left:50%;
				top:45%;
				transform:translate(-50%,-50%);
			}
			.rank-tag{
				height:30px;
				width: 80px;
				position:absolute;
				bottom:30px;
				left:50%;
				transform:translateX(-50%);
			}
			.one-tag{
				height:30px;
				width: 110px;
				position:absolute;
				bottom:40px;
				left:50%;
				transform:translateX(-50%);
			}
			.tank-intro{
				text-align: center;
				bottom:0;
				left:50%;
				transform:translateX(-50%);
			}
		}
		.rank-list-container{
			padding:17px 15px;
			.rank-list-item{
				height:68px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.sale-avatar{
					width: 47px;
					height: 47px;
					border-radius:50%;
					vertical-align: middle;
					margin-right: 14px;
				}
				.gold-img{
					width: 18px;
					height: 18px;
					vertical-align: middle;
					margin-right: 4px;
				}
			}
		}
	}
	.tab-active{
		background:rgba(66,176,237,1);
		color:#fff;
	}
</style>
