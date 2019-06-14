<template>
	<view class="lx-empty">
		<view class="lx-empty-image">
			<img src="../static/img/noticeNo.png" alt="empty">
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
				width: 60%;
			}
		}
		&-description{
			width: 100%;
			text-align: center;
			margin: 0;
		}
	}
</style>
