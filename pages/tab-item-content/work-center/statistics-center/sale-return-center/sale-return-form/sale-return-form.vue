<template>
	<view>
		<view class="form-container borderTop ">
			<common-flex leftContent="门店名称" :rightContent="shopItem.name || ''"></common-flex>
			<common-flex leftContent="日期" 
				:rightContent="quitDate" 
				:type="fromType!='count'?'navigate':'normal'"
				@operateItem="onShowDatePicker('date')"></common-flex>
			<common-flex 
			
				leftContent="店员" 
				:rightContent="manItem.name || ''" 
				:type="(fromType =='index') && ( shopItem.manager == userInfo.id)?'navigate':'normal'"
				@operateItem="chooseMan"
			></common-flex>
			<common-flex :rightContent=" manSaleCount || 0" leftContent="店员销售金额" :isColorBlue="true"></common-flex>
			<view class="form-item borderBottom">
				<view class="color-normal font-size-normal">
					<text class="color-red">*</text>
					<text>退货金额</text>
				</view>
				<view class="flex justify-end align-center">
					<input type="number" class="uni-input color-regular text-right" placeholder="输入退货金额"  v-model="money"/>
				</view>
			</view>
		</view>
		 <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true"
						@confirm="onSelected($event)" @cancel="onSelected($event)" :isBegin="true"/>
	
		<common-btn-one
			:type="btnType" 
			:disabled="disabled" 
			content="确定"
			@operateBtn="submit" :isPos="true"></common-btn-one>
	</view>
</template>

<script>
	
	import MxDatePicker from "../../../../../../components/uni/mx-datepicker/mx-datepicker.vue"
	import commonBtnOne from '../../../../../../components/common/common-btn-one.vue'
	import commonFlex from '../../../../../../components/common/common-flex.vue'
	
	import {mapState} from 'vuex'
	import {SalesmanDailyAmountApi,DeductSalesAmountApi} from '../../../../../../api/statistics_api.js'
	import {ChainShopApi} from '../../../../../../api/shop_api.js'
	export default {
		computed:mapState(['userInfo']),
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				shopID:'',
				shopItem:{},
				showPicker: false,//显示日期弹出框
				value: '',//显示日期弹出框
				type:'rangetime',//显示日期弹出框
				quitDate:currentDate,
				manItem:{},
				money:'',
				disabled:true,
				fromType:'',
				manSaleCount:0,
				btnType:'default'
			}
		},
		components:{MxDatePicker,commonBtnOne,commonFlex},
		watch:{
			quitDate(val){this.change()},
			money(val){this.change()},
			manItem(val){this.change()}
		},
		methods: {
			//获得月份的店员绩效
			async getManPerformance(){
				if(this.fromType=='count') return;
				let arr=this.quitDate.split('-');
				let result = await SalesmanDailyAmountApi(this.shopID,this.manItem.id?this.manItem.id:'',{year:arr[0],month:arr[1]});
				this.manSaleCount=result[`aday${Number(arr[2])}`];

			},
			async submit(){	
				if(this.check()){
					this.disabled=true;
					if(await DeductSalesAmountApi(this.shopID,this.quitDate,this.money,this.manItem.id)){
						this.$utils.showToast('退货处理成功')
						this.$utils.goBack()
						this.$utils.hide()
					}else{
						this.disabled=false;
					}

				}
			},
			change(){
				if(this.quitDate && this.money && this.manItem.id){
					this.disabled=false;
					this.btnType='primary'
					return;
				}
				this.disabled=true;
				this.btnType='default'
			},
			check(){
				if(!this.money){
					
					this.$utils.showToast('请输入退货金额')
					return false;
				}
				if(this.money<=0){
					
					this.$utils.showToast('退货金额要大于0')
					this.money="";
					return false;
				}
				if(this.money>this.manSaleCount){
					
					this.$utils.showToast('退货金额不能超出销售金额')
					this.money='';
					return false;
				}
				if(this.fromType=='index' && this.shopItem.manager==this.userInfo.id && !this.manItem.id){
					
					this.$utils.showToast('请选择要退货的店员')
					return false;
				}
				return true;	
			},
			// 选择店员
			chooseMan(){
				if(this.fromType=='count' || this.shopItem.manager != this.userInfo.id) return;
				uni.navigateTo({
					url:"../../../express-center/express-shop-man/express-shop-man?id="+this.shopID+"&type=sale"
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			 onShowDatePicker(type){//显示
				 if(this.fromType=='count') return;
				this.type = type;
				this.showPicker = true;
				this.value = this[type];		
			},		
			async getShopInfo(id){
				this.shopItem = await ChainShopApi(id);
				if(this.fromType == 'index'){
					//如果是店员
					this.manItem=this.userInfo;
					this.getManPerformance()
				}

			},
			onSelected(event){
				this.showPicker = false;
				if(event) {
					this.quitDate=this.$moment(event.date).format('YYYY-MM-DD');
					this.getManPerformance()
				}
				
			},
			
		},
		onShow(){
			this.$fire.on('man',result=>{
				if(result){
					this.manItem=result;
					this.getManPerformance()
				}
			})
		},
		onLoad(options){
			this.fromType=options.type;
			switch(options.type){
				case 'index':
				//从首页进入的
				if(options.shopID){
					this.shopID=options.shopID;
					this.getShopInfo(options.shopID);
					
				}
				break;
				case 'count':
				this.fromType=options.type;
				let obj=JSON.parse(options.obj);
				this.shopID=obj.shopID;
				this.shopItem.name=obj.shopName;
				this.manItem.id=obj.manID;
				this.manItem.name=obj.manName;
				this.manSaleCount=obj.money;
				this.quitDate=`${obj.year}-${obj.month>9?obj.month:'0'+obj.month}-${obj.day>9?obj.day:'0'+obj.day}`
				//从年月日进入的
				break;
			}
		}
	}
</script>

<style scoped>
	.form-item{
		height:106upx;
		line-height:106upx;
		display: flex;
		justify-content: space-between;
		align-content: center;
		background-color: #fff;
		padding:0 30upx;
		
	
	}

</style>
