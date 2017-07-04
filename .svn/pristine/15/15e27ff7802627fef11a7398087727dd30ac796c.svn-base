$(function() {
    screenHeight();
    //加载页面信息
    function p(s) {
        return s < 10 ? '0' + s: s;
    }
    var myDate = new Date();
    var year=myDate.getFullYear();
    var month=myDate.getMonth()+1;
    var date=myDate.getDate();
    var h=myDate.getHours();
    var m=myDate.getMinutes();
    var s=myDate.getSeconds();
    $("#uploadTime").val(year+"-"+p(month)+"-"+p(date));
    $.ajax({
        type:"post",
        url:"/json/order/batch/query/",
        success:function (data,status) {
            data=jQuery.parseJSON(data).body;
            var html="";
            for(var i=0;i<data.length;i++){
                var insertDate=data[i].insertTime.slice(0,10);
                var insertTime=data[i].insertTime.slice(11,19);
                c=i+1;
                html+='<tr><td>'+c+'</td><td>'+insertDate+'</td><td>'+data[i].insertFileName+'</td><td>'+data[i].insertResult+'</td><td>'+insertTime+'</td><td>'+data[i].insertNum+'</td></tr>';
            }
            $('.tab_box tbody').html(html);
        }
    });
});
