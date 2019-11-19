<template>
    <view class="month-list-item animated fadeInLeft fast margin-bottom-normal" @tap="checkItem">
		<template v-if="item.id==12">
			<!-- 12月份不能编辑 -->
			<view class="month-tag">{{item.name}}</view>
			<view class="month-content">
			    <view class="month-content-t">
			        <view class="month-top-l flex justify-start font-size-litter">
			            <view><text class="font-weight-bold ">目标:</text><text class=" font-weight-bold color-red">{{item.mon || 0 | numStyle}}元</text></view>
			            <view><text>比例:</text><text>{{item.pre}}%</text></view>
			        </view>
			        <view class="month-top-r">
			            <image src="../../../../../static/img/work/statistics/noedit.png" mode="widthFix" lazy-load></image>
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
			        <view class="month-top-r" v-show="item.id>=new Date().getMonth()+1" @tap.stop="editAim">
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
        props:{
			item:Object,
			index:Number
		},
		methods:{
			editAim(){
				if(this.item.id==12){
					return
				}
				if(this.item.id<new Date().getMonth()+1){
					uni.showToast({
						title:'门店还未开业或在当日之前，无绩效可修改',
						icon:'none'
					})
					
				}else{
					this.$emit('editAim',this.item)
				}
			},
			checkItem(){
				if(this.item.id<new Date().getMonth()+1){
					uni.showToast({
						title:'月份在门店未开业之前或在当日之前，不可设置',
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
