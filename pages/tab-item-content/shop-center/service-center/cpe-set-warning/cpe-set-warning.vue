<template>
	<view class="borderTop">
		<common-flex 
			
			leftContent="门店名称"
			rightContent="Basic House长宁广场"
		/>
		<common-flex
			leftContent="ICCID"
			rightContent="OAKS2134567"
		/>
		<common-form-group intro="预警值" :showRequired="true">
			<input 
			    placeholder="输入预警值"
			    class="font-size-normal font-weight-normal text-right"
				v-model="warn" slot="right"/>
		</common-form-group>
		<common-flex
				leftContent="通知人员" 
				:rightContent="contractor" 
				type="navigate"
				@operateItem="chooseContactor" />
		<common-flex
			leftContent="电话号码"
			:rightContent="telephone"
		/>
		
		<common-btn-one
			:type="btnType" 
			:disabled="disabled" 
			content="确定"
			@operateBtn="setWarning" :isPos="true" />
	</view>
</template>

<script>
	
	import {ChainShopApi,RouterApi,SetAlertTrafficApi} from '../../../../../api/shop_api.js'
	
	import CommonBtnOne from '../../../../../components/common/common-btn-one.vue'
	import CommonFlex from '../../../../../components/common/common-flex.vue'
	import CommonFormGroup from '../../../../../components/common/common-form-group.vue'
	export default {
		components:{CommonFormGroup,CommonFlex,CommonBtnOne},
		data() {
			return {
				warn:'',
				shopItem:{},
				serviceItem:{},
				contractor:'',//通知人员
				telephone:'',
				btnType:'default',
				disabled:true
			}
		},
		watch:{
			contractor(val){this.change()},
			warn(val){this.change()},
			telephone(val){this.change()}
		},
		methods: {
			check(){
				if(!this.contractor){
					this.$utils.showToast('通知人员不能为空');
					return false;
				}
				if(!this.warn){
					this.$utils.showToast('预警值不能为空!');
					return false;
				}
				if(!this.telephone){
					this.$utils.showToast('联系方式不能为空!');
					return false;
				}
				return true;
			},
			change(){
				if(!this.contractor || !this.warn || !this.telephone){
					this.btnType='default';
					this.disabled=true;
					return;
				}else{
					this.btnType='primary';
					this.disabled=false;
				}
			},
			// 获得门店详情
			async  ChainShopFun(id){
				this.shopItem = await ChainShopApi(id);
			},
			// 获得设备详情
			async routerFun(seq){
				this.serviceItem = await RouterApi(seq)
			},
			//选择通知人员
			chooseContactor(){
				uni.navigateTo({
					url:'../../../work-center/express-center/express-shop-man/express-shop-man?id='+this.shopItem.id+'&type=service'
				})
			},
			//设置预警
			async setWarning(){
				if(this.check()){
					if(await SetAlertTrafficApi(this.serviceItem.sim,this.warn,this.telephone,this.contractor)){
						this.$utils.showToast('设置预警成功!');
						this.$utils.goBack();
						setTimeout(()=>{
							this.$utils.hide()
						},3000)
					}
				}
			}
		},
		onShow(){
			this.$fire.on('man',res=>{
				this.contractor = res.name;
				this.telephone= res.account;
			})
		},
		onLoad(options){
			this.ChainShopFun(options.shop);
			this.routerFun(options.seq)
		}
	}
</script>

<style>

</style>
