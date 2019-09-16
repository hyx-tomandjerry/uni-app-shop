<template>
	<view class="borderTop">
		<view v-if="shopList.length" class="bg-white">
			<view v-for="(item,index) in shopList" :key="index"
				  class="shop-item borderBottom flex justify-start " @click="chooseItem(item)" >
				<view>
					<image :src="shopTabCur==item.id?'../../../../../static/icon/icon-xuanzhong.png':
					'../../../../../static/icon/icon-weixuanzhong.png'" class="chooseImg"></image>
				</view>
				<view>
					<view class="shop-name">
						<text class="font-size-normal font-weight-bold" style="margin-right:5px;">{{item.name || ''}}</text>
						<text class="color-blue font-weight-bold shop-tag" style="margin:0 5px;">{{item.brandName || ''}}</text>
						<text  class="cu-tag " :class="{
									'shop-business':item.status==shopStatusZn.businessing,
									'shop-execution':item.status==shopStatusZn.ready,
									'shop-prepare':item.status==shopStatusZn.processing,
									'shop-canceled':item.status==shopStatusZn.canceled,
									'shop-renovated':item.status==shopStatusZn.renovated,
									'shop-moved':item.status==shopStatusZn.moved,
								}" style="border-radius:5px;">{{item.status | shopStatus}}</text>
					</view>
					<view class="color-regular font-size-small">
						<!-- 品牌名称: <text>{{item.brandName}}</text> -->
						门店地址 :	<text style="margin-left:3px;">{{item.provinceName ||''}}</text>
						<text v-if="item.districtName">-</text>
						<text>{{item.districtName}}</text>
						<text v-if="item.cityName">-</text>
						<text>{{item.cityName}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>
		<uni-load-more :contentText="content" :showIcon="true" :status="loading"></uni-load-more>
		<view class="cu-modal bottom-modal " :class="modalName=='shopModal'?'show':''" >
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @click="hideModal">取消</view>
					<view class="action text-blue font-size-normal" @tap="confirmShop()">确定</view>
				</view>
				<view >
					<view class="shop-info bg-white borderTop text-left" v-if="selectedShop">
						<view class="borderBottom" style="padding-bottom:15px;">
							<view style="margin-bottom:4px;" class="shop-intro">省/市/区</view>
							<view class="font-size-big color-normal">{{selectedShop.provinceName || ''}} {{selectedShop.cityName || ''}} {{selectedShop.districtName || ''}}</view>
						</view>
						<view class="borderBottom" style="padding-bottom:15px;padding-top:10px;">
							<view style="margin-bottom:4px;" class="shop-intro">详细地址</view>
							<view class="font-size-big color-normal">{{selectedShop.address || ''}}</view>
						</view>
						<view class="borderBottom" style="padding-bottom:15px;padding-top:10px;">
							<view style="margin-bottom:4px;" class="shop-intro">门店名称</view>
							<view class="font-size-big color-normal">{{selectedShop.name || ''}}</view>
						</view>

						<view class="borderBottom flex justify-between align-center" style="padding-bottom:10px;padding-top:10px;padding-right:20px;" @click.stop="chooseShopMan()">
							<view>
								<view style="margin-bottom:4px;" class="shop-intro">联系人姓名/电话</view>
								<view class="font-size-big color-normal">
									<view>{{userInfo.name || ''}}/{{userInfo.mobile || ''}}</view>
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
	import uniLoadMore from '../../../../../components/uni-load-more.vue'
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	import  {mapState} from 'vuex'
	export default {
		computed:mapState(['shopStatusZn','userInfo']),
		data() {
			return {
				shopList:[],
				page:1,
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				shopTabCur:'',
				modalName:'',
				selectedShop:''
			}
		},
		methods: {
			getShopList(){
				this.$ajax('MyShops',{
					address:''
				},res=>{
					this.shopList=res
					console.log(this.shopList)

				})
			},
			chooseItem(item){
				this.shopTabCur=item.id;
				this.selectedShop=item;
				this.modalName='shopModal';
			},
			confirmShop(){
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						this.$fire.fire('applierShop',{
							id:this.selectedShop.id,
							name:this.selectedShop.name,
							provinceName:this.selectedShop.provinceName,
							cityName:this.selectedShop.cityName,
							districtName:this.selectedShop.districtName,
							address:this.selectedShop.address,
							saleName:this.userInfo.name,
							saleTel:this.userInfo.telephone

						})
					}
				})
				this.hideModal()
			},
			hideModal(){
				this.modalName=null;
			},
		},
		components:{uniLoadMore,LxEmpty},
		onLoad(){
			this.getShopList()
		}
	}
</script>

<style lang="less">
	.shop-item{
		padding:19px 19px 16px 17px;
		.shop-name{
			margin-bottom:4px;
		}
		.chooseImg{
			width:20px;height:20px;margin-right:14px;vertical-align: middle;
			margin-top:10px;
		}

	}
	.shop-info{
		padding-top:18px;
		padding-left:29px;
		padding-bottom:15px;
		.shop-intro{
			font-size:13px;
			color:#898888;
			margin-bottom:4px;
		}


	}
	//营业中
	.shop-business{
		border:1px solid #16B176;color:#16B176;
	}
	//筹备中
	.shop-prepare{
		border:1px solid #42B0ED;color:#42B0ED;
	}
	//施工中
	.shop-execution{
		border:1px solid #F58123;color:#F58123;
	}
	//已撤柜
	.shop-canceled{
		border:1px solid #FFECE9;color:#FFECE9;
	}
	//已重装
	.shop-renovated{
		border:1px solid #EBFFFA;color:#3FD7B5;
	}
	//已移位
	.shop-moved{
		border:1px solid #EBF4FF;color:#EBF4FF;
	}
	.shop-tag{
		border-radius:5px;
		background:rgba(0,0,0,0.1);
		padding:3px;
		font-size:12px;
	}
</style>
