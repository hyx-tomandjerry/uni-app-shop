 <template>
 	<view v-if="item">
 		<view class="repay-container flex justify-between align-center">
 			<view>报销明细{{index+1}}</view>
 			<view class="cuIcon-delete font-size-big color-blue" 
 			data-target="delModel" 
 			v-show="index>=1" @tap="showModel($event)"></view>
 		</view>
 		<view class="cu-form-group flex justify-between"  @tap="showModel($event)" data-target="expenseBottomModal">
 			<view class="title "><text class="color-red" >*</text> 费用科目</view>	
 			<view>
 				<text :class="{
 					'color-normal':item.xTypeName ,
 					'color-regular':!item.xTypeName 
 				}">{{item.xTypeName || '费用科目'}}</text>
 				<text class="cuIcon-right color-regular font-size-big"></text>
 			</view>
 		</view>
 		<view class="cu-form-group">
 			<view class="title"><text class="text-red">*</text>日期选择</view>
 			<picker mode="date" :value="item.occdate"  @change="DateChange">
 				<view class="picker">
 					{{item.occdate}}
 				</view>
 			</picker>
 		</view>
 		<view class="cu-form-group borderBottom">
 			<view class="title "><text class="color-red">*</text> 金额</view>
 			<view>
 				<input type="number" class="uni-input text-right"  
					placeholder="金额" 
					v-model="item.amount" 
				@blur="amountInputChange(item.amount)"/>
 			</view>	
 		</view>
 		<view class="text-area">
 			<view class="font-size-normal color-normal"><text class="color-red">*</text>摘要</view>
 			<textarea  
				placeholder="请输入摘要内容" 
				v-model="item.detail" 
				@blur="handleInputChange(item.detail)"/>
 		</view>
		<!-- 显示费用科目 -->
			<bottom-show-model 
				:isShow="modelName=='expenseBottomModal'"
				:list="picker"
				dataTarget="startTimeModel"
				chooseImg="../../../../../static/icon/icon-xuanzhong.png"
				noChooseImg="../../../../../static/icon/icon-weixuanzhong.png"
				@hideModel="hideModel"
				@chooseItem="chooseExpenseItem"
			></bottom-show-model>
 	</view>
 </template>
 <script>
	 import bottomShowModel from '../common/bottom-show-model.vue'
	 import commonFlex from '../common/common-flex.vue'
	 import {ConstantsApi} from '../../api/common_api.js'
 	export default{
		components:{bottomShowModel,commonFlex},
		props:{
			index:{
				type:Number,
				required:true
			},
			item:{
				type:Object
			},
		},
 		data(){
			const currentDate = this.getDate({
			    format: true
			})
 			return{
				expenseItem:"",
				modalName:'',
				picker: [],
				xType:-1,
				modelName:''
 			}
 		},

		methods:{
			amountInputChange(detail){
				let option={amount:detail};
				this.updateItem(option)
			},
			handleInputChange(detail){
				let option={detail:detail};
				this.updateItem(option)
			},
			chooseExpenseItem(item){
				this.expenseItem=item;
				const option = {
					xType:item.id,
					xTypeName:item.val
				}
				this.updateItem(option)
				this.hideModel()	
			},
			updateItem(option){
				const newValue = Object.assign({},this.item,option)
				this.$emit('onChooseExpenseItem',{
					item:newValue,
					index:this.index
				})
			},
			showModel(event){
				if(event.currentTarget.dataset.target=='expenseBottomModal'){
					this.getExpenseList()
				}
				if(event.currentTarget.dataset.target=='delModel'){
					uni.showModal({
						content:'确定要删除?',
						success: (res) => {
							if(res.confirm){
								this.delIndex()
							}
						}
					})
				}
				this.modelName=event.currentTarget.dataset.target
				
			},
			hideModel(){
				this.modelName=null;
			},
			getDate(type) {
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			},
			DateChange(event){ 
				 const option = {
				 	occdate:event.target.value
				 }
				 this.updateItem(option)
			},
			delIndex() {
				this.$emit('deleteIndex', this.index)
			},
			async getExpenseList(){
				this.picker = await ConstantsApi()
			}
		},
 		
 		created(){
			this.getExpenseList()
 			
 		},
 	}
 </script>
 <style scoped>
 		.repay-container{
 			padding:0 40upx 0 28upx;
 		} 
 		.repay-container>view:first-child{
 			height:100upx;
 			line-height:100upx;
 			font-size:32upx;
 			color:#2A2A2A;
 			font-weight: bold;
 			
 		}
 		.text-area{
 			padding-top:36upx;
 			padding-left:24upx;
 			background-color: #fff;
 			padding-bottom:40upx;
 		}
 		.text-area>view:first-child{
 			margin-bottom:24upx;
 		}
 		.text-area textarea{
 			width:95%;
 			background:rgba(247,247,247,1);
 			border-radius:4px;
 			padding-top:20upx;
 			padding-left:30upx;
 			max-height:180upx;
 		}
		.brand-list-item{
			height:55px;
			line-height:55px;
			padding:0 15px 0 21px;
		}
 </style>