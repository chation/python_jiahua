#coding:utf-8
import hashlib
import six
import sys
import cgi
from .base import WechatBase
from .conf import WechatConf
from lib.request import WechatRequest
from lib.parser import XMLStore
from .messages import MESSAGE_TYPE,UnknownMessage
from .lib.crypto.WXBizMsgCrypt import *
class WechatBasic(WechatBase):
    '''
    微信基本功能类
    仅包含官方API中所有内容，高级功能请移步ext.py中的WechatExt类
    '''
    
    def __init__(self,conf):
        
        #加载WechatConf对象
        if isinstance(conf,WechatConf):
            self.__conf = conf
        else:
            raise ValueError(u"请传入WechatConf对象")
        
        self.__request = WechatRequest(conf=self.__conf)        
        self.__wxcpt = WXBizMsgCrypt(
            self.__conf.token,
            self.__conf.encoding_aes_key,
            self.__conf.corpid
        )
        self.__is_parse = False
        self.__message = None
    
    @property
    def conf(self):
        '''获取当前WechatConf配置实例'''
        return self.__conf
    @conf.setter
    def conf(self,conf):
        '''设置当前WechatConf配置实例'''
        self.__conf = conf
        self.__request = WechatRequest(conf=self.__conf)
    
    
    
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
    
    def parse_data2(self,data):
        '''
        解析微信服务器发过来的数据并保持到类中
        :param data: HTTP Request的Body数据
        :param msg_signature:EncodingAESKey的msg_signature
        :param timestamp:EncodingAESKey用时间戳
        :param nonce: EncodingAESKey用随机数
        :raises ParseError: 解析微信服务器数据错误，数据不合法
        '''
        
        result = {}
        if isinstance(data,six.text_type):
            data = data.encode('utf-8')
        
        try:
            xml = XMLStore(smlstring=data)
        except Exception:
            raise ParseError()
    
        result = xml.xml2dict
        result['raw'] =data
        result['type'] = result.pop("MsgType").lower()
        message_type = MESSAGE_TYPE.get(result['type'],UnknownMessage)
        self.__message = message_type(result)
        self.__is_parse = True
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
    
    
        