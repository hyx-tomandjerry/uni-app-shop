<template>
	<view :style="{height:screenHeight+'px'}" class="position_relative">
		<view>
			<image
				:src="shopItem.coverurl?shopItem.coverurl:'../../../../static/img/default.png'"
				class="shop-img"  mode="widthFix" lazy-load></image>
		</view>
		<view class="shop-info  borderTop bg-white margin-bottom-normal">
			<view class="flex justify-start" style="margin-bottom:8px;">
				<view class="color-normal font-size-middle font-weight-bold" style="margin-right:8px;">{{shopItem.name || ''}}</view>
				<view >
					<text  class="shop-tag  cu-tag" :class="{
								'shop-business':shopItem.status==shopStatus.businessing,
								'shop-execution':shopItem.status==shopStatus.ready,
								'shop-prepare':shopItem.status==shopStatus.processing,
								'shop-canceled':shopItem.status==shopStatus.canceled,
								'shop-renovated':shopItem.status==shopStatus.renovated,
								'shop-moved':shopItem.status==shopStatus.moved,
							}">{{shopItem.status | shopStatusZnPipe}}</text>
				</view>
			</view>

			<view style="padding-bottom:14px;" class="borderBottom">
				<template v-if="shopItem.managerName">
					<normal-detail-item 
						width="24%"
						leftIntro="门店店长" 
						:marginBMini="true"
						:leftPadding="false"
						:rightContent="`${shopItem.managerName || ''}/${shopItem.managerMobile || ''}`"></normal-detail-item>
					
				</template>
				<normal-detail-item
					width="24%"
					leftIntro="品牌名称" 
					:marginBMini="true"
					:leftPadding="false"
					:rightContent="shopItem.brandName || ''"></normal-detail-item>
				<normal-detail-item
					width="24%"
					leftIntro="所属区域" 
					:marginBMini="true"
					:leftPadding="false"
					:rightContent="shopItem.zoneName || '暂无所属'"></normal-detail-item>
				<template v-if="shopItem.catalog">
					<normal-detail-item
						leftIntro="经营类别" 
						:marginBMini="true"
						:leftPadding="false"
						:rightContent="shopItem.catalog || ''"></normal-detail-item>
				</template>
				<view class="flex align-center" style="margin-bottom:20upx;" >
					<view style="width:24%" class="color-regular">门店面积</view>
					<view class="flex-1 color-normal  flex ">
						<view style="margin-right:20upx;">{{shopItem.area}}㎡</view>
						<view class="cuIcon-writefill color-blue font-size-big" @tap="editAddress('area')" v-if="shopItem.manager== userInfo.id"></view>
					</view>
				</view>
				<view class="flex align-center"  >
					<view style="width:24%" class="color-regular">门店编号</view>
						<view class="flex-1 color-normal  flex ">
							<view style="margin-right:20upx;">{{shopItem.seq}}</view>
							<view class="cuIcon-writefill color-blue font-size-big" @tap="editAddress('seq')" v-if="shopItem.manager == userInfo.id"></view>
						</view>
				</view>
			</view>

			<view class="shop-time flex justify-start align-center borderBottom">
				<view class="flex justify-start shop-duedate align-center" >
					<view class="cuIcon-time color-placeholder" style="font-size:18px;" ></view>
					<view style="margin:0 2px;">开业日期:</view><view >{{shopItem.duedate | formatTime('YMD')}}</view>
				</view>
				<view class="flex justify-start align-center " style="padding-left:20px;">
					<view class="cuIcon-time color-placeholder" style="font-size:18px;" ></view>
					<view style="margin:0 2px;">营业天数:</view><view >{{shopItem.days>0? shopItem.days:0}}</view>
				</view>

			</view>

			<view class="flex justify-between shop-address align-center">
				<view class="flex justify-start flex-1">
					<view class="cuIcon-location color-placeholder" style="font-size:18px;"></view>
					<view style="margin-left:7px;" class="color-blue" @tap="getLocation">
						{{shopItem.provinceName  || '' }}{{shopItem.cityName  || '' }}{{shopItem.districtName  || ''}}{{shopItem.address || ''}}
					</view>
				</view>
			</view>
		</view>
		<common-tab-nav
					:isShowBorder="false"
					:tabList="tabList"
					:TabCur="clerkTab"
					@tabSelect="chooseClerkTab"></common-tab-nav>
		<view class="member-container" >
			<template v-if="clerkTab==3">
				<block v-for="(item,index) in userList" :key="index">
					<view class="flex align-center">
						<view style="width:80upx;">
							<template v-if="item.ownerName=='camera'">
								<image src="../../../../static/img/shop/camera/shexiangtou.png" mode="widthFix" lazy-load style="width:60upx;height:60upx;"></image>
							</template>
							<template v-if="item.ownerName=='card'">
								<image src="../../../../static/img/shop/camera/card.png" mode="widthFix" lazy-load style="width:60upx;height:60upx;"></image>
								
							</template>
							<template v-if="item.ownerName=='router'">
								<image src="../../../../static/img/shop/camera/luyouqi.png" mode="widthFix" lazy-load style="width:60upx;height:60upx;"></image>
								
							</template>
							<template v-if="item.ownerName=='CPE'">
								<image src="../../../../static/img/shop/camera/CPE.png" mode="widthFix" lazy-load style="width:60upx;height:60upx;"></image>
								
							</template>
						</view>
						<view class="flex align-center justify-between flex-1">
							<template v-if="item.ownerName=='camera'">
								<view>{{item.name ||'摄像头'}}</view>
								<view><text class="color-regular">设备序列号:</text>{{item.seq}}</view>
							</template>
							<template v-if="item.ownerName=='CPE'">
								<view>{{item.name ||'CPE'}}</view>
								<view><text class="color-regular">IME:</text>{{item.seq}}</view>
							</template>
						</view>
					</view>
				</block>
			</template>
			<template v-else>
				<block v-for="(item ,index) in userList" :key="index">
					<ClerkListItem :item="item" :index="index" :TabCur="clerkTab"
					@joinSuccess="joinSuccess"
					@checkItemInfo="checkItemInfo"
					:shopItem="shopItem" @joinRefuse="joinSuccess"></ClerkListItem>
				</block>
			</template>
			
			
		</view>

		
		<!-- 右上方弹框 -->
		<top-right-pupop 
			@operateItem="operateItem"
			@hideModel="hideModel"
			:statusHeight="statusHeight"
			:topRightList="topRightList"
			:isShowModel="isShowModel"></top-right-pupop>
			
		<!-- 选择设备弹框 -->
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" >
				<radio-group class="block" @change="RadioChange">
					<view class="model-title">选择绑定的设备</view>
					<view class="cu-list menu text-left">
						<view class="cu-item" :class="{'bg-blue':cameraTab==item.value}"
							v-for="(item,index) in cameraList" :key="index" @tap="chooseServiceItem(item)">
							<label class="flex justify-between align-center flex-sub" 
							>
								<view class="flex-sub">{{item.name}}</view>
							</label>
						</view>
					</view>
				</radio-group>
			</view>		
		</view>
	</view>
</template>

<script>

	import {mapState} from 'vuex';
	import BottomBtnTwo from '../../../../components/common/bottom-btn-two.vue'
	import ClerkListItem from '../../../../components/shop/clerk-list-item.vue'
	import commonBtnOne from '../../../../components/common/common-btn-one.vue'
	import commonTabNav from '../../../../components/common/common-tab-nav.vue'
	import normalDetailItem from '../../../../components/common/normal-detail-item.vue'
	import topRightPupop from '../../../../components/shop/top-right-pupop.vue'
	import LxEmpty from '../../../../lx_components/lx-empty.vue'
	import {ChainShopApi,ShopSalesmenApi,UsersApi,ShopDevicesApi} from '../../../../api/shop_api.js'
	export default{
	    computed:{
			...mapState(['userInfo']),
			shopStatus(){return this.config.shopStatus},
		},
		data(){
			return{
				modalName:null,
				secondModal:null,
				shopItem:{},
				shopID:'',//门店ID
				userList:[],//店员列表
				tabList:[{id:1,name:'门店人员'},{id:2,name:'区域人员'},{id:3,name:'设备列表'}],
				clerkTab:1,
				clerkItem:{},
				unNormalItem:{},
				page:1,
				isShowModel:false,//是否显示操作栏
				topRightList:[],
				statusHeight:44,
				screenHeight:500,
				cameraList:[
					{id:1,name:'摄像头',value:'camera'},
					{id:2,name:'CPE',value:'cpe'}
				],
				cameraTab:'',
			}
		},
		components:{
			BottomBtnTwo,
			ClerkListItem,
			commonBtnOne,
			commonTabNav,
			normalDetailItem,
			topRightPupop,
			LxEmpty
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				if(this.shopItem.manager==this.userInfo.id){
					//如果是店长
					this.topRightList=[
						{name:'录入店员',icon:'cuIcon-friendadd',value:'record',color:'color-blue'},
						{name:'记一笔',icon:'cuIcon-write',value:'count',color:'color-green'},
						{name:'绑定设备',icon:'cuIcon-cameraadd',value:'equipment',color:'color-purple'}
					]
				}else{
					this.topRightList=[
						{name:'记一笔',icon:'cuIcon-write',value:'count',color:'color-green'},
						{name:'绑定设备',icon:'cuIcon-cameraadd',value:'equipment',color:'color-purple'}
					]
				}
				this.isShowModel=true;
			}
		},
		onPullDownRefresh(){
			this.checkClerkList(this.shopID);
			this.checkShopDetail(this.shopID);
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},600)
		},
		methods:{
			//选中设备
			chooseServiceItem(item){
				this.cameraTab=item.value;
				uni.navigateTo({
					url:"../service-bind/service-bind?id="+this.shopID+"&type="+item.value,
					success: (res) => {
						this.cameraTab=null;
						this.modalName=null;
					}
				})
				
			},
			operateItem(item){
				switch(item){
					case 'record':
					//录入店员
					this.isShowModel=false;
					
					// uni.navigateTo({
					// 	url:"../record-clerk/record-clerk?id="+this.shopID+"&name="+this.shopItem.name
					// })
					uni.navigateTo({
						url:"../shop-operate-form/shop-operate-form?id="+this.shopID+"&type=record"
					})
					break;
					case 'count':
					//记一笔
					this.isShowModel=false;
					uni.navigateTo({
						url:"../../work-center/statistics-center/record-money/record-money?type=save&shopID="+this.shopID
					})
					break;
					
					case 'equipment':
					this.isShowModel=false;
					this.modalName="RadioModal"
					this.cameraTab=null;
					//设备
					break;
					
				}
			},
			
			hideModel(){
				this.isShowModel=false;
			},
			getLocation(){
				uni.navigateTo({
					url:"../shop-map/shop-map?id="+this.shopID
				})
			},

			
			//修改地址
			editAddress(type){
				uni.navigateTo({
					url:"../shop-operate-form/shop-operate-form?id="+this.shopID+"&type="+type
					
				})					
			},
			//查看店员详情
			checkItemInfo(item){
				uni.navigateTo({
					url:"../clerk-item-info/clerk-item-info?shopID="+this.shopID+"&clerkID="+item.id+"&clerkTab="+this.clerkTab

				})
			},
			hideModal(){
				this.modalName=null;
			},
			chooseClerkTab(item){
				this.clerkTab=item.id;
				this.clerkItem=item;
				this.userList=[];
				switch(Number(item.id)){
					case 1:
					this.checkClerkList(this.shopID)
					break;
					case 2:
					//获得区域人员
					this.getZoneUser()
					break;
					case 3:
					// 获得设备列表
					this.getServiceList()
					break;
				}


			},
			// 获得设备列表
			async getServiceList(){
				this.userList = await ShopDevicesApi(this.shopItem.id)

			},
			async getZoneUser(){
				let result = await UsersApi(this.shopItem.zone,this.page)
				result.forEach(item=>{
					if(item.role && item.role.indexOf(17)!=-1){
						item.job='负责人'
					}
				})
				this.userList=result;

			},
			joinSuccess(){
				this.checkClerkList(this.shopID);
				this.checkShopDetail(this.shopID);
			},
			//获得门店详情
			async checkShopDetail(id){
				this.shopItem = await ChainShopApi(id)

			},
			async checkClerkList(id){
				let result = await ShopSalesmenApi(id)
				this.userList = result.filter(item=>item.name)

			},
			getSystem(){
				uni.getSystemInfo({
					success:(res)=>{
						this.statusHeight=res.statusBarHeight+uni.upx2px(40);
						this.screenHeight=res.windowHeight
					}
				})
			}

		},
		onLoad(option){
			this.getSystem()
		   if(option){
		   		this.shopID=option.shopID;
               this.checkShopDetail(option.shopID);
			   this.checkClerkList(option.shopID)
		   }
		   
		},
		onShow(){
			this.getSystem()
			this.checkShopDetail(this.shopID)
			this.clerkTab==1?this.checkClerkList(this.shopID):this.getZoneUser()

		}
	}
</script>

<style lang="less">
	.record-content{
		background:#FFFFFF;
		padding:20upx;
		position: absolute;
		top:50%;
		left:50%;
		min-width:560upx;
		border-radius:20upx;
		transform: translate(-50%,-50%)
	}
	
	.record-title{
		border-bottom:1px solid #EEEEED;
		padding:30upx 50upx;
		
	}
	.record-content>image{
		width:60upx;
		height:60upx;
		flex-shrink: 0;
		top:-30upx;
		right:-30upx;
	}
	.record-input{
		padding:40upx 40upx  30upx 30upx
	}
	.record-input>view:first-child{
		margin-bottom:30upx;
	}
	.record-input>view>image{
		width:52upx;
		height:52upx;
		flex-shrink: 0;
		margin-right:30upx;
	}
	.record-input>view>input{
		background:rgba(255,255,255,1);
		box-shadow:0px 1px 4px 1px rgba(227,227,227,0.5);
		border-radius:18px;
		height:70upx;
		line-height:70upx;
		width:100%;
		padding-left:20upx;
	}
	.mask{
		top:0;
		right:0;
		left:0;
		bottom:0;
		background:rgba(0,0,0,0.2)
	}
	@import  url("../../../../common/css/shop.css");
	page{
		background:rgba(247,247,247,1);
	}
	.shop-img{
		width:100%;
		height:400upx !important;
	}
	.shop-info{
		padding:20upx 44upx 0;
	}
	.shop-time{
		padding:38upx 0 40upx;	
	}
	.shop-duedate{
		border-right:1px solid #EEEEED;padding-right:40upx;
	}
	.shop-address{
		padding:38upx 0 40upx;
	}
	.member-container{
		padding:36upx 30upx 30upx 46upx;
		margin-bottom: 30upx;
		background:#fff;

	}
	.model-title{
		background:#FFFFFF;
		padding:30upx 0;
		border-bottom: 1px solid #EEEEED;
		
	}
</style>
