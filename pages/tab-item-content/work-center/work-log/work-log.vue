<template>
	<view class="position_relative">
		<view v-if="list.length > 0">
			<view class="work-item" @click="itemDetail(item)" v-for="item in list">
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
					<text class="user-name ellipsis-2">{{item.summary}}</text>
				</view>
				<text class="tag-name">{{item.title}}</text>
			</view>

			<image src="../../../../static/icon/add.png"
				   style="position:fixed;right:12px;bottom:45px;width:68px;height:68px;z-index:100;" @click.stop="createWork()"></image>
		</view>
		<view class="empty-middle" v-else>
			<!--<lx-empty></lx-empty>-->
		</view>
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
					url:`../log-detail/log-detail?id=${event.id}`
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
	.empty-middle{
		position: absolute;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		top: 50%;
		width: 100%;
	}
	.ellipsis-2{
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
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
	.tag-name{
		display: inline-block;
		font-size:10px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1);
		padding:2px 8px;
		background:rgba(246,238,253,1);
		width: auto;
		max-width:100%;
	}
</style>
