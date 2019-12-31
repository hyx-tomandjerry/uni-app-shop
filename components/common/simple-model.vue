<template>
	<view>
		<view class="cu-modal" :class="isShow?'show':''"  @click="hideModal()">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class=" content" style="font-size:12px;">
						<slot name="content"></slot>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			isShow:{
				type:[Boolean,String],
				default:''
			}
		},
		methods:{
			hideModal(){
				this.$emit('hideSimpleModel')
			}
		}
	}
</script>

<style>
	.cu-bar{
		min-height:35px;
	}
	
	
</style>
