<template>
	<view>
		<view>
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<image src="../../../../static/icon/sousuo.png" style="width:17px;height:17px;margin-right:7px;margin-left:17px;"></image>
					<input  @blur="InputBlur($event)" :adjust-position="false" type="text" placeholder="搜索" confirm-type="search"></input>
					<image src="../../../../static/icon/guanbi.png" style="width:16px;height:16px;margin-right:8px;"></image>
				</view>
			</view>
			<view class="bg-white" style="padding-top:15px;padding-left:22px;padding-bottom:16px;">
				<image src="../../../../static/icon/weixuanze.png" 
				style="width:20px;height:20px;margin-right:19px;vertical-align: middle;"></image>
				<text class="all">全选</text>
			</view>
		</view>
		
		<scroll-view scroll-y="true" class="list margin-top-13 bg-white" style="height:450px;">
			<view class="list-item flex justify-start" style="line-height:42px;padding-top:11px;padding-bottom:11px;padding-left:22px;">
				<image src="../../../../static/icon/weixuanze.png"  class="img20"
				style="margin-right:19px;margin-top:10px;"></image>
				<image src="../../../../static/img/avatar.jpg" style="width:42px;height:42px;margin-right:18px;vertical-align: middle;"></image>
				<view style="width:70%;border-bottom:1px solid #EEEEED;">
					<text>TomAndJerry</text>
				</view>
			</view>
			
			<view class="list-item flex justify-start" style="line-height:42px;padding-top:11px;padding-bottom:11px;padding-left:22px;">
				<image src="../../../../static/icon/weixuanze.png"  class="img20"
				style="margin-right:19px;margin-top:10px;"></image>
				<image src="../../../../static/img/avatar.jpg" style="width:42px;height:42px;margin-right:18px;vertical-align: middle;"></image>
				<view style="width:70%;border-bottom:1px solid #EEEEED;">
					<text>TomAndJerry</text>
				</view>
			</view>
			<view class="list-item flex justify-start" style="line-height:42px;padding-top:11px;padding-bottom:11px;padding-left:22px;">
				<image src="../../../../static/icon/weixuanze.png"  class="img20"
				style="margin-right:19px;margin-top:10px;"></image>
				<image src="../../../../static/img/avatar.jpg" style="width:42px;height:42px;margin-right:18px;vertical-align: middle;"></image>
				<view style="width:70%;border-bottom:1px solid #EEEEED;">
					<text>TomAndJerry</text>
				</view>
			</view>
			<view class="list-item flex justify-start" style="line-height:42px;padding-top:11px;padding-bottom:11px;padding-left:22px;">
				<image src="../../../../static/icon/weixuanze.png"  class="img20"
				style="margin-right:19px;margin-top:10px;"></image>
				<image src="../../../../static/img/avatar.jpg" style="width:42px;height:42px;margin-right:18px;vertical-align: middle;"></image>
				<view style="width:70%;border-bottom:1px solid #EEEEED;">
					<text>TomAndJerry</text>
				</view>
			</view>
			<view class="list-item flex justify-start" style="line-height:42px;padding-top:11px;padding-bottom:11px;padding-left:22px;">
				<image src="../../../../static/icon/weixuanze.png"  class="img20"
				style="margin-right:19px;margin-top:10px;"></image>
				<image src="../../../../static/img/avatar.jpg" style="width:42px;height:42px;margin-right:18px;vertical-align: middle;"></image>
				<view style="width:70%;border-bottom:1px solid #EEEEED;">
					<text>TomAndJerry</text>
				</view>
			</view>
			
			<view class="list-item flex justify-start" style="line-height:42px;padding-top:11px;padding-bottom:11px;padding-left:22px;">
				<image src="../../../../static/icon/weixuanze.png"  class="img20"
				style="margin-right:19px;margin-top:10px;"></image>
				<image src="../../../../static/img/avatar.jpg" style="width:42px;height:42px;margin-right:18px;vertical-align: middle;"></image>
				<view style="width:70%;border-bottom:1px solid #EEEEED;">
					<text>TomAndJerry</text>
				</view>
			</view>
			
			<view class="list-item flex justify-start" style="line-height:42px;padding-top:11px;padding-bottom:11px;padding-left:22px;">
				<image src="../../../../static/icon/weixuanze.png"  class="img20"
				style="margin-right:19px;margin-top:10px;"></image>
				<image src="../../../../static/img/avatar.jpg" style="width:42px;height:42px;margin-right:18px;vertical-align: middle;"></image>
				<view>
					<text>TomAndJerry</text>
				</view>
			</view>
			
			<view class="list-item flex justify-start" style="line-height:42px;padding-top:11px;padding-bottom:11px;padding-left:22px;">
				<image src="../../../../static/icon/weixuanze.png"  class="img20"
				style="margin-right:19px;margin-top:10px;"></image>
				<image src="../../../../static/img/avatar.jpg" style="width:42px;height:42px;margin-right:18px;vertical-align: middle;"></image>
				<view style="width:70%;border-bottom:1px solid #EEEEED;">
					<text>TomAndJerry</text>
				</view>
			</view>
			
			<view class="list-item flex justify-start" style="line-height:42px;padding-top:11px;padding-bottom:11px;padding-left:22px;">
				<image src="../../../../static/icon/weixuanze.png"  class="img20"
				style="margin-right:19px;margin-top:10px;"></image>
				<image src="../../../../static/img/avatar.jpg" style="width:42px;height:42px;margin-right:18px;vertical-align: middle;"></image>
				<view style="width:70%;border-bottom:1px solid #EEEEED;">
					<text>TomAndJerry</text>
				</view>
			</view>
		</scroll-view>
		
		<view class="flex justify-between bg-white" style="padding:11px 12px 16px 22px;">
			<view><text>已选择:</text>{{num}}</view>
			<view>
				<button class="btn"
				 style="padding:0px 24px;background:rgba(66,176,237,1);border-radius:4px;">确定</button>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				num:0
			}
		},
		methods: {
			InputBlur(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="less">
.box {
		margin: 20upx 0;
	}

	.box view.cu-bar {
		margin-top: 20upx;
	}
	.all{
		font-size:15px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1);
	}
	.btn{
		font-size:12px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
</style>
