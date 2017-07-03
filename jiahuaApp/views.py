#coding:utf-8
from django.shortcuts import render
from django.template import loader, Context
from django.http import HttpResponse
from jiahuaApp import forms
from models import OrderForm
from commonLib import packJson
from jiahuaApp import commonLib
import json
import time,datetime
import re
from django.core.paginator import Paginator

# Create your views here.
def index(request):
    data = {}
    return render(request,"jiahuaApp/index.html",data)
#公共内容
def header(request):
    return render(request,"jiahuaApp/header.html")
#车队管理
def fleet(request):
    return render(request,"jiahuaApp/fleet.html")
#司机管理
def driver(request):
    return render(request,"jiahuaApp/driver.html")   
#开单
def createForm(request):
    return render(request,"jiahuaApp/createform.html") 
#订单管理
def orderManage(request):
    # todo ...
    if request.method == "GET":
        # 创建时间
        createTime = request.GET["createTime"] if request.GET.get("createTime", None) else request.GET.getlist(
            "createTime[]", None)
        if not createTime:
            createTime = time.strftime("%Y-%m-%d")

        if isinstance(createTime, list):
            orderQuerySet = OrderForm.objects.filter(createTime__range=(createTime[0], createTime[1]))
        elif re.match(r'\d{4}-\d{1,2}-\d{1,2}', createTime):
            orderQuerySet = OrderForm.objects.filter(createTime=createTime)
        else:
            return commonLib.statusJson(status=400, message=u"createTime字段格式有误,正确格式[yyyy-mm-dd]")
        # 订单状态
        stateType = request.GET.get("status", None)
        if stateType:
            orderQuerySet = orderQuerySet.filter(stateType=stateType)
        # 是否查询单个司机
        name = request.GET.get("name", None)
        if name:
            if stateType and int(stateType) == 1:
                plateNum = Driver().get_plateNum_by_name(name)
                orderQuerySet = orderQuerySet.filter(plateNum=plateNum)
            else:
                orderQuerySet = orderQuerySet.filter(receiveFormPerson=name)
        # 异常订单查询
        problem = request.GET.get("problem")
        if problem == "1" or problem == 1:
            orderQuerySet = orderQuerySet.filter(problem=1)
        # 排序
        orderQuerySet = orderQuerySet.order_by("-createTime", "catNum", "tranNum", "placeNum")
        orderList = list(orderQuerySet.values())

        # 创建分页
        pagin = Paginator(orderList, 100)
        page = request.GET.get("page",1)
        if int(page) <= 0 :
            page = 1
        if int(page) > pagin.num_pages :
            page = pagin.num_pages
        data = pagin.page(page)
    return render(request, "jiahuaApp/orderManage.html", {"data":data,"page":page,"totalPage":pagin.num_pages,"createTime":createTime,"status":stateType})

#客户管理
def clientsManage(request):
    return render(request,"jiahuaApp/clientsManage.html")

#操作历史
def operateHistory(request):
    return render(request,"jiahuaApp/operateHistory.html")
#取卸超时
def activeTimeout(request):
    return render(request,"jiahuaApp/activeTimeout.html")

def uploadFile(request):
    form = forms.BatchHistoryForm()
    data = {"form":form}
    return render(request,"jiahuaApp/uploadFile.html",data)

#微信订单
def wechatOrder(request):
    orderList = request.GET.get("orderList")
    orderList = orderList.split("_")
    orderList1 = []
    for i in orderList:
        if i.isdigit():#如果是全数字
            orderList1.append(int(i))
    orderList = orderList1
    orderQuerySet = OrderForm.objects.filter(id__in=orderList).order_by("catNum","tranNum","placeNum").values()
    orderQuerySet = list(orderQuerySet)
    orderQuerySet_json = json.dumps(packJson(orderQuerySet))
    data = {"data":orderQuerySet,"data2":orderQuerySet_json}
    return render(request,"wechat/order.html",data)

#微信历史订单
def wechatHistoryOrder(request):
    name = request.GET.get("name")
    year = request.GET.get("year")
    mon = request.GET.get("mon")
    orderQuerySet = OrderForm.objects.filter(receiveFormTime__year=year,receiveFormTime__month=mon,receiveFormPerson=name).order_by("createTime","catNum","tranNum","placeNum").values()
    orderQuerySet = list(orderQuerySet)
    orderQuerySet_json = json.dumps(packJson(orderQuerySet))
    data = {"data":orderQuerySet,"data2":orderQuerySet_json}
    return render(request,"wechat/historyOrder.html",data)