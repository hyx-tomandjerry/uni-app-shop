<!-- 本插件只是个框架,适用于地址数据要从后台逐级获取的需求 -->
<!-- 可对照注释根据业务需求更改 -->
<!-- 作者：qq315500033 -->


<template>
	<view>
		<!-- 选择地址展示 -->
		<view @tap="showAddress">
			<text v-if="coname" style="font-size:13px;">{{coname}} - {{ctname}} - {{csname}}</text>
			<text v-else class="cuIcon-right" style="font-size:20px;color:#898888"></text>
		</view>
		<!-- 选择地址模态框 -->
		<view class="jm-modal" :class="showFlag==true?'show1':''">
			<view class="dialog">
				<view class="showBox">
					<view class="content">选择地址</view>
					<!-- 关闭按钮 -->
					<view class="action" @tap="hideAddress">
						x
					</view>
				</view>
				<!-- 省份列表 -->
				<view class="addList">
					<view v-for="(item,index) in addressd1" :key='index' :class="{check:item.id==co}" @tap="clickAddress(1,item.id,item.name)">
						{{item.name}}
					</view>
				</view>
				<!-- 城市列表 -->
				<view class="addList">
					<view v-for="(item,index) in addressd2" :key='index' :class="{check:item.id==ct}" @tap="clickAddress(2,item.id,item.name)">
						{{item.name}}
					</view>
				</view>
				<!-- 地区列表 -->
				<view class="addList">
					<view v-for="(item,index) in addressd3" :key='index' :class="{check:item.id==cs}" @tap="clickAddress(3,item.id,item.name)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		data() {
			return {
				//模态框状态
				showFlag: false,
				// 省份列表
				addressd1: [],
				// 城市列表
				addressd2: [],
				// 地区列表
				addressd3: [],
				//省份id 默认为64，可根据想要默认展示的id自行更改
				co: '2672',
				//默认省份名称
				coname: '四川省',
				coObj:{},
				//城市id 默认为64，可根据想要默认展示的id自行更改
				ct: '2683',
				//默认城市名称
				ctname: '广元市',
				ctObj:{},
				//地区id 默认为575，可根据想要默认展示的id自行更改
				cs: '2689',
				//默认地区名称
				csname: '青川县',
				csObj:{}
			};
		},
		props: {
			//载入的标签数据
			addressd: Array
		},
		mounted() {
			_self = this;
			//默认获取省份列表
			this.getadd(1, 0);
			//默认获取城市列表
			this.getadd(2, this.co);
			//默认获取地区列表
			this.getadd(3, this.ct);
			// 声明默认地址,并传送给父组件
			this.emitData();

		},
		methods: {
			//呼出模态框
			showAddress() {
				// 呼出模态框
				this.showFlag = true
			},
			// 关闭模态框
			hideAddress() {
				// 关闭模态框
				this.showFlag = null;
				// 声明默认地址,并传送给父组件
				this.emitData();

			},
			// 声明默认地址,并传送给父组件
			emitData() {
				var data = {
					province: _self.coname,
					provinceID:_self.co,
					city: _self.ctname,
					cityID:_self.ct,
					district: _self.csname,
					districtID:_self.cs
				}
				_self.$emit("changes", data);
			},
			// 模态框地址点击赋值并获取下一级
			// --flag--- 1(省份点击);2(城市点击);3(地区点击)；
			// --id----(点击的地址id);
			// --name--(点击的地址名称);
			clickAddress(flag, id, name) {
				//判断点击的状态
				switch (flag) {
					case 1:
						_self.coname = name;
						_self.co = id;
						_self.getadd(2, id);
						break;
					case 2:
						_self.ctname = name;
						_self.ct = id;
						_self.getadd(3, id);
						break;
					case 3:
						_self.csname = name;
						_self.cs = id;
						_self.emitData();
						_self.hideAddress();
						break;
					default:
						return;
				}

			},
			
			
						getadd(flag, id) {
							uni.request({
								url: this.$store.state.url+'Districts', //仅为示例，并非真实接口地址。
								data: {
									parent: id,
									userId:49,
									owner:18
								},
								success: function(res) {
									switch (flag) {
										case 1:
											_self.addressd1 = res.data.data;
											
											break;
										case 2:
											_self.addressd2 = res.data.data;
											_self.ctname =res.data.data[0]?res.data.data[0].name:'';
											_self.ct =res.data.data[0]?res.data.data[0].id:1208;
											_self.getadd(3, _self.ct);
											break;
										case 3:
											_self.addressd3 =res.data.data;
											_self.csname = res.data.data[0]?res.data.data[0].name:'';
											_self.cs = res.data.data[0]?res.data.data[0].id:1220;
											break;
										default:
											return;
									}
								}
							})

					},
			
		}
	}

</script>

<style>
	.choice {
		background-color: #fff;
		padding: 20upx;
		font-size: 28upx;
	}

	.addList {
		height: 570upx;
		box-sizing: border-box;
		overflow-y: scroll;
		width: 31%;
		float: left;
		margin-left: 1%;
		margin-right: 1%;
		padding: 0;
		font-size: 28upx;
	}

	.addList view {
		height: 70upx;
		line-height: 70upx;
		font-size:13px;
	}

	.check {
		color: #fff;
		background-color:#0081ff;
	}

	.jm-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}

	.jm-modal::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}

	.show1 {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}

	.dialog {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 680upx;
		max-width: 100%;
		height: 700upx;
		background-color: #f8f8f8;
		border-radius: 10upx;
		overflow: hidden;
	}

	.action {
		position: absolute;
		right: 30upx;
	}

	.content {
		position: absolute;
		text-align: center;
		width: calc(100% - 340upx);
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		height: 60upx;
		font-size: 13px;
		line-height: 60upx;
		cursor: none;
		pointer-events: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.showBox {
		background-color: #fff;
		display: flex;
		position: relative;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}
</style>
