<template>
	<view>
		<template v-if="type=='normal'">
			<view class="cu-form-group font-size-normal borderBottom" @tap="checkItem">
			    <view class=" flex-sm  color-normal" >
			        <text class="text-red" v-show="isRed">*</text>
			        <text :class="{'color-regular':isLeftCb}">{{leftContent}}</text>
			    </view>
			   <view class="flex-1 text-ellipse text-right" 
				:class="{'color-blue':isColorBlue}">{{rightContent}}</view>
			</view>
		</template>
		<template v-if="type=='navigate'" >
			<view class="cu-form-group borderBottom"  @tap="operateItem" :data-target="dataTarget"> 
			    <view class="font-size-normal color-normal " >
			        <text class="text-red" v-show="isRed">*</text>
			        <text :class="{'color-regular':isLeftCb}">{{leftContent}}</text>
			    </view>
			    <view>
			        <text class=" font-size-normal" :class="{'color-blue':isColorBlue}">{{rightContent}}</text>
			        <text class="cuIcon-right color-normal font-size-big color-regular"></text>
			    </view>
			</view>
		</template>
		<template v-if="type=='job'">
			<view class="cu-form-group borderBottom">
				<view class="font-size-normal color-normal ">职位</view>
				<view class="font-size-normal">
					<template v-if="clerkTab==1">
						{{shopItem.manager==clerkItem.id?'店长':'店员'}}
					</template>
					<template v-else>
						{{shopItem.zoneName || ''}}区域人员
					</template>
				</view>
			</view>
		</template>
		<template v-if="type=='service'">
			<view class="cu-form-group font-size-normal borderBottom align-center">
			    <view class=" flex-sm  color-normal align-center" >
			        <image :src="src" mode="widthFix" class="icon-img"></image>
			        <text :class="{'color-regular':isLeftCb}">{{leftContent}}</text>
			    </view>
			   <view class="flex-1 text-ellipse text-right color-regular" 
				:class="{'color-blue':isColorBlue ,'color-red':isColorRed}">{{rightContent}}</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default{
		props:{
			leftContent:String,
			rightContent:[String,Number],
			isRed:{type:Boolean,default:true},
			type:{
				type:String,
				default:'normal'
			},
			isColorBlue:Boolean,
			shopItem:Object,
			clerkItem:Object,
			isLeftCb:Boolean,
			dataTarget:String,
			clerkTab:[Number,String],
			src:String,
			isColorRed:Boolean
		},
		methods:{
			operateItem(){
				if(this.dataTarget){
					this.$emit('operateItem',this.dataTarget)
				}else{
					this.$emit('operateItem')
				}
				
			},
			checkItem(){
				this.$emit('checkItem')
			}
		}
	}
</script>

<style scoped>
	.icon-img{
		width:36upx;
		height:36upx;
		margin-right:30upx;
		flex-shrink: 0;
	}
</style>
