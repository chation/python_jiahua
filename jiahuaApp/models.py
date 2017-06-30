#coding:utf-8
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class BaseModel(object):
    #使用字典创建的方法
    @classmethod
    def create(cls,dircs):
        obj = cls()
        keys = dict(cls.__dict__).keys()
        for key in dircs:
            if not dircs[key]:
                continue
            if key in keys:
                obj.__setattr__(key,dircs[key])
        return obj    
    #修改
    def update(self,dircs):
        keys = dict(self.__dict__).keys()
        for key in dircs:
            if key in keys:
                self.__setattr__(key,dircs[key])
                
                
                
                
#开单
class OrderForm(models.Model,BaseModel):
    #取货信息
    catNum = models.IntegerField(u'车次',null=True,blank=True)#blank是数据验证是可为空，null是保存数据库中可为空
    tranNum = models.IntegerField(u"趟数",null=True,blank=True)
    placeNum = models.IntegerField(u"任务清单数",null=True,blank=True)
    getGoodsDate = models.DateField(u'取货日期',null=True,blank=True)
    getGoodsTime = models.TimeField(u"节点时间",blank=True,null=True)
    #发货方
    sendName = models.CharField(u'发货方姓名',max_length=20)
    sendPhoneNumber = models.CharField(u'发货方电话',max_length=20,blank=True)
    sendAddress = models.CharField(u'发货方地址',max_length=20,blank=True)
    sendCode = models.CharField(u'出货地完整码',max_length=20,blank=True)
    #收货方
    receiveName = models.CharField(u'收货方姓名',max_length=20)
    receivePhoneNumber = models.CharField(u'收货方电话',max_length=20,blank=True)
    receiveAddress = models.CharField(u'收货方地址',max_length=20,blank=True)
    receiveCode = models.CharField(u'交货地编码',max_length=20,blank=True)
    #货物信息
    fe = models.IntegerField(u"铁架",default=0,blank=True)
    box = models.IntegerField(u"胶箱",default=0,blank=True)
    lastDate = models.DateField(u'纳期',null=True,blank=True)#交货日期
    lastTime = models.TimeField(u'纳时',null=True,blank=True)#交货时间
    #调度信息
    runType = models.CharField(verbose_name=u'运作方式',max_length=20,null=True)
    plateNum =  models.CharField(verbose_name=u'车号',max_length=20,blank=True,null=True)#司机车牌
    #其他信息
    createTime = models.DateField(u'创建时间',db_index=True)#创建时间做了索引
    receiveFormTime = models.DateTimeField(u'接单时间',null=True,blank=True)
    receiveFormPerson = models.CharField(u'接单人',max_length=20,blank=True)
    receiveGoodsTime = models.DateTimeField(u'装货时间',null=True,blank=True)
    receiveGoodsPerson = models.CharField(u'装货人',max_length=20,blank=True)
    acceptTime = models.DateTimeField(u'签收时间',null=True,blank=True)
    acceptPerson = models.CharField(u'签收人',max_length=20,blank=True)#签收人
    problem = models.IntegerField(u"异常",default=0)#1为异常，0为正常
    other = models.CharField(verbose_name=u'备注',max_length=20,blank=True)
    stateType = models.IntegerField("运单状态",default=0)
    #
    getStartTime = models.DateTimeField(u'取货开始时间',null=True,blank=True)
    getEndTime = models.DateTimeField(u'取货结束时间',null=True,blank=True)
    getTime = models.IntegerField(u"取货时长",null=True,blank=True)
    sendStartTime = models.DateTimeField(u'收货开始时间',null=True,blank=True)
    sendEndTime = models.DateTimeField(u'收货结束时间',null=True,blank=True)
    sendTime = models.IntegerField(u"收货时长",null=True,blank=True)
    operator = models.CharField(u'操作员',max_length=20,blank=True)

#历史操作记录
class History(models.Model):
    content = models.CharField(verbose_name=u'内容',max_length=200,blank=True)
    action  = models.CharField(verbose_name=u'动作',max_length=10,blank=True)
    operator = models.CharField(verbose_name=u'操作员',max_length=10,blank=True)
    operateTime = models.DateField(u'操作时间',auto_now_add=True)
#微信地理位置
class Location(models.Model):
    name = models.CharField(verbose_name=u'姓名',max_length=200,blank=True)
    username = models.CharField(verbose_name=u'用户名',max_length=200,blank=True)
    latitude = models.CharField(verbose_name=u'纬度',max_length=200,blank=True)
    longitude  = models.CharField(verbose_name=u'经度',max_length=10,blank=True)
    precision = models.CharField(verbose_name=u'精确度',max_length=10,blank=True)
    insertTime = models.DateTimeField(u'上报时间',auto_now_add=True)
#发货方管理
class SendClient(models.Model):
    name = models.CharField(verbose_name=u'姓名',max_length=20)
    phoneNumber = models.CharField(verbose_name=u'联系电话',max_length=20,blank=True)
    address = models.CharField(verbose_name=u'联系地址',max_length=20,blank=True)
    sendCode = models.CharField(u'出货地完整码',max_length=20)
    #使用字典创建的方法
    @classmethod
    def create(cls,dircs):
        obj = cls()
        keys = dict(cls.__dict__).keys()
        for key in dircs:
            if key in keys:
                obj.__setattr__(key,dircs[key])
        return obj
    #修改
    def update(self,dircs):
        keys = dict(self.__dict__).keys()
        for key in dircs:
            if key in keys:
                self.__setattr__(key,dircs[key])
    
#收货方管理
class ReceiveClient(models.Model):
    name = models.CharField(verbose_name=u'姓名',max_length=20)
    phoneNumber = models.CharField(verbose_name=u'联系电话',max_length=20,blank=True)
    address = models.CharField(verbose_name=u'联系地址',max_length=20,blank=True)
    receiveCode = models.CharField(u'交货地编码',max_length=20)
    #使用字典创建的方法
    @classmethod
    def create(cls,dircs):
        obj = cls()
        keys = dict(cls.__dict__).keys()
        for key in dircs:
            if key in keys:
                obj.__setattr__(key,dircs[key])
        return obj
    
    #修改
    def update(self,dircs):
        keys = dict(self.__dict__).keys()
        for key in dircs:
            if key in keys:
                self.__setattr__(key,dircs[key])
    
    

#车辆管理
class Cat(models.Model):
    plateNum = models.CharField(verbose_name=u'车牌号',max_length=20)
    catType = models.CharField(verbose_name=u'车型',max_length=20)
    fullName = models.CharField(verbose_name=u'姓名',max_length=20,blank=True)
    phoneNumber = models.CharField(verbose_name=u'电话',max_length=20,blank=True)
    catOther = models.CharField(u"车况备注",max_length=45)
    ofterPlace = models.CharField(u"常运地点",max_length=60,blank=True)
    #currentState = models.CharField(verbose_name=u'当前装载状态',max_length=20)
    #currentPlace = models.CharField(verbose_name=u'当前位置',max_length=20)
    #使用字典创建的方法
    @classmethod
    def create(cls,dircs):
        obj = cls()
        keys = dict(cls.__dict__).keys()
        for key in dircs:
            if key in keys:
                obj.__setattr__(key,dircs[key])
        return obj
    #修改
    def update(self,dircs):
        keys = dict(self.__dict__).keys()
        for key in dircs:
            if key in keys:
                self.__setattr__(key,dircs[key])


                
                
                
#批处理导入订单
class BatchHistory(models.Model):
    insertTime = models.DateTimeField(u'导入日期',auto_now=True)
    insertFileName = models.CharField(verbose_name=u'导入文件名',max_length=20)
    insertResult = models.CharField(verbose_name=u'导入结果',max_length=20)
    insertNum = models.CharField(verbose_name=u'导入订单总数',max_length=20)
    uploadFile = models.FileField(verbose_name=u'文件路径',upload_to="upload")