<template>
	<view class="borderTop">
		<view class="content">
			<view class="nav">
				<view class="nav-left">
					<scroll-view scroll-y :style="'height:'+height+'px'">
						<view class="nav-left-item "
							  @click="leftNavSelect(item)"
							  :key="index"
							  :class="item.id==leftNavTabCur?'active':''"
							  v-for="(item,index) in repairTypeArray">
							{{item.name}}
						</view>
					</scroll-view>
				</view>
				<view class="nav-right">
					<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll"
								 :style="'height:'+height+'px'" scroll-with-animation >
						<uni-tag
								@click="rightNavSelect(item)"
								:text="item.name"
								class="nav-right-item "
								:class="{'subActive':rightNavTabCur==item.id}"
								style="text-align:center;width:55%;line-height:17px;"
								v-for="(item,index) in rightNavList" :key="index">
							{{item.name}}
						</uni-tag>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniTag from '../../../../components/uni/uni-tag/uni-tag.vue'
	import {ServiceCatalogsApi} from '../../../../api/common_api.js'
	export default {
		computed:{
			repairTypeArray(){return this.config.repairTypeArray},
		},
		components:{uniTag},
		data(){
			return{

				rightNavList: [],
				height:0,
				// categoryActive:0,
				// categorySubActive:1000,
				leftNavTabCur:2,
				rightNavTabCur:0,
				rightNav:'',
				scrollTop:0,
				scrollHeight:0,
				leftNavItem:''
				// repairObj:{
				// 	bigID:'',//第一级的id
				// 	subID:'',//第二季的id
				// 	bigName:'',
				// 	subName:''
				// },
				// list:[]

			}
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				this.chooseRepairItem()
			}
		},
		methods:{
			leftNavSelect(item){
				this.leftNavTabCur=item.id;
				this.leftNavItem=item;
				setTimeout(()=>{
					uni.hideLoading()
				},600)
				
				this.getRepairList(item.id)
			},
			async getRepairList(id){
				let result = await  ServiceCatalogsApi();
				this.rightNavList =result.filter(item=>item.catalog ==id)

			},
			rightNavSelect(item){
				this.rightNavTabCur=item.id;
				this.rightNav=item;
			},
			goBack(){
				uni.navigateBack({
					delta:1,
					success:()=>{
						this.$fire.fire('repair',{
							bigID:this.leftNavItem.id?this.leftNavItem.id:this.repairTypeArray[0].id,
							bigName:this.leftNavItem.name?this.leftNavItem.name:this.repairTypeArray[0].name,
							subID:this.rightNav.id?this.rightNav.id:'',
							subName:this.rightNav.name?this.rightNav.name:''
						})
					}
				})

			},
			chooseRepairItem(){
				uni.navigateBack({
					delta:1,
					success:()=>{
						this.$fire.fire('repair',{
							bigID:this.leftNavItem.id?this.leftNavItem.id:this.repairTypeArray[0].id,
							bigName:this.leftNavItem.name?this.leftNavItem.name:this.repairTypeArray[0].name,
							subID:this.rightNav.id?this.rightNav.id:'',
							subName:this.rightNav.name?this.rightNav.name:''
						})
					}
				})
			},
			scroll(e){
				this.scrollHeight = e.detail.scrollHeight;
			},
		},
		onPullDownRefresh(){
			//下拉刷新
			setTimeout(()=>{
				uni.stopPullDownRefresh();
				this.getRepairList(this.leftNavTabCur);
			},800)

		},
		onLoad(){
			this.getRepairList(this.leftNavTabCur);
			uni.getSystemInfo({
				success: res => {
					this.height = res.screenHeight;
				}
			})
		}
	}
</script>

<style lang="less">

	.nav {
		display: flex;
		width: 100%;
		background:#fff;
	}
	.nav-left {
		width: 30%;
		background:rgba(247,247,247,1);
		border-right:1upx solid rgba(255,255,255,1);
	}
	.nav-left-item {
		padding:38upx 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:15px;
		color:rgba(42,42,42,1);
	}
	.nav-right {
		width: 70%;
		padding-left:40upx;
		padding-top: 44upx;
	}
	.nav-right-item {
		background:rgba(247,247,247,1);
		border-radius:8upx;
		width: 100%;
		float: left;
		margin: 20upx;
		text-align: left;
		padding: 14upx;
		color:rgba(42,42,42,1);
	}
	.active {
		background:#fff;
		font-weight:600;
		color:rgba(66,176,237,1);
		border-left:1px solid rgba(66,176,237,1);
	}
	.subActive{
		color:#fff;
		background:rgba(66,176,237,1);
		border-radius:4px;
	}
	.content {
		width: 100%;
	}
	
</style>
