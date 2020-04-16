<template>
 	<view>
		<view class="shop-content borderTop" v-if="shopList.length">
			<block v-for="(item,index) in shopList" :key="index">
				<shopListItem :item="item" :index="index"  @checkShopDetail="choseShop" :showManager="cat!='article'"></shopListItem>
			</block>
			<uni-load-more :contentText="content" :showIcon="true" v-if="shopList.length>5" :status="loading"></uni-load-more>
		</view>
		<view v-else>
		
			<lx-empty srcImg="../../../../static/img/noticeNo.png"</lx-empty>
		</view>
 	</view>
 </template>
 <script>
	 import LxEmpty from '../../../../lx_components/lx-empty.vue'
	 import {mapState} from 'vuex'
	 import uniLoadMore from '../../../../components/common/uni-load-more.vue'
	 import shopListItem from '../../../../components/shop/shop-list-item.vue'
	 import {getShopList} from '../../../../api/common_api.js'
	 import {UnreplyShopsApi} from '../../../../api/index_api.js'
 	export default{
		computed:mapState(['userInfo']),
		components:{LxEmpty,uniLoadMore,shopListItem},
 		data(){
 			return{
				shopList:[],
				cat:'',//用于判断是新建报修还是工作日志
				shopIndex:-1,//用于选中门店，突出颜色
				articleID:'',//用于筛选要回执的门店
				page:1,
				modalName:'',
				content:{
					contentdown: "下拉加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
					},
				loading:'more',


 			}
 		},
		onPullDownRefresh(){
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this.page=1;
				this.getNearShopList()
			},900)
		},
		async onReachBottom(){
			this.page++;
			this.loading='loading';
			if(this.cat=='article'){
				let result = await UnreplyShopsApi(this.userInfo.id,this.articleID,this.page);
				if(result.length == 0){
					setTimeout(()=>{
						this.loading='noMore'
					},900)
				}else{
					result.forEach(item=>{
						// this.shopList=this.shopList.concat(item)
						this.shopList = [...this.shopList,item]
					})
					this.loading='loading';
					setTimeout(()=>{
						this.loading='noMore'
					},900)
				}

			}	

		},
 		
 		onLoad(options){

			this.cat=options.cat;
			if(options.id){
				this.articleID=options.id;
			}
			this.getNearShopList()
 		},
		methods:{
			hideShopModel(){
				if(this.modalName){
					this.modalName=null;
				}
			},
 		    async getNearShopList(){
				// 新建报修或者报销申请
				if(this.cat=='createOrder' || this.cat=='apply'){
					this.shopList = await getShopList()
				}else if(this.cat=='article'){
					
					this.shopList = await UnreplyShopsApi(this.userInfo.id,this.articleID,this.page)
				}

			},

			choseShop(item){
				if(this.cat=='article'){
					this.shopIndex=item.id;
					setTimeout(()=>{
						uni.navigateBack({
							delta:1,
							success:(res)=>{
								this.$fire.fire('articleShop',item)
							}
						})
					},500)
				}else if(item.status!==this.config.shopStatus.businessing){
					uni.showModal({
					    content: '该门店没有营业，不能进行操作!'
					});
				}else if(this.cat=='createOrder' || this.cat=='apply'){
					//新建报修选择门店
					this.shopIndex=item.id;
					setTimeout(()=>{
						uni.navigateBack({
							delta:1,
							success:(res)=>{
								this.$fire.fire('createOrderShopID',item.id)
							}
						})
					},500)
				}


			}
		}
 	}
 </script>
 <style lang="less">
	page{
	 	background:rgba(247,247,247,1);
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
			 margin-top: -10px;
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
