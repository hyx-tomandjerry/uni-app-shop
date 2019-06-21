<template>
	<view>
		<view style="background:#fff;" v-if="shopList.length>0">
			
				<view class="shop-item flex justify-start borderBottom"  :key="index" v-for="(item,index) in shopList"
					  style="padding:24px 10px 18px 14px;" @click="checkShopDetail(item)" >
					<view style="width:30%;">
						<image
						v-if="item.coverurl"

						:src="item.coverurl" class="noManagePic" :class="{' shopImg':item.contactor || item.managerName}">
						</image>
						<image
						v-else src="../../../../static/img/default.png"
						 class="noManagePic" :class="{' shopImg':item.contactor || item.telephone}">
						</image>
					</view>
					<view style="width:70%">
						<view class="shop-name" style="position:relative"
						:class="{'noManager':item.contactor || item.telephone}">
							{{item.name}}
							<view style="position:absolute;right:50px;top:2px; font-size:12px;color:#1296DB" v-if="item.catalogName">
								<text class="cuIcon-brand line-blue"></text>{{item.catalogName}}
							</view>
						</view>
						<view class="shop-desc" style="white-space: nowrap;" v-if="item.managerName || item.managerMobile">
							<image src="../../../../static/icon/shop-list/icon-dianzhang@2x.png" style="width:15px;height:15px;vertical-align: middle;margin-right:5px;"></image>
							<text style="margin-right:6px;">店长:{{item.managerName || ''}}</text><text class="text-blue">|</text><text style="margin-left:3px;"> {{item.managerMobile || ''}}</text>
						</view>
						<view class="shop-desc">
							<image src="../../../../static/icon/addRepairDingwei.png" class="img15"></image>
							<text class="ellipse" >
								{{item.provinceName || ''}}{{item.cityName  || ''}}{{item.districtName  || ''}}{{item.address||''}}
							</text>

						</view>
					</view>
				</view>
				
		

		</view>
		<view v-else>
			<LxEmpty></LxEmpty>
		</view>
		<image src="../../../../static/icon/add.png"
		v-if="userInfo.ownerType==shoperObj.ownerType && userInfo.type==shoperObj"
		style="position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;" @click="showModal($event)" data-target="RadioModal"></image>
		
		<view class="cu-modal bottom-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal()" style="background:rgba(255,255,255,0.8);">
			<view class="cu-dialog" style="padding-bottom:19px;background:rgba(255,255,255,0.1)">
				<view class=" align-center font-size-big font-weight-normal color-normal" style="padding:12px;">
					新增
				</view>
				<view class="padding-xl justify-around flex ">
					<view  @click="operateItem('record')"  >
						<image src="../../../../static/img/record-shop.png" style="width:50px;height:50px;"></image>
						<view class="font-size-normal font-weight-normal color-normal">录入门店</view>
					</view>
					<view  @click="operateItem('search')">
						<image src="../../../../static/img/choose-shop.png" style="width:50px;height:50px;"></image>
						<view class="font-size-normal font-weight-normal color-normal">选择门店</view>
					</view>
				</view>
				<view class="text-center bg-white" style="width:100%;">
					<text class="cuIcon-close font-size-middle font-weight-normal text-blue"></text>
				</view>
			</view>
		</view>
		 <view class="cu-modal" :class="modalName=='RadioModal1'?'show':''" @tap="hideModal()">
			<view class="cu-dialog">
				
				<view class=" flex justify-around" style="padding:12px;">
					<view @click="operateItem('record')"  style="padding:13px 15px;">
						<text class="cuIcon-writefill text-blue" style="margin-right:8px;font-size:16px;"></text>
						<text class="font-size-normal text-blue font-weight-bold">录入门店</text>
					</view>
					<view  @click="operateItem('search')"  style="padding:13px 15px; ">
						<text class="cuIcon-searchlist text-blue" style="margin-right:8px;font-size:20px;"></text>
						<text class="font-size-normal text-blue font-weight-bold">选择门店</text>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-modal" :class="isShow?'show':''" style="background:rgba(0, 0, 0, 0.6)">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end borderBottom">
					<view class="content font-size-big font-weight-normal color-normal">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl bg-white borderBottom font-size-big font-weight-normal color-normal" style="padding:25px 0 27px;">
					只有店长才能录入门店!
				</view>
				<view class="cu-bar bg-white justify-end" style="padding:5px;">
					<view class="action flex justify-around" style="width:100%">
						<view style="width:50%;border-right:1px solid #EEEEED;padding:12px;" @tap="cancelRecord()">取消</view>
						<view style="width:50%" class="text-blue"  @tap="toRecordShop()">确定</view>
						
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :contentText="content" :showIcon="true" :status="loading"></uni-load-more>

	</view>
</template>

<script>
	import LxEmpty from '../../../../lx_components/lx-empty.vue';
	import uniLoadMore from '../../../../components/uni-load-more.vue'
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['shoperObj','userInfo']),
		data() {
			return {
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				modalName:'',
				title:'门店列表',
				CustomBar:0,
				inputValue:0,
				shopList:[],
				fromType:'',//判断从快递还是从我的门店
				radio:'',
				shopRadioList:[
					{id:1,name:'录入门店'},
					{id:2,name:'选择门店'}
				],
				page:1,
				isShow:false

			};
		},
		onPullDownRefresh(){
			uni.stopPullDownRefresh();
			this.getShopList()
		},
		onReachBottom(){
			console.log('到底了')
			this.page++;
			this.loading='loading';
			setTimeout(()=>{
				this.$ajax('MyShops',{address:'',offset:this.$utils.getOffset(this.page)},res=>{
					if(res==''){
						setTimeout(()=>{
							this.loading='noMore'
						},600)
					}else{
						res.forEach(item=>{
							this.shopList.concat(item)
						})
					}
				})
			},1000)

		},
		components:{
			LxEmpty,
			uniLoadMore
		},
		methods: {
			toRecordShop(){
				uni.navigateTo({
					url:'../record-shop/record-shop',
					success: (res) => {
						this.hideModal();
						this.isShow=false;
					}
				});
			},
			cancelRecord(){
				this.hideModal();
				this.isShow=false;
			},
			operateItem(type){

				switch(type){
					case 'record':

						this.isShow=true;
						break;
					case 'search':
						uni.navigateTo({
							url:'../search-more-shop/search-more-shop?cat=chooseShop',
							success: (res) => {
								this.hideModal()

							}
						})
						break;
				}
			},
			RadioChange(event){
				this.radio=event.detail.value;
				if(this.radio=='radio0'){

					uni.navigateTo({
						url:'../record-shop/record-shop',
						success: (res) => {
							this.hideModal()
						}
					})

				}else if(this.radio=='radio1'){

					uni.navigateTo({
						url:'../search-more-shop/search-more-shop?cat=chooseShop',
						success: (res) => {
							this.hideModal()
						}
					})
				}
			},
			showModal(e) {
				this.radio='';
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal() {
				
				if(this.modalName){
					this.modalName = null
				}
				
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			recordShop(){
				uni.navigateTo({
					url:'../record-shop/record-shop'
				})
			},
			checkShopDetail(item){
				//查看门店人员列表
				uni.navigateTo({
					url:'../clerk-list/clerk-list?shopID='+item.id
				})
			},
			//获得门店列表
			getShopList(){
				this.$ajax('MyShops',{address:'',offset:this.$utils.getOffset(this.page)},res=>{
					this.shopList=res;
				})
			}
		},
		onShow(){
            this.getShopList()
		},
		onLoad(){
			 this.getShopList()
			// this.getShopList();
			// //录入门店成功
			// this.$fire.on('record-shop',res=>{
			// 	this.getShopList()
			// })
			// this.$fire.on('chooseShop',res=>{
			// 	this.getShopList()
			// })
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
	}
	
	
	
.header-content{
		padding:15px 14px;
		border-bottom:0.5px solid #EEEEED;
		.header-title{
			font-size:16px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:rgba(42,42,42,1);
		}
		.headers-submit{
			font-size:14px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(66,176,237,1);
		}
	}
	.cu-bar .search-form{
		margin-right:15px;
		margin-left:10px;
	}
	.shopImg{
		width:103px;
		height:79px;
		margin-right:17px;
	}
	.noManagePic{
		width:95px !important;
		height:71px !important;
		margin-right:17px;
		border-radius:6px;
	}
	.shop-name{
		font-size:16px;
		font-family:'PingFangSC-Regular';
		font-weight:400;
		color:rgba(42,42,42,1);
		margin-bottom:6px;

	}
	.shop-desc{
		font-size:14px;
		display: flex;
		font-weight:400;
		color:rgba(137,136,136,1);
		margin-bottom:4px;
	}
	.img15{
		width:15px;
		height:19px;
		vertical-align: middle;
		margin-right:5px;
	}
	.record-shop{
		font-size:17px;
		font-family:'PingFangSC-Regular';
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.noManager{
		margin-bottom:10px !important;
	}
	.ellipse{
		width:80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
