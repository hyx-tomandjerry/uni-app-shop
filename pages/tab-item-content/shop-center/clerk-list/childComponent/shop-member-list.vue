<template>
	<view class="member-container" >
		<template v-if="clerkTab==3">
			<block  v-for="(item,index) in userList" :key="index" >
				<view @tap="checkServiceItem(item)" 
					style="padding:20upx 0;"
					class="flex justify-between align-center borderBottom">
					<view>
						<image :src="item.img" mode="widthFix" class="service-img"></image>
						<text>{{item.ownerName=='camera'?'摄像头':'CPE'}}序列号:{{item.seq || ''}}</text>
					</view>
					<view >
					<view :class="{
						'inventory':item.status == serviceStatus.unsign,
						'delivered':item.status == serviceStatus.unactive,
						'activated':item.status == serviceStatus.binding,
						'stopped':item.status == serviceStatus.unbind,
						'stpowed':item.status == serviceStatus.payment,
						'canceled':item.status == serviceStatus.wrong
				}" class="font-weight-bold">{{item.status | serviceStatusZnPipe}}</view>
						<!-- <template v-if="item.status == serviceStatus.activated">
							<view class="service-tag"  :class="{'border-green':item.shop>0,'border-red':item.shop==0}">{{item.shop>0?'正常':'停机'}}</view>
						</template>
						<template v-else>
							<view>{{item.status | serviceStatusZnPipe}}</view>
						</template> -->
					</view>
				</view>
			</block>
		</template>
		<template v-else>
			<block v-for="(item ,index) in userList" :key="index">
				<ClerkListItem :item="item" :index="index" :TabCur="clerkTab"
				@joinSuccess="joinSuccess"
				@checkItemInfo="checkItemInfo"
				:shopItem="shopItem" @joinRefuse="joinSuccess"></ClerkListItem>
			</block>
		</template>
		
		
	</view>
</template>

<script>
	import ClerkListItem from '../../../../../components/shop/clerk-list-item.vue'
	export default{
		components:{ClerkListItem},
		computed:{
			serviceStatus(){
				return this.config.serviceStatus
			}
		},
		data(){
			return{
				serviceList:[
					{ownerName:'camera',seq:'oaks11001_CAME27005'},
					{ownerName:'camera',seq:'oaks11002_CAME27006'},
					{ownerName:'camera',seq:'OAKS11003_CAME27007'},
					{ownerName:'camera',seq:'OAKS11004_CAME27008'},
					{ownerName:'camera',seq:'OAKS11005_CAME27009'},
					{ownerName:'camera',seq:'OAKS11006_CAME27011'},
					{ownerName:'camera',seq:'OAKS11007_CAME27015'},
					{ownerName:'CPE',seq:'OAKS215_VD27005'},
					{ownerName:'CPE',seq:'OAKS215_VD27005'},
					{ownerName:'CPE',seq:'OAKS215_VD27005'},
					{ownerName:'CPE',seq:'OAKS215_VD27005'},
					{ownerName:'CPE',seq:'OAKS215_VD27005'},
				]
			}
		},
		props:{
			userList:{
				type:Array,
				default(){return []}
			},
			shopItem:{
				type:Object,
				default(){return {}}
			},
			clerkTab:[String,Number]
		},
		methods:{
			joinSuccess(){
				this.$emit('joinSuccess')
			},
			//查看店员详情
			checkItemInfo(item){
				this.$emit('checkItemInfo',item)
			},
			/*查看设备详情*/
			checkServiceItem(item){
				this.$emit('checkServiceItem',item)
			}
		}
	}
</script>

<style scoped>
	@import url("../../../../../common/css/service.css");
	.member-container{
		padding:36upx 30upx 30upx 46upx;
		margin-bottom: 30upx;
		background:#fff;
	
	}
	.service-img{
		width:72upx;
		height:72upx;
		flex-shrink: 0;
		margin-right:20upx;
		vertical-align: middle;
	}
	.service-tag{
		padding:2upx 20upx;
		font-size:10px;
		border-radius:20upx;
	}
	.border-green{
		border:1px solid #00D496;
		color:#00D496
	}
	.border-red{
		border:1px solid #EC3636;
		color:#EC3636
	}
</style>
