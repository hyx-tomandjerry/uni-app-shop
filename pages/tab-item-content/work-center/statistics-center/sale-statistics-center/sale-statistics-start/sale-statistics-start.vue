<template>
	<view class="bg-white">
		<cu-custom :isBack="true" bg-color="bg-white">
			<block slot="left">
				<view class="font-size-back color-regular cuIcon-back" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-weight-bold font-size-big color-normal">
					销售榜
				</view>
			</block>
			<block slot="right" >
				<view @click="searchEvent" style="margin-right:20px;" class="color-normal">筛选</view>
			</block>
		</cu-custom>

		<view class="shop-rank-container borderTop bg-white">
			<view class="shop-rank-t flex justify-start font-size-normal">
				<view class="flex-1 text-center shop-rank-tab"
					  @click="tabSelect(item)"
					  v-for="(item,index) in tabList"
					  :class="{'tab-active':tabCur==item.value}"
					  :key="index">{{item.title}}</view>
			</view>
			<view v-if="threeList[0]&&threeList[0].field">
				<view class="rank-three-container flex justify-start " >
					<view class=" second-rank flex-litter bg-white">
						<image src="../../../../../../static/img/work/statistics/rank/two.png" mode="" class="rank-second-img"></image>
						<!-- 头像 -->
						 <image :src="threeList[1]&&threeList[1].afield?threeList[1].afield:'../../../../../../static/img/default.png'" mode="" class="rank-avatar"></image>
						<!--tag-->
						 <image src="../../../../../../static/img/work/statistics/rank/two_tag.png" class="rank-tag"></image>
				
						<view class="tank-intro position_absolute font-size-litter font-weight-bold color-normal">
							<view>{{threeList[1]?threeList[1].field : ''}}</view>
							<view class="color-red font-weight-bold">￥{{threeList[1]&&threeList[1].actual || 0}}</view>
						</view>
					</view>
					<view class=" first-rank flex-1">
						<image src="../../../../../../static/img/work/statistics/rank/one.png" mode="" class="rank-one-img"></image>
						<image :src="threeList[0]&&threeList[0].afield?threeList[0].afield:'../../../../../../static/img/default.png'" mode="" class="rank-one-avatar"></image>
						<image src="../../../../../../static/img/work/statistics/rank/one_tag.png" class="one-tag"></image>
				
						<view class="tank-intro position_absolute font-size-litter font-weight-bold color-normal">
							<view>{{threeList[0]?threeList[0].field : ''}}</view>
							<view class="color-red font-weight-bold">￥{{threeList[0]&&threeList[0].actual || 0}}</view>
						</view>
					</view>
					<view class=" three-rank flex-litter">
						<image src="../../../../../../static/img/work/statistics/rank/three.png" mode="" class="rank-three-img"></image>
						<!--&lt;!&ndash; 头像&ndash;&gt;-->
						<image :src="threeList[2]&&threeList[2].afield?threeList[2].afield:'../../../../../../static/img/default.png'" mode="" class="rank-avatar"></image>
				
						<image src="../../../../../../static/img/work/statistics/rank/three_tag.png" class="rank-tag"></image>
						<view class="tank-intro position_absolute font-size-litter font-weight-bold color-normal">
							<view>{{threeList[2]?threeList[2].field : ''}}</view>
							<view class="color-red font-weight-bold">￥{{threeList[2]&&threeList[2].actual || 0}}</view>
						</view>
					</view>
				</view>
				<view class="rank-list-container">
					<view class="rank-list-item borderBottom" v-for="(item,index) in otherList" :key="index">
						<view class="flex justify-start align-center">
							<view class="margin-right">{{index+3}}</view>
							<view>
								<image :src="item.afield?item.afield:'../../../../../../static/img/default.png'" class="sale-avatar"></image>
								<text>{{item?item.field :''}}</text>
							</view>
						</view>
						<view>
							<image src="../../../../../../static/img/work/statistics/rank/gold.png" mode="" class="gold-img"></image>
							<text class="font-weight-bold color-red">{{item.actual}}</text>
						</view>
					</view>
				</view>
			</view>
			
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
					day:new Date().getDate()
				},
				shopZone:'',
				threeList:[],
				otherList:[]
			}
		},
		components:{
			LxEmpty
		},
		methods:{
			//选择年度帮单还是月度帮单
			tabSelect(item){
				this.tabCur=item.value;
				let flag=this.tabCur=='month';
				this.getShopRank(flag)
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
			getShopRank(flag){
				
				this.$ajax('ZoneShopPerformancesList',{
					year:this.timeObj.year,
					month:flag?this.timeObj.month:'',
					area:1,
					type:2,
					target:this.shopZone
				},res=>{
					
					this.threeList=[]
					this.threeList[0]=res[0]?res[0]:{};
					this.threeList[1]=res[1]?res[1]:{};
					this.threeList[2]=res[2]?res[2]:{};
					this.otherList=res.splice(3);
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
					if(this.timeObj.month){
						this.getShopRank(true)
					}
					this.getShopRank()
					
					
					
				}
			})
			this.getShopRank()
		},
	}
</script>
<style lang="less">
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
					height: 180px;
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
				bottom:-30px;
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
