 <template>
 	<view>
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
 					'color-normal':student.xTypeName ,
 					'color-regular':!student.xTypeName 
 				}">{{student.xTypeName || '费用科目'}}</text>
 				<text class="cuIcon-right color-regular font-size-big"></text>
 			</view>
 		</view>
 		<view class="cu-form-group">
 			<view class="title"><text class="text-red">*</text>日期选择</view>
 			<picker mode="date" :value="student.occdate"  @change="DateChange">
 				<view class="picker">
 					{{student.occdate}}
 				</view>
 			</picker>
 		</view>
 		<view class="cu-form-group borderBottom">
 			<view class="title "><text class="color-red">*</text> 金额</view>
 			<view>
 				<input type="number" class="uni-input text-right"  placeholder="金额" v-model="student.amount" />
 			</view>	
 		</view>
 		<view class="text-area">
 			<view class="font-size-normal color-normal"><text class="color-red">*</text>摘要</view>
 			<textarea  placeholder="请输入摘要内容" v-model="student.detail"/>
 		</view>
		
		
		
		<showModel :isShow="modelName=='delModel'" @hideModal="hideModel" @confirmDel="delIndex">
			<block slot="content">确定要删除该报销明细?</block>
		</showModel>
		
		<!-- 费用弹出框 -->
		<view class="cu-modal bottom-modal" :class="modelName=='expenseBottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModel">取消</view>
					<view class="action text-green" @click="hideModel">确定</view>
				</view>
				<view >
					<block  v-for="(item,index) in picker" :key="index" >
						<scroll-view scroll-y="true" >
							<view class="brand-list-item" hover-class="bg-color-normal" @click="chooseExpenseItem(item)">
									{{item.val}}		
							</view>
						</scroll-view>
					</block>
					
				</view>
			</view>
		</view>
 	</view>
 </template>
 <script>
	 import showModel from './show-model.vue'
 	export default{
		components:{showModel},
		props:{
			index:{
				type:Number,
				required:true
			},
			items:{
				type:Array,
				default:Array
			},
			isSplice:Boolean
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
				modelName:'',
				student:{
					detail:'',
					xType:-1,
					occdate:currentDate,
					amount:'',
					xTypeName:'',
					
				}
 			}
 		},
		watch:{
			student:{
				handler(newV,oldV){
					this.$emit('uploadData',{index:this.index,data:newV})
				},
				deep:true
			},
			items:{
				handler(newV,oldV){
					if(newV.length!==0){
						newV.forEach((item,index)=>{
							if(item.isShow=='no'){
								newV.splice(index,1)
							}else{
								this.student = {...newV[this.index]}
							}
							
							
						})
						
					}
				},
				deep:true
			}
		},
		methods:{
			chooseExpenseItem(item){
				this.expenseItem=item;
				this.student.xType=item.id;
				this.student.xTypeName=item.val
				this.hideModel()
			},
			showModel(event){
				this.modelName=event.currentTarget.dataset.target
				
			},
			hideModel(){
				this.modelName=null;
			},
			//选择请假类型
			// PickerChange(e) {
			// 	console.log(e)
			// 	this.student.xType = e.detail.value;
			// },
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
				 this.student.occdate = event.target.value
			},
			delIndex() {
				this.$emit('deleteIndex', this.index)
			},
			getExpenseList(){
				this.$ajax('Constants',{
					objects:1,
					type:24,
					parent:-1
				},res=>{
					this.picker=res;
				})
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