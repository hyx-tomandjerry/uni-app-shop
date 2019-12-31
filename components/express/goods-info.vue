<template>
	<view class="cu-modal bottom-modal" :class="isShow?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white">
				<view class="action text-green"></view>
				<view class="font-size-big color-normal">包裹信息</view>
				<view class="action text-blue font-size-normal" @tap="hideModal">确定</view>
			</view>
			<view class="padding-xl borderTop bg-white">
				<view class="goods-info-item flex justify-between" >
					<view class="font-size-big color-normal">体积</view>
					<view class="flex justify-start">
						<view class="num-tab " @click="goodsNumOperate('square','minus')">-</view>
						<view style="background:#F5F5F5;padding:3px 12px;margin:0 9px;" class="font-size-normal color-normal">
							{{goods.square}}m³
						</view>
	
						<view class="num-tab " @click="goodsNumOperate('square','add')">+</view>
					</view>
				</view>
				<view class=" flex justify-between" >
					<view class="font-size-big color-normal">重量</view>
					<view  class="flex justify-start">
						<view class="num-tab " @click="goodsNumOperate('weight','minus')">-</view>
						<view style="background:#F5F5F5;padding:3px 12px;margin:0 9px;" class="font-size-normal color-normal">
							{{goods.weight}}kg
	
						</view>
						<view class="num-tab " @click="goodsNumOperate('weight','add')">+</view>
					</view>
				</view>
				<view class="font-size-mini color-placeholder text-left" style="white-space: nowrap;margin-bottom:14px;">
					(注：重量以快递员称重为准，快件“虚胖”要按体积收费哦～)
				</view>
				<view>
					<view class="font-size-big color-normal text-left" style="margin-bottom:10px;">物品类型</view>
					<view class="flex justify-around" style="margin-bottom:17px;" >
						<view class="goods-type" v-for="(item,index) in goodType" :key="index"
							  :class="{'bg-blue':goodsTypeTabCur==item.value,'text-white':goodsTypeTabCur==item.value}"
							  @click="chooseItemOperate('goodsType',item)">
							{{item.name}}
						</view>
					</view>
				</view>
				<view>
					<view class="font-size-big color-normal text-left" style="margin-bottom:10px;">备注</view>
					<view class="flex justify-around" style="margin-bottom:17px;">
						<view class="goods-type" v-for="(item,index) in goodSummary" :key="index" :class="{
							'bg-blue':goodSummaryTabCur==item.value,
							'text-white':goodSummaryTabCur==item.value
						}"  @click="chooseItemOperate('summary',item)">
							{{item.name}}
						</view>
					</view>
				</view>
	
				<view class="position_relative">
					<textarea  cols="30" rows="10" v-model="goods.summary" placeholder="请输入包裹备注信息" maxlength="100"
						class="goods-summary text-left"
					></textarea>
	
					<view style="position:absolute;right:10px;bottom:10px;"><text class="text-blue">{{goods.summary.length}}</text>/100</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				goods:{
					weight:1,
					summary:'',
					square:1,
				},
				goodType:[
					{name:'衣物',value:1},
					{name:'文件',value:2},
					{name:'数码产品',value:3},
					{name:'其他',value:4},
				],
				goodsTypeTabCur:1,//包裹类型
				goodsTypeValue:'衣物',//包裹类型
				goodSummaryTabCur:0,//包裹备注
				goodSummaryValue:'',//包裹备注
				goodSummary:[
					{name:'带防水袋',value:1},
					{name:'带文件封',value:2},
					{name:'带纸箱',value:3},
					{name:'上门请联系',value:4},
				],
			}
		},
		props:{
			isShow:Boolean
		},
		methods:{
			chooseItemOperate(type,item){
				let arr=[];
				switch(type){
					case 'goodsType':
						this.goodsTypeTabCur=item.value;
						this.goodsTypeValue=item.name;
						break;
					case 'summary':
						this.goodSummaryTabCur=item.value;
						this.goodSummaryValue=item.name;
						if(this.goods.summary.indexOf(item.name)!=-1) return;
						this.goods.summary=`${this.goods.summary} ${this.goodSummaryValue}`
				}
			
			},
			hideModal(){
				let obj={
					weight:this.goods.weight,
					square:this.goods.square,
					goodsType:this.goodsTypeValue,
					goodSummary:this.goods.summary
				}
				this.$emit('hideModal',obj)
				},
			goodsNumOperate(type,operate){
				switch(type){
					case 'square':
						if(operate=='minus'){
							if(this.goods.square>1){
								this.goods.square--
							}
						}else if(operate=='add'){
							this.goods.square++;
						}
						break;
					case 'weight':
						if(operate=='minus'){
							if(this.goods.weight>1){
								this.goods.weight--
							}
						}else if(operate=='add'){
							this.goods.weight++;
						}
						break;
				}
			
			}
		}
	}
</script>

<style scoped>
	.goods-info-item{
		margin-bottom: 36upx;
	}
	.num-tab{
		display: inline-block;width:24px;height:24px;border-radius: 50%;text-align: center;
		font-size:24px;
		line-height:20px;
	}
	.tab-add{
		background:#EEEEED;color:#2A2A2A;
	}
	.tab-minus{
		background:#42B0ED;color:#fff;
	}
	.goods-type{
		border-radius:14px;
		border:1px solid rgba(216,216,216,1);width:24%;padding:4px 0;text-align: center;
	}
	.goods-summary{
		background:rgba(247,247,247,1);
		border-radius:8px;
		width:100%;
		max-height:103px;
		padding-left:10px;
		padding-top:10px;
		font-size:12px;
	}
</style>
