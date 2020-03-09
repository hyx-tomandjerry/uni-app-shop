<template>
	<view class="borderTop">
		<common-flex leftContent="CPE名称" :rightContent="serviceItem.name"/>
		<common-flex leftContent="CPE序列号" :rightContent="serviceItem.seq"/>
		<common-form-group :showRequired="true" intro="SSID">
			<input
			    placeholder="SSID"
			    class="font-size-normal font-weight-normal text-right"
				v-model="name" slot="right"/>
		</common-form-group>
		<common-form-group :showRequired="true" intro="密码">
			<input
				:password="true"
			    placeholder="密码"
			    class="font-size-normal font-weight-normal text-right"
				v-model="token" slot="right"/>
		</common-form-group>
		
		<common-btn-one
			:type="btnType" 
			:disabled="disabled" 
			content="确定"
			@operateBtn="setWifiFun" :isPos="true" />
	</view>
</template>

<script>
	import {ChainShopApi,RouterApi,SetWifiApi} from '../../../../../api/shop_api.js'
	
	import CommonFlex from '../../../../../components/common/common-flex.vue'
	import CommonFormGroup from '../../../../../components/common/common-form-group.vue'
	import CommonBtnOne from '../../../../../components/common/common-btn-one.vue'
	export default {
		components:{CommonFormGroup,CommonBtnOne,CommonFlex},
		data() {
			return {
				shopItem:{},
				serviceItem:{},
				name:'',
				token:'',
				btnType:'default',
				disabled:true,
			}
		},
		watch:{
			name(val){this.change()},
			token(val){this.change()}
		},
		methods:{
			check(){
				if(!this.name){
					this.$utils.showToast('SSID名称不能为空!');
					return false;
				}
				if(!this.token){
					this.$utils.showToast('请输入SSID密码!');
					return false;
				}
				return true;
			},
			change(){
				if(!this.name || !this.token){
					this.disabled=true;
					this.btnType='default';
				}else{
					this.disabled=false;
					this.btnType='primary'
				}
			},
			//设置setSSID
			async setWifiFun(){
				if(this.check()){
					if(await SetWifiApi(this.serviceItem.seq,this.name,this.token)){
						this.$utils.showToast('设置SSID成功');
						this.$utils.goBack();
						this.$utils.hide()
					}
				}
			},
			//获得门店详情
			async chainShopFun(id){
				this.shopItem = await ChainShopApi(id);
			},
			//获得设备详情
			async  routerFun(seq){
				this.serviceItem = await RouterApi(seq)
			}
		},
		onLoad(options){
			this.chainShopFun(options.shop);
			this.routerFun(options.seq)
		}
	}
</script>

<style>

</style>
