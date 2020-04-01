<template>
	<view class="borderTop">
		<view class="protocol-container">
			<template v-if="type=='serve'">
				<serve-protocol />
			</template>
			<template v-else-if="type=='secret'">
				<user-protocol />
			</template>
			
		</view>
	</view>
	
</template>

<script>
	import serveProtocol from '../../all-item-content/protocol/serve-protocol.vue';
	import userProtocol from '../../all-item-content/protocol/user-protocol.vue'
	export default {
		components:{serveProtocol,userProtocol},
		data() {
			return {
				type:''
			}
		},
		methods: {
			
		},
		onLoad(options){
			this.type=options.type
		}
	}
</script>

<style lang="less" scoped>
	@import  url('../../../static/css/demo.less');
	
	.protocol-container{
		.mixPadding(0;10px;0;15px);
		.mixMarginBottom(13px);
		.background(#fff);
		.mixPaddingBottom(40px);
		
	}
</style>
