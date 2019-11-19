<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back"  @tap="goBack"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >退货处理</view></block>
		</cu-custom>
		<view class="form-container borderTop ">
			<view class="form-item borderBottom">
				<view class="color-normal font-size-normal">
					<text class="color-red">*</text>
					<text>门店名称</text>
				</view>
				<view class="color-regular font-size-normal">{{shopItem.name || ''}}</view>
			</view>
			<view class="form-item borderBottom">
				<view class="color-normal font-size-normal">
					<text class="color-red">*</text>
					<text>日期</text>
				</view>
				<view class="flex justify-end align-center" @tap="onShowDatePicker('date')">
					<view class="color-regular">{{quitDate}}</view>
					<view class="cuIcon-right font-size-big color-regular" v-show="fromType!='count'"></view>
				</view>
			</view>
			
			<view class="form-item borderBottom">
				<view class="color-normal font-size-normal">
					<text class="color-red">*</text>
					<text>店员</text>
				</view>
				<view class="flex justify-end align-center" @tap="chooseMan">
					<view class="color-regular">{{manItem.name || ''}}</view>
					<view class="cuIcon-right font-size-big color-regular" v-show="fromType!='count'"></view>
				</view>
			</view>
			<view class="form-item borderBottom">
				<view class="color-normal font-size-normal">
					<text class="color-red">*</text>
					<text>店员销售金额</text>
				</view>
				<view class="color-blue font-weight-bold font-size-normal">{{manSaleCount || 0}}</view>
			</view>
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
	
		<bottom-btn-one content="确定"  @showModal="submit" :disabled="disabled" :loading="loading"></bottom-btn-one>
	</view>
</template>

<script>
	
	import MxDatePicker from "../../../../../../components/uni/mx-datepicker/mx-datepicker.vue"
	import bottomBtnOne from '../../../../../../components/common/bottom-btn-one.vue'
	export default {
		
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
				loading:false,
				fromType:'',
				manSaleCount:0
			}
		},
		components:{MxDatePicker,bottomBtnOne},
		watch:{
			quitDate(val){this.change()},
			money(val){this.change()},
			manItem(val){this.change()}
		},
		methods: {
			submit(){
				
				
				if(this.check()){
					console.log('kkkk')
					this.disabled=true;
					this.loading=true;
					this.$ajax('DeductSalesAmount',{
						shop:this.shopID,
						date:this.quitDate,
						amount:this.money,
						salesman:this.manItem.id
					},res=>{
						uni.showToast({
							title:'退货处理成功',
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},900)
					})
				}
			},
			change(){
				if(this.quitDate && this.money && this.manItem.id){
					this.disabled=false;
					return;
				}
				this.disabled=true;
			},
			check(){
				if(this.fromType=='count'){
					if(!this.money){
						uni.showToast({
							title:'请输入退货金额',
							icon:'none'
						})
						return false;
					}
					if(this.money>this.manSaleCount){
						uni.showToast({
							title:'退货金额超出销售金额',
							icon:'none'
						})
						this.money='';
						return false;
					}
					return true;
				}else{
					if(!this.quitDate){
						uni.showToast({
							title:'请选择日期',
							icon:'none'
						})
						return false;
					}
					if(!this.manItem.id){
						uni.showToast({
							title:'请选择店员',
							icon:'none'
						})
						return false;
					}
					if(!this.money){
						uni.showToast({
							title:'请输入退货金额',
							icon:'none'
						})
						return false;
					}
					return true;
				}
				
			},
			// 选择店员
			chooseMan(){
				if(this.fromType=='count') return;
				uni.navigateTo({
					url:"../../../express-center/express-shop-man/express-shop-man?id="+this.shopID
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
			getShopInfo(id){
				this.$ajax('ChainShop',{id:id},res=>{
					this.shopItem=res;
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			onSelected(event){
				this.showPicker = false;
				if(event) {
					this.quitDate=this.$moment(event.date).format('YYYY-MM-DD')
				}
				
			}
		},
		onLoad(options){
			if(options.type=='count'){
				this.fromType=options.type;
				let obj=JSON.parse(options.obj);
				this.shopID=obj.shopID;
				this.shopItem.name=obj.shopName;
				this.manItem.id=obj.manID;
				this.manItem.name=obj.manName;
				this.manSaleCount=obj.money;
				this.quitDate=`${obj.year}-${obj.month>9?obj.month:'0'+obj.month}-${obj.day>9?obj.day:'0'+obj.day}`
			}else{
				if(options.shopID){
					this.shopID=options.shopID;
					this.getShopInfo(options.shopID)
				}
			}
			
			this.$fire.on('man',result=>{
				if(result){
					this.manItem=result;
					console.log(this.manItem)
				}
			})
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
