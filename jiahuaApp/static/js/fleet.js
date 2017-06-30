$(function(){
    //功能1：我的车队与外协车队之间切换
    $(".table_nav>li").click(function(e){
        e.preventDefault();
        $(this).addClass("active").siblings(".active").removeClass('active');
    });
    screenHeight();
    //功能2：车队信息管理
    $.ajax({
        type:"post",
        url: '/json/cat/army/query',
        success: function(data){
            data=jQuery.parseJSON(data).body;//将json数据转化为字符串
            //车队列表
            var html = '';
            for(var i=0;i<data.length;i++){
                var d=i+1;
                html += '<tr data-id="'+data[i].id+'" ><td>'+d+'</td><td>'+data[i].name+'</td><td>'+data[i].head+'</td> <td>'+data[i].phoneNumber+'</td> <td> <div class="operate"> <a>操作 <span class="caret"></span> </a> <span></span> <ul> <li><a href="#driver" class="manage">管理</a></li> <li><a data-toggle="modal" data-target="#fleet_edit" class="cat_name">编辑</a></li><li><a data-toggle="modal" data-target="#fleet_delete"  class="delete">删除</a></li>';
            }
            $('.tab_box tbody').html(html);//将数据加载到页面
        }
    });
    //功能3：点击新增车队添加车队
    $("#fleet_btn").click(function (e) {
        e.preventDefault();
        var data=$('#form_fleet').serialize();
        var name=$("#name").val();
        var head=$("#head").val();
        var phoneNumber=$("#phoneNumber").val();
        $.ajax({
            type:"post",
            url:"/json/cat/army/create",
            data:data,
            success:function(){
               if(name!==""&&head!==""&&phoneNumber!==""){
                   $("#promptBox").text("创建成功");
                   promptBox();
                   cat();
                   warningClass();
               }else{
                   $("#promptBox").text("当前表单不能有空项");
                   $("#promptBox").addClass("warning");
                   promptBox();
               }
            }
        });
    });
    modal();

    var tbody=$(".tab_box tbody");
    //功能5：点击编辑修改车队名称
    tbody.on("click",".cat_name",function (e) {
        e.preventDefault();//阻止默认事件
        var index=$(this).parents("tr").attr("data-id");//给tr添加data-id属性
        $("#changename").attr("data-index",index);//确定键添加data-index属性，
        $("#changename").click(function () {
            var id=$(this).attr("data-index");
            var name=$("#catName").val();
            $.ajax({
                type:"post",
                url:"/json/cat/army/changename",
                data:{id:id,name:name},//将id,修改的车队名称传给后台数据
                success:function(){
                    $("#promptBox").text("修改成功");
                    warningClass();
                    promptBox();
                    cat();
                }
            });
        });
        modal();
    });
    //功能6：点击删除，删除车队信息
    tbody.on("click",".delete",function(e){
        e.preventDefault();//阻止默认事件
        var index=$(this).parents("tr").attr("data-id");//给tr添加data-id属性
        $("#cat_delete").attr("data-index",index);//确定键添加data-index属性，
        //点击确定键删除信息
        $("#cat_delete").click(function(){
            var id=$(this).attr("data-index");
            $.ajax({
                type:"post",
                url:"/json/cat/army/delete",
                data:{id:id},//将id传给后台数据
                success:function(){
                    //$(".tab_box tbody>tr").remove("tr[data-id="+id+"]");//删除页面数据
                    $("#promptBox").text("删除成功");
                    warningClass();
                    promptBox();
                    cat();
                }
            });
        });
        modal();
    });
});




