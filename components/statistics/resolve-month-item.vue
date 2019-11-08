<template>
    <view class="month-list-item animated fadeInLeft fast margin-bottom-normal" @tap="checkItem">
		<template v-if="item.id==12">
			<!-- 12月份不能编辑 -->
			<view class="month-tag">{{item.name}}</view>
			<view class="month-content">
			    <view class="month-content-t">
			        <view class="month-top-l flex justify-start font-size-litter">
			            <view><text class="font-weight-bold ">目标:</text><text class=" font-weight-bold color-red">{{item.mon | numStyle}}元</text></view>
			            <view><text>比例:</text><text>{{item.pre}}%</text></view>
			        </view>
			        <view class="month-top-r">
			            <!-- <image src="../../../../../static/img/work/statistics/edit.png" mode="widthFix" lazy-load></image> -->
			        </view>
			    </view>
			    <view class="cu-progress round  striped active xs" >
			        <view class="bg-color-red" :style="[{'width':`${item.pre}%`}]" ></view>
			    </view>
			</view>
		</template>
		<template v-else>
			<view class="month-tag">{{item.name}}</view>
			<view class="month-content">
			    <view class="month-content-t">
			        <view class="month-top-l flex justify-start font-size-litter">
			            <view><text class="font-weight-bold ">目标:</text><text class=" font-weight-bold color-red">{{item.mon | numStyle}}元</text></view>
			            <view><text>比例:</text><text>{{item.pre}}%</text></view>
			        </view>
			        <view class="month-top-r" v-show="(year==shopBgnYear && item.id>=shopBgndate) || year>shopBgnYear" @tap.stop="editAim">
			            <image src="../../../../../static/img/work/statistics/edit.png" mode="widthFix" lazy-load></image>
			        </view>
			    </view>
			    <view class="cu-progress round  striped active xs" >
			        <view class="bg-color-red" :style="[{'width':`${item.pre}%`}]" ></view>
			    </view>
			</view>
		</template>
       
    </view>
</template>

<script>
    export  default {
		data(){
			return{
				year:new Date().getFullYear()
			}
		},
        props:{
			show:Boolean,
			item:Object,
			index:Number,
			shopBgnYear:Number,//开始日期的年份
			shopBgndate:Number,//开始日期的月份
		},
		methods:{
			editAim(){
				if(this.item.id==12){
					return
				}
				//如果当前时间在开业日期之后
				let stringTime=`${new Date().getFullYear()}-${this.item.id}-1`;//2019-12-01当前年月
				//如果当前时间在开业日期之前
				if(this.year==this.shopBgnYear){
					//如果当前年份相等
					if(this.item.id<this.shopBgndate){
						uni.showToast({
							title:'门店还未开业，无绩效可修改',
							icon:'none'
						})
					}else{
						this.$emit('editAim',this.item)
						// this.monthTabCur=item;
						// this.monthTabID=item.id;
						// this.num=this.monthTabCur.mon
						// setTimeout(()=>{
						// 	this.modalName='Modal';
						// },600)
					}
				}else if(this.year>this.shopBgnYear){
					this.$emit('editAim',this.item)
					// this.monthTabCur=item;
					// this.monthTabID=item.id;
					// this.num=this.monthTabCur.mon
					// setTimeout(()=>{
					// 	this.modalName='Modal';
					// },600)
				}
				
			},
			checkItem(){
				console.log(this.item,this.shopBgndate)
				if(new Date().getFullYear()<this.shopBgnYear || (new Date().getFullYear()==this.shopBgnYear && this.item.id<this.shopBgndate)){
					//如果当前年小于开业日期
					uni.showToast({
						title:'月份在门店未开业之前，不可设置',
						icon:'none'
					})
				}else if(this.item.mon<=0){
					//没有设置绩效目标
					uni.showToast({
						title:'还没有设置绩效目标，不可以进行分解',
						icon:'none'
					})
				}else{
					this.$emit('checkItem',this.item)
				}
				
			}
		}
    }
</script>

<style scoped>
    .month-list-item{
        background-color: #fff;
        padding:24upx 20upx;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .month-tag{
        width:70upx;
        height:70upx;
        line-height:70upx;
        text-align: center;
        font-size:24upx;
        color:#fff;
        border-radius:100%;
        background:rgba(66,176,237,1);
    }
    .month-content{
        padding-left:16upx;
        flex:1;
    }
    .month-content-t{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .month-top-l>view:first-child{
        margin-right:10upx;
    }
    .month-top-r>image{
        width:36upx;
        height:32upx;
        flex-shrink: 1;
    }
</style>
