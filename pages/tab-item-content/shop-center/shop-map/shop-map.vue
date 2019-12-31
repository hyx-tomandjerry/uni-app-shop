<template>
	<view>
		<view  :style="{paddingTop:statusBarHeight+'px'}" class="bg-white shop-info">
			<view class="font-size-normal color-normal">{{shopItem.name || ''}}</view>
			<common-flex
				leftContent="所在城市" 
				type="navigate"
				:isLeftCb="true"
				@operateItem="chooseCity"
				:rightContent="`${shopItem.provinceName}-${shopItem.cityName }-${shopItem.districtName}`"></common-flex>
			<view class="flex justify-between align-center">
				<view class="flex-1">
					<input type="text" v-model="shopItem.address" class="input-style"/>
				</view>
			</view>
			<view class="flex justify-between align-center" >
				<button class="cu-btn round line-blue"  @tap="init_address"
					>标注门店定位</button>
				<button class="cu-btn round line-green"  @tap="saveAddress"
					>保存</button>
			</view>
		</view>
		
		<map
			style="width:100%;"
			:style="{height:screenHeight+'px'}"
			:longitude="longitude"
			:latitude="latitude"
			:markers="covers"	
		></map>	
		
	</view>
</template>
<script>
	// import amap from '../../../../common/amap-wx.js'
	import commonFlex from '../../../../components/common/common-flex.vue'
	const AMap = require('../../../../common/amap-wx.js')
	import {mapState} from 'vuex'
	import {DistrictsApi} from '../../../../api/common_api.js'
	import {ChainShopApi,SetShopAddressApi} from '../../../../api/shop_api.js'
	export default{
		components:{commonFlex},
		computed:mapState(['userInfo']),
		data(){
			return{
				screenHeight:400,
				statusBarHeight:45,
				amapPlugin:null,
				latitude: 39.909,
				longitude: 116.39742,
				shopAddress:'',
				shopItem:{},
				isShow:false,
				provinceList:[],
				covers:[
					{
						scale:16,//地图缩放程度
						latitude: 39.909,
						longitude: 116.39742,
						iconPath:'../../../../static/img/location.png',
						width:40,   //宽
						height:40,   //高
						label:{
							content:'',
							fontSize:14,
							color:'#42B0ED'
						},
						callout:{//自定义标记点上方的气泡窗口 点击有效  
						   　　content:'',//文本
						   　　color:'42B0ED',//文字颜色
						   　　fontSize:14,//文本大小
						   　　borderRadius:2,//边框圆角
						  　　 bgColor:'#00c16f',//背景颜色
						   　　display:'ALWAYS',//常显
						   },
					},
					 
				]
			}
		},
		methods:{
			hideModel(e){
				this.isShow=false;
				this.shopItem.province=e.province;
				this.shopItem.city=e.city;
				this.shopItem.district=e.district;
				this.shopItem.provinceName=e.provinceName;
				this.shopItem.cityName=e.cityName;
				this.shopItem.districtName=e.districtName;
				this.provinceList=[];
			},
			chooseCity(){
				uni.navigateTo({
					url:"choose-city/choose-city?id="+this.shopItem.id
				})
			},
			saveAddress(){
				let address=`${this.shopItem.provinceName}${this.shopItem.cityName}${this.shopItem.districtName}${this.shopItem.address}`;
				this.init_map(address,true)
				
			},
			init_address(){
				uni.getLocation({
					type: 'wgs84',
					geocode:true,
					success: (res) => {
						if(res){
							this.getProvinceID(res.address.province,res.address.city,res.address.district)
							let address=`${res.address.province}${res.address.city}${res.address.district}${res.address.street || ''}${res.address.streetNum || ''}${res.address.poiName || ''}`;
							this.shopItem.address=`${res.address.street || ''}${res.address.streetNum || ''}${res.address.poiName || ''}`
							this.init_map(address,true)
						}
					}
				})
			},
			//根据省获得id
			async getProvinceID(name,city,district){
			
				let result=await DistrictsApi(0);
				
				let province =result.find(item=>item.name==name)
				
				this.shopItem.province=province.id;
				this.shopItem.provinceName=province.name;
				this.getCityItem(province.id,city,district)

			},
			async getCityItem(id,city,district){
				let newCity='';
				switch(city){
					case '上海市' || '北京市' || '天津市' || '重庆市':
					newCity=`${city.substr(0,2)}城区`;
					break
					default:
					newCity=city;
					break;
				};
				let result=await DistrictsApi(id)
				let cityItem = result.find(item=>item.name==newCity)
				this.shopItem.city=cityItem.id;
				this.shopItem.cityName=cityItem.name;
				this.getDistrictID(cityItem.id,district)
				

			},
			//获得区的id
			async getDistrictID(id,district){
				let result=await DistrictsApi(id);
				let districtItem = result.find(item=>item.name==district);
				this.shopItem.district=districtItem.id;
				this.shopItem.districtName=districtItem.name;
				

			},
			init_map(address,flag){
				uni.request({
					url:'http://restapi.amap.com/v3/geocode/geo',
					data:{
						address:address,
						key:this.config.mapKey,
						output:'json',
						s:'rsv3'
					},
					success: (res) => {
						if(res.data.infocode==10000 && res.data.info=='OK'){
							let result=res.data.geocodes[0]
							let arr=result.location.split(',')
							this.longitude=Number(arr[0]);
							this.latitude=Number(arr[1])
							this.covers[0].longitude=Number(arr[0]);
							this.covers[0].latitude=Number(arr[1]);
							this.covers[0].label.content=result.formatted_address;
							this.covers[0].callout.content=result.formatted_address;
							if(flag){
								uni.showModal({
									content:'是否将当前获取的地理位置标注为门店在地图中的定位?',
									success: (res) => {
										if(res.confirm){
											this.submitAddress()
										}
									}
								})
							}
						}else{
							this.$utils.showToast('无法定位')
						}
						
					}
				})
			},
			async submitAddress(){
				let arr=[];
				arr.push(this.longitude,this.latitude)
				let result=await SetShopAddressApi(this.shopItem.id,this.shopItem.province,this.shopItem.city,this.shopItem.district,this.shopItem.address,arr)
				if(result){
					this.$utils.showToast('门店地址修改成功')
					this.$utils.goBack()
				}

			},
			async getShopInfo(id){
				this.shopItem = await ChainShopApi(id);
				let address=`${this.shopItem.provinceName}${this.shopItem.cityName}${this.shopItem.districtName}${this.shopItem.address}`
				this.init_map(address,false)

			}
			
		},
		onShow(){
			this.$fire.on('city',result=>{
				this.shopItem.province=result.province;			
				this.shopItem.city=result.city;
				this.shopItem.district=result.district;
				this.shopItem.provinceName=result.provinceName;
				this.shopItem.cityName=result.cityName;
				this.shopItem.districtName=result.districtName;
			})
		},
		onLoad(options){
			this.getShopInfo(options.id)
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight=res.statusBarHeight+uni.upx2px(80);
					if(this.shopItem.manager == this.userInfo.id){
						this.screenHeight=res.windowHeight - uni.upx2px(300)
					}else{
						this.screenHeight=res.windowHeight
					}
					
				}
			})
		}
	}
</script>
<style>
	.shop-info{
		padding:0 40upx 40upx 40upx;
	}
	/* .shop-info>view:first-child{
		margin-bottom: 30upx;
	} */
	.shop-info>view:nth-child(2){
		margin:30upx 0;
	}
	.shop-info>view:last-child .cu-btn{
		height:50upx;
		line-height:50upx;
		font-size:12px;
		margin-top: 20upx;
	}
	.input-style{
		padding-left: 20upx;
		border:1px solid #FFFFFF;
		width:100%;
		border-radius: 10upx;
		background:#F7F7F7;
		height:90upx;
		line-height:90upx;
	}
</style>