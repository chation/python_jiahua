#coding:utf-8

from random import Random
#import demjson
import json
from django.http import JsonResponse
import datetime
from jiahua.settings import MEDIA_ROOT
import xlrd
import re
from models import OrderForm

#8位随机字符串
def random_str(randomlength=8):
    str = ''
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    length = len(chars) - 1
    random = Random()
    for i in range(randomlength):
        str+=chars[random.randint(0, length)]
    return str

def validateField(request, *fields):
    errorFields = ""
    for field in fields:
        if not request.POST.get(field,None):
            errorFields +=field
            errorFields += " "
    if errorFields:
        return [False,errorFields]
    else:
        return [True,errorFields]

def statusJson(status=200,message="",body=None):
    '''
    def packJson(info=""):
        #判断有没有time对象,demjson的一个BUG,序列号time对象时报错
        if isinstance(body,list):
            for obj in body:
                if isinstance(obj,dict):
                    for key in obj:
                        if isinstance(obj[key],datetime.time):
                            obj[key] = obj[key].strftime("%H:%M")
                        elif isinstance(obj[key],datetime.datetime):
                            obj[key] = obj[key].strftime("%Y-%m-%d %H:%M")
                        elif isinstance(obj[key],datetime.date):
                            obj[key] = obj[key].strftime("%Y-%m-%d")         
    '''
    def packJson(data):
        #判断有没有time对象,demjson的一个BUG,序列号time对象时报错
        if isinstance(data,tuple):
            data = list(data)
        if isinstance(data,list):
            for i in range(len(data)):
                if isinstance(data[i],list) or isinstance(data[i],dict) or isinstance(data[i],tuple):
                    data[i]=packJson(data[i])
                else:
                    if isinstance(data[i],datetime.time):
                        data[i] = data[i].strftime("%H:%M")
                    elif isinstance(data[i],datetime.datetime):
                        data[i] = data[i].strftime("%Y-%m-%d %H:%M")
                    elif isinstance(data[i],datetime.date):
                        data[i] = data[i].strftime("%Y-%m-%d")                       

        elif isinstance(data,dict):
            for i in data:
                if isinstance(data[i],list) or isinstance(data[i],dict) or isinstance(data[i],tuple):
                    data[i]=packJson(data[i])
                else:
                    if isinstance(data[i],datetime.time):
                        data[i] = data[i].strftime("%H:%M")
                    elif isinstance(data[i],datetime.datetime):
                        data[i] = data[i].strftime("%Y-%m-%d %H:%M")
                    elif isinstance(data[i],datetime.date):
                        data[i] = data[i].strftime("%Y-%m-%d")    
        else:        
            if isinstance(data,datetime.time):
                data = data.strftime("%H:%M")
            elif isinstance(data,datetime.datetime):
                data = data.strftime("%Y-%m-%d %H:%M")
            elif isinstance(data,datetime.date):
                data = data.strftime("%Y-%m-%d")               
        return data
                            
    body = packJson(body)                        
    data = {'status':status,'message':message,'body':body}
    #data = demjson.encode(data)
    #import simplejson
    #data = simplejson.dumps(data)
    data = json.dumps(data)

    return JsonResponse(data,safe=False)
    
#数据打包
'''
def packJson(data):
    #判断有没有time对象,demjson的一个BUG,序列号time对象时报错
    if isinstance(data,list):
        for obj in data:
            if isinstance(obj,dict):
                for key in obj:
                    if isinstance(obj[key],datetime.time):
                        obj[key] = obj[key].strftime("%H:%M")
                    elif isinstance(obj[key],datetime.datetime):
                        obj[key] = obj[key].strftime("%Y-%m-%d %H:%M")
                    elif isinstance(obj[key],datetime.date):
                        obj[key] = obj[key].strftime("%Y-%m-%d")
        data = json.dumps(data)
                        
        return data   
'''
def packJson(data):
    #判断有没有time对象,demjson的一个BUG,序列号time对象时报错
    if isinstance(data,tuple):
        data = list(data)
    if isinstance(data,list):
        for i in range(len(data)):
            if isinstance(data[i],list) or isinstance(data[i],dict) or isinstance(data[i],tuple):
                data[i]=packJson(data[i])
            else:
                if isinstance(data[i],datetime.time):
                    data[i] = data[i].strftime("%H:%M")
                elif isinstance(data[i],datetime.datetime):
                    data[i] = data[i].strftime("%Y-%m-%d %H:%M")
                elif isinstance(data[i],datetime.date):
                    data[i] = data[i].strftime("%Y-%m-%d")                       

    elif isinstance(data,dict):
        for i in data:
            if isinstance(data[i],list) or isinstance(data[i],dict) or isinstance(data[i],tuple):
                data[i]=packJson(data[i])
            else:
                if isinstance(data[i],datetime.time):
                    data[i] = data[i].strftime("%H:%M")
                elif isinstance(data[i],datetime.datetime):
                    data[i] = data[i].strftime("%Y-%m-%d %H:%M")
                elif isinstance(data[i],datetime.date):
                    data[i] = data[i].strftime("%Y-%m-%d")    
    else:        
        if isinstance(data,datetime.time):
            data = data.strftime("%H:%M")
        elif isinstance(data,datetime.datetime):
            data = data.strftime("%Y-%m-%d %H:%M")
        elif isinstance(data,datetime.date):
            data = data.strftime("%Y-%m-%d")          
    return data


#上传文件处理
class ParseFile(object):
    def __init__(self,fileUrl,createTime=datetime.datetime.now().strftime("%Y-%m-%d")):
        self.fileUrl = fileUrl
        self.fullUrl = MEDIA_ROOT +'/'+ fileUrl
        self.createTime = createTime
        self.catNum = 0#车次
        self.tranNum = 0#趟数
        self.palceNum = 0#任务清单数
        self.count = 0#数据总数
        self.dataList = []
    
    #检查文件正确性
    def check(self):
        try:
            self.workbook = xlrd.open_workbook(self.fullUrl)
        except XLRDError:
            return [False,u"文件数据损坏,解析错误"]        
        sheet1 = self.workbook.sheet_by_index(0)
        nrows = sheet1.nrows
        if sheet1.ncols < 18:
            return [False,u"文件字段不正确,请放入原计划文件"]
        
        
        checkList = [u"车次",u"趟数",u"任务清单数",u"取货日期",u"节点时间",u"返空状态",u"出货地完整码",u"出货地名称",u"运作方式",u"期",u"时",u"铁架",u"胶箱",u"托盘",u"铁架",u"胶箱",u"托盘",u"交货地"]
        for row in range(nrows):       
            for col in range(len(checkList)):
                cell = sheet1.row_values(row)[col]
                cell = unicode(cell)            
                if cell.find(checkList[col]) != -1:
                    checkList[col] = ""
                if checkList == ["","","","","","","","","","","","","","","","","",""]:
                    return [True,None]
        return [False,u"文件字段不正确,请放入原计划文件"]
    #解析数据
    def parse(self):
        sheet1 = self.workbook.sheet_by_index(0)
        nrows = sheet1.nrows
        for i in range(nrows):
            try:
                catNum= unicode(sheet1.row_values(i)[0])
                tranNum= unicode(sheet1.row_values(i)[1])
                palceNum= unicode(sheet1.row_values(i)[2])
                if re.match('^[0-9.]+$',catNum):
                    self.catNum = int(float(catNum))
                if re.match('^[0-9.]+$',tranNum) and len(tranNum)<4:
                    self.tranNum = int(float(tranNum))
                if re.match('^[0-9.]+$',palceNum):
                    self.palceNum = int(float(palceNum))
    
                
                #判断出货地完整码,得到正确的行
                sendCode = sheet1.row_values(i)[6]
                returnStatus = unicode(sheet1.row_values(i)[5])#返空状态
                if re.match('^[0-9a-zA-Z]+$',sendCode) or  returnStatus.find(u"需要") != -1:#如果匹配到出货地完整码
                    #匹配收货地名称-----------------------
                    receiveName = ""#收货地名称           
                    num = i+1
                    while num < nrows:
                        cell = sheet1.row_values(num)[1]
                        cell = unicode(cell)
                        pullCode = sheet1.row_values(num)[6]
                        if re.match("^[0-9.]+$",cell):#如果匹配到了下一趟
                            break
                        elif cell.find(u"任务单编号") != -1:#如果配到了"任务单编号"
                            break
                        elif not sheet1.row_values(num)[6].strip():#如果出货地完整码为空，说明匹配到该行
                            if sheet1.row_values(num)[7]:#如果该行有数据
                                receiveName =  sheet1.row_values(num)[7]
                            elif sheet1.row_values(num)[1]:#如果该行有数据
                                receiveName =  sheet1.row_values(num)[1]
                            break
                        num+=1
                    
                    #处理一下下时间----------------------------------------------------------------------------------
                    #发货日期
                    getGoodsDate=sheet1.cell(i,3)
                    if getGoodsDate.ctype==3:#如果是时间格式
                        value = xlrd.xldate_as_tuple(getGoodsDate.value,self.workbook.datemode)
                        getGoodsDate = datetime.date(*value[:3]).strftime('%Y-%m-%d')
                    else:
                        getGoodsDate=getGoodsDate.value.strip()
                    #发货时间
                    getGoodsTime=sheet1.cell(i,4)
                    if getGoodsTime.ctype==3:#如果是时间格式
                        value = xlrd.xldate_as_tuple(getGoodsTime.value,self.workbook.datemode)
                        getGoodsTime = datetime.time(*value[3:]).strftime('%H:%M')
                    else:
                        getGoodsTime=getGoodsTime.value.replace(u"：",u":").strip() 
                        if not getGoodsTime:
                            getGoodsTime=None
                    #纳期
                    lastDate=sheet1.cell(i,9)
                    if lastDate.ctype==3:#如果是时间格式
                        value = xlrd.xldate_as_tuple(lastDate.value,self.workbook.datemode)
                        lastDate = datetime.date(*value[:3]).strftime('%Y-%m-%d')
                    else:
                        lastDate=lastDate.value.strip()
                    #纳时
                    lastTime=sheet1.cell(i,10)
                    if lastTime.ctype==3:#如果是时间格式
                        value = xlrd.xldate_as_tuple(lastTime.value,self.workbook.datemode)
                        lastTime = datetime.time(*value[3:]).strftime('%H:%M')
                    else:
                        lastTime=lastTime.value.replace(u"：",u":").strip()    
                        
                        
                        
                    #-----------------------------处理时间错误---------------------------
                    if not getGoodsDate or not re.match(r'\d{4}-\d{1,2}-\d{1,2}',getGoodsDate):
                        return [False,u"第%s行,取货日期项目%s输入的时间格式有误"%(i+1,getGoodsDate)]
                    if not lastDate or not re.match(r'\d{4}-\d{1,2}-\d{1,2}',lastDate):
                        return [False,u"第%s行,纳期项目输入的时间格式有误"%(i+1)]
                    
                    if getGoodsTime != None and not re.match(r'\d{1,2}:\d{1,2}:\d{1,2}',getGoodsTime) and not re.match(r'\d{1,2}:\d{1,2}',getGoodsTime):
                        return [False,u"第%s行,节点时间项目%s输入的时间格式有误"%(i+1,getGoodsTime)]
                    if not lastTime or not re.match(r'\d{1,2}:\d{1,2}:\d{1,2}',lastTime) and not re.match(r'\d{1,2}:\d{1,2}',lastTime):
                        return [False,u"第%s行,纳时项目输入的时间格式有误"%(i+1)]
                    
                    #--------------------处理铁架和胶箱为空----------------
                    fe = unicode(sheet1.row_values(i)[11])
                    box = unicode(sheet1.row_values(i)[12])
                    if not fe.strip():
                        fe = 0
                    elif not re.match("^[0-9.]+$",fe):
                        return [False,u"第%s行,铁架项目输入有误,应为整数"%(i+1)]
                    
                    if not box.strip():
                        box = 0
                    elif not re.match("^[0-9.]+$",box):
                        return [False,u"第%s行,胶箱项目输入有误,应为整数"%(i+1)]
                    
                    #处理收货地为空
                    if not receiveName:
                        receiveName = sheet1.row_values(i)[17]
                    #getGoodsDate=xlrd.xldate_as_tuple(sheet1.row_values(i)[3],self.workbook.datemode)
                    #getGoodsTime=xlrd.xldate_as_tuple(sheet1.row_values(i)[4],self.workbook.datemode)
                    #lastDate=xlrd.xldate_as_tuple(sheet1.row_values(i)[9],self.workbook.datemode)
                    #lastTime=xlrd.xldate_as_tuple(sheet1.row_values(i)[10],self.workbook.datemode)
                    
                    
                    data = {}#获得的数据
                    #取货信息
                    data["catNum"] = self.catNum
                    data["tranNum"] = self.tranNum
                    data["placeNum"] = self.palceNum
                    data["getGoodsDate"] = getGoodsDate
                    data["getGoodsTime"] = getGoodsTime
                    #发货方
                    data["sendName"] = sheet1.row_values(i)[7]
                    data["sendCode"] = sheet1.row_values(i)[6]
                    #收货方
                    data["receiveName"] = receiveName
                    data["receiveCode"] = sheet1.row_values(i)[17]
                    #货物信息
                    data["fe"] = int(float(fe))
                    data["box"] = int(float(box))
                    data["lastDate"] = lastDate
                    data["lastTime"] = lastTime
                    data["runType"] = sheet1.row_values(i)[8]                
                    data["createTime"] = self.createTime
                    
                    order = OrderForm.create(data)
                    self.dataList.append(order)
                    self.count+=1#总数加1
            except Exception,e:
                return [False,u"第%s行数据输入有误,请仔细检查"%(i+1)]
        return [True,self.count]
                
    def save(self):#上传数据
        OrderForm.objects.bulk_create(self.dataList)
                    
                    
                    
                    
                    
                    
                    
            
            
                
        
        
        
        
    