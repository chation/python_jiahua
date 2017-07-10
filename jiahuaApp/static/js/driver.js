$(function () {
     screenHeight();
    //功能1：车辆信息
    $.ajax({
        type:"post",
        url:"/json/cat/query/",
        success:function (data) {
            data=jQuery.parseJSON(data).body;
            var html="";
            for(var i=0;i<data.length;i++){
                var a=i+1;
                html+='<tr data-id="'+data[i][5]+'"><td>'+a+'</td><td><img src="'+data[i][4]+'" alt="" style="width: 20px;height: 20px"></td><td>'+data[i][0]+'</td><td>'+data[i][1]+'</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td><a class="positionMsg" data-name="'+data[i][0]+'">地图</a></td><td><div class="operate"><a>操作<span class="caret"></span></a><span></span><ul><li><a class="driverEditor" data-toggle="modal" data-target="#driverEditor">编辑</a></li><li><a class="deleteDriver"  data-toggle="modal" data-target="#deleteDriver" >删除</a></li></ul></div></td></tr>';
            }
            $('.tab_box tbody').html(html);//将数据加载到页面
        }
    });
    //点击清空，清空数据
    $("#catEmpty").click(function () {
        $("#cph").val("");
        $("#sjxm").val("");
        $("#sjh").val("");
    });
    //点击查询，得到相应数据
    $("#catSearch").click(function () {
        var plateNum= $("#cph").val();
        var fullName=$("#sjxm").val();
        var phoneNumber=$("#sjh").val();
        $.ajax({
            type:"post",
            url:"/json/cat/query/",
            success:function (data) {
                data=jQuery.parseJSON(data).body;
                var html="";
                for(var i=0;i<data.length;i++) {
                    var a = i + 1;
                    if (plateNum == data[i][3]&&fullName==""&&phoneNumber=="") {
                        html+='<tr><td>'+a+'</td><td><img src="'+data[i][4]+'" alt="" style="width: 20px;height: 20px"></td><td>'+data[i][0]+'</td><td>'+data[i][1]+'</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td><a class="positionMsg" data-name="'+data[i][0]+'">地图</a></td><td><div class="operate"><a>操作<span class="caret"></span></a><span></span><ul><li><a class="driverEditor" data-toggle="modal" data-target="#driverEditor">编辑</a></li><li><a class="deleteDriver"  data-toggle="modal" data-target="#deleteDriver" >删除</a></li></ul></div></td></tr>';
                    }else if (fullName == data[i][0]&&plateNum==""&&phoneNumber=="") {
                        html+='<tr><td>'+a+'</td><td><img src="'+data[i][4]+'" alt="" style="width: 20px;height: 20px"></td><td>'+data[i][0]+'</td><td>'+data[i][1]+'</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td><a class="positionMsg" data-name="'+data[i][0]+'">地图</a></td><td><div class="operate"><a>操作<span class="caret"></span></a><span></span><ul><li><a class="driverEditor" data-toggle="modal" data-target="#driverEditor">编辑</a></li><li><a class="deleteDriver"  data-toggle="modal" data-target="#deleteDriver" >删除</a></li></ul></div></td></tr>';
                    }else if (phoneNumber == data[i][2]&&plateNum==""&&fullName=="") {
                        html+='<tr><td>'+a+'</td><td><img src="'+data[i][4]+'" alt="" style="width: 20px;height: 20px"></td><td>'+data[i][0]+'</td><td>'+data[i][1]+'</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td><a class="positionMsg" data-name="'+data[i][0]+'">地图</a></td><td><div class="operate"><a>操作<span class="caret"></span></a><span></span><ul><li><a class="driverEditor" data-toggle="modal" data-target="#driverEditor">编辑</a></li><li><a class="deleteDriver"  data-toggle="modal" data-target="#deleteDriver" >删除</a></li></ul></div></td>/tr>';
                    }else if (fullName == data[i][0] &&plateNum == data[i][3]) {
                        html+='<tr><td>'+a+'</td><td><img src="'+data[i][4]+'" alt="" style="width: 20px;height: 20px"></td><td>'+data[i][0]+'</td><td>'+data[i][1]+'</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td><a class="positionMsg" data-name="'+data[i][0]+'">地图</a></td><td><div class="operate"><a>操作<span class="caret"></span></a><span></span><ul><li><a class="driverEditor" data-toggle="modal" data-target="#driverEditor">编辑</a></li><li><a class="deleteDriver"  data-toggle="modal" data-target="#deleteDriver" >删除</a></li></ul></div></td></tr>';
                    }else if (plateNum == data[i][3]&& phoneNumber == data[i][2]) {
                        html+='<tr><td>'+a+'</td><td><img src="'+data[i][4]+'" alt="" style="width: 20px;height: 20px"></td><td>'+data[i][0]+'</td><td>'+data[i][1]+'</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td><a class="positionMsg" data-name="'+data[i][0]+'">地图</a></td><td><div class="operate"><a>操作<span class="caret"></span></a><span></span><ul><li><a class="driverEditor" data-toggle="modal" data-target="#driverEditor">编辑</a></li><li><a class="deleteDriver"  data-toggle="modal" data-target="#deleteDriver" >删除</a></li></ul></div></td></tr>';
                    }else if (fullName == data[i][0] && phoneNumber == data[i][2]) {
                        html+='<tr><td>'+a+'</td><td><img src="'+data[i][4]+'" alt="" style="width: 20px;height: 20px"></td><td>'+data[i][0]+'</td><td>'+data[i][1]+'</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td><a class="positionMsg" data-name="'+data[i][0]+'">地图</a></td><td><div class="operate"><a>操作<span class="caret"></span></a><span></span><ul><li><a class="driverEditor" data-toggle="modal" data-target="#driverEditor">编辑</a></li><li><a class="deleteDriver"  data-toggle="modal" data-target="#deleteDriver" >删除</a></li></ul></div></td></tr>';
                    }else if (fullName == data[i][0] && phoneNumber == data[i][2]&&plateNum == data[i][3]) {
                        html+='<tr><td>'+a+'</td><td><img src="'+data[i][4]+'" alt="" style="width: 20px;height: 20px"></td><td>'+data[i][0]+'</td><td>'+data[i][1]+'</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td><a class="positionMsg" data-name="'+data[i][0]+'">地图</a></td><td><div class="operate"><a>操作<span class="caret"></span></a><span></span><ul><li><a class="driverEditor" data-toggle="modal" data-target="#driverEditor">编辑</a></li><li><a class="deleteDriver"  data-toggle="modal" data-target="#deleteDriver" >删除</a></li></ul></div></td></tr>';
                    }

                }
                $('.tab_box tbody').html(html);//将数据加载到页面
            }
        });
    });
    //点击地图显示运货轨迹var com
    $('.tab_box tbody').on("click",".positionMsg",function () {
        $("#positionMsg").css("display","block");
        var name=$(this).attr("data-name");
        $.ajax({
            type:"post",
            url:"/json/location/",
            data:{name:name},
            success:function (data) {
                data=jQuery.parseJSON(data).body;
                var map = new BMap.Map("map");
               if(data[data.length-1]!==undefined){
                   var one = wgs_gcj_encrypts(parseFloat(data[data.length-1][1]),parseFloat(data[data.length-1][0]));
                   var one2 = google_bd_encrypt(one.lat,one.lon);
                   var point = new BMap.Point(one2.lon,one2.lat);
               }else{
                   var one = wgs_gcj_encrypts(30.60,114.30);
                   var one2 = google_bd_encrypt(one.lat,one.lon);
                   var point = new BMap.Point(one2.lon,one2.lat);
               }
                map.centerAndZoom(point,15);
               setTimeout(function(){
                    map.setZoom(14);
                }, 2000);  //2秒后放大到14级
                map.enableScrollWheelZoom(true);
                for(var i=0;i<data.length;i++){
                    //向地图添加标注
                    var pointOne = wgs_gcj_encrypts(parseFloat(data[i][1]),parseFloat(data[i][0]));
                    var pointOne2 = google_bd_encrypt(pointOne.lat,pointOne.lon);
                    var points = new BMap.Point(pointOne2.lon,pointOne2.lat);
                    var marker = new BMap.Marker(points);
                    map.addOverlay(marker);
                    if(i==data.length-1){
                        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                    }
                    //添加标注信息
                    var opts = {
                        position : points,    // 指定文本标注所在的地理位置
                        offset   : new BMap.Size(15, -30)    //设置文本偏移量
                    };
                    var labels = new BMap.Label(data[i][2],opts);  // 创建文本标注对象
                    labels.setStyle({
                        color : "red",
                        fontSize : "12px",
                        height : "20px",
                        lineHeight : "20px",
                        fontFamily:"微软雅黑"
                    });
                    map.addOverlay(labels);
                }
            }
        });

        $("#mapClose").click(function () {
            $("#positionMsg").css("display","none");
        })
    });
    //功能2：添加车辆t
    $("#addCat").click(function (e) {
        e.preventDefault();
        $("div.modal").attr("id","addDriver");
        $("div.modal h4").text("添加车辆");
        $("div.modal .add").replaceWith('<div class="add"><div class="form-group"><label>用户ID</label><input type="text" name="userid" placeholder="请填写姓名全拼"/></div><div class="form-group"><label>姓名</label><input type="text" name="fullName"/></div><div class="form-group"><label>车牌号</label><input type="text" name="plateNum"/></div><div class="form-group"><label>电话</label><input type="text" name="phoneNumber"/></div></div>');
        confirm.unbind('click');
        confirm.click(function () {
            var plateNum = $("[name=plateNum]").val();
            var fullName = $("[name=fullName]").val();
            var phoneNumber = $("[name=phoneNumber]").val();
            var userid=$("[name=userid]").val();
            $.ajax({
                type: "post",
                url: "/json/cat/create/",
                data: {
                    cat: plateNum,
                    name: fullName,
                    mobile: phoneNumber,
                    userid:userid
                },
                success: function (data) {
                    data=jQuery.parseJSON(data).body;
                    promptBox();
                    if (data.errcode==0) {
                        $("#promptBox").text("创建成功");
                        warningClass();
                    } else if(data.errcode==60102){
                        $("#promptBox").text("用户ID已存在");
                        $("#promptBox").addClass("warning");
                    } else if(data.errcode==60104){
                        $("#promptBox").text("手机号码已存在");
                        $("#promptBox").addClass("warning");
                    }
                    driver();
                    modal();
                }
            });
        });
    });
   //功能3：编辑车辆信息
    var confirm=$(".confirm");
    $(".tab_box tbody").on("click",".driverEditor",function (e) {
        e.preventDefault();
        $(".modal").attr("id","driverEditor");
        $(".modal h4").text("编辑车辆");
        $("div.modal .add").replaceWith('<div class="add"><div class="form-group"><label>姓名</label><input type="text" name="fullName" disabled="disabled" style="color:#888;"></div><div class="form-group"><label>车牌号</label><input type="text" name="plateNum"/></div><div class="form-group"><label>电话</label><input type="text" name="phoneNumber"/></div></div>');
        var index = $(this).parents("tr").attr("data-id");
        confirm.attr("data-index", index);//确定键添加data-index属性，
        $("[name=plateNum]").val($(this).parents("tr").children("td:nth-child(6)").text());
        $("[name=phoneNumber]").val($(this).parents("tr").children("td:nth-child(5)").text());
        $("[name=fullName]").val($(this).parents("tr").children("td:nth-child(3)").text());
        confirm.unbind('click');
        confirm.click(function () {
            var plateNum = $("[name=plateNum]").val();
            var phoneNumber = $("[name=phoneNumber]").val();
            var name = $("[name=fullName]").val();
            var id= $(this).attr("data-index");
            $.ajax({
                type: "post",
                url: "/json/cat/update/",
                dataType: "json",
                data: {userid: id,cat: plateNum,mobile: phoneNumber,name:name},//将id传给后台数据
                success: function () {
                    $("#promptBox").text("修改成功");
                    warningClass();
                    promptBox();
                    driver();
                    modal();
                }
            });
        });

    });
   //功能4：删除车辆的模态框
    $(".tab_box tbody").on("click",".deleteDriver",function (e) {
        e.preventDefault();
        $("div.modal").attr("id", "deleteDriver");
        $("div.modal h4").text("删除车辆");
        $("div.modal .add").replaceWith("<div class='add'><p>是否删除此车辆？</p></div>");
        var index = $(this).parents("tr").attr("data-id");
        confirm.attr("data-index", index);//确定键添加data-index属性，
        confirm.unbind('click');
        confirm.click(function () {
            var id= $(this).attr("data-index");
            $.ajax({
                type: "get",
                url: "/json/cat/delete/",
                dataType: "json",
                data: {userid: id},//将id传给后台数据
                success: function () {
                    $("#promptBox").text("删除成功");
                    warningClass();
                    promptBox();
                    driver();
                    modal();
                }
            });
        });
    });
});
