export function recursion(itemList,list,arr){
  if(list){
    for(var i=0;i<list.length;i++){
      for(var j=0;j<itemList.length;j++){
        if(list[i].value==itemList[j]){
          arr.push({categoryName:list[i].label})
          recursion(itemList,list[i].children,arr)
        }
      }
    }
  }
}

export function recursion1(str,list){
  if(list){
    for(var i=0;i<list.length;i++){
      var item=list[i];
      if(list[i].id==str){
        return list[i].categoryName;
      }
    }
  }
}
