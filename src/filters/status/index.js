export default (number, status0,status1,status2,status3) => {
  var status="";
   switch (number){
     case "0":  status=status0;break;
     case "1":  status=status1; break;
     case "2":  status=status2; break;
     case "3":  status=status3; break;
     default: status="未定义"
   }
  return status;
}
