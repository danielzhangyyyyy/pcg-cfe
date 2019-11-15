import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('convert', function convert(num) {
  num = num + '';//数字转字符串
  var str = "";//字符串累加  
  var result = num.indexOf(".");//判断是否有小数点
  if (result != -1) {
    console.log('含有小数');
    var sum = num.split(".");//sum[0]小数点前面部分;sum[1]为小数部分 
    for (var i = sum[0].length - 1, j = 1; i >= 0; i-- , j++) {
      if (j % 3 == 0 && i != 0) {//每隔三位加逗号，过滤正好在第一个数字的情况  
        str += sum[0][i] + ",";//加千分位逗号  
        continue;
      }
      str += sum[0][i];//倒着累加数字
    }
    return str.split('').reverse().join("") + '.' + sum[1];
  } else {
    console.log('没有小数');
    for (var i = num.length - 1, j = 1; i >= 0; i-- , j++) {
      if (j % 3 == 0 && i != 0) {//每隔三位加逗号，过滤正好在第一个数字的情况  
        str += num[i] + ",";//加千分位逗号  
        continue;
      }
      str += num[i];//倒着累加数字
    }
    return str.split('').reverse().join("");//字符串=>数组=>反转=>字符串    
  }
})
