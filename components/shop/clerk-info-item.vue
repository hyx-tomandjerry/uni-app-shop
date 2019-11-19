<template>
	<view class="clerk-info-item flex justify-between borderBottom">
		<template v-if="type=='job'">
			<view>职位</view>
			<view>
				<template v-if="shopItem.manager==clerkItem.id">
					{{shopItem.manager==clerkItem.id?'店长':'店员'}}
				</template>
				<template v-else-if="clerkItem.motto=='manager'">
					{{shopItem.zoneName || ''}}区域负责人
				</template>
			</view>
		</template>
		<template v-else>
			<view>{{intro}}</view>
			<view>{{content}}</view>
		</template>
	</view>
</template>

<script>
	export default{
		props:{
			type:{
				type:String,
				default:'normal'
			},
			intro:String,
			content:String,
			shopItem:Object,
			clerkItem:Object
		}
	}
</script>

<style scoped>
	.clerk-info-item{
		height:53px;
		line-height:53px;
		padding:0 15px;
	}
</style>
