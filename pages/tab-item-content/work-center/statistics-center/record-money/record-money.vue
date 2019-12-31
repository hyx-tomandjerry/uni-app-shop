<template>
	<view class="borderTop position_relative">
		<view class="container position_relative">
			<textarea   class="textarea-input" type="number"
					    placeholder="请输入金额" v-model="num" :class="{'input-active':num}"></textarea>
		</view>
			<common-btn-one v-if="paramItem.type=='edit'"
				:type="btnType" 
				:disabled="disabled" 
				content="修改"
				@operateBtn="recordMoney('edit')" :isPos="true"></common-btn-one>
			<common-btn-one v-else
				:type="btnType" 
				:disabled="disabled" 
				content="保存"
				@operateBtn="recordMoney('save')" :isPos="true"></common-btn-one>
	</view>
</template>

<script>

	import commonBtnOne from '../../../../../components/common/common-btn-one.vue'
	
	import {mapState} from 'vuex';
	import {ChangeSalesmanAmountApi,RecordMySalesAmountApi} from '../../../../../api/statistics_api.js'
	export default {
		computed:mapState(['userInfo']),
		components:{commonBtnOne},
		data() {
			return {
				num:"",
				summary:'',
				shopID:'',
				saleID:'',
				paramItem:{},
				btnType:'default',
				disabled:false,
			}
		},
		watch:{
			num(){this.change()}
		},
		methods: {
			change(){
				if(this.num && this.num >=0){
					this.btnType='primary';
					this.disabled=false;
					return;
				}
				this.btnType='default';
				this.disabled=true;
			},
			check(){
				if(isNaN(this.num)){
					this.$utils.showToast('你输入的不是数字，请重新输入')
					return false;
				}	
				if(this.num<0){
					this.$utils.showToast('你输入的负数请重新输入')
					this.num=''
					return false;
				}
				return true;
			},
			async recordMoney(type){
				if(this.check()){
					this.disabled=true;
					let val={}
					switch(type){
						case 'edit':
						 val={
							shop:this.paramItem.shopID,
							date:`${this.paramItem.year}-${this.paramItem.month>9?this.paramItem.month:'0'+this.paramItem.month}-${this.paramItem.day>9?this.paramItem.day:'0'+this.paramItem.day}`,
							amount:this.num,
							account:this.paramItem.saleID,
						}
						if(await ChangeSalesmanAmountApi(val)){
							this.$utils.showToast('修改员工绩效成功')
							this.$utils.goBack()
							this.$utils.hide()
						}else{
							this.disabled=false;
						}
						break;
						case 'save':
						 val={
							shop:this.paramItem.shopID,
							date:`${new Date().getFullYear()}-${new Date().getMonth()+1>=10?new Date().getMonth()+1:'0'+new Date().getMonth()+1}-${new Date().getDate()>=10?new Date().getDate():'0'+new Date().getDate()}`,
							amount:this.num,
							account:this.userInfo.id
						}
						if(await RecordMySalesAmountApi(val)){
							this.$utils.showToast('成功记录一笔')
							this.$utils.goBack()
							this.$utils.hide()
							
						}else{
							this.disabled=false;
						}
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
				this.num=JSON.parse(params.obj).money;
			}
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

	.uni-input-input{
		font-family: DINAlternate-Bold;
		color:#42B0ED;
	}
	.input-active{
		font-weight: bold !important;
		font-size:30px;
		color:#42B0ED
	}
</style>
