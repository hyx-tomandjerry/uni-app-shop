<template>
	<view class="borderTop">
		<view v-if="shopList.length">
				<view class="shop-list-item bg-white flex justify-start margin-bottom-normal flex-all" v-for="(item,index) in shopList" :key="index"
					   @click="checkShopDetail(item)" v-if="item.name">
					<view class="shop-img-area">
						<image :src="item.coverurl?item.coverurl:'../../../../static/img/default.png'" class="shop-img"></image>
					</view>
					<view class="shop-info-area flex-1 " >
						<view class="flex justify-start font-size-normal font-weight-bold align-center">
							<view class=" text-ellipse " style="width:35%;">{{item.name || ''}}</view>
							<view v-if="item.brandName">({{item.brandName }})</view>
							<image src="../../../../static/img/shop/businessing.png" class="shop-tag" v-if="item.status==shopStatusZn.businessing"></image>
							<image src="../../../../static/img/shop/ready.png" class="shop-tag" v-if="item.status==shopStatusZn.ready"></image>
							<image src="../../../../static/img/shop/processing.png" class="shop-tag" v-if="item.status==shopStatusZn.processing"></image>
							<image src="../../../../static/img/shop/canceled.png" class="shop-tag-canceled" v-if="item.status==shopStatusZn.canceled"></image>
							<image src="../../../../static/img/shop/renovated.png" class="shop-tag-canceled" v-if="item.status==shopStatusZn.renovated"></image>
							<image src="../../../../static/img/shop/moved.png" class="shop-tag-canceled" v-if="item.status==shopStatusZn.moved"></image>
						</view>
						<view class="font-size-litter color-regular " style="margin:7px 0;width:65%">
							<text style="margin-right:7px;">店长:</text>{{item.managerName || ''}}/{{item.managerMobile || ''}}
						</view>
						<view class="font-size-litter color-regular text-ellipse " style="width:80%;">
							<text style="margin-right:7px;">地址:</text>{{item.provinceName || ''}}{{item.cityName || ''}}{{item.districtName||''}}{{item.address}}
						</view>
					</view>
				</view>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>
		<uni-load-more :contentText="content" :showIcon="true" v-if="shopList.length" :status="loading"></uni-load-more>
		<showModel :isShow="modalName=='noClick'" @hideModel="hideModal" @confirmDel="hideModal" v-if="modalName=='noClick'">
			<block slot="content">该门店没有营业，不可查看</block>
		</showModel>
	</view>
</template>

<script>
	import LxEmpty from '../../../../lx_components/lx-empty.vue';
	import uniLoadMore from '../../../../components/uni-load-more.vue'
	import {mapState} from 'vuex'
	import showModel from '../../../../components/show-model.vue'
	export default {
		computed:mapState(['shopStatusZn']),
		data() {
			return {
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				modalName:'',
				shopList:[],//门店列表
				page:1,
				type:'',//shop是门店人员列表，statistics是绩效
				/**
				 fromType:'',//判断从快递还是从我的门店
				 inputValue:0,
				  radio:'',
				  shopRadioList:[
						{id:1,name:'录入门店'},
						{id:2,name:'选择门店'}
					],
				isShow:false,
				 */
				
				
				

			};
		},
		onPullDownRefresh(){
			//下拉刷新
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this.getShopList()
			},800)

		},
		// onReachBottom(){
		// 	this.page++;
		// 	this.loading='loading';
		// 	setTimeout(()=>{
		// 		this.$ajax('MyShops',{address:'',offset:this.$utils.getOffset(this.page)},res=>{
		// 			if(res==''){
		// 				setTimeout(()=>{
		// 					this.loading='noMore'
		// 				},900)
		// 			}else{
		// 				res.forEach(item=>{
		// 					this.shopList=this.shopList.concat(item)
		// 				})
		// 				this.loading='loading';
		// 				setTimeout(()=>{
		// 					this.loading='noMore'
		// 				},900)
		// 			}
		// 		})
		// 	},1000)
		// 
		// },
		components:{
			LxEmpty,
			uniLoadMore,
			showModel
		},
		methods: {
			hideModal(){
				if(this.modalName){
					this.modalName=null
				}
			},
			checkShopDetail(item){
				if(item.status!=this.shopStatusZn.businessing ){
					this.modalName='noClick'
				}else{
					switch(this.type){
						case 'shop':
						//查看门店人员列表
						uni.navigateTo({
							url:'../clerk-list/clerk-list?shopID='+item.id
						})
						break;
						case 'statistics':
						if(item.manager){
							uni.navigateTo({
								url:"../../work-center/statistics-center/shop-statistics-item/shop-statistics-item?id="+item.id+'&manager='+item.manager+"&zone="+item.zone
							})
						}else{
							uni.navigateTo({
								url:"../../work-center/statistics-center/shop-statistics-item/shop-statistics-item?id="+item.id+"&zone="+item.zone
							})
						}
						break;
					}
					
				}
			},
			//获得门店列表
			getShopList(){
				this.$ajax('MyShops',{address:''},res=>{
					this.shopList=res;
				})
			}
		},
		onShow(){
            this.getShopList()
		},
		onLoad(params){
			if(params){
				this.type=params.type;
			}
			 this.getShopList()
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}

	.cu-bar .search-form{
		margin-right:15px;
		margin-left:10px;
	}
	.shop-list-item{
		margin-bottom:13px;
		padding:18px 10px 23px 14px;
		width:100%;
		.shop-img-area{
			width:30%;
			margin-right: 10px;
			.shop-img{
				height:86px;
				border-radius:6px;
			}
		}
		.shop-info-area{
			margin-top: 9px;
			.shop-tag{
				width:18px;
				height: 18px;
				margin-left: 5px;
			}
			.shop-tag-canceled{
				width: 56px;
				height: 18px;
				margin-left: 5px;
			}
		}

	}
</style>
