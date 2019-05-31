<template>
	<view>
		<view class="content">
			<view class="nav">
				<view class="nav-left">
					<scroll-view scroll-y :style="'height:'+height+'px'">
						<view class="nav-left-item" @click="categoryClickMain(item,index)"
						 :key="index" :class="index==categoryActive?'active':''" v-for="(item,index) in categoryList">
							{{item.name}}
						</view>
					</scroll-view>
				</view>
				<view class="nav-right">
					<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll"
					:style="'height:'+height+'px'" scroll-with-animation >
						<view >
							<uni-tag
								@click="categoryClickSub(item,index)"
								class="nav-right-item"
								 :text='item.name'
								style="border:1px solid #EEEEED;border-radius:14px;text-align:center;width:40%;line-height:17px;"
								:class="index==categorySubActive?'subActive':''"
								v-for="(item,index) in subCategoryList" :key="index">
							</uni-tag>
						</view>
					</scroll-view>

				</view>
			</view>
		</view>
		<view class="choseBtn" @click="choseCategory()">确定</view>
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
				categorySubActive:10000,
				scrollTop:0,
				scrollHeight:0,
				categoryObj:{
					id:'',
					name:''
				},
				list:[]

			}
		},
		components: {
			uniTag
		},
		methods:{
			goBack(){
				uni.reLaunch({
					url:'../record-shop/record-shop?bigID='+this.repairObj.bigID+'&bigName='+this.repairObj.bigName+"&subID="+this.repairObj.subID+"&subName="+this.repairObj.subName
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
				this.categoryObj={
					id:categroy.obj.id,
					name:categroy.name
				}



			},
			categoryClickSub(categroy, index) {
				this.categorySubActive = index;
				this.scrollTop = -this.scrollHeight*index;
				this.categoryObj={
					id:categroy.obj.id,
					name:categroy.name
				}

			},
			getCategory() {
				var _this=this;
				this.$ajax('Constants',{
					type:this.$store.state.constants.brand_type,
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
					this.categoryObj.id=this.categoryList[0].obj.id;
					this.categoryObj.name=this.categoryList[0].name;
				})
				// uni.request({
				// 	url:this.$store.state.url+'Constants',
				// 	data:{
				// 		owner:8,
				// 		type:this.$store.state.constants.brand_type,
				// 		parent:-1,
				// 		objects:1
				// 	},
// 					success: (res) => {
// 						this.list=res.data.data
// 						var bigArray=[],subArray=[];
// 						res.data.data.forEach(item=>{
// 							if(item.parent==0){
// 								bigArray.push(item)
// 							}else{
// 								subArray.push(item);
// 							}
// 						})
// 						for(var i=0;i<bigArray.length;i++){
// 							var subList = [];
// 							for(var j=0;j<subArray.length;j++){
// 								if(subArray[j].parent==bigArray[i].id){
// 									subList.push({"name":subArray[j].val,obj:subArray[j]})
// 								}
// 							}
// 							this.categoryList.push({"name":bigArray[i].val,"subCategoryList":subList,obj:bigArray[i]})
// 						}
// 						this.subCategoryList = this.categoryList[0].subCategoryList;
// 						this.categoryObj.id=this.categoryList[0].obj.id;
// 						this.categoryObj.name=this.categoryList[0].name;
// 
// 					}
// 				})

			},
			choseCategory(){
				console.log(this.categoryObj);
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						this.$fire.fire('category',this.categoryObj)
					}
				})
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

