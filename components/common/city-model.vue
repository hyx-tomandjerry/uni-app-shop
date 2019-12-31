<template>
	<view>
			<view class="cu-modal bottom-modal" :class="isShow?'show':''" @click="hideModel">
			<view class="cu-dialog">
				<view class="cu-bar bg-white flex justify-around">
					<view v-for="(item,index) in mainTabList"
					:class="{'borderBottomRed':mainTabCur==item.id}"
					@click="chooseMainTab(item)"
					:key="index" style="flex:1;line-height:55px;">{{item.name}}</view>
				</view>
				<view class="padding-xl flex justify-around">
					<scroll-view scroll-y class="province-nav" style="max-height:300px;">
						<view v-for="(item,index) in provinceList"
						:class="{'chooseActive':provinceTabCur==item.id}"
						@click.stop="chooseProvince(item,'province')"
						:key="index" style="padding:10px 15px;">{{item.name}}</view>
					</scroll-view>
					<scroll-view scroll-y class="district-nav" style="max-height:300px;">
						<view v-for="(item,index) in cityList"
						:class="{'chooseActive':cityTabCur==item.id}"
						@click.stop="chooseProvince(item,'city')"
						:key="index" style="padding:10px 15px;">{{item.name}}</view>
					</scroll-view>
					<scroll-view scroll-y class="city-nav" style="max-height:300px;">
						<view v-for="(item,index) in districtList"
						:class="{'chooseActive':districtTabCur==item.id}"
						@click.stop="chooseProvince(item,'district')"
						:key="index" style="padding:10px 15px;">{{item.name}}</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {DistrictsApi} from '../../api/common_api.js'
	export default {
		data() {
			return {
				mainTabCur:1,
				districtList:[],
				cityList:[],
				provinceTabCur:0,
				districtTabCur:0,
				cityTabCur:0,
				provinceName:'',
				districtName:'',
				cityName:'',
				mainTabList:[
					{id:1,name:'省'},
					{id:2,name:'市'},
					{id:3,name:'区'}
				],
			};
		},
		props:{
			isShow:{
				type:Boolean,
				default:false,
			},
			provinceList:{
				type:Array,
				default:()=>{}
			},
			isSecond:{
				type:Boolean,
				default:false,
			}
		},
		methods:{
			hideModel(){
				this.districtList=[];
				this.cityList=[];
				this.$emit('hideModel',{
					provinceName:this.provinceName?this.provinceName:'',
					province:this.provinceTabCur?this.provinceTabCur:'',
					cityName:this.cityName?this.cityName:'',
					city:this.cityTabCur?this.cityTabCur:'',
					districtName:this.districtName?this.districtName:'',
					district:this.districtTabCur?this.districtTabCur:''
				})
			},
			chooseProvince(item,type){
				switch(type){
					case 'province':
					this.provinceTabCur=item.id;
					this.provinceName=item.name;
					this.mainTabCur=1;
					this.getCityList(this.provinceTabCur)
					break;
					case 'city':
						this.mainTabCur=2;
						this.cityName=item.name;
						this.cityTabCur=item.id;
						this.getDistrictList(this.cityTabCur)
						if(this.isSecond){
							this.hideModel();
						}
					break;
					case 'district':
						this.mainTabCur=3;
						this.districtTabCur=item.id;
						this.districtName=item.name;
						this.hideModel();	
						
					
					break;
				}
			},
			async getDistrictList(parent){
				this.districtList = await DistrictsApi(parent)

			},
			async getCityList(parent){
				this.cityList = await DistrictsApi(parent)
			},
			async getProvinceList(){
				this.provinceList = await DistrictsApi(0)

			},
			chooseMainTab(item){
				this.mainTabCur=item.id;
			}
		},
	}
</script>

<style>
.chooseActive{
		background:#42B0ED;
	}
</style>
