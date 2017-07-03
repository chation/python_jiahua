$(function () {
    screenHeight();
    //点击用户姓名，显示用户管理列表
    $("#username").click(function (e) {
        e.preventDefault();
        $(".userMag").slideToggle();
    });
    var confirm=$(".confirm");
    //点击用户注册
    $(".userMag>li>a").unbind("click");
    $("#register").click(function () {
        $("div.modal1").attr("id","uregister");
        $("div.modal h4").text("用户注册");
        $("div.modal .add").replaceWith('<div class="add"><div class="form-group"><label for="name">姓名</label><input type="text" name="name" id="name" class="name"/></div><div class="form-group"><label for="username" >用户名</label><input type="text" name="username" id="usename"/></div><div class="form-group"><label for="password">密码</label><input type="password" name="password" id="password"/></div><div class="form-group"><label for="email">邮箱</label><input type="text" name="email" id="email"/></div></div>');
        confirm.click(function () {
            var username=$("#usename").val();
            var password=$("#password").val();
            var name=$(".name").val();
            var email=$("#email").val();
            if(username==""||password==""||name==""){
                promptBox();
                $("#promptBox").text("姓名、用户名、密码不能为空");
                $("#promptBox").addClass("warning");
                modal();
            }else{
                $.ajax({
                    type:"post",
                    url:"/accounts/register/",
                    data:{username:username,password:password,name:name,email:email},
                    success:function (data) {
                        var status=jQuery.parseJSON(data).status;
                        var message=jQuery.parseJSON(data).message;
                        promptBox();
                        if(status==200){
                            $("#promptBox").text("注册成功");
                            warningClass();
                        }else if(status>=400){
                            $("#promptBox").text(message);
                            $("#promptBox").addClass("warning");
                        }
                        modal();
                    }
                })
            }

        })
    });
    //点击修改密码
    $("#revisePwd").click(function () {
        $("div.modal1").attr("id","upassword");
        $("div.modal h4").text("修改密码");
        $("div.modal .add").replaceWith('<div class="add"><div class="form-group"><label for="oldPassword">原始密码</label><input type="password" name="oldPassword" id="oldPassword"/></div><div class="form-group"><label for="newPassword">新密码</label><input type="password" name="newPassword" id="newPassword"/></div><div class="form-group"><label>确认新密码</label><input type="password" id="confirmPwd"/></div></div>');
        confirm.unbind("click");
        confirm.click(function () {
            var oldPassword=$("#oldPassword").val();
            var newPassword=$("#newPassword").val();
            var confirmPwd=$("#confirmPwd").val();
            if(newPassword!==confirmPwd){
                promptBox();
                $("#promptBox").text("两次输入密码不一致,请重新输入");
                $("#promptBox").addClass("warning");
                $("#promptBox").css("z-index",100000);
                $("#newPassword").val("");
                $("#confirmPwd").val("");
            }else{
                $.ajax({
                    type:"post",
                    url:"accounts/change_password/",
                    data:{oldPassword:oldPassword,newPassword:newPassword},
                    success:function (data) {
                        var status=jQuery.parseJSON(data).status;
                        var message=jQuery.parseJSON(data).message;
                        promptBox();
                        if(status==200){
                            $("#promptBox").text("修改成功");
                            warningClass();
                        }else if(status>=400){
                            $("#promptBox").text(message);
                            $("#promptBox").addClass("warning");
                        }
                        modal();
                    }
                })
            }
        })
    });
    //点击用户管理
    $("#user").click(function () {
        $("#uManage .modal-dialog").css("width","800px");
        $.ajax({
            type:"post",
            url:"accounts/query/",
            success:function (data) {
                var data=jQuery.parseJSON(data).body;
                var html="";
                for(var i=0;i<data.length;i++){
                    if(data[i].is_active==true){
                        var isActive="激活";
                        var a="禁用";
                        var b=1;
                    }else{
                        var isActive="禁用";
                        var a="激活";
                        var b=0;
                    }
                    if(data[i].is_superuser==true){
                        var superuser="管理员";
                    }else{
                        var superuser="普通";
                    }
                    html+='<tr><td>'+data[i].last_name+'</td><td>'+data[i].username+'</td><td>'+data[i].email+'</td><td>'+isActive+'</td><td>'+superuser+'</td><td>'+data[i].date_joined+'</td><td>'+data[i].last_login+'</td><td data-id='+data[i].id+'><a class="isActive" data-val="'+b/*data[i].is_active*/+'">'+a+'</a><a class="userDel">删除</a></td></tr>'
                }
                var tabUser=$("#tabUser>tbody");
                tabUser.html(html);
                $(".isActive").each(function () {
                    var val=$(this).attr("data-val");
                    if(val==1){
                        $(this).css("background","#999");
                    }else{
                        $(this).css("background","#2e8fea");
                    }
                });
                //删除用户内容
                tabUser.on("click",".userDel",function (e) {
                    e.preventDefault();
                    var id=$(this).parent().attr("data-id");
                    $.ajax({
                        type:"post",
                        url:"accounts/delete/",
                        data:{id:id},
                        success:function (data) {
                            var status=jQuery.parseJSON(data).status;
                            var message=jQuery.parseJSON(data).message;
                            promptBox();
                            if(status==200){
                                $("#promptBox").text("删除成功");
                                warningClass();
                            }else if(status>=400){
                                $("#promptBox").text(message);
                                $("#promptBox").addClass("warning");
                            }
                            modal();
                        }
                    })
                });
                //点击激活或禁用，修改状态
                tabUser.off("click",".isActive");
                tabUser.on("click",".isActive",function (e) {
                    e.preventDefault();
                    var id=$(this).parent().attr("data-id");
                    var val=$(this).attr("data-val");
                    if(val==1){
                        $(this).text("禁用");
                        $(this).css("background","#999");
                    }else{
                        $(this).text("激活");
                        $(this).css("background","#2e8fea");
                    }
                    $.ajax({
                        type:"post",
                        url:"accounts/active/",
                        data:{id:id},
                        success:function (data) {
                            var status=jQuery.parseJSON(data).status;
                            var message=jQuery.parseJSON(data).message;
                            promptBox();
                            if(status==200){
                                $("#promptBox").text("修改成功");
                                warningClass();
                            }else if(status>=400){
                                $("#promptBox").text(message);
                                $("#promptBox").addClass("warning");
                            }
                            modal();
                        }
                    })
                })
            }
        })
    });
    //功能1：左侧导航切换
    $('#mytab>li a').click(function (e) {
        e.preventDefault();
        //修改右侧主体中的div的.active位置
        var id = $(this).attr('href');
        $(id).addClass('active').siblings('.active').removeClass('active');
        if (id === "#create") {
            createform();
        } else if (id === "#load") {
            uploadFile();
        } else if (id === "#order") {
            orderManage();
            //default_list();
        } else if (id === '#driver') {
            driver();
        } else if (id === '#client') {
            clientsManage();
        } else if (id === '#goodsdelay') {
            goodsdelay();
        }else if (id === '#main') {
            window.location.reload();
        }else if (id === '#history') {
           history();
        }
    });
    //功能2：点击矩形，收缩导航栏
    $("#flex_arrow").click(function () {
        var tabContent = $(".tab_content");
        $(".aside").toggleClass("active");
        tabContent.toggleClass("active");
        if (tabContent.css("padding-left") == "10px") {
            $(window).on('resize', function () {
                var width = parseInt($(window).outerWidth()) - 10;
                $(".tab_box").css("max-width", width + "px");
                $(".cM_hd").css("max-width", width + "px");
                $(".tab_nav").css("max-width", width + "px");
            })
        }
    });
    //点击不同的订单状态跳转到订单管理
    $("#btnGroup>div").unbind("click");
    $("#btnGroup>div").click(function () {
        $("#main").removeClass("active");
        $("#order").addClass("active");
        if ($(this).attr("class") == "group1") {
            $("#order").load("/orderManage/", function () {
                $(".pendingList").trigger("click");
            });
        } else if ($(this).attr("class") == "group2") {
            $("#order").load("/orderManage/", function () {
                $(".assignedList").trigger("click");
            });
        } else if ($(this).attr("class") == "group3") {
            $("#order").load("/orderManage/", function () {
                $(".connectedList").trigger("click");
            });
        } else if ($(this).attr("class") == "group4") {
            $("#order").load("/orderManage/", function () {
                $(".loadingList").trigger("click");
            });
        } else if ($(this).attr("class") == "group5") {
            $("#order").load("/orderManage/", function () {
                $(".signList").trigger("click");
            });
        }
    });
    //订单状态淡入
    $("#btnGroup>div").fadeIn(2000);
    //司机姓名下拉框
    $.ajax({
        type:"post",
        url:"/json/cat/query/",
        success:function (data) {
            data=jQuery.parseJSON(data).body;
            var nameList=$("#dateSearch>ul");
            var html="";
            for(var i=0;i<data.length;i++){
                html+="<li>"+data[i][0]+"</li>";
            }
            nameList.html(html);
            $("#name").keyup(function () {
                var val = $("#name").val();
                    nameList.children("li").each(function(){
                        if($(this).text().indexOf(val)>=0){
                            nameList.css("display","block");
                            $(this).show();
                        }else{
                            $(this).hide();
                        }
                    });
            });
            $("#dateSearch").on("click","li",function () {
                var content=$(this).text();
                $("#name").val(content);
                nameList.css("display","none");
            });
            $("#name").blur(function () {
                if($("#name").val()==""){
                    nameList.css("display","none");
                }
            });
        }
    });
    //功能3：获取查询的默认日期
    function p(s) {
        return s < 10 ? '0' + s : s;
    }

    var myDate = new Date();
    var year = myDate.getFullYear();//当前年
    var month = myDate.getMonth() + 1;//当前月
    var date = myDate.getDate();    //当前日
    var nowDayOfWeek = myDate.getDay() - 1;//当前周的第几天
    //获得某月的天数
    function getMonthDays(myMonth) {
        var monthStartDate = new Date(year, myMonth - 1, 1);
        var monthEndDate = new Date(year, myMonth, 1);
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    }

    //开始日期
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {//如果是1月份，则取上一年的12月份
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = date + 1;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {//如果原来日期大于上一月的日期，则取当月的最大日期。比如3月的30日，在2月中没有30
        day2 = days2;
    }

    var startTime = (year2 + '-' + p(month2) + '-' + p(day2));
    $("#startTime").val(startTime);
    //结束日期/当天日期
    var endTime = (year + "-" + p(month) + "-" + p(date));
    $("#endTime").val(endTime);
    //昨天日期
    if (date > 1) {
        var yesterday = (year + "-" + p(month) + "-" + p(date - 1));
    } else if (date == 1) {
        var yesterday = (year + "-" + p(month - 1) + "-" + p(getMonthDays(month - 1)));
    }
    //获得本周的开始日期
    var weekStartDate = (year + '-' + p(month) + '-' + p(date - nowDayOfWeek));
    if(date-nowDayOfWeek<0){
        var weekStartDate = (year + '-' + p(month-1) + '-' + p(getMonthDays(month - 1)+date - nowDayOfWeek));
    }
    //获得本周的结束日期
    var weekEndDate = (year + '-' + p(month) + '-' + p(date + 6 - nowDayOfWeek));
    if(date+6>getMonthDays(month)){
        var weekEndDate = (year + '-' + p(month+1) + '-' + p(6-getMonthDays(month)+date-nowDayOfWeek));
    }
    //获得上周的开始日期
    var lastWeekStartDate = (year + '-' + p(month) + '-' + p(date - nowDayOfWeek - 7));
    if(date-nowDayOfWeek-7<0){
        var lastWeekStartDate = (year + '-' + p(month-1) + '-' + p(getMonthDays(month - 1)+date - nowDayOfWeek - 7));
    }
    //获得上周的结束日期
    var lastWeekEndDate = (year + '-' + p(month) + '-' + p(date - nowDayOfWeek - 1));
    if(date - nowDayOfWeek - 1<0){
        var lastWeekEndDate = (year + '-' + p(month-1) + '-' + p(date - nowDayOfWeek - 1+getMonthDays(month-1)));
    }
    //获得本月开始日期
    var monthStartDate = (year + "-" + p(month) + "-" + p(1));
    //获得本月结束日期
    var monthEndDate = (year + "-" + p(month) + "-" + p(getMonthDays(month)));
    //获取上月开始日期
    var lastMonthStartDate = (year + "-" + p(month - 1) + "-" + p(1));
    //获取上月结束日期
    var lastMonthEndDate = (year + "-" + p(month - 1) + "-" + p(getMonthDays(month - 1)));
    //获得两个日期之间的所有日期
    function Todo(begin, end) {
        var ab = begin.split("-");
        var ae = end.split("-");
        var db = new Date();
        db.setFullYear(ab[0], ab[1] - 1, ab[2]);
        var de = new Date();
        de.setFullYear(ae[0], ae[1] - 1, ae[2]);
        var a = [];
        for (var i = 0, temp = db; temp < de; i++) {
            a[i] = GetDate(temp);
            temp.setTime(temp.getTime() + 24 * 60 * 60 * 1000);
        }
        a[i] = GetDate(de);
        return a;
    }
    function GetDate(d) {
        return (year + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()));
    }
    //各个时间段的点击事件
    var createTime = endTime;
    $.ajax({
        type: "post",
        url: "/json/order/count/",
        data: {createTime: createTime},
        success: function (data) {
            data = jQuery.parseJSON(data).body;
            $(".today").addClass("active");
            labels = ["待处理", "已指派", "已接单", "已装货", "已签收"];
            var stateType = [0, 1, 2, 3, 4];
            var arr = [0, 0, 0, 0, 0];
            for (var i = 0; i < data[0].length; i++) {
                for (var j = 0; j < stateType.length; j++) {
                    if (stateType[j] == data[0][i].stateType) {
                        arr[j] = data[0][i].number;
                    }
                }
            }
            for (var i = 0; i < data[0].length; i++) {
                if (data[0][i].stateType == 0) {
                    $(".group1>div").text(data[0][i].number);
                } else if (data[0][i].stateType == 1) {
                    $(".group2>div").text(data[0][i].number);
                } else if (data[0][i].stateType == 2) {
                    $(".group3>div").text(data[0][i].number);
                } else if (data[0][i].stateType == 3) {
                    $(".group4>div").text(data[0][i].number);
                } else if (data[0][i].stateType == 4) {
                    $(".group5>div").text(data[0][i].number);
                }
            }
            ;
            var lineChartData = {
                labels: labels,//横坐标
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: arr
                    }
                ]
            };
            var ctx = document.getElementById("canvas").getContext("2d");
            ctx.clearRect(0, 0, 1000, 350);
            new Chart(ctx).Line(lineChartData);
        }

    });
    //点击不同按钮生成线性图
    $("#dateSearch").on("click", "a", function (e) {
        e.preventDefault();
        $("#btnGroup>div>div").text(0);
        $(this).addClass("active").siblings(".active").removeClass("active");
        //点击不同时间段的按钮，得到不同的时间段
        if ($(this).hasClass("lastWeek")) {
            var stime = lastWeekStartDate;
            var etime = lastWeekEndDate;
            var createTime = [stime, etime];
        } else if ($(this).hasClass("thisWeek")) {
            var stime = weekStartDate;
            var etime = weekEndDate;
            var createTime = [stime, etime];
        } else if ($(this).hasClass("lastMonth")) {
            var stime = lastMonthStartDate;
            var etime = lastMonthEndDate;
            var createTime = [stime, etime];
        } else if ($(this).hasClass("thisMonth")) {
            var stime = monthStartDate;
            var etime = monthEndDate;
            var createTime = [stime, etime];
        } else if ($(this).hasClass("dateSearch")) {
            var stime = $("#startTime").val();
            var etime = $("#endTime").val();
            var createTime = [stime, etime];
        } else if ($(this).hasClass("today")) {
            var createTime = endTime;
        } else if ($(this).hasClass("yesterday")) {
            var createTime = yesterday;
        }
        var name=$("#name").val();
        //动态生成线性图
        $.ajax({
            type: "post",
            url: "/json/order/count/",
            data: {createTime: createTime,name:name},
            success: function (data) {
                data = jQuery.parseJSON(data).body;
                //得到图形的横坐标及纵坐标
                if (createTime instanceof Array) {
                    var date = Todo(stime, etime);
                    var arr = [];
                    var labels = [];
                    for (var i = 0; i < date.length; i++) {
                        arr.push(0);
                        labels.push(date[i].slice(8, 11));
                    }
                    for (var datai = 0; datai < data[1].length; datai++) {
                        var time = data[1][datai][0];
                        var value = data[1][datai][1];
                        for (var i = 0; i < date.length; i++) {
                            if (date[i] == time) {
                                arr[i] = value;
                            }
                        }
                    }
                } else {
                    labels = ["待处理", "已指派", "已接单", "已装货", "已签收"];
                    var stateType = [0, 1, 2, 3, 4];
                    var arr = [0, 0, 0, 0, 0];
                    for (var i = 0; i < data[0].length; i++) {
                        for (var j = 0; j < stateType.length; j++) {
                            if (stateType[j] == data[0][i].stateType) {
                                arr[j] = data[0][i].number;
                            }
                        }
                    }
                }
                //显示订单状态对应的数量
                for (var i = 0; i < data[0].length; i++) {
                    if (data[0][i].stateType == 0) {
                        $(".group1>div").text(data[0][i].number);
                    } else if (data[0][i].stateType == 1) {
                        $(".group2>div").text(data[0][i].number);
                    } else if (data[0][i].stateType == 2) {
                        $(".group3>div").text(data[0][i].number);
                    } else if (data[0][i].stateType == 3) {
                        $(".group4>div").text(data[0][i].number);
                    } else if (data[0][i].stateType == 4) {
                        $(".group5>div").text(data[0][i].number);
                    }
                }
                var lineChartData = {
                    labels: labels,//横坐标
                    datasets: [
                        {
                            label: "My First dataset",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: arr
                        }
                    ]
                };
                var tmp = $('#canvas').clone();
                $('#canvas').remove();
                $('#lineChart').prepend(tmp);
                var c = document.getElementById("canvas");
                var ctx = document.getElementById("canvas").getContext("2d");
                ctx.clearRect(0, 0, c.width, c.height);
                new Chart(ctx).Line(lineChartData);
            }
        });
        $("#btnGroup>div").unbind("click");
        $("#btnGroup>div").click(function () {
            $("#main").removeClass("active");
            $("#order").addClass("active");
            $("#btnGroup").attr("data-time",createTime);
            if ($(this).attr("class") == "group1") {
                $("#order").load("/orderManage/", function () {
                    $(".pendingList").trigger("click");
                });
            } else if ($(this).attr("class") == "group2") {
                $("#order").load("/orderManage/", function () {
                    $(".assignedList").trigger("click");
                });
            } else if ($(this).attr("class") == "group3") {
                $("#order").load("/orderManage/", function () {
                    $(".connectedList").trigger("click");
                });
            } else if ($(this).attr("class") == "group4") {
                $("#order").load("/orderManage/", function () {
                    $(".loadingList").trigger("click");
                });
            } else if ($(this).attr("class") == "group5") {
                $("#order").load("/orderManage/", function () {
                    $(".signList").trigger("click");
                });
            }
        });
    });
});
//司机管理页面
function driver() {
    $("#driver").load("/driver/");
}
//开单
function createform() {
    $("#create").load("/createform/")
}
//批量导入
function uploadFile() {
    $("#load").load("/uploadFile/")
}
//订单管理
function p(s) {return s < 10 ? '0' + s: s;}
function orderManage(createTime,page,status) {
    if(!createTime){
        var myDate = new Date();
        var year=myDate.getFullYear();
        var month=myDate.getMonth()+1;
        var date=myDate.getDate();
        createTime = year+"-"+p(month)+"-"+p(date);
    }
    if(!page){
        page = 1;
    }
    if(!status){
        status = 10;
    }
    $("#order").load("/orderManage/?createTime="+createTime+"&page="+page+"&status="+status,function () {
        $("#btnGroup").attr("data-time", "");
        $("#name").val("");
    });
}
//客户管理
function clientsManage() {
    $("#client").load("/clientsManage/")
}
//取卸超时
function goodsdelay() {
    $("#goodsdelay").load("/activeTimeout/")
}
//历史操作
function history() {
    $("#history").load("/operateHistory/")
}
// 点击确定按钮，模态框隐藏
function modal() {
    /*$(".modal").hide();
    $(".modal-backdrop.in").hide();*/
    $(".modal").modal("hide")
}
//获得屏幕高度
function screenHeight() {
    document.documentElement.style.overflow = 'hidden';
    var height = parseInt($(window).outerHeight()) - 160;
    var tabHeight = parseInt($(window).outerHeight()) - 238;
    var tbodyheight = parseInt($(window).outerHeight()) - 300;
    var twidth = parseInt($(window).outerWidth()) - 200;
    var theight=parseInt($(window).outerHeight()) - 240;

    $("#orderTab").css("height", tabHeight + "px");
    $(".orderManage .tab_box").css("height", height + "px");
    $(".orderManage .tab_box").css("max-width", twidth + "px");
    $(".orderManage .tab_box tbody").css("max-height", tbodyheight + "px");
    $(".orderManage .tab_box tbody").css("min-height", tbodyheight + "px");

    $("#orderTab tfoot").css("bottom", 60 + "px");


    $(".commonTab").css("height", height + "px");
    $(".commonTab").css("max-width", twidth + "px");
    $(".commonTab tbody").css("max-height", theight + "px");
    $(".goodsDelay tbody").css("min-height", theight + "px");

    $(".handle").css("bottom", 55 + "px");
    $(".cM_hd").css("max-width", twidth + "px");
    $(".tab_nav").css("max-width", twidth + "px");
    $(window).on('resize', function () {
        var height = parseInt($(window).outerHeight()) - 160;
        var tabHeight = parseInt($(window).outerHeight()) - 238;
        var tbodyheight = parseInt($(window).outerHeight()) - 300;
        var twidth = parseInt($(window).outerWidth()) - 200;
        var theight=parseInt($(window).outerHeight()) - 240;
        $("#orderTab").css("height", tabHeight + "px");
        $(".orderManage .tab_box").css("height", height + "px");
        $(".orderManage .tab_box").css("max-width", twidth + "px");
        $(".orderManage .tab_box tbody").css("max-height", tbodyheight + "px");
        $(".orderManage .tab_box tbody").css("min-height", tbodyheight + "px");


        $(".commonTab").css("height", height + "px");
        $(".commonTab").css("max-width", twidth + "px");
        $(".commonTab tbody").css("max-height", theight + "px");
        $(".goodsDelay tbody").css("min-height", theight + "px");

        $(".cM_hd").css("max-width", twidth + "px");
        $(".tab_nav").css("max-width", twidth + "px");
    })
}

//保存成功或删除成功等弹出的提示框
function promptBox() {
    $("#promptBox").fadeIn().delay(1500).fadeOut();
}
function warningClass() {
    $("#promptBox").removeClass("warning");
}
/*
function default_list() {
    function p(s) {return s < 10 ? '0' + s: s;}
    var myDate = new Date();
    var year=myDate.getFullYear();
    var month=myDate.getMonth()+1;
    var date=myDate.getDate();
    var createTime=year+"-"+p(month)+"-"+p(date);
    $.ajax({
        type: "post",
        url: '/json/order/query/',
        data:{createTime:createTime,page:1},
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (data) {
            $("#loading").hide();
            data = jQuery.parseJSON(data).body;//将json数据转化为字符串
            var allHtml = '';//全部订单
            var arr_catdata = [];
            for (var i = 0, j = data.length; i < j; i++) {
                var sT = data[i].stateType;
                var rT = data[i].runType;
                var pN = data[i].plateNum;
                var gT = data[i].getGoodsTime;
                var str_tb = "";
                if (gT == null) {gT = ""}
                if (pN == null) {pN = ""}
                if (rT == 0) {rT = "直送"}
                if (sT == 0) {sT = "待处理"}
                else if (sT == 1) {sT = "已指派";}
                else if (sT == 2) {sT = "已接单";}
                else if (sT == 3) {sT = "已装货";}
                else if (sT == 4) {sT = "已签收";}
                else if (sT == 5) {sT = "异常订单";}
                str_tb = '<tr data-id="' + data[i].id + '" data-catNum="' + data[i].catNum + '" data-tranNum="' + data[i].tranNum + '" plate-num="'+pN+'" data-st="'+data[i].problem+'">' +
                    '<td class="save_btn"><button class="saveNum"  disabled="true">保存</button></td> ' +
                    '<td class="catNum"><input class="change_ num_" value="' + data[i].catNum + '"></td>' +
                    '<td class="tranNum"><input class="change_ num_" value="' + data[i].tranNum + '"></td>' +
                    '<td class="placeNum"><input class="change_ num_" value="' + data[i].placeNum + '"></td>' +
                    '<td class="getGoodsDate">' + data[i].getGoodsDate + '</td><td class="getGoodsTime">' + gT + '</td>' +
                    '<td class="sendName" send-add="'+data[i].sendAddress+'" send-code="'+data[i].sendCode+'" send-num="'+data[i].sendPhoneNumber+'"><div>' + data[i].sendName + '</div></td>' +
                    '<td class="receiveName" re-add="'+data[i].receiveAddress+'" re-code="'+data[i].receiveCode+'" re-num="'+data[i].receivePhoneNumber+'"><div>' + data[i].receiveName + '</div></td>' +
                    '<td class="stateType">' + sT + '</td><td class="lastDate">' + data[i].lastDate + '</td><td class="lastTime">' + data[i].lastTime + '</td>' +
                    '<td class="fe">' + data[i].fe + '</td><td class="box">' + data[i].box + '</td>' +
                    '<td class="plateNum"><input class="carNum" catnum="' + data[i].catNum + '" value="' + pN + '"><ul></ul><button class="assign_this" data-toggle="modal" data-target="#orderassign">指派</button></td>' +
                    '<td class="runType">' + rT + '</td>' +
                    '<td class="other"><input class="change_ tips_" value="'+data[i].other+'"></td>' +
                    '<td class="acceptPerson">'+data[i].acceptPerson+'</td>'+
                    '<td><div class="operate"><a>操作<span class="caret"></span></a> <span></span> <ul> <li><a class="editor" >编辑</a></li><li><a class="problem" data-toggle="modal" data-target="#orderproblem" >异常</a></li><li><a class="deleted"  data-toggle="modal" data-target="#orderdelet" >删除</a></li></ul></div></td>' +
                    '</tr>';
                arr_catdata.push(data[i].catNum);
                //显示全部订单;
                allHtml += str_tb;
            }
            $('.orderManage .tab_box tbody').html(allHtml);//默认显示全部订单
            $(".orderManage .tab_box tfoot tr td:eq(1)")[0].innerHTML = 0;
            $(".orderManage .tab_box tfoot tr td:eq(2)")[0].innerHTML = 0;
            $(".orderManage .tab_box tfoot tr td:eq(3)")[0].innerHTML = 0;
            $(".orderManage .tab_box tfoot tr td:eq(11)")[0].innerHTML = 0;
            $(".orderManage .tab_box tfoot tr td:eq(12)")[0].innerHTML = 0;
            function unique() {
                var car_len = [];//每组车次的长度
                var arr_x = [];//每组车次的第一项的index
                var i = 0, l = 1;
                $(".orderManage .tab_box tbody tr").find("td:eq(12)").each(function (index) {
                    var t = $(".orderManage .tab_box tbody tr")[index].getAttribute("data-catnum");//每列对应的车次
                    if (index == 0) {
                        arr_x.push(0)
                    }
                    if (t == arr_catdata[index + 1]) {
                        l++;
                    }
                    else {
                        car_len.push(l);
                        l = 1;
                        arr_x.push(index + 1);//车次不同的序号
                    }
                });
                $(".orderManage .tab_box tbody tr").find("td:eq(12)").each(function (index) {
                    if (index == arr_x[i]) {
                        $(this).next(".plateNum").attr("rowspan", car_len[i]);
                        i++;
                    }
                    else {
                        $(this).next(".plateNum").remove();
                    }
                });
            }
            null_();
            unique();
            total();
            bg_catNum();
            order_();
            $("#orderTab tbody").append("<tr id='extra'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>")
            input_num();
            getcarlist();
        }
    });
}
*/
//获取司机车牌
function getcarlist(){
    var carlist="";
    if($("#btnGroup").attr("data-time")!==""){
        var c=$("#btnGroup").attr("data-time");
        var createTime=c.split(",");
        if(createTime.length==1){
            var createTime=createTime[0];
        }
    }else{
        var createTime=$("#getGoods").val();
    }
    $.ajax({
        type:"post",
        url: "/json/getCat/",
        data:{createTime:createTime},
        success:function (data) {
            data=jQuery.parseJSON(data).body;
            for (var plateNum in data){
                var ds=data[plateNum][1];
                if (ds==false){
                    ds="<i style='color: red'></i>";
                    carlist+='<li class="a" data-userlist="'+data[plateNum][0]+'">'+plateNum+ds+'</li>'
                }
            }
            $(".plateNum ul").html(carlist);
            $(".plateNum ul").hide();
        }
    });
}

//合计
//循环tbody tr td:eq1,2,3,11,12
/*
function total() {
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    if ($("#orderTab tbody tr").find("td:eq(1)").last().children("input")[0] == undefined) {
        a = 0;
    } else {
        //车次合计
        a = $("#orderTab tbody").find(".carNum").length;
        //任务清单数
        c=$("#orderTab tbody tr").length;
    }
    //趟数之合
    $("#orderTab tbody tr").each(function(index){
        var this_cat=$(this).attr("data-catnum");
        var next_cat=$(this).next("tr").attr("data-catnum");
        var this_tran=$(this).attr("data-trannum");
        var next_tran=$(this).next("tr").attr("data-trannum");
        if (this_cat!=next_cat||this_tran!=next_tran){
            b++;
        }
    });

    $(".orderManage .tab_box tbody tr")
        .find("td:eq(11)")
        .each(function () {
            d += parseInt($(this)[0].innerHTML);
        });
    $(".orderManage .tab_box tbody tr")
        .find("td:eq(12)")
        .each(function () {
            e += parseInt($(this)[0].innerHTML);
        });
    $("#car_").innerHTML = a;
    $("#turn_").innerHTML = b;
    $("#list_").innerHTML = c;
    $("#fe_").innerHTML = d;
    $("#box_").innerHTML = e;
}
*/
//根据车次修改背景颜色
function bg_catNum() {
    var tr_carnum = [];
    var i = 0, l = 1;
    $(".orderManage tbody tr").each(function () {
        tr_carnum.push(parseInt($(this).attr("data-catnum")));//每列车次
    });
    $(".orderManage tbody tr").each(function (index) {
        var t = $(".orderManage .tab_box tbody tr")[index].getAttribute("data-catnum");//每列对应的车次
        if (index == 0) {
            $(this).attr("tr_index", 0)
        }
        if (t == tr_carnum[index - 1]) {
            $(this).attr("tr_index", i);
        }
        else {
            i++;
            $(this).attr("tr_index", i)
        }
    });
    $(".orderManage tbody tr").each(function () {
        var t = parseInt($(this).attr("tr_index"));
        if (t % 2 == 0) {
            $(this).css("background", "#f1f1f1");
        }
        else {
            $(this).css("background", "#fff");
        }
    });
}
function order_(){
    $("#orderTab tbody tr").each(function(){
        var data_st=$(this).attr("data-st");
        if (data_st==1){
            $(this).find("td:eq(8)").css("color","red")
        }
    })
}
function input_num(){
    $("#orderTab tbody tr").find(".num_").each(function(){
        $(this).attr("onkeyup","this.value=this.value.replace(/[^0-9]/g,'')");
        $(this).attr("onafterpaste","this.value=this.value.replace(/[^0-9]/g,'')")
    });
    $("#orderTab tbody tr").find(".tips_").each(function(){

        $(this).attr("title",$(this).attr("value"));
        $(this).keyup(function(){
            $(this).attr("title",$(this).val());
        })
    })
}

function null_(){
    $(".tab_box tbody").find("td").each(function(){
        if ($(this).text()=="None"){
            $(this).text("");
        }
    })
}