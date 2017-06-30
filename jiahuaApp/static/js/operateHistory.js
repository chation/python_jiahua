$(function () {
    screenHeight();
  $.ajax({
      type:"post",
      url:"/json/operateHistory/",
      success:function (data) {
          data=jQuery.parseJSON(data).body;//将json数据转化为字符串
          var html="";
          for(var i=0;i<data.length;i++){
              var c=1+i;
              html+='<tr><td>'+c+'</td><td>'+data[i].operator+'</td><td>'+data[i].action+'</td><td>'+data[i].operateTime+'</td><td>'+data[i].content+'</td></tr>'
          }
          $("#historyOrd>tbody").html(html);
      }
  })
});
