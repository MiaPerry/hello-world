export default (time) => {
  if(time==""){
    return;
  }
  var arr = time.split(/[- : \/]/);
  var d = new Date(arr[0], arr[1] - 1, arr[2]);
  var n=d.getDay();
  var week="";
  switch (n){
    case 1:  week="一"; break;
    case 2:  week="二"; break;
    case 3:  week="三"; break;
    case 4:  week="四"; break;
    case 5:  week="五"; break;
    case 6:  week="六"; break;
    default: week="日"; break;
  }
  return "星期"+week;
}
