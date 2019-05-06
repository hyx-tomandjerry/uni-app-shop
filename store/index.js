// store
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store=new Vuex.Store({
	state:{
		appKey:null,//存储服务器发送给客户端的sessionkey
		// hostUrl:'http://192.168.10.22/services',
		// url:'http://192.168.10.58:8080/blade/services?f=',
		url:'http://192.168.10.22/services?f=',
		uploadHostUrl:'http://up.qiniup.com?token=',
		userInfo:null,
		statusHeight:44,
		constants:{
			brand_type:29,//品牌类别
			repair_type:39,//维修类别
			serviceorder_file:18,//报修附件
			shop_file:26,//门店附件
		},
		notice:{
			todo:1,//代办
			info:2,//通知
		},
		noticeType:{
			'unSign':0,
			'distributeWork':1,
			'agressWork':2,
			'refuseWork':3,
			'applyCheck':4,
			'passCheck':5,
			'unpassCheck':6,
			'applyDelay':7,

			'applyEnd':8,
			'agressDelay':9,
			'unagressDelay':10,
			'endWork':11,
			'unagreeEndWork':12,
			'deleteWork':13,

			'resignWork':14,
			'editWork':15,
			'applyShenpi':16,
			'shenqiPass':17,
			'applyRefuse':18,
			'newApplyCopy':19,
			'checkFinish':20,
			'point':30
		},
		noticeTypeZn:{
			0:'未分配',
			1:'分派任务',
			2:'接收任务',
			3:'拒收任务',
			4:'申请验收',
			5:'通过验收',
			6:'未通过验收',
			7:'申请延期',
			8:'申请终止',
			9:'同意延期',
			10:'未同意延期',
			11:'终止任务',
			12:'未同意终止',
			13:'删除任务',
			14:'转派任务',
			15:'修改任务',
			16:'申请审批',
			17:'审批通过',
			18:'审批驳回',
			19:'新建审批抄送',
			20:'审批完成',
			30:'指定流程负责人'
		},
		noticeTypeColor:{

		0:'#8c8c8c',
        1:'#5cdbd3',
        2:'#096dd9',
        3:'#ff7a45',
        4:'#9254de',
        5:'#52c41a',
        6:'#f5222d',
        7:'#d46b08',


        8:'#ffa940',
        9:'#614700',
        10:'#612500',
        11:'#002329',
        12:'#ad8b00',
        13:'#cf1322',

        14:'#69c0ff',
        15:'#14B4F2',
        16:'#14B4F2',
        17:'#14B4F2',
        18:'#14B4F2',
        19:'#14B4F2',
        20:'#7cb305',
        30:'#7cb305',
		},
		repairStatusZn:{
			0:'全部',
			1:'未处理',
			2:'处理中',
			3:'无效',
			4:'已完成'
		},
		repairStatus:{
			'all':0,
			'untreated':1,
			'treating':2,
			'refuse':3,
			'finish':4
		},
		repairStatusColor:{
			1:'bg-green',
			2:'bg-blue',
			3:'bg-red',
			4:'bg-purple'
		},
		userStatusZn:{
			1:'正常',
			2:'无业',
			3:'邀请中',
			4:'申请中',
			5:'离职'
		},
		userStatus:{
			'normal':1,
			'free':2,
			'inviting':3,
			'applying':4,
			'quit':5
		},
		province:'',//省份
		address:'',//详细地址
		repairSubID:'',//用于新增保修的报修ID;

	},
	mutations:{
		setUserInfo(state,userInfo){
			this.state.userInfo=userInfo;
		},
		setProvince(state,province){
			this.state.province=province;
		},
		setAddress(state,address){
			this.state.address=address;
		}

	}

})
export default store;
