/**
 * Created by Administrator on 2017/3/7.
 */
$(function(){

    screenHeight();
    function p(s) {return s < 10 ? '0' + s: s;}
    var myDate = new Date();
    var year=myDate.getFullYear();
    var month=myDate.getMonth()+1;
    var date=myDate.getDate();
    $(".goodsDelay .time").val(year+"-"+p(month)+"-"+p(date));
    $(".goodsDelay .pull-right .btn").click(function(){
        $(this).addClass('active').siblings('.active').removeClass('active');
        var fliterTime=$(this).attr("id");
        if (fliterTime=="sendGoodsTime"){
            senddata();
        }
        else if(fliterTime=="getGoodsTime"){
            getdata();
        }
        /*if ($(".st_time").val()==$(".et_time").val()){
            var createTime=$(".et_time").val();
        }
        else if ($(".st_time").val()!=$(".et_time").val()){
            var createTime=[$(".st_time").val(),$(".et_time").val()];
        }*/
    });
    $("#goodsSearch").click(function(){
        var st_time=$(".st_time").val();
        var et_time=$(".et_time").val();
        st_time=new Date(st_time);
        et_time=new Date(et_time);
        st_time=st_time.getTime();
        et_time=et_time.getTime();
        if(et_time<st_time){
            $("#promptBox").text("结束时间不能小于开始时间！");
            $("#promptBox").addClass("warning");
            promptBox();
            $(".goodsDelay .time").val(year+"-"+p(month)+"-"+p(date));
            return
        }
        var fliterTime=$(".goodsDelay .active").attr("id");
        if (fliterTime=="sendGoodsTime"){
            senddata();
        }
        else if(fliterTime=="getGoodsTime"){
            getdata();
        }
    });
    $("#goodsEmpty").click(function(){
        var fliterTime=$(".goodsDelay .active").attr("id");
        $(".goodsDelay .time").val(year+"-"+p(month)+"-"+p(date));
        if (fliterTime=="sendGoodsTime"){
            senddata();
        }
        else if(fliterTime=="getGoodsTime"){
            getdata();
        }
    });
    $(".goodsDelay tbody").on("click",".order_delete",function(){
        var tr_this=$(this).parent().parent();
        var delete_id=tr_this.attr("data-id");
        var delete_type=tr_this.attr("data-type");
        $("div.modal").attr("id","orderdelet");
        $("div.modal h4").text("删除订单");
        $("div.modal .add").replaceWith("<div class='add'><p>是否删除此订单？</p></div>");
        $(".confirm").unbind("click");
        $(".confirm").click(function(){
            $("div.modal").attr("id","");
            modal();
            $.ajax({
                type:"post",
                url:"json/deleteActiveTimeout/",
                data: {id: delete_id,type:delete_type},
                beforeSend:function(){
                    $("#loading").show();
                },
                success: function () {
                    $("#loading").hide();
                    $("#promptBox").text("删除成功");
                    warningClass();
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
        setTimeout(goodsdelay,3000);
    });
    function senddata(){
        if ($(".st_time").val()==$(".et_time").val()){
            var createTime=$(".et_time").val();
        }
        else if ($(".st_time").val()!=$(".et_time").val()){
            var createTime=[$(".st_time").val(),$(".et_time").val()];
        }
        var str_send="";
        $.ajax({
            type:"post",
            url:"/json/activeTimeout/",
            data:{createTime:createTime},
            beforeSend:function(){
                $("#loading").show();
            },
            success:function (data) {
                $("#loading").hide();
                data=jQuery.parseJSON(data).body;
                var data_get=data[1];
                for (var i in data_get){
                    var sT=data_get[i].stateType;
                    if (sT==0){sT="待处理"}
                    else if(sT==1){sT="已指派"}
                    else if(sT==2){sT="已接单"}
                    else if(sT==3){sT="已装货"}
                    else if(sT==4){sT="已签收"}
                    else if(sT==5){sT="异常订单"}
                    var data_index=parseInt(i)+1;
                    str_send+="<tr data-id="+data_get[i].id+" data-st="+data_get[i].problem+" data-type='1'>" +
                        "<td class='index'>"+data_index+"</td>"+
                        "<td class='createTime'>"+data_get[i].createTime+"</td>" +
                        "<td class='catNum'>"+data_get[i].catNum+"-"+data_get[i].tranNum+"-"+data_get[i].placeNum+"</td>"+
                        "<td class='sendName' title='"+data_get[i].sendName+"'><div>"+data_get[i].sendName+"</div></td>"+
                        "<td class='receiveName' title='"+data_get[i].receiveName+"'><div>"+data_get[i].receiveName+"</div></td>"+
                        "<td class='lastDate'>"+data_get[i].lastDate+"</td>"+
                        "<td class='lastTime'>"+data_get[i].lastTime+"</td>"+
                        "<td class='fe_box'>"+data_get[i].fe+"-"+data_get[i].box+"</td>"+
                        "<td class='stateType'>"+sT+"</td>"+
                        "<td class='plateNum'>"+data_get[i].plateNum+"</td>"+
                        "<td class='receiveFormPerson'>"+data_get[i].receiveFormPerson+"</td>"+
                        "<td class='getStartTime'>"+data_get[i].sendStartTime+"</td>"+
                        "<td class='getEndTime'>"+data_get[i].sendEndTime+"</td>"+
                        "<td class='getTime'>"+data_get[i].sendTime+" 分钟</td>"+
                        "<td class='delete'><a class='order_delete' data-toggle='modal' data-target='#orderdelet'>删除</a></td>"+
                        "</tr>"
                }
                $(".goodsDelay tbody").html(str_send);
                null_();
            }
        });
    }
    function getdata(){
        var str_get="";
        var st_time=$(".st_time").val();
        var et_time=$(".et_time").val();
        if ($(".st_time").val()==$(".et_time").val()){
            var createTime=$(".et_time").val();
        }
        else if ($(".st_time").val()!=$(".et_time").val()){
            var createTime=[$(".st_time").val(),$(".et_time").val()];
        }
        $.ajax({
            type:"post",
            url:"/json/activeTimeout/",
            data:{createTime:createTime},
            beforeSend:function(){
                $("#loading").show();
            },
            success:function (data) {
                $("#loading").hide();
                data=jQuery.parseJSON(data).body;
                var data_get=data[0];
                for (var i in data_get){
                    var sT=data_get[i].stateType;
                    if (sT==0){sT="待处理"}
                    else if(sT==1){sT="已指派"}
                    else if(sT==2){sT="已接单"}
                    else if(sT==3){sT="已装货"}
                    else if(sT==4){sT="已签收"}
                    else if(sT==5){sT="异常订单"}
                    var data_index=parseInt(i)+1;
                    str_get+="<tr data-id="+data_get[i].id+" data-st="+data_get[i].problem+" data-type='0'>" +
                        "<td class='index'>"+data_index+"</td>"+
                        "<td class='createTime'>"+data_get[i].createTime+"</td>" +
                        "<td class='catNum'>"+data_get[i].catNum+"-"+data_get[i].tranNum+"-"+data_get[i].placeNum+"</td>"+
                        "<td class='sendName' title='"+data_get[i].sendName+"'><div>"+data_get[i].sendName+"</div></td>"+
                        "<td class='receiveName' title='"+data_get[i].receiveName+"'><div>"+data_get[i].receiveName+"</div></td>"+
                        "<td class='lastDate'>"+data_get[i].lastDate+"</td>"+
                        "<td class='lastTime'>"+data_get[i].lastTime+"</td>"+
                        "<td class='fe_box'>"+data_get[i].fe+"-"+data_get[i].box+"</td>"+
                        "<td class='stateType'>"+sT+"</td>"+
                        "<td class='plateNum'>"+data_get[i].plateNum+"</td>"+
                        "<td class='receiveFormPerson'>"+data_get[i].receiveFormPerson+"</td>"+
                        "<td class='getStartTime'>"+data_get[i].getStartTime+"</td>"+
                        "<td class='getEndTime'>"+data_get[i].getEndTime+"</td>"+
                        "<td class='getTime'>"+data_get[i].getTime+" 分钟</td>"+
                        "<td class='delete'><a class='order_delete' data-toggle='modal' data-target='#orderdelet'>删除</a></td>"+
                        "</tr>"
                }
                $(".goodsDelay tbody").html(str_get);
                null_();
            }
        });
    }
    getdata();
});