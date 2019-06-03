<template>
	<view>
		<view class="content">
			<view class="nav">
				<view class="nav-left">
					<scroll-view scroll-y :style="'height:'+height+'px'">
						<view class="nav-left-item " @click="categoryClickMain(item,index)"
						 :key="index" :class="index==categoryActive?'active':''" v-for="(item,index) in categoryList">
							{{item.name}}
						</view>
					</scroll-view>
				</view>
				<view class="nav-right">
					<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll"
					:style="'height:'+height+'px'" scroll-with-animation >
						<uni-tag 
						@click="categoryClickSub(item,index)"
						:text="item.name"
						 class="nav-right-item "
						 style="text-align:center;width:55%;line-height:17px;"
						:class="index==categorySubActive?'subActive':''"
						 v-for="(item,index) in subCategoryList" :key="index">
							{{item.name}}
						</uni-tag>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="choseBtn" @click="choseRepair()">确定</view>
	</view>
</template>

<script>
	import uniTag from '../../../../components/uni/uni-tag/uni-tag.vue'
	export default {
		data(){
			return{
				categoryList:[],
				subCategoryList: [],
				height:0,
				categoryActive:0,
				categorySubActive:1000,
				scrollTop:0,
				scrollHeight:0,
				repairObj:{
					bigID:'',//第一级的id
					subID:'',//第二季的id
					bigName:'',
					subName:''
				},
				list:[]

			}
		},
		components:{
			uniTag
		},
		methods:{
			choseRepair(){
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						this.$fire.fire('repair',this.repairObj)
					}
				})
			},
			scroll(e){
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(categroy, index) {
				this.categoryActive = index;
				this.categorySubActive=1000;//右边默认为第一个
				this.subCategoryList = categroy.subCategoryList;
				this.scrollTop = -this.scrollHeight*index;
				this.repairObj={
					bigName:categroy.obj.val,
					bigID:categroy.obj.id,
					subID:'',
					subName:''
				}
				// console.log(this.repairObj)



			},
			categoryClickSub(categroy, index) {
				this.categorySubActive = index;
				this.scrollTop = -this.scrollHeight*index;
				this.repairObj={
					bigName:this.repairObj.bigName,
					bigID:this.repairObj.bigID,
					subID:categroy.obj.id,
					subName:categroy.obj.val
				}
			},
			getCategory() {
				var _this=this;
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						this.$ajax('Constants',{
							owner:res.data.owner,
							type:this.$store.state.constants.repair_type,
							parent:-1,
							objects:1
						},res=>{
							this.list=res;
							var bigArray=[],subArray=[];
							res.forEach(item=>{
								if(item.parent==0){
									bigArray.push(item)
								}else{
									subArray.push(item);
								}
							})
							this.repairObj.subID=subArray[0].id;
							for(var i=0;i<bigArray.length;i++){
								var subList = [];
								for(var j=0;j<subArray.length;j++){
									if(subArray[j].parent==bigArray[i].id){
										subList.push({"name":subArray[j].val,obj:subArray[j]})
									}
								}
								this.categoryList.push({"name":bigArray[i].val,"subCategoryList":subList,obj:bigArray[i]})
							}
							this.subCategoryList = this.categoryList[0].subCategoryList;
							this.repairObj={
								bigName:this.categoryList[0].obj.val,
								bigID:this.categoryList[0].obj.id,
								subID:'',
								subName:''
							}
						})
					}
				})
				// uni.request({
				// 	url:this.$store.state.url+'Constants',
				// 	data:{
				// 		owner:18,
				// 		type:this.$store.state.constants.repair_type,
				// 		parent:-1,
				// 		objects:1
				// 	},
				// 	success: (res) => {
				// 		this.list=res.data.data
				// 		var bigArray=[],subArray=[];
				// 		res.data.data.forEach(item=>{
				// 			if(item.parent==0){
				// 				bigArray.push(item)
				// 			}else{
				// 				subArray.push(item);
				// 			}
				// 		})
				// 		this.repairObj.subID=subArray[0].id;
				// 		for(var i=0;i<bigArray.length;i++){
				// 			var subList = [];
				// 			for(var j=0;j<subArray.length;j++){
				// 				if(subArray[j].parent==bigArray[i].id){
				// 					subList.push({"name":subArray[j].val,obj:subArray[j]})
				// 				}
				// 			}
				// 			this.categoryList.push({"name":bigArray[i].val,"subCategoryList":subList,obj:bigArray[i]})
				// 		}
				// 		this.subCategoryList = this.categoryList[0].subCategoryList;
				// 		
				// 		this.repairObj={
				// 			bigName:this.categoryList[0].obj.val,
				// 			bigID:this.categoryList[0].obj.id,
				// 			subID:'',
				// 			subName:''
				// 		}
				// 		
				// 	}
				// })

			}
		},
		onLoad:function(){
			this.getCategory()
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
		padding-top:30px;
		border-right:0.5px solid rgba(255,255,255,1);
	}
	.nav-left-item {
		height: 21px;
		line-height:21px;
		padding:17px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:13px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1);
	}
	.nav-right {
		width: 70%;
		padding-left:20px;
		padding-top: 22px;
	}
	.nav-right-item {
		width: 100%;
		float: left;
		margin: 10px;
		text-align: left;
		padding: 7px;
		font-size:13px;
		border-radius: 14px !important;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1);
	}
	.active {
		background: rgba(66,176,237,1);
		border-right:1px solid rgba(66,176,237,1);
	}
	.subActive{
		background: rgba(66,176,237,1);
		border-bottom:1px solid rgba(66,176,237,1);
	}
	.padding {
		height: var(--status-bar-height);
		width: 100%;
		top: 0;
		position: fixed;
		background-color: #F24544;
	}
	.content {
		width: 100%;
	}
	.noPadding{
		padding-top:0;
	}
	.choseBtn{
		position:absolute;
		right:20px;bottom:50px;padding: 3px 18px;
		color: #fff;
		background: deepskyblue;
		border-radius: 15px
	}
</style>
