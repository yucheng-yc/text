export default class Time{
  static parseTime(timestamp,format = 'Y-M-D h:m:s',fill = true) {
    if(timestamp){
      let currentTimezone = -8 // 东8区, new Date().getTimezoneOffset()，获取的东时区为负数，西时区为正数。我们也保持一致
      const numberOfTimestamp = Number(timestamp)
      if (Number.isNaN(numberOfTimestamp)) {
        console.error('请传入合法的时间戳')
        return timestamp
      }
      const date = new Date(numberOfTimestamp*1000 - currentTimezone * 60 * 60 * 1000);
      const time_new = date.toJSON().substr(0, 19).replace('T', ' ')
      format = format.replace('Y',time_new.substr(0,4))
          .replace('M',Number(time_new.substr(5,2))>=10 ?time_new.substr(5,2): fill?time_new.substr(5,2):time_new.substr(6,1))
          .replace('D',Number(time_new.substr(8,2))>=10 ?time_new.substr(8,2): fill?time_new.substr(8,2):time_new.substr(9,1))
          .replace('h',time_new.substr(11,2))
          .replace('m',time_new.substr(14,2))
          .replace('s',time_new.substr(17,2))
    }
    return format
  }
}
