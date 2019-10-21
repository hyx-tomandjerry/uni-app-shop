

 <template>
 	<view class="borderTop">
		<view class="shop-content" v-if="shopList.length">
			<scroll-view scroll-y="true" >
				<view class="shop-list-item flex justify-start align-center bg-white" v-for="(item,index) in shopList"
					:class="{'bg-gray':shopIndex==item.id}" :key="index" @click="choseShop(item)" v-if="item.name">
					
					<view class="shop-img-area">
						<image :src="item.coverurl?item.coverurl:'../../../../static/img/default.png'" class="shop-img"></image>
					</view>
					<view class="shop-info-area flex-1 " >
						<view class="flex justify-start font-size-normal font-weight-bold align-center">
							<view class=" text-ellipse flex-litter">{{item.name || ''}}</view>
							<view v-if="item.brandName">({{item.brandName || ''}})</view>
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
						<view class="font-size-litter color-regular text-ellipse " style="width:70%;">
							<text style="margin-right:7px;">地址:</text>{{item.provinceName || ''}}{{item.cityName || ''}}{{item.districtName||''}}{{item.address}}
						</view>
					</view>

				</view>
			</scroll-view>
		</view>
		<view v-else>
			<lx-empty></lx-empty>

		</view>
		<showModel :isShow="modalName=='shopModal'" @hideModel="hideShopModel" @confirmDel="hideShopModel" v-if="modalName=='shopModal'">
			<block slot="content">该门店没有营业，不能进行操作!</block>
		</showModel>
		<uni-load-more :contentText="content" :showIcon="true" v-if="shopList.length" :status="loading"></uni-load-more>
 	</view>
 </template>
 <script>
	 import LxEmpty from '../../../../lx_components/lx-empty.vue'
	 import {mapState} from 'vuex'
	 import showModel from '../../../../components/show-model.vue'
	 import uniLoadMore from '../../../../components/uni-load-more.vue'
 	export default{
		computed:mapState(['userInfo','shopStatusZn']),
 		data(){
 			return{
				shopList:[],
				cat:'',//用于判断是新建报修还是工作日志
				shopIndex:-1,//用于选中门店，突出颜色
				articleID:'',//用于筛选要回执的门店
				page:1,
				modalName:'',
				content:{
					contentdown: "",
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
		onReachBottom(){
					this.page++;
					this.loading='loading';
					setTimeout(()=>{
						if(this.cat=='createOrder'){
							this.$ajax('MyShops',{
								address:'',
								offset:this.$utils.getOffset(this.page)
							},res=>{
								if(res==''){
									setTimeout(()=>{
										this.loading='noMore'
									},900)
								}else{
									res.forEach(item=>{
										this.shopList=this.shopList.concat(item)
									})
									this.loading='loading';
									setTimeout(()=>{
										this.loading='noMore'
									},900)
								}
							
							})
						}else if(this.cat=='article'){
							this.$ajax('ShopsByReport',{
								user:this.userInfo.id,
								id:this.articleID,
								offset:this.$utils.getOffset(this.page)
							},res=>{
								if(res==''){
									setTimeout(()=>{
										this.loading='noMore'
									},900)
								}else{
									res.forEach(item=>{
										this.shopList=this.shopList.concat(item)
									})
									this.loading='loading';
									setTimeout(()=>{
										this.loading='noMore'
									},900)
								}
															
							
							})
						}
					},1000)
				
				},
 		components:{
			LxEmpty,showModel,uniLoadMore
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
 		    getNearShopList(){
				// 新建报修
				if(this.cat=='createOrder'){
					this.$ajax('MyShops',{
						address:'',
						offset:this.$utils.getOffset(this.page)
					},res=>{
						this.shopList=res

					})
				}else if(this.cat=='article'){
					// 新建文章回执
					this.$ajax('ShopsByReport',{
						user:this.userInfo.id,
						id:this.articleID,
						offset:this.$utils.getOffset(this.page)
					},res=>{
						this.shopList=res;

					})
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
				}else if(item.status!==this.shopStatusZn.businessing){
					this.modalName='shopModal';
				}else if(this.cat=='createOrder'){
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
