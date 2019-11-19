<template>
	<view class="borderTop position_relative" :style="{height:windowHeight+'px'}">
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back"  @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >记一笔</view></block>
		</cu-custom>
		<view class="container position_relative">
			<!-- <input type="number" placeholder="请输入金额" class=" input-style"  v-model="num" :class="{'input-active':num}"> -->

			<textarea   class="textarea-input" type="number"
					    placeholder="请输入金额" v-model="num" :class="{'input-active':num}"></textarea>
		</view>

		<view class="btn-container bg-white position_absolute" style="width:100%;bottom:0px;">
			<view class="btn-tag" @click="recordMoney('edit')" v-if="paramItem.type=='edit'">修改</view>
			<view class="btn-tag" @click="recordMoney('save')" v-else>保存</view>

		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				num:"",
				summary:'',
				shopID:'',
				saleID:'',
				windowHeight:'',
				paramItem:{}
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			check(){
				if(isNaN(this.num)){
					uni.showToast({
						title:'你输入的不是数字，请重新输入',
						icon:'none',
						success: () => {
							this.num=''
						}
					})
					return false;
				}	
				if(this.num<0){
					uni.showToast({
						title:'你输入的负数请重新输入',
						icon:'none',
						success: () => {
							this.num=''
						}
					})
					return false;
				}
				return true;
			},
			recordMoney(type){
				if(this.check()){
					switch(type){
						case 'edit':
						//SetSalesmanDailyPerformance-> ChangeSalesmanAmount
						this.$ajax('ChangeSalesmanAmount',{
							shop:this.paramItem.shopID,
							date:`${this.paramItem.year}-${this.paramItem.month>9?this.paramItem.month:'0'+this.paramItem.month}-${this.paramItem.day>9?this.paramItem.day:'0'+this.paramItem.day}`,
							amount:this.num,
							account:this.paramItem.saleID,
						},res=>{
							uni.showToast({
								title:'修改员工绩效成功',
								icon:'none'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},600)
						})
						break;
						case 'save':
						// NewPersonalPerformance->RecordMySalesAmount
						this.$ajax('RecordMySalesAmount',{
							shop:this.paramItem.shopID,
							date:`${new Date().getFullYear()}-${new Date().getMonth()+1>=10?new Date().getMonth()+1:'0'+new Date().getMonth()+1}-${new Date().getDate()>=10?new Date().getDate():'0'+new Date().getDate()}`,
							amount:this.num,
							account:this.userInfo.id
						},res=>{
							uni.showToast({
								title:'成功记录一笔',
								icon:'none'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},600)
						})
						break;
					}
				}
				


			}
		},
		onLoad(params){
			if(params.type=='save'){
				this.paramItem.shopID=params.shopID;
			}else if(JSON.parse(params.obj)){
				this.paramItem=JSON.parse(params.obj)
				this.num=this.paramItem.money;
			}
			console.log(this.paramItem)
			// if(params.id){
			// 	this.shopID=params.id;
			// }
			// if(params.saleID){
			// 	this.saleID=params.saleID;
			// }
			// if(params.money){
			// 	this.num=params.money;
			// }
			uni.getSystemInfo({
				success:(res)=>{
					console.log(res.windowHeight)
					this.windowHeight=res.windowHeight
				}
			})
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1)
	}
	.container{
		min-height:500px;
		padding-top:18px;
		padding-right:12px;
		padding-left:18px;
		.icon-money{
			font-weight:bold;color:#FF4867;position:absolute;left:30px;top:30px;font-size:30px;z-index:1

		}
		.textarea-input{
			padding-top:24px;padding-left:13px;
			background:#fff;width:100%;height:184px;border-radius:8px;
		}

	}
	.btn-container{
		padding:10px 13px 10px 14px;
		width:100%;
		background:#fff;
		text-align: center;
		.btn-tag{
			width:100%;
			height:40px;
			background:rgba(66,176,237,1);
			border-radius:5px;
			line-height:40px;
			color:#fff;
		}
	}
	.uni-input-input{
		font-family: DINAlternate-Bold;
		color:#FF4867;
	}
	.input-active{
		font-weight: bold !important;
		font-size:30px;
		color:#FF4867
	}
</style>
