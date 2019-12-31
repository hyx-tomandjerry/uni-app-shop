<template>
	<view class="bg-white">
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
				<template v-if="threeList[0]&&threeList[0].name">
					<view class="three-rank-container flex ">
						<view class="flex-1 text-center">
							<image 
							:src="threeList[1]&&threeList[1].field?threeList[1].field:'../../../../../../static/img/default.png'"
							 mode="widthFix" class="second-shop-img"></image>
							 <image 
							 src="../../../../../../static/img/work/statistics/rank/two_tag.png" 
							 class="second-tag-img"></image>
						</view>
						<view class="flex-sm text-center">
							<image src="../../../../../../static/img/work/statistics/rank/one.png" mode="widthFix" class="first-bg-img"></image>
							<image :src="threeList[0]&&threeList[0].field?threeList[0].field:'../../../../../../static/img/default.png'" mode="widthFix" class="first-shop-img"></image>
							<image src="../../../../../../static/img/work/statistics/rank/one_tag.png" mode="widthFix" class="first-tag-img"></image>
						</view>
						<view class="flex-1 text-center">
							<image
							:src="threeList[2]&&threeList[2].field?threeList[2].field:'../../../../../../static/img/default.png'"
							 mode="widthFix" class="second-shop-img"></image>
							 <image 
							 src="../../../../../../static/img/work/statistics/rank/three_tag.png" 
							 class="second-tag-img"></image>
						</view>
					</view>
					<view class="flex three-count">
						<view class="flex-1 text-center">
							<view>{{threeList[1]?threeList[1].name : ''}}</view>
							<view class="color-blue font-weight-bold">￥{{threeList[1]&&threeList[1].actual || 0}}</view>
						</view>
						<view class="flex-sm text-center">
							<view>{{threeList[0]?threeList[0].name : ''}}</view>
							<view class="color-blue font-weight-bold">￥{{threeList[0]&&threeList[0].actual || 0}}</view>
						</view>
						<view class="flex-1 text-center">
							<view>{{threeList[2]?threeList[2].name : ''}}</view>
							<view class="color-blue font-weight-bold">￥{{threeList[2]&&threeList[2].actual || 0}}</view>
						</view>
					</view>
				</template>
			</template>
			<template v-if="otherList.length">
				<view class="rank-list-container">
					<view class="rank-list-item borderBottom" v-for="(item,index) in otherList" :key="index">
						<view class="flex justify-start align-center">
							<view class="margin-right">{{desc?index+4:index+1}}</view>
							<view>
								<image :src="item.field?item.field:'../../../../../../static/img/default.png'" class="sale-avatar"></image>
								<text>{{item?item.name :''}}</text>
							</view>
						</view>
						<view>
							<image src="../../../../../../static/img/work/statistics/rank/gold.png" mode="" class="gold-img"></image>
							<text class="font-weight-bold color-blue">{{item.actual}}</text>
						</view>
					</view>
				</view>
			</template>
			<view v-else-if="!threeList[0]">
				<LxEmpty></LxEmpty>
			</view>
		</view>
	</view>
</template>
<script>
	import LxEmpty from '../../../../../../lx_components/lx-empty.vue'
	
	import {ShopRankingApi} from '../../../../../../api/statistics_api.js'
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
		onPullDownRefresh(){
			this.getShopRank()
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},800)
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				uni.navigateTo({
					url:"../sale-statistics-search/sale-statistics-search"
				})
			}
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
			
			//获得门店列表
			async getShopRank(){
				uni.showLoading({
				    title: '加载中...'
				});
				let val={
					year:this.timeObj.year,
					month:this.tabCur=='month'?this.timeObj.month:'',
					zone:this.shopZone,//门店区域
					brand:this.brandID,//门店品牌
					desc:this.desc?1:0,
				}
				let result = await ShopRankingApi(val);
				if(this.desc){
					//降序
					let arr=[];
					arr[0]=result[0]?result[0]:{};
					arr[1]=result[1]?result[1]:{};
					arr[2]=result[2]?result[2]:{};
					this.threeList=arr;
					this.otherList=result.splice(3);
				}else{
					//升序
					this.otherList=result
				}
				setTimeout(()=>{
					uni.hideLoading()
				},900)

			}
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				this.shopZone="";
				this.brandID=""
				this.getShopRank();
				uni.stopPullDownRefresh()
			},800)
		},
		onLoad(options){
			if(options){
				this.getShopRank()
			}
			
			uni.setNavigationBarTitle({
				title:`${this.timeObj.year}/${this.timeObj.month}门店销售榜`
			})
		
			
		},
		onShow(){
			this.$fire.on('search',result=>{
				this.shopZone="";
				this.brandID="";
				this.tabCur='year'
				this.timeObj.year=result.year;
				this.timeObj.month=result.month;
				this.shopZone=result.areaID?result.areaID:this.shopZone;
				this.brandID=result.brandID?result.brandID:"";
				let str=`${this.timeObj.year}/${this.timeObj.month}门店销售榜`;
				uni.setNavigationBarTitle({
					title:str
				})
				this.getShopRank()
			})
			uni.setNavigationBarTitle({
				title:`${this.timeObj.year}/${this.timeObj.month}门店销售榜`
			})
		}
	}
</script>
<style lang="less">
	.three-rank-container{
		padding:20upx 10upx;
	}
	.three-rank-container>view{
		position:relative
	}
	.first-shop-img{
		position: absolute;
		top:50%;
		left:50%;
		border-radius: 100%;
		transform: translate(-50%,-50%);
		width:100upx;
		height:100upx !important;
	}
	.first-bg-img{
		height:300upx !important;
		width:300upx;
	}
	.first-tag-img{
		width:160upx;
		height:60upx !important;
		position:absolute;
		bottom:54upx;
		left:50%;
		transform: translateX(-50%);
	}
	.second-tag-img{
		width:160upx;
		height:60upx !important;
		position:absolute;
		bottom:30upx;
		left:50%;
		transform: translateX(-50%);
	}
	.three-rank-container>view:nth-child(1),.three-rank-container>view:nth-child(3){
		margin-top:80upx;
		background:url("../../../../../../static/img/work/statistics/rank/two.png") no-repeat center center;
		background-size: cover;
	}
	.three-rank-container>view:nth-child(1) .second-shop-img,.three-rank-container>view:nth-child(3) .second-shop-img{
		position: absolute;		
		top:50%;		
		left:49%;		
		border-radius: 100%;		
		transform: translate(-50%,-50%);		
		width:80upx;		
		height:80upx !important;
	}
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
	.three-count>view{
		
	}
	.three-count>view:nth-child(1),.three-count>view:nth-child(3){margin-top: -20upx;}
	.three-count>view:nth-child(2){
		margin-top: -40upx;
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
	.rank-list-container{
		padding:17px 15px;
		
	}
	.rank-list-item{
		height:68px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
	}
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
	.tab-active{
		background:rgba(66,176,237,1);
		color:#fff;
	}
</style>
