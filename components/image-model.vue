<template>
	<view>
		<view class="cu-modal" :class="isShow?'show':''" @click="hideModal()">
			<view class="cu-dialog">
				<view class="bg-img" :style="[{ backgroundImage:'url(' + url+ ')' }]" style="min-height:200px;">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="downImg()">
							<text class="cuIcon-down color-blue " style="font-size:20px;"></text>
						</view>
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
			},
			url:{
				type:String,
				default:''
			}
		},
		methods:{
			hideModal(){
				this.$emit('hideModal')
			},
			downImg(){
				this.$emit('downImg')
			}
		}
	}
</script>

<style>

</style>
