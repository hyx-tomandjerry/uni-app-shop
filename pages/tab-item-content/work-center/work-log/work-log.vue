<template>
	<view>
		<view class="work-item" @click="itemDetail()">
			<view class="user flex justify-start">
				<image src="../../../../static/img/avatar.jpg" style="width:45px;height:45px;margin-right:13px;vertical-align: middle;"></image>
				<view class="user-info">
					<view  style="margin-bottom:1px;">
						<text class="user-name">TomAndJerry</text>
					</view>
					<view class="work-date"><text style="margin-right:10px">2019/03/20</text>18:00</view>
				</view>
			</view>
			<view class="work-content">
				<text class="user-name">今日工作设计工作日志界面完成，banner图设计完成 完成设计流程，完成h5界面。</text>
			</view>
			<view class="work-tag">
				<text class="tag-name">工作日志</text>
			</view>
		</view>

		<image src="../../../../static/icon/add.png"
		style="position:fixed;right:12px;bottom:45px;width:68px;height:68px;z-index:100;" @click.stop="createWork()"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:0,
				list:[]
			}
		},
        onLoad(){
			this.getList()
        },
		methods: {
			//新建
			createWork(event){
				uni.navigateTo({
					url:'../create-log/create-log'
				})
			},
			//查看详情
			itemDetail(event){
				uni.navigateTo({
					url:'../log-detail/log-detail'
				})
			},
			//获取列表数据
			getList(){
			    this.$ajax('WorkReportsByShop',{
                     zone:-1,
					 brand:0,
					 offset:this.$utils.getOffset(this.page)
				},res=>{
					 this.list = res;
				})
			}
		}
	}
</script>

<style lang="less">
	.work-item{
		margin:13px 10px 0;
		border-radius:10px;
		padding:18px 12px 13px 17px;
		background: #fff;
	}
	.user-info{
		margin-top:4px;
		margin-bottom:8px;
		.user-name{
			font-size:15px;
			font-family:PingFangSC-Medium;
			font-weight:500;
			color:rgba(42,42,42,1);
		}
		.work-date{
			font-size:13px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(164,164,164,1);
		}
	}
	.work-content{
		margin-bottom:8px;
	}
	.work-tag{
		width:67px;
		padding:2px 8px 3px 9px;
		background:rgba(246,238,253,1);
		.tag-name{
			font-size:10px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(42,42,42,1);
		}
	}
</style>
