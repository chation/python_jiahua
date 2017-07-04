#coding:utf-8
import hashlib
import six
import sys
import cgi
from ..base import WechatBase
from ..conf import CallbackConf
from request import WechatRequest
from ..messages import MESSAGE_TYPE,UnknownMessage
from crypto.WXBizMsgCrypt import *
import xml.etree.cElementTree as ET
import xmltodict
import logging
import datetime
from ..config import DOMAIN
from ...wechat.person import Driver
from ...models import Location

class Callback(WechatBase):
    '''
    微信基本功能类
    仅包含官方API中所有内容，高级功能请移步ext.py中的WechatExt类
    '''
    
    def __init__(self,callbackConf=CallbackConf()):
        
        #加载WechatConf对象
        if isinstance(CallbackConf,CallbackConf):
            self.callbackConf = callbackConf
        else:
            self.callbackConf = CallbackConf()
        
        self.wxcpt = WXBizMsgCrypt(
            self.callbackConf.token,
            self.callbackConf.encoding_aes_key,
            self.callbackConf.corpid
        )
        
    #第一次与微信服务器通信验证
    def verify(self,request):
        if request.method == "POST":
            return [False,u"请求不为GET"]
        msg_signature = request.GET.get("msg_signature",None)#消息体签名
        timestamp = request.GET.get("timestamp",None)#时间戳
        nonce = request.GET.get("nonce",None)#随机数字串
        echostr = request.GET.get("echostr",None)#公众平台推送过来的随机加密字符串
        ret,echoStr=self.wxcpt.VerifyURL(msg_signature, timestamp,nonce,echostr)
        if(ret!=0):
            logging.warning(u"与微信服务器对接失败")
            return[False, u"验证URL错误:" + unicode(ret)]
        logging.info(u"与微信服务器对接成功")
        return [True,echoStr]#验证URL成功，将echoStr返回给企业号,HttpUtils.SetResponse(sEchoStr)
    
    #解密消息
    def decryptMsg(self,sReqData, sReqMsgSig, sReqTimeStamp, sReqNonce):
        ret,sMsg=self.wxcpt.DecryptMsg( sReqData, sReqMsgSig, sReqTimeStamp, sReqNonce)
        if( ret!=0 ):
            logging.warning(u"解密消息失败:%s"%ret)
            return [False,"u解密消息失败"]
        # 解密成功，sMsg即为xml格式的明文
        # 对明文的处理
        #xml_tree = ET.fromstring(sMsg)
        #content = xml_tree.find("Content").text
        
       
        dic = xmltodict.parse(sMsg)
        print dic
        logging.info(u"解密消息成功:%s"%dic)
        return [True,dic]
    
    
    #加密消息
    def EncryptMsg(self,sRespData, sReqNonce, sReqTimeStamp):
        ret,sEncryptMsg=self.wxcpt.EncryptMsg(sRespData, sReqNonce, sReqTimeStamp)
        if( ret!=0 ):
            print u"消息加密失败: " + ret        
            return [False,ret]
        return [True,sEncryptMsg]
    
    #被动响应文本消息
    def sendText2(self,text,dic,nonce,timestamp):
        ToUserName = dic["xml"]["FromUserName"]
        FromUserName = dic["xml"]["ToUserName"]        
        dic["xml"]["FromUserName"] = FromUserName
        dic["xml"]["ToUserName"] = ToUserName   
        dic["xml"]["Content"] = text
        dic = xmltodict.unparse(dic,full_document=False)
        dic = dic.encode("utf-8")    
        return self.EncryptMsg(dic, nonce, timestamp)
    
    #被动响应文本消息通过事件
    def sendText(self,text,dic,nonce,timestamp):
        ToUserName = dic["xml"]["FromUserName"]
        FromUserName = dic["xml"]["ToUserName"]
        CreateTime = dic["xml"]["CreateTime"]
        AgentID = dic["xml"]["AgentID"]
        
        dic = {"xml":{}}
        dic["xml"]["ToUserName"] = ToUserName
        dic["xml"]["FromUserName"] = FromUserName
        dic["xml"]["CreateTime"] = CreateTime
        dic["xml"]["AgentID"] = AgentID
        dic["xml"]["Content"] = text
        dic["xml"]["MsgType"] = "text"
        
        dic = xmltodict.unparse(dic,full_document=False)
        dic = dic.encode("utf-8")    
        return self.EncryptMsg(dic, nonce, timestamp)        
    
    def check_signature(self,signature,timestamp,nonce,encrypt):
        '''
        验证微信消息真实性
        :param signature: 微信加密签名
        :param timestamp: 时间戳
        :param nonce: 随机数
        :return: 通过验证返回True,未通过验证返回False
        '''
        if not signature or not timestamp or not nonce or not encrypt:
            return False
        
        tmp_list = [self.conf.token,timestamp,nonce,encrypt]
        tmp_list.sort()
        tmp_str = ''.join(tmp_list)
        if signature != hashlib.sha1(tmp_str).hexdigest():
            return False
        return True
    
 
    
    def get_replyEchoStr(echostr):
        '''
        得到echostr明文
        :param echostr: echostr字段内容
        '''
        pc = Prpcrypt(self.__conf.key)
        ret,sReplyEchoStr = pc.decrypt(echostr,self.__conf.__corpid)
        
        if(ret!=0):
            print "ERR:VerityURL ret:" + ret
            sys.exit(1)
        
        return sReplyEchoStr
    

    def parse__data(self,data):
        xmlParse = XMLParse()
        ret,encrypt,touser_name = xmlParse.extract(data)
        if ret != 0:
            return ret,None
        pc = Prpcrypt(self.__conf.key)
        ret,xml_content = pc.decrypt(encrypt,self.__conf.__corpid)
        self.__message = xml_content
        self.__is_parse = True
    
    @property
    def message(self):
        return self.get_message()
    
    def get_message(self):
        '''获取解析好的WechatMessage对象
        :return:解析好的 WechatMessage对象        
        '''
        self._check_parse()
        
        return self.__message
    
    def get_access_token(self):
        '''获取Access Token以及过期日期，仅供缓存使用'''
        return self.conf.get_access_token()
    
    
    def response_none(self):
        '''回复空消息
        :return: 符合微信服务器要求的空消息        
        '''
        self._check_parse()
        return self._encrypt_response("success")
    
    def response_text(self,content,escape=False):
        '''将文字信息content组装为符合微信服务器要求的响应数据
        :param content: 回复文字
        :param escape: 是否转义该文本内容(默认不转义)
        :return: 符合微信服务器要求的XML响应数据
        '''
        self._check_parse()
        content = self._transcoding(content)
        if escape:
            content = cgi.escape(content)
        response = TextReply(message=self.__message,content=content).rander()
        return response
    
    def _check_parse(self):
        '''检查是否成功解析微信服务器传来的数据
        :raises NeedParseError:需要解析微信服务器传来的数据        
        '''
        if not self.__is_parse:
            raise NeedParseError()
    
#回调处理类
class CallBackHandle():
    def __init__(self,dic):
        self.dic = dic
        self.username = dic["xml"]["FromUserName"]
        self.agentId = dic["xml"]["AgentID"]
        msgType = self.dic["xml"].get("MsgType")
        if msgType == "event":   
            #logging.info(u"事件")
            eventType = self.dic["xml"].get("Event")
            if eventType == "click":#如果是点击事件
                self.clickAnalyse()
            if eventType == "LOCATION":#如果是上报地理位置
                self.locationAnalyse()
        elif msgType == "text":
            text = self.dic["xml"]["Content"]
            logging.info(u"%s用户说了一句话:%s"%(self.username,text))
    
    #点击分析器
    def clickAnalyse(self):
        key = self.dic["xml"].get("EventKey")
        if key == "dtdd":#如果是当天订单
            
            driver = Driver()
            plateNum = driver.get_plateNum_by_userId(self.username)
            driver.post_message_by_plateNum(plateNum, "%s,您今天的订单如下:"%plateNum)
            driver.post_catNum(plateNum)#给司机发送指派消息
            logging.info(u"%s,%s用户点击了当天订单"%(plateNum,self.username))

            
            
        if key == "ztdd":#如果是昨天订单
            logging.info(u"%s用户点击了昨天订单"%self.username)
            driver = Driver()
            plateNum = driver.get_plateNum_by_userId(self.username)
            driver.post_message_by_plateNum(plateNum, "%s,您昨天的订单如下:"%plateNum)
            yesterday = datetime.date.today() - datetime.timedelta(days=1)#获得昨天日期
            driver.post_catNum(plateNum,createTime=yesterday.strftime("%Y-%m-%d"))
            
        if key == "lsdd":#如果是历史订单
            logging.info(u"%s用户点击了历史订单"%self.username)
            driver = Driver()
            driver.post_history(self.username)
        if key == "mtdd":#明天订单
            driver = Driver()
            plateNum = driver.get_plateNum_by_userId(self.username)
            driver.post_message_by_plateNum(plateNum, "%s,您明天的订单如下:"%plateNum)
            yesterday = datetime.date.today() + datetime.timedelta(days=1)#获得明天日期
            driver.post_catNum(plateNum,createTime=yesterday.strftime("%Y-%m-%d"))        
            
    #上报地理位置
    def locationAnalyse(self):
        latitude = self.dic["xml"]["Latitude"]
        longitude = self.dic["xml"]["Longitude"]
        precision = self.dic["xml"]["Precision"]
        location = Location()
        location.latitude = latitude
        location.longitude = longitude
        location.precision = precision
        location.username = self.username
        location.name = Driver().get_name_by_userid(self.username)
        location.save()            
        
        