<template>
	<view>

		<view class="group-content">
			<view v-show="type=='group'">
				<!--@click="chatToObj(item)"-->
				<view class="group-content-list flex justify-start" v-for="(item,index) in groupList" :key="index">
					<image  src="../../../../static/img/message/group.png" style="width:40px;height:40px;margin-right:10px;"></image>
					<view style="height:40px;line-height:40px;width:86%;border-bottom:1px solid #EEEEED">
						{{item.name}}&nbsp;&nbsp;({{item.members}})
					</view>
				</view>
			</view>
			<view v-show="type=='telephone'">
				<uni-collapse accordion="true">
				    <uni-collapse-item :title="(item.name || '未指定部门')+'    ('+item.members.length+')'"  v-for="(item,index) in telephoneList" :key="index">
				        <view style="padding: 30upx;" v-for="(member,ind) in item.members" :key="ind" @click="chatWith(member)">
				            <image :src="member.headurl" style="width:25px;height:25px;border-radius: 50%;margin-right:10px;vertical-align: middle;"></image>
							{{member.name}}
				        </view>
				    </uni-collapse-item>


				</uni-collapse>
			</view>

		</view>
	</view>
</template>

<script>
	import uniCollapse from '../../../../components/collapse/uni-collapse.vue';
	import uniCollapseItem from '../../../../components/collapse/uni-collapse-item.vue'
	export default {
		data() {
			return {
				groupList:[],
				telephoneList:[],
				type:''
			}
		},
		components: {
			uniCollapse,uniCollapseItem
		},
		onLoad(options){
			this.type=options.type;
			if(options.type=='group'){

				this.getChatGroupApi();
			}else if(options.type=='telephone'){
				//通讯录
				this.getContactTreeModelApi()
			}

		},
		methods: {
			//进行聊天
			chatToObj(item){

				uni.navigateBack({
					delta:1,
					success:(res)=>{
						this.$fire.fire('group',item)
					}
				})
			},
            chatWith(){
                uni.navigateTo({
                    url:'../chat/chat'
                })
			},
			//获得通讯录列表
			getContactTreeModelApi(){
				uni.request({
					url:this.$store.state.url+'ContactTreeModel',
					data:{
						owner:16,
						userId:1
					},
					success: (res) => {
						this.telephoneList=res.data.data;
						console.log(this.telephoneList)
					}
				})
			},
			//获得群组列表
			getChatGroupApi(){
				uni.request({
					url:this.$store.state.url+'ChatGroups',
					data:{
						owner:16,
						userId:1,
						imuser:'LX13167233205',
						psize:100,
						offset:0
					},
					success: (res) => {
						this.groupList=res.data.data;

					}
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
	}
	.group-content{
		.group-content-list{
			padding:10px 20px;
		}
	}

</style>
