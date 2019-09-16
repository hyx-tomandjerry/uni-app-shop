<template>
	<view class="lx-empty position_absolute " style="bottom:30%;left:50%; transform: translate(-50%, -50%);">
		<view class="lx-empty-image ">
			<img src="../static/img/noticeNo.png" alt="empty"  style="width:125px;height:93px;">
		</view>
		<view class="lx-empty-description">
			<!--<slot name="description" v-if=""></slot>-->
			<view v-if="lxNotFoundContent">
				{{lxNotFoundContent}}
			</view>
			<view v-else>
				暂无数据
			</view>
		</view>
		<view class="lx-empty-footer">
			<slot name="lxNotFoundFooter"></slot>
		</view>
	</view>
</template>

<script>
    export default {
        name: "LxEmpty",
		props:{
            lxNotFoundContent:{
                type: String,
                default:''
			}
		}
    }
</script>

<style scoped lang="less">
	page{
		background:#fff;
	}
	.lx-empty{
		display: block;
		padding: 0 8px;
		font-size: 14px;
		line-height: 22px;
		&-image{
			/*height: 100px;*/
			margin-bottom: 8px;
			width: 100%;
			text-align: center;
			image{
				width: 100%%;
			}
		}
		&-description{
			width: 100%;
			text-align: center;
			margin: 0;
		}
	}
</style>
