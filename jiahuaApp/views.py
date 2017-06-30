#coding:utf-8
from django.shortcuts import render
from django.template import loader, Context
from django.http import HttpResponse
from jiahuaApp import forms
from models import OrderForm
from commonLib import packJson
import json
import time,datetime
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
    # createTime = time.strftime("%Y-%m-%d")
    # orderQuerySet = OrderForm.objects.filter(createTime=createTime)
    # pagin = Paginator(orderQuerySet, 100)
    # pageCount = pagin.count
    # print pageCount   {'pages':pageCount}
    return render(request,"jiahuaApp/orderManage.html")

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