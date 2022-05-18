
// const moment = require('moment')
export function getCurrentDate(){
    let date = new Date()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}




export function getPreviousTime(h){
    let date = new Date()
    date.setTime(date.getTime() + (h*60*60*1000))
   
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }