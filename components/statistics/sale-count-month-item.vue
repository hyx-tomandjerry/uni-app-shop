<template>
	<view class="month-list-item flex align-center" :class="{'bg-color-normal':index%2==0}" @tap="checkMonthItem" hover-class="bg-color-active">
		<view class="u-f-ajc flex-1 ">
			<template v-if="type=='month'">
				<view>{{month.id}}</view>
			</template>
			<template v-else-if="type=='day'">
				<view>{{index+1}}</view>
			</template>
			<template v-else-if="type=='sale'">
				<view>{{month.name}}</view>
			</template>
		</view>
		<view class="u-f-ajc flex-1 " v-if="type!='sale'">{{month.aim | numStyle }}</view>
		<view class="u-f-ajc flex-1 color-blue font-weight-bold ">{{month.num | numStyle}}</view>
		<view class="u-f-ajc flex-1">{{month.pre}}%</view>
	</view>
</template>
<script>
	export default{
		props:{
			month:Object,
			index:Number,
			type:String
		},
		methods:{
			checkMonthItem(){
				this.$emit('checkMonthItem',this.month)
			}
		}
	}
</script>
<style scoped>
	.month-list-item{
		height:80upx;
		line-height:80upx;
		font-family:PingFangSC-Regular,PingFang SC;
	}	
</style>


<!-- <template>
	<view class="month-list-item flex justify-between align-center"  @tap="checkMonthItem">
		<view class="month-tag">{{index+1}}月</view>
		<view class="month-info flex-1">
			<view class="flex justify-between">
				<view class="flex-1">目标:{{month.aim || 0}}</view>
				<view  class="flex-1">销售额:{{month.num || 0}}</view>
				<view style="color:#D84411"  class="flex-1">完成度:{{month.pre}}%</view>
			</view>
			<view class="cu-progress round sm striped active" >
				<view class="bg-yellow"
						:class="{
	
							'bg-color-blue':(index+1)%2==0,
							'bg-color-orange':(index+1)%3==0,
							'bg-color-red':(index+1)%5==0,
							'bg-color-purple':(index+1)%7==0
						}"
						:style="[{'width':month.pre+'%'}]"></view>

			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			month:Object,
			index:Number
		},
		methods:{
			checkMonthItem(){
				this.$emit('checkMonthItem',this.month)
			}
		}
	}
</script>

<style scoped>
	.month-list-item{
		margin-bottom: 27px;
	}
	.month-tag{
		font-size:16px;
		width: 38px;
		height: 38px;
		line-height:38px;
		text-align: center;
		color:#fff;
		background:rgba(61,66,97,1);
		border-radius:50%;
		margin-right:12px;
	}
</style>
 -->