<template>
	<view >
		<cu-custom :isBack="true" >
			<block slot="left">
				<view class="font-size-back color-regular cuIcon-back" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-weight-bold font-size-big">
					销售明星榜
				</view>
			</block>
			<block slot="right" >
				<view @click="searchEvent" style="margin-right:20px;" class="color-blue">筛选</view>
			</block>
		</cu-custom>
		<view class="flex justify-around rank-container">
			<view class="rank_two"></view>
			<view class="rank_one position_relative">
				<image src="../../../../../../static/img/work/statistics/one.png"
					style="position:absolute;top:0;left:0;width: 160px;height: 160px;"
				></image>
				<image src="../../../../../../static/img/work/statistics/one_tag.png"
					   style="width:80px;height:40px;position:absolute;bottom:24px;left:28px;z-index:3"></image>
				<image src="../../../../../../static/img/default.png"
					   style="width:50px;height:50px;position:absolute;left:46px;top:54px;border-radius:50%;z-index:2"
				></image>
			</view>
			<view class="rank-three"></view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				navTabCur:'alone',
				/*门店，区域和公司*/
				threeNavList:[
					{name:'公司',id:1,value:'company'},
					{name:'区域',id:2,value:'area'},
				],
				threeNavTab:1,
				threeNavTabName:'company',
				shopID:'',
				shopZone:'',//门店所在区域
				year:new Date().getFullYear(),
				month:new Date().getMonth()+1,
				rankList:[],
				firstItem:{},
				secondItem:{},
				thridItem:{}
			
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//获得排列数据
			getRankList(){
				switch(this.navTabCur){
					case 'alone':
					this.$ajax('ZonePersonalPerformances',{
						year:this.year,
						month:this.month,
						area:this.threeNavTabName=='area'?1:'',
						target:this.target?this.target:this.userInfo.owner
					},res=>{
						if(res){
							this.firstItem=res[0]?res[0]:{};
							this.secondItem=res[1]?res[1]:{};
							this.thridItem=res[2]?res[2]:{};
							this.rankList=res.splice(3)
						}
					})
					break;
					case'shop':
					this.$ajax('ZoneShopPerformances',{
						year:this.year,
						month:this.month,
						area:this.threeNavTabName=='area'?1:'',
						target:this.target?this.target:this.userInfo.owner
					},res=>{
						this.firstItem=res[0]?res[0]:{};
						this.secondItem=res[1]?res[1]:{};
						this.thridItem=res[2]?res[2]:{};
						this.rankList=res.splice(3);
						console.log(this.rankList)
					})
					break;
				}
				
			},
			/*选择门店榜还是个人榜*/
			selectTabCur(type){
				this.navTabCur=type;
				this.threeNavTab=this.threeNavList[0].id;
				this.threeNavTabName=this.threeNavList[0].value;
				this.year=new Date().getFullYear();
				this.month=new Date().getMonth()+1;
				this.getRankList();
			},
			/*选择门店，区域和公司*/
			threeNavSelect(item){
				this.threeNavTab=item.id;
				this.threeNavTabName=item.value;
				this.getRankList()
			},
			/*筛选*/
			searchEvent(){
				uni.navigateTo({
					url:"../sale-statistics-search/sale-statistics-search?type="+this.threeNavTabName+"&id="+this.shopID+"&zone="+this.shopZone
				})
			}
		},
		onLoad(param){
			if(param){
				this.shopID=param.id;
				this.shopZone=param.zone;
			}
			this.$fire.on('search',result=>{
				this.year=result.year?result.year:new Date().getFullYear();
				this.month=result.month?result.month:new Date().getMonth()+1;
				this.target=result.target?result.target:this.userInfo.owner;
				this.getRankList()
			})	
		},
		onShow(){
			this.getRankList()
			
		}
	}
</script>

<style lang="less">
	.rank-container{
		.rank_two{
			margin-top:42px;
			height: 120px;
			width: 120px;
			margin-bottom:40px;
			background:url("../../../../../../static/img/work/statistics/two.png") no-repeat center center;
			background-size:cover;
		}
		.rank_one{
			width: 160px;
			height: 160px;
		}
		.rank-three{
			margin-top:42px;
			height: 120px;
			width: 120px;
			background:url("../../../../../../static/img/work/statistics/two.png") no-repeat center center;
			background-size:cover;
		}
	}
</style>
