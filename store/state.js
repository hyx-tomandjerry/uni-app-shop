export default {
	production:true,
    appKey:null,//存储服务器发送给客户端的sessionkey
    // hostUrl:'http://192.168.10.22/services',
    // xiaoxiongUrl:'http://192.168.10.186:8090/blade/services',
	xiaoxiongUrl:'http://192.168.10.186:8080/services',
    devUrl:'http://192.168.10.22:10086/services',//开发环境
	proUrl:'http://192.168.10.22/services',//测试环境
	// proUrl:'http://s.oaks.cn/services',
    uploadHostUrl:'http://up.qiniup.com?token=',
    userInfo:{},//用户信息
	hasLogin:false,//判断是否登录
    statusHeight:44,
	replacerObj:{
		ownerType:4,//渠道商公司类型
		type:1//渠道商个人类型
	},
	shoperObj:{
		ownerType:2,
		type:4
	},
	gender:{
		1:'男',
		2:'女'
	},
	genderZn:{
		'man':1,
		'woman':2
	},
	user:{
		account:'',
		token:'',
	},
	report:1,
    IMSDKAPPID:1400132581,
	
    loginInfo:'',//聊天信息
    constants:{
        brand_type:29,//品牌类别
        repair_type:39,//维修类别
        serviceorder_file:18,//报修附件
        shop_file:26,//门店附件,
        log : 4,		//Work Report Daily日志
        shopCover:29,//门店头像,
		companyCover:21,//公司头像
		licenseCover:7,//营业执照

    },
	//经营类别
	runCatalog : {
		direct:2,
		agent:3,
		join:4,
		trusteeship:5,
		joint:6
	},
	pageCount:20,
	runCatalogZn :{
		2:'直营店',
		3:'渠道商',
		4:'加盟店',
		5:'托管店',
		6:'合资店',
	},
	expressType:{
		'speed':1,//快
		'price':2,//惠
		'intime':2,//准
	},

	expressCatalog:{
		'express':1,//快递
		'logistics':2,//物流
	},
    expressStatus:{
        1:'待取件',
        2:'已取件',
        3:'已发运',
        4:'已到达',
        5:'已签收',
    },
    expressStatusZn:{
        'unSign':1,
        'pick':2,
        'travel':3,
        'arrive':4,
        'sign':5
    },
	/*
		快递区分,1是快递，2是物流
	*/
   expressWay:{
	   'express':1,
	   'distribute':2
   },
    distributeStatus:{
       1:'未处理',
        3:'已完成'
    },
    distributeStatusZn:{
      'unHandle':1,
      'finish':3
    },
    /*
    * 快递主体
    * */
    expressItem:{
      shop:1,//门店
      store:2,//仓库
      company:3,//公司
      customer:4,//消费者

    },

    //快递类型
    expressGive:{
        'send':1,//发件
        'replace':2,//代发
        'receive':3,//收件
    },
    //快递公司
    repairTypeZn: {
        2:'灯具照明',
        3:'电器设备',
        4:'道具货架',
        5:'商场设施',
        6:'灯箱标识',
        7:'其它类别',
    },
    repairTypeArray:[
        {name:'灯具照明',id:2},
        {name:'电器设备',id:3},
        {name:'道具货架',id:4},
        {name:'商场设施',id:5},
        {name:'灯箱标识',id:6},
        {name:'其它类别',id:7},
    ],
    repairType:{
        'light':'灯具照明',
        'elect':'电器设备',
        'building':'道具货架',
        'square':'商场设施',
        'lightBox':'灯箱标识',
        'other':'其它类别',
    },
    notice:{
        todo:1,//代办
        info:2,//通知
    },
    //门店状态
    shopStatus:{
        1:'筹备中',
        2:'施工中',
        3:'营业中',
        4:'撤柜关闭',
        5:'重装关闭',
        6:'移位关闭',
    },
    shopStatusZn:{
        ready:1,
        processing:2,
        businessing:3,
        canceled:4,
        renovated:5,
        moved:6
    },
    shopStatusColor:{
        1:'#5cdbd3',
        2:'#ffa940',
        3:'#52c41a',
        4:'#f5222d',
        5:'#9254de',
        6:'#006d75'
    },
	
	//门店状态
	shopType:{
		1:'新装门店',
		2:'原有门店',
		3:'原位重装',
		4:'移位重装',
	},
	shopTypeZn:{
		'new':1,
		'origin':2,
		'again':3,
		'remove':4
	},
	repairStatusZn:{
	    // 1:'待店长审批',
		1:'未处理',
	    2:'待区长审批',
	    3:'待公司审批',
	    4:'处理中',
		6:'已完成'
	},
	repairStatus:{
	    'waitManager':1,
	    'waitArea':2,
	    'waitCompany':3,
	    'loading':4,
		'finish':6
	},
    // repairStatusZn:{
    //     1:'未处理',
    //     2:'处理中',
    //     3:'被拒绝',
    //     4:'已完成'
    // },
    // repairStatus:{
    //     'untreated':1,
    //     'treating':2,
    //     'refuse':3,
    //     'finish':4
    // },
    userStatusZn:{
        1:'正常',
        2:'未邀请',
        3:'邀请中待确认',
        4:'申请加入中',
        5:'离职',
		6:'被拒绝',
    },
    userStatus:{
        'normal':1,
        'free':2,
        'inviting':3,
        'applying':4,
        'quit':5,
		'refuse':6
    },
	//内部人员状态
	// 外部组织状态
	outerStatusZn:{
		0:'被删除',
		1:'已通过',
		2:'被邀请',
		3:'邀请中',
		4:'被拒绝'
	},
	outerStatus:{
		'delete':0,
		'accepted':1,
		'invited':2,
		'inviting':3,
		'refuse':4
		
	},
    doc: {
        withoutTarget : 0,		//Without target
        contract : 1,		//Project files
        flow : 2, 		//Process Node files流程
        task : 3, 			//Task files任务
        log : 4,		//Work Report Daily日志
        attendance : 5,		//Attendance Daily
        expense : 6,		//Expense
        license : 7,		//营业执照
        commonForm : 8,		//新建审批附件
        message : 9,		//Docs sending in IM
        approval : 10,		//Approval
        headCover : 11,		//User head picture头像
        contractCover : 12,      //Contract Cover Picture项目
        carousel : 13,		//App Slide show pictures
        share : 14,			//App Slide show pictures
        quotaCover : 15, 	//Quota Cover Picture定额
        modelCover : 16, 	//Material Model Cover Picture物料
        acceptReport : 17, 	//验收
        serviceorder:18,//维修
        projectorvendor:19,//需求
        project:20,//需求附件
        cusHeadImg:21,//公司头像
        routineApp:22,//常见审批附件,
        outstockApp:23,//领料审批附件,
        vehicleApp:24,//用车审批附件,
        bizTripApp:25,//出差审批附件,
        shop:26,//门店附件
        purchase:27,//采购
        projectverimg:28,//业主端项目
        shopCover:29,//门店头像
        article:31,
        articleCover:32,
        messages:33,//公司公告
        workReportShop:34
    },
    cache: {
        session: 'xml_session',       // token验证
        im: 'xml_im',       // im信息
    },
    imInfo:null,
    method:{
        setImInfo:'setImInfo'
    },
	/*绩效日分解方法*/
	resolveWay:{
		1:'按日平摊',
		2:'周末结算'
	},
	resolveWayZn:{
		'day':1,
		'week':2
	},
	bankNames:{"CDB":"国家开发银行","ICBC":"中国工商银行","ABC":"中国农业银行","BOC":"中国银行","CCB":"中国建设银行","PSBC":"中国邮政储蓄银行","COMM":"交通银行","CMB":"招商银行","SPDB":"上海浦东发展银行","CIB":"兴业银行","HXBANK":"华夏银行","GDB":"广东发展银行","CMBC":"中国民生银行","CITIC":"中信银行","CEB":"中国光大银行","EGBANK":"恒丰银行","CZBANK":"浙商银行","BOHAIB":"渤海银行","SPABANK":"平安银行","SHRCB":"上海农村商业银行","YXCCB":"玉溪市商业银行","YDRCB":"尧都农商行","BJBANK":"北京银行","SHBANK":"上海银行","JSBANK":"江苏银行","HZCB":"杭州银行","NJCB":"南京银行","NBBANK":"宁波银行","HSBANK":"徽商银行","CSCB":"长沙银行","CDCB":"成都银行","CQBANK":"重庆银行","DLB":"大连银行","NCB":"南昌银行","FJHXBC":"福建海峡银行","HKB":"汉口银行","WZCB":"温州银行","QDCCB":"青岛银行","TZCB":"台州银行","JXBANK":"嘉兴银行","CSRCB":"常熟农村商业银行","NHB":"南海农村信用联社","CZRCB":"常州农村信用联社","H3CB":"内蒙古银行","SXCB":"绍兴银行","SDEB":"顺德农商银行","WJRCB":"吴江农商银行","ZBCB":"齐商银行","GYCB":"贵阳市商业银行","ZYCBANK":"遵义市商业银行","HZCCB":"湖州市商业银行","DAQINGB":"龙江银行","JINCHB":"晋城银行JCBANK","ZJTLCB":"浙江泰隆商业银行","GDRCC":"广东省农村信用社联合社","DRCBCL":"东莞农村商业银行","MTBANK":"浙江民泰商业银行","GCB":"广州银行","LYCB":"辽阳市商业银行","JSRCU":"江苏省农村信用联合社","LANGFB":"廊坊银行","CZCB":"浙江稠州商业银行","DYCB":"德阳商业银行","JZBANK":"晋中市商业银行","BOSZ":"苏州银行","GLBANK":"桂林银行","URMQCCB":"乌鲁木齐市商业银行","CDRCB":"成都农商银行","ZRCBANK":"张家港农村商业银行","BOD":"东莞银行","LSBANK":"莱商银行","BJRCB":"北京农村商业银行","TRCB":"天津农商银行","SRBANK":"上饶银行","FDB":"富滇银行","CRCBANK":"重庆农村商业银行","ASCB":"鞍山银行","NXBANK":"宁夏银行","BHB":"河北银行","HRXJB":"华融湘江银行","ZGCCB":"自贡市商业银行","YNRCC":"云南省农村信用社","JLBANK":"吉林银行","DYCCB":"东营市商业银行","KLB":"昆仑银行","ORBANK":"鄂尔多斯银行","XTB":"邢台银行","JSB":"晋商银行","TCCB":"天津银行","BOYK":"营口银行","JLRCU":"吉林农信","SDRCU":"山东农信","XABANK":"西安银行","HBRCU":"河北省农村信用社","NXRCU":"宁夏黄河农村商业银行","GZRCU":"贵州省农村信用社","FXCB":"阜新银行","HBHSBANK":"湖北银行黄石分行","ZJNX":"浙江省农村信用社联合社","XXBANK":"新乡银行","HBYCBANK":"湖北银行宜昌分行","LSCCB":"乐山市商业银行","TCRCB":"江苏太仓农村商业银行","BZMD":"驻马店银行","GZB":"赣州银行","WRCB":"无锡农村商业银行","BGB":"广西北部湾银行","GRCB":"广州农商银行","JRCB":"江苏江阴农村商业银行","BOP":"平顶山银行","TACCB":"泰安市商业银行","CGNB":"南充市商业银行","CCQTGB":"重庆三峡银行","XLBANK":"中山小榄村镇银行","HDBANK":"邯郸银行","KORLABANK":"库尔勒市商业银行","BOJZ":"锦州银行","QLBANK":"齐鲁银行","BOQH":"青海银行","YQCCB":"阳泉银行","SJBANK":"盛京银行","FSCB":"抚顺银行","ZZBANK":"郑州银行","SRCB":"深圳农村商业银行","BANKWF":"潍坊银行","JJBANK":"九江银行","JXRCU":"江西省农村信用","HNRCU":"河南省农村信用","GSRCU":"甘肃省农村信用","SCRCU":"四川省农村信用","GXRCU":"广西省农村信用","SXRCCU":"陕西信合","WHRCB":"武汉农村商业银行","YBCCB":"宜宾市商业银行","KSRB":"昆山农村商业银行","SZSBK":"石嘴山银行","HSBK":"衡水银行","XYBANK":"信阳银行","NBYZ":"鄞州银行","ZJKCCB":"张家口市商业银行","XCYH":"许昌银行","JNBANK":"济宁银行","CBKF":"开封市商业银行","WHCCB":"威海市商业银行","HBC":"湖北银行","BOCD":"承德银行","BODD":"丹东银行","JHBANK":"金华银行","BOCY":"朝阳银行","LSBC":"临商银行","BSB":"包商银行","LZYH":"兰州银行","BOZK":"周口银行","DZBANK":"德州银行","SCCB":"三门峡银行","AYCB":"安阳银行","ARCU":"安徽省农村信用社","HURCB":"湖北省农村信用社","HNRCC":"湖南省农村信用社","NYNB":"广东南粤银行","LYBANK":"洛阳银行","NHQS":"农信银清算中心","CBBQS":"城市商业银行资金清算中心"} 

}

