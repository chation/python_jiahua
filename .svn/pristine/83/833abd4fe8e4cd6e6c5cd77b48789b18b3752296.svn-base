$(function(){
    screenHeight();
    //功能1：导航切换
    $(".orderManage .table_nav>li").click(function(e){
        e.preventDefault();
        $(this).addClass("active").siblings(".active").removeClass('active');
    });
    //提货日期默认为当天日期
    function p(s) {return s < 10 ? '0' + s: s;}
    var myDate = new Date();
    var year=myDate.getFullYear();
    var month=myDate.getMonth()+1;
    var date=myDate.getDate();
    $(".date").val(year+"-"+p(month)+"-"+p(date));
    var arr_catdata=[];//车次数组
    //功能2：显示订单
//加载全部订单
    $(".allList").click(function(){
        $(".saveall").css({"color": "rgba(255, 255, 255, 0)","background":"none"}).attr("disabled", true);
        if($("#btnGroup").attr("data-time")!==""){
            var c=$("#btnGroup").attr("data-time");
            var createTime=c.split(",");
            if(createTime.length==1){
                var createTime=createTime[0];
            }
        }else{
            var createTime=$("#getGoods").val();
        }
        var name=$("#name").val();
        $.ajax({
            type:"post",
            url: '/json/order/query/',
            data:{createTime:createTime,name:name},
            beforeSend:function(){
                $("#loading").show();
            },
            success: function(data){
                $("#loading").hide();
                data=jQuery.parseJSON(data).body;//将json数据转化为字符串
                var allHtml = '';//全部订单
                arr_catdata=[];
                for(var i= 0,j=data.length;i<j;i++){
                    var sT=data[i].stateType;
                    var rT=data[i].runType;
                    var pN=data[i].plateNum;
                    var gT=data[i].getGoodsTime;
                    var str_tb="";
                    if (gT==null){gT=""}
                    if (pN==null){pN=""}
                    if (rT==0){rT="直送"}
                    if (sT==0){sT="待处理"}
                    else if(sT==1){sT="已指派"}
                    else if(sT==2){sT="已接单"}
                    else if(sT==3){sT="已装货"}
                    else if(sT==4){sT="已签收"}
                    else if(sT==5){sT="异常订单"}
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
                    //显示全部订单;
                    allHtml +=str_tb;
                    arr_catdata.push(data[i].catNum);
                }
                $('.orderManage .tab_box tbody').html(allHtml);//默认显示待处理订单
                $(".orderManage .tab_box tfoot tr td:eq(1)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(2)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(3)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(11)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(12)")[0].innerHTML=0;
                tbody_ajust();
            }
        });
    });
    // 加载待处理订单
    $(".pendingList").click(function(){
        $(".saveall").css({"color": "rgba(255, 255, 255, 0)","background":"none"}).attr("disabled", true);
        if($("#btnGroup").attr("data-time")!==""){
            var c=$("#btnGroup").attr("data-time");
            var createTime=c.split(",");
            if(createTime.length==1){
                var createTime=createTime[0];
            }
        }else{
            var createTime=$("#getGoods").val();
        }
        var name=$("#name").val();
        $.ajax({
            type:"post",
            url: '/json/order/query/',
            data:{createTime:createTime,stateType:0,name:name},
            beforeSend:function(){
                $("#loading").show();
            },
            success: function(data){
                $("#loading").hide();
                data=jQuery.parseJSON(data).body;//将json数据转化为字符串
                var appendingHtml = '';//待处理订单
                arr_catdata=[];
                for(var i= 0,j=data.length;i<j;i++){
                    var sT=data[i].stateType;
                    var rT=data[i].runType;
                    var pN=data[i].plateNum;
                    var gT=data[i].getGoodsTime;
                    var str_tb="";
                    if (gT==null){gT=""}
                    if (pN==null){pN=""}
                    if (rT==0){rT="直送"}
                    if (sT==0){sT="待处理"}
                    else if(sT==1){sT="已指派"}
                    else if(sT==2){sT="已接单"}
                    else if(sT==3){sT="已装货"}
                    else if(sT==4){sT="已签收"}
                    else if(sT==5){sT="异常订单"}
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
                        '<td class="plateNum"><input class="carNum" catnum="' + data[i].catNum + '" value="' + pN + '"><ul></ul><button class="assign_this">指派</button></td>' +
                        '<td class="runType">' + rT + '</td>' +
                        '<td class="other"><input class="change_ tips_" value="'+data[i].other+'"></td>' +
                        '<td class="acceptPerson">'+data[i].acceptPerson+'</td>'+
                        '<td><div class="operate"><a>操作<span class="caret"></span></a> <span></span> <ul> <li><a class="editor" >编辑</a></li><li><a class="problem" data-toggle="modal" data-target="#orderproblem" >异常</a></li><li><a class="deleted"  data-toggle="modal" data-target="#orderdelet" >删除</a></li></ul></div></td>' +
                        '</tr>';
                    //显示待处理订单;
                    appendingHtml +=str_tb;
                    arr_catdata.push(data[i].catNum);
                }
                $('.orderManage .tab_box tbody').html(appendingHtml);//默认显示待处理订单
                $(".orderManage .tab_box tfoot tr td:eq(1)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(2)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(3)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(11)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(12)")[0].innerHTML=0;
                tbody_ajust();
            }
        });
    });
    //加载已指派订单
    $(".assignedList").click(function(){
        $(".saveall").css({"color": "rgba(255, 255, 255, 0)","background":"none"}).attr("disabled", true);
        if($("#btnGroup").attr("data-time")!==""){
            var c=$("#btnGroup").attr("data-time");
            var createTime=c.split(",");
            if(createTime.length==1){
                var createTime=createTime[0];
            }
            var name=$("#name").val();
        }else{
            var createTime=$("#getGoods").val();
        }
        $.ajax({
            type:"post",
            url: '/json/order/query/',
            data:{createTime:createTime,stateType:1,name:name},
            beforeSend:function(){
                $("#loading").show();
            },
            success: function(data){
                $("#loading").hide();
                data=jQuery.parseJSON(data).body;//将json数据转化为字符串
                var assignedHtml = '';//已指派订单
                arr_catdata=[];
                for(var i= 0,j=data.length;i<j;i++){
                    var sT=data[i].stateType;
                    var rT=data[i].runType;
                    var pN=data[i].plateNum;
                    var gT=data[i].getGoodsTime;
                    var str_tb="";
                    if (gT==null){gT=""}
                    if (pN==null){pN=""}
                    if (rT==0){rT="直送"}
                    if (sT==0){sT="待处理"}
                    else if(sT==1){sT="已指派"}
                    else if(sT==2){sT="已接单"}
                    else if(sT==3){sT="已装货"}
                    else if(sT==4){sT="已签收"}
                    else if(sT==5){sT="异常订单"}
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
                        '<td class="plateNum"><input class="carNum" catnum="' + data[i].catNum + '" value="' + pN + '" disabled="true"><button class="assign_this" disabled="true" style="color: rgba(255, 255, 255, 0);background: none">指派</button></td>' +
                        '<td class="runType">' + rT + '</td>' +
                        '<td class="other"><input class="change_ tips_" value="'+data[i].other+'"></td>' +
                        '<td class="acceptPerson">'+data[i].acceptPerson+'</td>'+
                        '<td><div class="operate"><a>操作<span class="caret"></span></a> <span></span> <ul> <li><a class="editor" >编辑</a></li><li><a class="problem" data-toggle="modal" data-target="#orderproblem" >异常</a></li><li><a class="deleted"  data-toggle="modal" data-target="#orderdelet" >删除</a></li></ul></div></td>' +
                        '</tr>';
                    //显示已指派订单;
                    assignedHtml +=str_tb;
                    arr_catdata.push(data[i].catNum);
                }
                $('.orderManage .tab_box tbody').html(assignedHtml);//默认显示已指派订单
                $(".orderManage .tab_box tfoot tr td:eq(1)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(2)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(3)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(11)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(12)")[0].innerHTML=0;
                tbody_ajust();
            }
        });
    });
    //加载已接单订单
    $(".connectedList").click(function(){
        $(".saveall").css({"color": "rgba(255, 255, 255, 0)","background":"none"}).attr("disabled", true);
        if($("#btnGroup").attr("data-time")!==""){
            var c=$("#btnGroup").attr("data-time");
            var createTime=c.split(",");
            if(createTime.length==1){
                var createTime=createTime[0];
            }
            var name=$("#name").val();
        }else{
            var createTime=$("#getGoods").val();
        }
        $.ajax({
            type:"post",
            url: '/json/order/query/',
            data:{createTime:createTime,stateType:2,name:name},
            beforeSend:function(){
                $("#loading").show();
            },
            success: function(data){
                $("#loading").hide();
                data=jQuery.parseJSON(data).body;//将json数据转化为字符串
                var connectedList = '';//已接单订单
                arr_catdata=[];
                for(var i= 0,j=data.length;i<j;i++){
                    var sT=data[i].stateType;
                    var rT=data[i].runType;
                    var pN=data[i].plateNum;
                    var gT=data[i].getGoodsTime;
                    var str_tb="";
                    if (gT==null){gT=""}
                    if (pN==null){pN=""}
                    if (rT==0){rT="直送"}
                    if (sT==0){sT="待处理"}
                    else if(sT==1){sT="已指派"}
                    else if(sT==2){sT="已接单"}
                    else if(sT==3){sT="已装货"}
                    else if(sT==4){sT="已签收"}
                    else if(sT==5){sT="异常订单"}
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
                        '<td class="plateNum"><input class="carNum" catnum="' + data[i].catNum + '" value="' + pN + '" disabled="true"><button class="assign_this" disabled="true" style="color: rgba(255, 255, 255, 0);background: none">指派</button></td>' +
                        '<td class="runType">' + rT + '</td>' +
                        '<td class="other"><input class="change_ tips_" value="'+data[i].other+'"></td>' +
                            '<td class="acceptPerson">'+data[i].acceptPerson+'</td>'+
                        '<td><div class="operate"><a>操作<span class="caret"></span></a> <span></span> <ul> <li><a class="editor" >编辑</a></li><li><a class="problem" data-toggle="modal" data-target="#orderproblem" >异常</a></li><li><a class="deleted"  data-toggle="modal" data-target="#orderdelet" >删除</a></li></ul></div></td>' +
                        '</tr>';
                    //显示已接单订单;
                    connectedList +=str_tb;
                    arr_catdata.push(data[i].catNum);
                }
                $('.orderManage .tab_box tbody').html(connectedList);//默认显示已接单订单
                $(".orderManage .tab_box tfoot tr td:eq(1)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(2)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(3)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(11)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(12)")[0].innerHTML=0;
                tbody_ajust();
            }
        });
    });
    //加载已装货订单
    $(".loadingList").click(function(){
        $(".saveall").css({"color": "rgba(255, 255, 255, 0)","background":"none"}).attr("disabled", true);
        if($("#btnGroup").attr("data-time")!==""){
            var c=$("#btnGroup").attr("data-time");
            var createTime=c.split(",");
            if(createTime.length==1){
                var createTime=createTime[0];
            }
            var name=$("#name").val();
        }else{
            var createTime=$("#getGoods").val();
        }
        $.ajax({
            type:"post",
            url: '/json/order/query/',
            data:{createTime:createTime,stateType:3,name:name},
            beforeSend:function(){
                $("#loading").show();
            },
            success: function(data){
                $("#loading").hide();
                data=jQuery.parseJSON(data).body;//将json数据转化为字符串
                var loadingList = '';//已装货订单
                arr_catdata=[];
                for(var i= 0,j=data.length;i<j;i++){
                    var sT=data[i].stateType;
                    var rT=data[i].runType;
                    var pN=data[i].plateNum;
                    var gT=data[i].getGoodsTime;
                    var str_tb="";
                    if (gT==null){gT=""}
                    if (pN==null){pN=""}
                    if (rT==0){rT="直送"}
                    if (sT==0){sT="待处理"}
                    else if(sT==1){sT="已指派"}
                    else if(sT==2){sT="已接单"}
                    else if(sT==3){sT="已装货"}
                    else if(sT==4){sT="已签收"}
                    else if(sT==5){sT="异常订单"}
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
                        '<td class="plateNum"><input class="carNum" catnum="' + data[i].catNum + '" value="' + pN + '" disabled="true"><button class="assign_this" disabled="true" style="color: rgba(255, 255, 255, 0);background: none">指派</button></td>' +
                        '<td class="runType">' + rT + '</td>' +
                        '<td class="other"><input class="change_ tips_" value="'+data[i].other+'"></td>' +
                        '<td class="acceptPerson">'+data[i].acceptPerson+'</td>'+
                        '<td><div class="operate"><a>操作<span class="caret"></span></a> <span></span> <ul> <li><a class="editor" >编辑</a></li><li><a class="problem" data-toggle="modal" data-target="#orderproblem" >异常</a></li><li><a class="deleted"  data-toggle="modal" data-target="#orderdelet" >删除</a></li></ul></div></td>' +
                        '</tr>';
                    //显示已装货订单;
                    loadingList +=str_tb;
                    arr_catdata.push(data[i].catNum);
                }
                $('.orderManage .tab_box tbody').html(loadingList);//默认显示已装货订单
                $(".orderManage .tab_box tfoot tr td:eq(1)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(2)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(3)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(11)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(12)")[0].innerHTML=0;
                tbody_ajust();
            }
        });
    });
    //加载已签收订单
    $(".signList").click(function(){
        $(".saveall").css({"color": "rgba(255, 255, 255, 0)","background":"none"}).attr("disabled", true);
        if($("#btnGroup").attr("data-time")!==""){
            var c=$("#btnGroup").attr("data-time");
            var createTime=c.split(",");
            if(createTime.length==1){
                var createTime=createTime[0];
            }
            var name=$("#name").val();
        }else{
            var createTime=$("#getGoods").val();
        }
        $.ajax({
            type:"post",
            url: '/json/order/query/',
            data:{createTime:createTime,stateType:4,name:name},
            beforeSend:function(){
                $("#loading").show();
            },
            success: function(data){
                $("#loading").hide();
                data=jQuery.parseJSON(data).body;//将json数据转化为字符串
                var signList = '';//已签收订单
                arr_catdata=[];
                for(var i= 0,j=data.length;i<j;i++){
                    var sT=data[i].stateType;
                    var rT=data[i].runType;
                    var pN=data[i].plateNum;
                    var gT=data[i].getGoodsTime;
                    var str_tb="";
                    if (gT==null){gT=""}
                    if (pN==null){pN=""}
                    if (rT==0){rT="直送"}
                    if (sT==0){sT="待处理"}
                    else if(sT==1){sT="已指派"}
                    else if(sT==2){sT="已接单"}
                    else if(sT==3){sT="已装货"}
                    else if(sT==4){sT="已签收"}
                    else if(sT==5){sT="异常订单"}
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
                        '<td class="plateNum"><input class="carNum" catnum="' + data[i].catNum + '" value="' + pN + '" disabled="true"><button class="assign_this" disabled="true" style="color: rgba(255, 255, 255, 0);background: none">指派</button></td>' +
                        '<td class="runType">' + rT + '</td>' +
                        '<td class="other"><input class="change_ tips_" value="'+data[i].other+'"></td>' +
                        '<td class="acceptPerson">'+data[i].acceptPerson+'</td>'+
                        '<td><div class="operate"><a>操作<span class="caret"></span></a> <span></span> <ul> <li><a class="editor" >编辑</a></li><li><a class="problem" data-toggle="modal" data-target="#orderproblem" >异常</a></li><li><a class="deleted"  data-toggle="modal" data-target="#orderdelet" >删除</a></li></ul></div></td>' +
                        '</tr>';
                    //显示已签收订单;
                    signList +=str_tb;
                    arr_catdata.push(data[i].catNum);
                }
                $('.orderManage .tab_box tbody').html(signList);//默认显示已签收订单
                $(".orderManage .tab_box tfoot tr td:eq(1)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(2)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(3)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(11)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(12)")[0].innerHTML=0;
                tbody_ajust();
            }
        });
    });
    //加载异常订单
    $(".abnormalList").click(function(){
        $(".saveall").css({"color": "rgba(255, 255, 255, 0)","background":"none"}).attr("disabled", true);
        if($("#btnGroup").attr("data-time")!==""){
            var c=$("#btnGroup").attr("data-time");
            var createTime=c.split(",");
            if(createTime.length==1){
                var createTime=createTime[0];
            }
            var name=$("#name").val();
        }else{
            var createTime=$("#getGoods").val();
        }
        $.ajax({
            type:"post",
            url: '/json/order/query/',
            data:{createTime:createTime,problem:1,name:name},
            beforeSend:function(){
                $("#loading").show();
            },
            success: function(data){
                $("#loading").hide();
                data=jQuery.parseJSON(data).body;//将json数据转化为字符串
                var abnormalList = '';//异常订单
                arr_catdata=[];
                for(var i= 0,j=data.length;i<j;i++){
                    var sT=data[i].stateType;
                    var rT=data[i].runType;
                    var pN=data[i].plateNum;
                    var gT=data[i].getGoodsTime;
                    var str_tb="";
                    if (gT==null){gT=""}
                    if (pN==null){pN=""}
                    if (rT==0){rT="直送"}
                    if (sT==0){sT="待处理"}
                    else if(sT==1){sT="已指派"}
                    else if(sT==2){sT="已接单"}
                    else if(sT==3){sT="已装货"}
                    else if(sT==4){sT="已签收"}
                    else if(sT==5){sT="异常订单"}
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
                    //显示异常订单;
                    abnormalList +=str_tb;
                    arr_catdata.push(data[i].catNum);
                }
                $('.orderManage .tab_box tbody').html(abnormalList);//默认显示异常订单
                $(".orderManage .tab_box tfoot tr td:eq(1)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(2)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(3)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(11)")[0].innerHTML=0;
                $(".orderManage .tab_box tfoot tr td:eq(12)")[0].innerHTML=0;
                tbody_ajust();
            }
        });
    });
    //清空时间查询
    $("#removeSearch").click(function(){
        $("#btnGroup").attr("data-time","");
        $("#getGoods").val(year+"-"+p(month)+"-"+p(date));
        $("#name").val("");
        tlist();
    });
    //取货时间查询筛选
    $("#getGoodsSearch").click(function () {
        $("#btnGroup").attr("data-time",$("#getGoods").val());
        $("#name").val("");
        tlist();
    });
    //获取司机车牌
    var all_carlist="";
    $.ajax({
        type:"post",
        url: "/json/getCat/",
        success:function (data) {
            data=jQuery.parseJSON(data).body;
            for (var plateNum in data){
                var ds=data[plateNum][1];
                    ds="<i style='color: red'></i>";
                    all_carlist+='<li class="a" data-userlist="'+data[plateNum][0]+'">'+plateNum+ds+'</li>'
            }
        }
    });
    //指派发布
    //单车次指派
    $("#orderTab tbody").on("click",".assign_this",function(){
        $("#oneul").css("display","none");
        var input_=$(this).prev().prev();
        var input_carnum=input_.val();
        var innerhtml=jQuery.parseHTML(all_carlist);
        var order_st=$(this).parent().parent().children(".stateType").text();
        for (var li_ in innerhtml){
            var str_a=innerhtml[li_].innerHTML.split("<")[0];
            if (input_carnum==str_a){
                var data_li=innerhtml[li_].getAttribute("data-userlist");
                input_.attr("data-userlist",data_li);
                break;
            }
            else {
                input_.removeAttr("data-userlist")
            }
        }
        var userlist=input_.attr("data-userlist");
        var user_list=[];
        var z=0;
        $("#orderTab tbody tr").find(".carNum").each(function(){
            if ($(this).val()==input_carnum){
                z++;
            }
        });
        if (z>1&&$(this).val()!=""){
            $("#promptBox").text("该车辆已被选择");
            $("#promptBox").addClass("warning");
            promptBox();
            return
        }
        if(userlist==undefined){
            $("#promptBox").text("请输入正确车牌");
            $("#promptBox").addClass("warning");
            promptBox();
            return
        }
        if (order_st=="已指派"||order_st=="已接单"||order_st=="已装货"||order_st=="已签收"){
            if (input_carnum!=""&&(input_carnum!=input_.attr("value"))){
                $("div.modal").attr("id","orderassign");
                $("div.modal h4").text("重新指派");
                $("div.modal .add").replaceWith("<div class='add'><p>是否重新选择指派车辆</p></div>");
                $(".confirm").unbind("click");
                $(".confirm").click(function(){
                    $("div.modal").attr("id","");
                    modal();
                    var user_li = userlist.split(",");
                    for(var i in user_li){
                        user_list.push(user_li[i])
                    }
                    var plateNum=input_.val();
                    var orderlist=[];
                    var tr_this=input_.parent().parent();//找到当前tr
                    var catNum_this=tr_this.attr("data-catNum");//当前列车次
                    orderlist.push(tr_this.attr("data-id"));
                    var tr_next=tr_this.nextAll();//找到当前tr之后所有tr
                    for( var i=0;i<tr_next.length;i++){
                        var id_num=tr_next[i].getAttribute('data-id');
                        var cat_num=tr_next[i].getAttribute('data-catNum');
                        if(cat_num!==catNum_this){
                            break;
                        }
                        orderlist.push(id_num);
                    }
                    $.ajax({
                        type:"post",
                        url:"/json/postCat/",
                        data:{"userList":user_list,"orderList":orderlist,"plateNum":plateNum},
                        success:function(data){
                            var status=jQuery.parseJSON(data).status;
                            var message=jQuery.parseJSON(data).message;
                            promptBox();
                            if(status==200){
                                $("#promptBox").text("指派成功");
                                warningClass();
                                tlist();
                                //setTimeout(tlist,3000);
                            }else if(status>=400){
                                $("#promptBox").text(message);
                                $("#promptBox").addClass("warning");
                            }
                        },
                        error:function(){
                            $("#promptBox").text("指派失败");
                            $("#promptBox").addClass("warning");
                            promptBox();
                        }
                    });
                });
                $(".cancel").click(function(){
                    modal();
                });
                $(".modal-header .close span").click(function(){
                    modal();
                });
                return
            }
            else {
                return
            }
        }
        else {
            var user_li = userlist.split(",");
            for(var i in user_li){
                user_list.push(user_li[i])
            }
            var plateNum=input_.val();
            var orderlist=[];
            var tr_this=input_.parent().parent();//找到当前tr
            var catNum_this=tr_this.attr("data-catNum");//当前列车次
            orderlist.push(tr_this.attr("data-id"));
            var tr_next=tr_this.nextAll();//找到当前tr之后所有tr
            for( var i=0;i<tr_next.length;i++){
                var id_num=tr_next[i].getAttribute('data-id');
                var cat_num=tr_next[i].getAttribute('data-catNum');
                if(cat_num!==catNum_this){
                    break;
                }
                orderlist.push(id_num);
            }
            $.ajax({
                type:"post",
                url:"/json/postCat/",
                data:{"userList":user_list,"orderList":orderlist,"plateNum":plateNum},
                success:function(data){
                    var status=jQuery.parseJSON(data).status;
                    var message=jQuery.parseJSON(data).message;
                    promptBox();
                    if(status==200){
                        $("#promptBox").text("指派成功");
                        warningClass();
                        tlist();
                        //setTimeout(tlist,3000);
                    }else if(status>=400){
                        $("#promptBox").text(message);
                        $("#promptBox").addClass("warning");
                    }
                },
                error:function(){
                    $("#promptBox").text("指派失败");
                    $("#promptBox").addClass("warning");
                    promptBox();
                }
            });
        }
    });
    //批量指派
    $("#assign").click(function(){
        // 根据颜色改变判断指派
        // 获取指派车次
        // 循环获取指派车次id
        // 根据.carNum获取plateNum
        // 对应userlist，
        var a=0;
        $("#orderTab tbody tr").find("button.saveNum").each(function(){
            if ($(this).attr("disabled")!="disabled"){a++;}
        });
        if (a>0){
            $("#promptBox").text("请先提交保存");
            $("#promptBox").addClass("warning");
            promptBox();
        }
        else {
            var order=[];
            var order_={};
            var x=0;
            var y=[];
            var innerhtml=jQuery.parseHTML(all_carlist);
            $(".orderManage tbody tr .carNum").each(function(index){
                var next_btn=$(this).next().next(".assign_this");
                var l=index;
                if (($(this).css("color")=="rgb(255, 0, 0)")&&(next_btn.length!=0)
                    //|| (!($(this).val()=="")&&next_btn.length!=0)
                )
                {
                    var order_list=[];
                    var platename=$(this).val();
                    var platenum={plateNum:platename};
                    var order_l=[];
                    var up_catnum=$(this).attr("catnum");
                    //循环tr
                        //获取订单id
                    $(".orderManage tbody tr").find("td:eq(1)").each(function(){
                        if ($(this).children("input").val()==up_catnum){
                            var order_id=$(this).parent("tr").attr("data-id");
                            order_list.push(order_id)
                        }
                    });
                        //判断车牌是否重复
                    $(".orderManage tbody tr .carNum").each(function(index){
                        if ($(this).val()==platename&&platename!=""){
                            if (l!=index){
                                x++;
                            }
                        }
                    });
                        //判断车牌是否存在
                    for (var i in innerhtml){
                        var str=innerhtml[i].innerHTML.split("<")[0];
                        if (str==platename){
                            y.push(0);
                        }
                    }
                    //当前司机车牌对应的司机列表，订单列表，
                    order_list={orderList:order_list};
                    order_l.push(order_list,platenum/*,user_list*/);
                    order.push(order_l);
                }
            });
            for (var i = 0; i < order.length; i++) {
                order_[i]=order[i]
            }
            if (x>0){
                $("#promptBox").text("车牌重复选择");
                $("#promptBox").addClass("warning");
                promptBox();
                return
            }
            if (y.length!=order.length){
                $("#promptBox").text("请输入正确车牌");
                $("#promptBox").addClass("warning");
                promptBox();
                return
            }
            else {
                var last=JSON.stringify(order);
                $.ajax({
                    type:"post",
                    url:"/json/batchPostCat/",
                    data:{data:last},
                    //traditional: true,
                    success:function(data){
                        var status=jQuery.parseJSON(data).status;
                        var message=jQuery.parseJSON(data).message;
                        promptBox();
                        if(status==200){
                            $("#promptBox").text("指派成功");
                            warningClass();
                            tlist();
                            // setTimeout(tlist,3000);
                        }else if(status>=400){
                            $("#promptBox").text(message);
                            $("#promptBox").addClass("warning");
                        }
                    },
                    error:function(){
                        $("#promptBox").text("指派失败");
                        $("#promptBox").addClass("warning");
                        promptBox();
                    }
                })
            }
        }
    });
    //点击保存
    //单独保存
    $("#orderTab tbody").on("click",".saveNum",function(e){
        e.preventDefault();//阻止默认事件
        var id=$(this).parent().parent().attr("data-id");
        var save_data={id:id};
        var this_tr=$(this).parent().parent();
        this_tr.find(".change_").each(function(){
            if ($(this).attr("value")!=$(this).val()){
                save_data[$(this).parent("td").attr("class")]=$(this).val();
            }
        });
        var n=0;
        for (var i in save_data){
            n++;
        }
        if (n>1){
            $.ajax({
                type:"post",
                url:"/json/order/update/",
                data:save_data,
                success:function(data){
                    var status=jQuery.parseJSON(data).status;
                    var message=jQuery.parseJSON(data).message;
                    promptBox();
                    if(status==200){
                        $("#promptBox").text("保存成功");
                        warningClass();
                        tlist();
                        //setTimeout(tlist,3000);
                    }else if(status>=400){
                        $("#promptBox").text(message);
                        $("#promptBox").addClass("warning");
                    }
                },
                error:function(){
                    $("#promptBox").text("保存失败");
                    $("#promptBox").addClass("warning");
                    promptBox();
                }
            });
        }
    });
    //批量保存
    $(".saveall").click(function(){
        var data_=[];
        $("#orderTab tbody").find(".saveNum").each(function(){
            if($(this).attr("disabled")==undefined){
                var this_tr=$(this).parent().parent("tr");
                var id_=this_tr.attr("data-id");
                var data_li={id:id_};
                this_tr.find(".change_").each(function(){
                    if($(this).attr("value")!=$(this).val()){
                        data_li[$(this).parent("td").attr("class")]=$(this).val();
                    }
                });
                data_.push(data_li);
            }
        });
        var last=JSON.stringify(data_);
        $.ajax({
            type:"post",
            url:"/json/order/batchUpdate/",
            data:{data:last},
            success:function(data){
                var status=jQuery.parseJSON(data).status;
                var message=jQuery.parseJSON(data).message;
                promptBox();
                if(status==200){
                    $("#promptBox").text("保存成功");
                    warningClass();
                    tlist();
                    //setTimeout(tlist,3000);
                }else if(status>=400){
                    $("#promptBox").text(message);
                    $("#promptBox").addClass("warning");
                }
            }
        });
    });
    //input联想功能
    $("#orderTab tbody").on("focus",".carNum",function (){
        //如果当前输入框获取焦点，且页面其他ul有内容，隐藏其他ul，
        var ul_=$("#orderTab tbody tr").find("ul#oneul");
        if (ul_.length>0){
            $(".orderManage .tab_box tbody tr").find("ul#oneul").each(function(){
                $("#oneul").children("li").each(function(){
                    var str_o=$(this)[0].innerHTML.split("<")[0];
                    $(this).children("i").html("");
                    $(this).css({
                        "background":"#f7f7f7",
                        "color":"rgb(51, 51, 51)"
                    });
                    $(this).children("i").css("color","red")
                });
                $(this).removeAttr("id").css("display","none");
            });
        }
        var putin=$(this).next("ul");
        putin.attr("id","oneul");
        putin.css("display","block");
        var new_str=$(this).val();
        var str_=$(this).attr("value");
        $(this).next().children("li").each(function(){
            $(this).parent("ul").css("display","block");
            if($(this)[0].innerHTML.indexOf(new_str)>=0){
                $(this).show();
            }else{
                $(this).hide();
            }
        });

        $("#orderTab tbody tr .carNum").each(function(){
            var str_i=$(this)[0].value;
            $("#oneul").children("li").each(function(){
                var str_o=$(this)[0].innerHTML.split("<")[0];
                if(str_o==str_i){
                    $(this).children("i").html("（已选择）");
                    $(this).css({
                        "color":"#000",
                        "background":"#fff"
                    });
                    $(this).children("i").css("color","red");
                    var lastchild_=$(this).parent().children("li").last();
                    $(this).insertAfter(lastchild_)
                }
                else {
                }
            })
        });
    });
    $("#orderTab tbody").on("keyup",".carNum",function(){
        var new_str=$(this).val();
        var str_=$(this).attr("value");
        if (new_str==str_){$(this).css("color","black");}
        else {$(this).css("color","red")}
        $(this).next().children("li").each(function(){
            $(this).parent("ul").css("display","block");
            if($(this)[0].innerHTML.indexOf(new_str)>=0){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
        var z=0;
        $("#orderTab tbody").find(".carNum").each(function(){
            var str_c=$(this).val();
            $("#oneul").children("li").each(function(){
                var str_o=$(this)[0].innerHTML.split("<")[0];
                if (str_o==str_c){
                    $(this).children("i").html("（已选择）");
                    z++;
                }
                else {
                    $(this).children("i").html("");
                    $(this).css({
                        "background":"#f7f7f7",
                        "color":"rgb(51, 51, 51)"
                    });
                    $(this).children("i").css("color","red")
                }
            })
        });
        $("#orderTab tbody tr .carNum").each(function(){
            var str_i=$(this)[0].value;
            $("#oneul").children("li").each(function(){
                var str_o=$(this)[0].innerHTML.split("<")[0];
                if(str_o==str_i){
                    $(this).children("i").html("（已选择）");
                    $(this).css({
                        "color":"#000",
                        "background":"#fff"
                    });
                    $(this).children("i").css("color","red");
                    var lastchild_=$(this).parent().children("li").last();
                    $(this).insertAfter(lastchild_)
                }
                else {
                }
            })
        });
    });
    $(document).keyup(function(e){
        if ($("#oneul").css("display","block")){
            //回车
            if (e.keyCode==13){
                var list_item=[];
                var userlist="";
                $("#oneul").children("li").each(function(){
                    if(($(this).css("display")=="list-item")&&$(this).children("i").html()==""){
                        var lis=$(this)[0].innerHTML;
                        list_item.push(lis);
                        var str_list=$(this).attr("data-userlist");
                        userlist=str_list;
                    }
                    else {}
                });
                $("#oneul").prev(".carNum").attr("data-userlist",userlist);
                $("#oneul").prev(".carNum").val(list_item[0].split("<")[0]);
                var str_a=$("#oneul").prev(".carNum").val();
                if (str_a==($("#oneul").prev(".carNum").attr("value"))){}
                else {
                    $("#oneul").prev(".carNum").css("color","red");
                }
                $("#oneul").css("display","none");
            }
        }
    });
    $("#orderTab tbody").on("click",".a",function(){
        var carNum=$(this).html();
        //添加属性
        //var userlist=$(this).attr("data-userlist");
        //$(this).parent().prev().attr("data-userlist",userlist);
        if ($(this).css("background-color")=="rgb(255, 255, 255)"){}
        else {

            $(this).parent().prev().val(carNum.split("<")[0]);
            var str_a=$("#oneul").prev(".carNum").val();
            if (str_a==($("#oneul").prev(".carNum").attr("value"))){}
            else {
                $("#oneul").prev(".carNum").css("color","red");
            }
            //隐藏并清空ul；
            var putin=$(this).parent("ul");
            putin.css("display","none");
            putin.removeAttr("id");
        }
    });
    $("#orderTab tbody").on("mouseover",".a",function(){
        if ($(this).children("i").html()==""){
            $(this).css("background-color","#f60");
            $(this).css("color","#f7f7f7");
            $(this).children("i").css("color","#f7f7f7");
        }
        else if ($(this).children("i").html()=="（已选择）"){

        }
    });
    $("#orderTab tbody").on("mouseleave",".a",function(){
        if ($(this).children("i").html()==""){
            $(this).children("i").css("color","red");
            $(this).css("background-color","#f7f7f7");
            $(this).css("color","rgb(51, 51, 51)");
        }
        else if ($(this).children("i").html()=="（已选择）"){

        }
    });
    //input修改时字体变红
    //显示保存,
    $("#orderTab tbody").on("keyup",".change_",function(e){
        e.preventDefault();
        if ($(this).attr("value") != $(this).val()) {
            $(this).css("color", "red");
            $(this).parent().prevAll().last().children("button").css({"color":"#fff","background":"#2e8fea"}).attr("disabled", false);
        }
        else {$(this).css("color", "#000");}
        var x=0;
        $(this).parent().parent("tr").find(".change_").each(function(){
            if ($(this).css("color")=="rgb(255, 0, 0)"){x++;}
            else {}
        });
        if (x==0){
            $(this).parent().prevAll().last().children("button").css({"color":"rgba(255, 255, 255, 0)","background":"none"}).attr("disabled", true);
        }
        var i = 0;
        $("#orderTab tbody tr").find(".change_").each(function () {
            if ($(this).css("color") == "rgb(255, 0, 0)") {i++;}
        });
        if (i > 0) {
            $(".saveall").css("color", "#fff").attr("disabled", false);
            $(".saveall").css("background","#2e8fea")
        }
        else if (i == 0) {
            $(".saveall").css("color", "rgba(255, 255, 255, 0)").attr("disabled", true);
            $(".saveall").css("background","none")
        }
    });
    $("#orderTab tbody").on("blur",".num_",function(){
        if ($(this).val()==""){
            $("#promptBox").text("不能为空！");
            promptBox();
            modal();
            $(this).val($(this).attr("value"));
            $(this).css("color","#000");
        }
        var x=0;
        $(this).parent().parent("tr").find(".change_").each(function(){
            if ($(this).css("color")=="rgb(255, 0, 0)"){x++;}
            else {}
        });
        if (x==0){
            $(this).parent().prevAll().last().children("button").css({"color":"rgba(255, 255, 255, 0)","background":"none"}).attr("disabled", true);
        }
        var i = 0;
        $("#orderTab tbody tr").find(".change_").each(function () {
            if ($(this).css("color") == "rgb(255, 0, 0)") {i++;}
        });
        if (i > 0) {
            $(".saveall").css("color", "#fff").attr("disabled", false);
            $(".saveall").css("background","#2e8fea")
        }
        else if (i == 0) {
            $(".saveall").css("color", "rgba(255, 255, 255, 0)").attr("disabled", true);
            $(".saveall").css("background","none")
        }
    });
    //删除订单
    $("#orderTab tbody").on("click",".deleted",function(){
        var tr_this=$(this).parent().parent().parent().parent().parent();
        var delete_id=tr_this.attr("data-id");
        var delete_catnum=tr_this.children(".catNum").children(".change_").val();
        var delete_tran=tr_this.children(".tranNum").children(".change_").val();
        var delete_place=tr_this.children(".placeNum").children(".change_").val();
        $("div.modal").attr("id","orderdelet");
        $("div.modal h4").text("删除订单");
        $("div.modal .add").replaceWith("<div class='add'><p>是否删除第<b style='color: red'>"+delete_catnum+"</b>车第<b style='color: red'>"+delete_tran+"</b>趟第<b style='color: red'>"+delete_place+"</b>项任务的订单？</p></div>");
        $(".confirm").unbind("click");
        $(".confirm").click(function(){
            $("div.modal").attr("id","");
            modal();
            $.ajax({
                type:"post",
                url:"json/order/delete/",
                data: {id: delete_id},
                success: function () {
                    $("#promptBox").text("删除成功");
                    warningClass();
                    promptBox();
                    tlist();
                    //setTimeout(tlist,3000);
                }
            });
        });
        $(".cancel").click(function(){
            modal();
        });
        $(".modal-header .close span").click(function(){
            modal();
        });
    });
    //编辑订单
    $("#orderTab tbody").on("click",".editor",function(){
        var tr_this=$(this).parent().parent().parent().parent().parent();
        var edit_id=tr_this.attr("data-id");
        var sendPhoneNumber=tr_this.children(".sendName").attr("send-num");
        var sendAddress=tr_this.children(".sendName").attr("send-add");
        var sendCode=tr_this.children(".sendName").attr("send-code");
        var receivePhoneNumber=tr_this.children(".receiveName").attr("re-num");
        var receiveAddress=tr_this.children(".receiveName").attr("re-add");
        var receiveCode=tr_this.children(".receiveName").attr("re-code");
        var sendName=tr_this.children(".sendName").text();
        var receiveName=tr_this.children(".receiveName").text();
        var catNum=tr_this.children(".catNum").children(".change_").val();
        var tranNum=tr_this.children(".tranNum").children(".change_").val();
        var placeNum=tr_this.children(".placeNum").children(".change_").val();
        var other=tr_this.children(".other").children(".change_").val();
        var getGoodsDate=tr_this.children(".getGoodsDate").text();
        var getGootsTime=tr_this.children(".getGoodsTime").text();
        var fe=tr_this.children(".fe").text();
        var box=tr_this.children(".box").text();
        var lastDate=tr_this.children(".lastDate").text();
        var lastTime=tr_this.children(".lastTime").text();
        var runType=tr_this.children(".runType").text();
        var plateNum=tr_this.attr("plate-num");
        var stateType=tr_this.children(".stateType").text();
        var acceptPerson=tr_this.children(".acceptPerson").text();
        $("#order").removeClass("active");
        $("#create").addClass("active");
        $("#create").load("/createform/",function(){
            $("#catNum").attr("value",catNum);
            $("#tranNum").attr("value",tranNum);
            $("#placeNum").attr("value",placeNum);
            $("#getGoodsDate").val(getGoodsDate);
            $("#getGoodsDate").attr("value",getGoodsDate);
            $("#getGoodsTime").attr("value",getGootsTime);
            $("#fe").attr("value",fe);
            $("#box").attr("value",box);
            $("#lastDate").val(lastDate);
            $("#lastDate").attr("value",lastDate);
            $("#lastTime").attr("value",lastTime);
            $("#runType").attr("value",runType);
            $("#plateNum").attr("value",plateNum);
            $("#other").attr("value",other);
            $("#sendName").attr("value",sendName);
            $("#receiveName").attr("value",receiveName);
            $("#sendPhoneNumber").attr("value",sendPhoneNumber);
            $("#sendAddress").attr("value",sendAddress);
            $("#sendCode").attr("value",sendCode);
            $("#receivePhoneNumber").attr("value",receivePhoneNumber);
            $("#receiveAddress").attr("value",receiveAddress);
            $("#receiveCode").attr("value",receiveCode);
            var editorder_id=edit_id;
            $("#saveOrder").attr("update",editorder_id);
            if (stateType=="已签收"){
                $("#saveOrder").attr("accept",acceptPerson);
                    var acceptname=$("#saveOrder").attr("accept");
                    var prehtml=$("#dispatch").html();
                    var accepthtml="<span><label for='acceptPerson'>签收人</label><input type='text' name='acceptPerson' id='acceptPerson' value='"+acceptname+"'></span>";
                    $("#dispatch").html(prehtml+accepthtml)
            }
        });
    });
    //添加异常订单
    $("#orderTab tbody").on("click",".problem",function(){
        var tr_this=$(this).parent().parent().parent().parent().parent();
        var problem_id=tr_this.attr("data-id");
        var delete_catnum=tr_this.children(".catNum").children(".change_").val();
        var delete_tran=tr_this.children(".tranNum").children(".change_").val();
        var delete_place=tr_this.children(".placeNum").children(".change_").val();
        $("div.modal").attr("id","orderproblem");
        $("div.modal h4").text("标记异常");
        $("div.modal .add").replaceWith("<div class='add'><p>是否将第<b style='color: red'>"+delete_catnum+"</b>车第<b style='color: red'>"+delete_tran+"</b>趟第<b style='color: red'>"+delete_place+"</b>项任务的订单标记为异常？</p></div>");
        $(".confirm").unbind("click");
        $(".confirm").click(function(){
            $("div.modal").attr("id","");
            modal();
            $.ajax({
                type:"post",
                url:"/json/order/update/",
                data:{id:problem_id,problem:1},
                success:function(data){//成功执行代码
                    $("#promptBox").text("已标记为异常订单");
                    warningClass();
                    promptBox();
                    tlist();
                    //setTimeout(tlist,3000);
                },
                error:function(){
                    modal();
                }
            });
        });
        $(".cancel").click(function(){
            modal();
        });
        $(".modal-header .close span").click(function(){
            modal();
        });
    });
    //合并单元格
    function unique(){
        var car_len=[];//每组车次的长度
        var arr_x=[];//每组车次的第一项的index
        var i= 0,l= 1;
        $("#orderTab tbody tr").find("td:eq(12)").each(function(index) {
            var t=$("#orderTab tbody tr")[index].getAttribute("data-catnum");//每列对应的车次
            if (index==0){arr_x.push(0)}
            if (t == arr_catdata[index+1]) {l++;}
            else {
                car_len.push(l);l=1;
                arr_x.push(index+1);//车次不同的序号
            }
        });
        $("#orderTab tbody tr").find("td:eq(12)").each(function(index){
            if(index==arr_x[i]){
                $(this).next(".plateNum").attr("rowspan", car_len[i]);
                i++;
            }
            else {
                $(this).next(".plateNum").remove();
            }
        });
    }
    function tlist(){
        var a=$(".orderManage li.active").attr("data-index");
        var createTime=$("#getGoods").val();
        if(a==10){
            $("#getGoods").val(createTime);
            $(".allList").trigger("click");
        } else if (a==0) {
            $("#getGoods").val(createTime);
            $(".pendingList").trigger("click");
        } else if (a==1) {
            $("#getGoods").val(createTime);
            $(".assignedList").trigger("click");
        } else if (a==2) {
            $("#getGoods").val(createTime);
            $(".connectedList").trigger("click");
        } else if (a==3) {
            $("#getGoods").val(createTime);
            $(".loadingList").trigger("click");
        }else if (a==4) {
            $("#getGoods").val(createTime);
            $(".signList").trigger("click");
        }else if (a==5) {
            $("#getGoods").val(createTime);
            $(".abnormalList").trigger("click");
        }
        $(".saveall").css("color","rgba(255, 255, 255, 0)").attr("disabled",true);
    }
    function add_tr(){
        $("#orderTab tbody").append("<tr id='extra'><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>")
    }
    function tbody_ajust(){
        null_();
        unique();
        total();
        bg_catNum();
        order_();
        input_num();
        add_tr();
        getcarlist();
    }
});
