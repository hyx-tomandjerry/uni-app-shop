<template>
	<view>
		<view class=" bg-white" >
			<view class="flex justify-between address-item borderBottom">
				<view style="border-right:1px solid #EEEEED;" >
					<view>收件人</view>
					<view>
						<input type="text" placeholder="姓名名称(必填)" style="font-size:13px;" v-model="shop.name">
					</view>
				</view>
				<view>
					<view>电话</view>
					<input type="text" placeholder="手机号电话(必填)" style="font-size:13px;"
					 :class="{'text-red':!isTel}"
					 v-model="shop.telephone" @blur="checkTelEvent($event)">
				</view>
			</view>
			<view class="flex justify-between address-item borderBottom"  >
				<view class="title" style="color:gray;font-size: 12px;" >选择所在城市</view>
				<addressed @changes="childClick($event)"></addressed>
			</view>
			
			<view class="address-item borderBottom">
				<input type="text" placeholder="详细地址(详细到门牌,街道)" style="font-size:13px;" v-model="shop.address">
			</view>
			
			<!--<view class="flex justify-between">	-->
				<!--<view style="padding-top:5px;padding-left:10px;line-height:32px" @click="choosePayMent()">-->
					<!--<text class="cuIcon-roundcheck" style="margin-right:6px;color:#0081FF" v-if="shop.isPay" ></text>-->
					<!--<text class="cuIcon-round" style="margin-right:6px;color:#0081FF" v-else></text>-->
					<!--<text style="font-size:12px;">是否货到付款</text>-->
				<!--</view>-->
				<!--<view style="font-size:12px;padding: 8px 10px;color:lightgray;">-->
					<!--<text class="cuIcon-delete" style="font-size:13px;color:orange;margin-right:10px;"></text>清空当前信息-->
				<!--</view>-->
			<!--</view>-->
		</view>
		
		
	<view style="width:100%;position:absolute;bottom:7px;left:0;padding:10px 15px;background:#fff;">
		<view class="cu-btn bg-blue" style="width:100%;border-radius: 8px;" @click="addAddress()">保存</view>
	</view>
	</view>
</template>

<script>
	import addressed from '../../../../../components/jm-address/jm-address.vue'
	export default {
		data() {
			return {
				isShow:false,
				isTel:true,
				shop:{
					province:'',
					provinceName:'',
					city:'',
					cityName:'',
					district:'',
					districtName:'',
					name:'',
					telephone:'',
					address:'',
					isPay:false
				}
			}
		},
		components: {
			addressed
		},
		methods: {
			checkTelEvent(event){
				if(!this.isTel){
					this.isTel=true;
				}
				if(event){
					if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(event.detail.value))){
							uni.showToast({
								title:'电话号码不存在',
								icon:'none'
							})
							this.isTel=false;
							return
					}
						
				}
			},
			choosePayMent(){
				console.log(this.shop.isPay)
				this.shop.isPay=!this.shop.isPay
			},
			addAddress(){
				console.log(this.shop)
				if(!this.shop.name || !this.isTel || !this.shop.province || !this.shop.address){
					uni.showToast({
						title:'请填写完成信息',
						icon:'none'
					})
				}else{
					setTimeout(()=>{
						uni.navigateBack({
							delta:1,
							success:(res)=>{
								this.$fire.fire('address',this.shop)
							}
						})
					},600)
				}
			},
			childClick(e) {
			        console.log(e)
					this.shop.province=e.provinceID;
					this.shop.city=e.cityID;
					this.shop.district=e.districtID;
					this.shop.provinceName=e.province;
					this.shop.cityName=e.city;
					this.shop.districtName=e.district
			    },
			chooseCity(){
				this.isShow=true;
			}
		}
	}
</script>

<style lang="less" >
	.address-item{
		padding:16px 13px 13px 29px;
	}
</style>
