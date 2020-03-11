<template>
	<view :style="{height:screenHeight+'px'}" class="position_relative">
		<shop-img :shopItem="shopItem" />
		<shop-info :shopItem="shopItem" :userInfo="userInfo" @editAddress="editAddress" @getLocation="getLocation"/>
		<common-tab-nav
					:isShowBorder="false"
					:tabList="tabList"
					:TabCur="clerkTab"
					@tabSelect="chooseClerkTab"></common-tab-nav>
					
		<shop-member-list 
					:userList="userList" 
					:clerkTab="clerkTab"  
					:shopItem="shopItem"
					@joinSuccess="joinSuccess"
					@checkServiceItem="checkServiceItem"
					@checkItemInfo="checkItemInfo"></shop-member-list>

		
		<!-- 右上方弹框 -->
		<top-right-pupop 
			@operateItem="operateItem"
			@hideModel="hideModel"
			:statusHeight="statusHeight"
			:topRightList="topRightList"
			:isShowModel="isShowModel"></top-right-pupop>
			
		<!-- 选择设备弹框 -->
		<choose-bind :isShow="modalName=='RadioModal'" @hideModal="hideModal" @chooseServiceItem="chooseServiceItem" />
		<!-- <image src="" mode=""></image> -->
		<!-- <image src="" mode=""></image> -->
	</view>
</template>

<script>
	import shopImg from './childComponent/shop-img.vue'
	import shopInfo from './childComponent/shop-info.vue'
	import shopMemberList from './childComponent/shop-member-list.vue'
	import chooseBind from './childComponent/choose-bind.vue'
	import BottomBtnTwo from '../../../../components/common/bottom-btn-two.vue'
	import commonBtnOne from '../../../../components/common/common-btn-one.vue'
	import commonTabNav from '../../../../components/common/common-tab-nav.vue'
	import topRightPupop from '../../../../components/shop/top-right-pupop.vue'
	
	import {mapState} from 'vuex';
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
				
			}
		},
		components:{
			shopImg,
			shopInfo,
			shopMemberList,
			chooseBind,
			BottomBtnTwo,
			commonBtnOne,
			commonTabNav,
			topRightPupop
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				this.isShowModel = !this.isShowModel;
				if(this.shopItem.manager==this.userInfo.id){
					//如果是店长
					this.topRightList=[
						{name:'录入店员',value:'record',img:'../../../../static/img/shop/clerk/icon_add.png'},
						{name:'记一笔',value:'count',img:'../../../../static/img/shop/clerk/icon_record.png'},
						{name:'绑定设备',value:'equipment',img:'../../../../static/img/shop/clerk/icon-bind.png'}
					]
				}else{
					this.topRightList=[
						{name:'记一笔',value:'count',img:'../../../../static/img/shop/clerk/icon_record.png'},
						// {name:'绑定设备',value:'equipment',img:'../../../../static/img/shop/clerk/icon-bind.png'}
					]
				}
				// this.isShowModel=true;
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
			checkServiceItem(item){
				switch(item.ownerName){
					case 'camera':
					uni.navigateTo({
						url:'../service-center/service-camera-info/service-camera-info?seq='+item.seq+'&shopID='+this.shopID
					})
					break;
					case 'router':
					uni.navigateTo({
						url:"../service-center/service-router-info/service-router-info?seq="+item.seq+'&shopID='+this.shopID
					})
					break;
				}
				
				// // 查看设备详情
				// uni.navigateTo({
				// 	url:'../service-item-info/service-item-info?seq='+item.seq+'&type='+item.ownerName+"&shopID="+this.shopID
				// })
			},
			//选中设备
			chooseServiceItem(item){
				uni.navigateTo({
					url:"../service-bind/service-bind?id="+this.shopID+"&type="+item,
					success: (res) => {
						this.modalName=null;
					}
				})
				
			},
			operateItem(item){
				switch(item){
					case 'record':
					//录入店员
					this.isShowModel=false;
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

			//查看店员详情
			checkItemInfo(item){
				uni.navigateTo({
					url:"../clerk-item-info/clerk-item-info?shopID="+this.shopID+"&clerkID="+item.id+"&clerkTab="+this.clerkTab
			
				})
			},
			//修改地址
			editAddress(type){
				uni.navigateTo({
					url:"../shop-operate-form/shop-operate-form?id="+this.shopID+"&type="+type
					
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
				let result = await ShopDevicesApi(this.shopItem.id);
				result.forEach(item=>{
					if(item.ownerName=='router'){
						item.img="../../../../static/img/shop/service/icon-router.png"
					}else if(item.ownerName=='camera'){
						item.img="../../../../static/img/shop/service/icon-camera.png"
					}
				})
				this.userList=result.filter(item=>item.ownerName!='card')
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
			switch(this.clerkTab){
				case 1:
				this.checkClerkList(this.shopID)
				break;
				case 2:
				this.getZoneUser();
				break;
				case 3:
				this.getServiceList()
				break;	
			}
			

		}
	}
</script>

<style scoped>
	page{
		background:rgba(247,247,247,1);
	}
	
</style>
