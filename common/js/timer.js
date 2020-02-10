//获得时间的函数
export default{
	//获得两个时间的时间差
	getTimeInfo(start,end){
		//计算相差的天数
		
		let date=new Date(end).getTime()-new Date(start).getTime()
		
		let days=Math.floor(date/(24*3600*1000));
		// 计算小时
		let leave1=date%(24*3600*1000);//计算天数后的毫秒数
		var hours=Math.floor(leave1/(3600*1000))
		//计算分钟数
		let leave2=leave1%(3600*1000);
		let minutes=Math.floor(leave2/(60*1000));
	
		//计算秒数
		let leave3=leave2%(60*1000);
		let second=Math.floor(leave3/1000);
		let obj={
			days:days,
			hours:hours,
			minutes:minutes
		}
		return obj;
	},
	getDate(type){
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
					
		if (type === 'start') {
		    year = year - 60;
		} else if (type === 'end') {
		    year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;  
	},
	timeDiffer(startime,endtime){
		 startime = startime.replace(new RegExp("-","gm"),"/");//转换-变为/
            let start       = new Date(startime);
            let startYear   = start.getFullYear(); //开始年份
            let startMonth  = start.getMonth() + 1;//开始月份
            let startDay    = start.getDate();     //开始日期
            let startMiao   = start.getTime();
 
            endtime = endtime.replace(new RegExp("-","gm"),"/");
            let end      = new Date(endtime);
            let endYear  = end.getFullYear(); //结束年份
            let endMonth = end.getMonth() + 1;//结束月份
            let endDay   = end.getDate();     //结束日期
            let endMiao  = end.getTime();
 
            let years = 0;
            let months = endMonth - startMonth + (endYear - startYear) * 12;//总月
            if (endMonth * 100 + endDay < startMonth * 100 + startDay) {
                months--;//如果结束日期<输入日期，月数要-1
            }
			years = Math.floor(months / 12);//取整计算年数
            months = months % 12;//取余计算月数
            let  middleDate = new Date(startime);//中间时间
            middleDate.setFullYear(startYear + years);//设置中间时间年份
            middleDate.setMonth(start.getMonth() + months);//设置中间时间月份
            let  days =  Math.floor( ( endMiao- middleDate.getTime()) / 24 / 60/ 60 / 1000);//计算天数
 
            //时间差的毫秒数
            let  chaTime=endMiao-startMiao;
            //计算出小时数
            let  yu=chaTime % (24*3600*1000);//86400000
            let  hour=Math.floor(yu/(3600*1000));//3600000
            //计算相差分钟数
            let  yuH=chaTime % (3600*1000);
            let  min=Math.floor(yuH/(60*1000));//60000
            //计算相差秒数
            let  yuM=chaTime%(60*1000);
            let  sec=Math.floor(yuM/1000);//1000
			return {
				years,
				months,
				days,
				hour,
				min,
				sec
			}
	}
}