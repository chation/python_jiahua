$(function(){
    //提货时间默认当天日期
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
    $(".date").val(year+"-"+p(month)+"-"+p(date));
    //发货方与收货方的下拉框
    var sendNameHtml="";
    var receiveNameHtml="";
     $.ajax({
         type:"post",
         url:"/json/client/query/",
         success:function (data) {
             var sendNameList=$(".nameList.send");
             var receiveNameList=$(".nameList.receive");
             data=jQuery.parseJSON(data).body;
             //发货人信息匹配
             for(var i=0;i<data[0].length;i++){
                 sendNameHtml+="<li>"+data[0][i][1]+"</li>";
             }
             sendNameList.html(sendNameHtml);
             sendNameList.children("li").hide();
             $("#sendName").keyup(function () {
                 var sendName = $("#sendName").val();
                 if(sendName.length >= 1){
                     sendNameList.children("li").each(function(){
                         if($(this).text().indexOf(sendName)>=0){
                             sendNameList.css("display","block");
                             $(this).show();
                         }else  if($(this).text().indexOf(sendName)<0){
                             $(this).hide();
                         }
                     });
                 }
             });
             sendNameList.on("click","li",function () {
                 sendNameList.css("display","none");
                 var scontent=$(this).text();
                 var sindex=$(this).index();
                 $("#sendName").val(scontent);
                 $("#sendPhoneNumber").val(data[0][sindex][2]);
                 $("#sendAddress").val(data[0][sindex][3]);
                 $("#sendCode").val(data[0][sindex][4]);
             });
             //收货人信息匹配
             for(var j=0;j<data[1].length;j++){
                 receiveNameHtml+="<li>"+data[1][j][1]+"</li>";
             }
             receiveNameList.html(receiveNameHtml);
             receiveNameList.children("li").hide();
             $("#receiveName").keyup(function () {
                 var receiveName = $("#receiveName").val();
                 if(receiveName.length >= 1){
                     receiveNameList.children("li").each(function(){
                         if($(this).text().indexOf(receiveName)>=0){
                             receiveNameList.css("display","block");
                             $(this).show();
                         }else{
                             $(this).hide();
                         }
                     });
                 }
             });
             receiveNameList.on("click","li",function () {
                 receiveNameList.css("display","none");
                 var rcontent=$(this).text();
                 var rindex=$(this).index();
                 $("#receiveName").val(rcontent);
                 $("#receivePhoneNumber").val(data[1][rindex][2]);
                 $("#receiveAddress").val(data[1][rindex][3]);
                 $("#receiveCode").val(data[1][rindex][4]);
             });
         }
     });
    //司机车牌下拉框
    var plateNumHtml="";
    $.ajax({
        type:"post",
        url:"/json/getCat/",
        success:function (data) {
            data=jQuery.parseJSON(data).body;
            var plateNumList=$(".plateNum>ul");
            for(var i in data){
                plateNumHtml+="<li>"+i+"</li>";
            }
            plateNumList.html(plateNumHtml);
            plateNumList.children("li").hide();
            $("#plateNum").keyup(function () {
                var plateNum = $("#plateNum").val();
                if(plateNumList.length >= 1){
                    plateNumList.children("li").each(function(){
                        if($(this).text().indexOf(plateNum)>=0){
                            plateNumList.css("display","block");
                            $(this).show();
                        }else{
                            $(this).hide();
                        }
                    });
                }
            });
            $("#plateNum").blur(function () {
                if($("#plateNum").val()==""){
                    plateNumList.css("display","none");
                }
            });
            plateNumList.on("click","li",function () {
                plateNumList.css("display","none");
                var content=$(this).text();
                $("#plateNum").val(content);
            })
        }
    });
    //点击保存提交数据
    $("#saveOrder").click(function(){
        var data=$('#myform').serialize();
        if ($("#saveOrder").attr("update")==undefined){
            $.ajax({
                type:"post",
                url:"/json/order/create/",
                data:data,
                success:function(data){//成功执行代码
                    var status=jQuery.parseJSON(data).status;
                    var message=jQuery.parseJSON(data).message;
                    promptBox();
                    if(status==200){
                        $("#promptBox").text("保存成功");
                        warningClass();
                    }else if(status>=400){
                        $("#promptBox").text(message);
                        $("#promptBox").addClass("warning");
                    }
                    createform();
                }
            });
        }
        else {
            var order_id=$("#saveOrder").attr("update");
            var updata={id:order_id};
            $("#myform").find("input").each(function(){
                if (($(this).val())!==($(this).attr("value"))){
                    updata[$(this).attr("id")]=$(this).val();
                }
            });
            var n=0;
            for (var i in updata){
                n++;
            }
            if (n>1){
                /*$.ajax({
                    type:"post",
                    url:"/json/order/update/",
                    data:updata,
                    success:function(data){//成功执行代码
                        var status=jQuery.parseJSON(data).status;
                        var message=jQuery.parseJSON(data).message;
                        promptBox();
                        if(status==200){
                            $("#promptBox").text("保存成功");
                            warningClass();
                        }else if(status>=400){
                            $("#promptBox").text(message);
                            $("#promptBox").addClass("warning");
                        }
                        createform();
                    }
                });*/
            }
        }

    });
    //模态框
    $("#myModal").modal("hide");

    //验证节点时间和纳时
    checkTime($("#getGoodsTime"));
    checkTime($("#lastTime"));
});
//验证节点时间和纳时的方法
function checkTime(timeTextBox){
    var regTime = /^([0-2][0-9]):([0-5][0-9])$/;
    timeTextBox.blur(function () {
        var time = timeTextBox.val();
        if(time!==""){
            if (!(regTime.test(time))) {
                promptBox();
                $("#promptBox").text("时间格式有误");
                $("#promptBox").addClass("warning");
            }
        }
    })
}
