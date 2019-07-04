<template>
	<view>
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
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['repairTypeZn','repairTypeArray','repairType']),
		data(){
			return{

				rightNavList: [],
				height:0,
				// categoryActive:0,
				// categorySubActive:1000,
				leftNavTabCur:2,
				rightNavTabCur:0,
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
		components:{
			uniTag
		},
		methods:{
			leftNavSelect(item){
				this.leftNavTabCur=item.id;
				this.leftNavItem=item;
				this.getRepairList(item.id)
			},
			getRepairList(id){
				this.rightNavList=[];
				this.$ajax('ServiceCatalogs',{},res=>{
					if(res){
						res.forEach(item=>{
							if(item.catalog==id){
								this.rightNavList.push(item);
							}
						})

					}
				})
			},
			rightNavSelect(item){
				this.rightNavTabCur=item.id;
				setTimeout(()=>{
					uni.navigateBack({
						delta:1,
						success:(res)=>{
							this.$fire.fire('repair',{
								bigID:this.leftNavItem.id?this.leftNavItem.id:this.repairTypeArray[0].id,
								bigName:this.leftNavItem.name?this.leftNavItem.name:this.repairTypeArray[0].name,
								subID:item.id,
								subName:item.name
							})
						}
					})
				},900)

			},
			goBack(){
				uni.navigateBack({
					delta:1,
				})
			},
			// choseRepair(){
			// 	uni.navigateBack({
			// 		delta:1,
			// 		success:(res)=>{
			// 			this.$fire.fire('repair',this.repairObj)
			// 		}
			// 	})
			// },
			scroll(e){
				this.scrollHeight = e.detail.scrollHeight;
			},
			// categoryClickMain(categroy, index) {
			// 	this.categoryActive = index;
			// 	this.categorySubActive=1000;//右边默认为第一个
			// 	this.subCategoryList = categroy.subCategoryList;
			// 	this.scrollTop = -this.scrollHeight*index;
			// 	this.repairObj={
			// 		bigName:categroy.obj.val,
			// 		bigID:categroy.obj.id,
			// 		subID:'',
			// 		subName:''
			// 	}
			//
			// },
			// categoryClickSub(categroy, index) {
			// 	this.categorySubActive = index;
			// 	this.scrollTop = -this.scrollHeight*index;
			// 	this.repairObj={
			// 		bigName:this.repairObj.bigName,
			// 		bigID:this.repairObj.bigID,
			// 		subID:categroy.obj.id,
			// 		subName:categroy.obj.val
			// 	}
			// },
			// getCategory() {
			// 	this.$ajax('ServiceCatalogs',{},res=>{
			// 		this.list=res;
			// 		var bigArray=[],subArray=[];
			// 		res.forEach(item=>{
			// 			if(item.parent==0){
			// 				bigArray.push(item)
			// 			}else{
			// 				subArray.push(item);
			// 			}
			// 		})
			// 		if(subArray[0]&& subArray[0].id){
			// 			this.repairObj.subID=subArray[0].id;
			// 		}
			// 		for(var i=0;i<bigArray.length;i++){
			// 			var subList = [];
			// 			for(var j=0;j<subArray.length;j++){
			// 				if(subArray[j].parent==bigArray[i].id){
			// 					subList.push({"name":subArray[j].val,obj:subArray[j]})
			// 				}
			// 			}
			// 			this.categoryList.push({"name":bigArray[i].val,"subCategoryList":subList,obj:bigArray[i]})
			// 		}
			// 		this.subCategoryList = this.categoryList[0]? this.categoryList[0].subCategoryList:[];
			// 		this.repairObj={
			// 			bigName:this.categoryList[0]?this.categoryList[0].obj.val:'',
			// 			bigID:this.categoryList[0]?this.categoryList[0].obj.id:'',
			// 			subID:'',
			// 			subName:''
			// 		}
			// 	})
			// }
		},
		onLoad:function(){
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
		border-right:0.5px solid rgba(255,255,255,1);
	}
	.nav-left-item {

		padding:19px 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:15px;
		color:rgba(42,42,42,1);
	}
	.nav-right {
		width: 70%;
		padding-left:20px;
		padding-top: 22px;
	}
	.nav-right-item {
		background:rgba(247,247,247,1);
		border-radius:4px;
		width: 100%;
		float: left;
		margin: 10px;
		text-align: left;
		padding: 7px;
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
