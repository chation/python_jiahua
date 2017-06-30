$(function () {
    screenHeight();
    //功能1：发货人与收货人的切换
    $(".sort>a").click(function () {
        $(this).addClass('active').siblings('.active').removeClass('active');
        var id = $(this).attr('href');
        $(id).addClass('active').siblings('.active').removeClass('active');
    });
    //功能2：客户信息
    $.ajax({
        type:"post",
        url:"/json/client/query/",
        success:function (data) {
            data=jQuery.parseJSON(data).body;
            //发货人信息
            var sendHtml="";
            for(var i=0;i<data[0].length;i++){
                var b=i+1;
                sendHtml+=' <tr data-id='+data[0][i][0]+'><td>'+b+'</td><td>'+data[0][i][1]+'</td><td>'+data[0][i][2]+'</td><td>'+data[0][i][3]+'</td><td>'+data[0][i][4]+'</td><td><div class="operate"><a>操作<span class="caret"></span></a> <span></span> <ul> <li><a data-toggle="modal" data-target="#clientEditor" class="clientEditor">编辑</a></li><li><a data-toggle="modal" data-target="#clientDelete" class="clientDelete">删除</a></li></ul></div></td></tr>';
            }
            $('#sendClients table>tbody').html(sendHtml);
            //收货人信息
            var receiveHtml="";
            for(var j=0;j<data[1].length;j++){
                var c=j+1;
                receiveHtml+=' <tr data-id='+data[1][j][0]+'><td>'+c+'</td><td>'+data[1][j][1]+'</td><td>'+data[1][j][2]+'</td><td>'+data[1][j][3]+'</td><td>'+data[1][j][4]+'</td><td><div class="operate"><a>操作<span class="caret"></span></a> <span></span> <ul> <li><a data-toggle="modal" data-target="#clientEditor" class="clientEditor">编辑</a></li><li><a data-toggle="modal" data-target="#clientDelete" class="clientDelete">删除</a></li></ul></div></td></tr>';
            }
            $(".sort>a").click(function () {
                if($('[href="#sendClients"]').hasClass("active")){
                    $('#sendClients table>tbody').html(sendHtml);//将数据加载到页面
                }else if($('[href="#receiveClients"]').hasClass("active")){
                    $('#receiveClients table>tbody').html(receiveHtml);//将数据加载到页面
                }
            })
        }
    });
    var confirm=$(".confirm");
    //功能3：添加新用户
    $("#addNewClient").click(function () {
        $("div.modal").attr("id","addClient");
        $("div.modal h4").text("添加新用户");
        if($('[href="#sendClients"]').hasClass("active")) {
            $("div.modal .add").replaceWith('<div class="add"><div class="form-group"><label>客户姓名</label><input type="text" name="name"/></div><div class="form-group"><label>联系电话</label><input type="text" name="phoneNumber" class="phoneNumber"/><div class="checkPhone">电话号码输入有误</div></div><div class="form-group"><label>客户地址</label><input type="text" name="address"/></div><div class="form-group"><label>出货地编码</label><input type="text" name="sendCode" /></div></div>');
        }else if($('[href="#receiveClients"]').hasClass("active")){
            $("div.modal .add").replaceWith('<div class="add"><div class="form-group"><label>客户姓名</label><input type="text" name="name"/></div><div class="form-group"><label>联系电话</label><input type="text" name="phoneNumber" class="phoneNumber"/><div class="checkPhone">电话号码输入有误</div></div><div class="form-group"><label>客户地址</label><input type="text" name="address"/></div><div class="form-group"><label>收货地编码</label><input type="text" name="receiveCode" /></div></div>');
        }
        confirm.unbind('click');
        confirm.click(function () {
            var name= $("[name=name]").val();
            var phoneNumber = $("[name=phoneNumber]").val();
            var address = $("[name=address]").val();
            var sendCode = $("[name=sendCode]").val();
            var receiveCode=$("[name=receiveCode]").val();
            $.ajax({
                type:"post",
                url:"/json/client/create/",
                data:{name:name,phoneNumber:phoneNumber,address:address,sendCode:sendCode,receiveCode:receiveCode},
                success:function () {
                    promptBox();
                    if(name&&phoneNumber&&address&&(sendCode||receiveCode)!==""){
                        $("#promptBox").text("创建成功");
                        warningClass();
                    }else{
                        $("#promptBox").text("当前表单不能有空项");
                        $("#promptBox").addClass("warning");
                    }
                    clientsManage();
                    modal();
                }
            })
        })
    });
    //功能4：编辑客户信息
    $("tbody").on("click",".clientEditor",function (e) {
        e.preventDefault();
        $("div.modal").attr("id","clientEditor");
        $("div.modal h4").text("修改客户");
        if($('[href="#sendClients"]').hasClass("active")) {
            $("div.modal .add").replaceWith('<div class="add"><div class="form-group"><label>客户姓名</label><input type="text" name="name"/></div><div class="form-group"><label>联系电话</label><input type="text" name="phoneNumber" class="phoneNumber"/><div class="checkPhone">电话号码输入有误</div></div><div class="form-group"><label>客户地址</label><input type="text" name="address"/></div><div class="form-group"><label>出货地编码</label><input type="text" name="sendCode" /></div></div>');
        }else if($('[href="#receiveClients"]').hasClass("active")){
            $("div.modal .add").replaceWith('<div class="add"><div class="form-group"><label>客户姓名</label><input type="text" name="name"/></div><div class="form-group"><label>联系电话</label><input type="text" name="phoneNumber" class="phoneNumber"/><div class="checkPhone">电话号码输入有误</div></div><div class="form-group"><label>客户地址</label><input type="text" name="address"/></div><div class="form-group"><label>收货地编码</label><input type="text" name="receiveCode" /></div></div>');
        }
        if($(this).parents(".tab_box").attr("id")==="sendClients"){
            $("[name=name]").val($(this).parents("tr").children("td:nth-child(2)").text());
            $("[name=phoneNumber]").val($(this).parents("tr").children("td:nth-child(3)").text());
            $("[name=address]").val($(this).parents("tr").children("td:nth-child(4)").text());
            $("[name=sendCode]").val($(this).parents("tr").children("td:nth-child(5)").text());
            var sindex = $(this).parents("tr").attr("data-id");
            confirm.attr("data-index",sindex);
            confirm.unbind("click");
            confirm.click(function () {
                var name= $("[name=name]").val();
                var phoneNumber = $("[name=phoneNumber]").val();
                var address = $("[name=address]").val();
                var sendCode = $("[name=sendCode]").val();
                var id = $(this).attr("data-index");
                $.ajax({
                    type: "post",
                    url: "/json/client/update/",
                    data: {id:id, typeId:0,name:name,phoneNumber:phoneNumber,address:address,sendCode:sendCode},//将id传给后台数据
                    success: function () {
                        $("#promptBox").text("修改成功");
                        warningClass();
                        promptBox();
                        clientsManage();
                        modal();
                    }
                })
            })
        }else if($(this).parents(".tab_box").attr("id")==="receiveClients"){
            $("[name=name]").val($(this).parents("tr").children("td:nth-child(2)").text());
            $("[name=phoneNumber]").val($(this).parents("tr").children("td:nth-child(3)").text());
            $("[name=address]").val($(this).parents("tr").children("td:nth-child(4)").text());
            $("[name=receiveCode]").val($(this).parents("tr").children("td:nth-child(5)").text());
            var rindex = $(this).parents("tr").attr("data-id");
            confirm.attr("data-index",rindex);
            confirm.unbind("click");
            confirm.click(function () {
                var name= $("[name=name]").val();
                var phoneNumber = $("[name=phoneNumber]").val();
                var address = $("[name=address]").val();
                var receiveCode=$("[name=receiveCode]").val();
                var id = $(this).attr("data-index");
                $.ajax({
                    type: "post",
                    url: "/json/client/update/",
                    data: {typeId:1, id:id,name:name,phoneNumber:phoneNumber,address:address,receiveCode:receiveCode},//将id传给后台数据
                    success: function () {
                        $("#promptBox").text("修改成功");
                        warningClass();
                        promptBox();
                        clientsManage();
                        modal();
                    }
                })
            })
        }
    });
    //功能5：删除客户信息
    $("tbody").on("click",".clientDelete",function (e) {
        e.preventDefault();
        $("div.modal").attr("id","clientDelete");
        $("div.modal h4").text("删除客户");
        $("div.modal .add").replaceWith("<div class='add'><p>是否删除此客户？</p></div>");
        if($(this).parents(".tab_box").attr("id")==="sendClients"){
            var sindex = $(this).parents("tr").attr("data-id");
            confirm.attr("data-index",sindex);
            confirm.unbind("click");
            confirm.click(function () {
                var id = $(this).attr("data-index");
                $.ajax({
                    type: "post",
                    url: "/json/client/delete/",
                    dataType: "json",
                    data: {id: id, typeId: 0},//将id传给后台数据
                    success: function () {
                        $("#promptBox").text("删除成功");
                        warningClass();
                        promptBox();
                        clientsManage();
                        modal();
                    }
                })
            })
        }else if($(this).parents(".tab_box").attr("id")==="receiveClients"){
            var rindex = $(this).parents("tr").attr("data-id");
            confirm.attr("data-index",rindex);
            confirm.unbind("click");
            confirm.click(function () {
                var id = $(this).attr("data-index");
                $.ajax({
                    type: "post",
                    url: "/json/client/delete/",
                    dataType: "json",
                    data: {typeId: 1, id: id},//将id传给后台数据
                    success: function () {
                        $("#promptBox").text("删除成功");
                        warningClass();
                        promptBox();
                        clientsManage();
                        modal();
                    }
                })
            })
        }
    })
});


var regPhone=/^1[34578]\d{9}$/;
var regTel=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
$(".modalSection").on("blur",".phoneNumber",function () {
        var phoneNum=$(".phoneNumber").val();
        console.log(phoneNum);
        if(phoneNum!==""){
            if(regPhone.test(phoneNum)||regTel.test(phoneNum)){
                $(".checkPhone").css("display","none");
            }else{
                $(".checkPhone").css("display","block");
            }
        }
});


