#coding:utf-8
from utils import disable_urllib3_warning
from exceptions import NeedParamError
import base64
import requests
import config
import time

class WechatConf(object):
    '''
    WechatConf配置类
    该类将会存储所有和微信开发相关配置信息，同时也会维护配置信息的有效性
    '''
    def __init__(self,**kwargs):
        '''
        :param kwargs: 配置信息字典，可用字典key值以及对应解释如下：
            'corpid': 企业号id
            'secret':管理组Secret
            
            'token':应用的Token
            'encoding_aes_key':应用的EncodingAESKey
            
            'checkssl': 是否检查 SSL, 默认不检查 (False), 可避免 urllib3 的 InsecurePlatformWarning 警告
        '''        
        
        
        #解决InsecurePlatformWarning警告
        if kwargs.get("checkssl") is not True:
            disable_urllib3_warning()
        
        self.__corpid = kwargs.get("corpid")
        self.__secret = kwargs.get("secret")
        self.__token = kwargs.get("token")
        self.__encoding_aes_key = kwargs.get("encoding_aes_key")        
        
        #对EncodingAESKey做Base64解码
        try:
            self.key = base64.b64decode(self.__encoding_aes_key+"=")
            assert len(self.key)  == 32
        except:
            raise Exception(u"EncodingAESKey提供错误")
        
        self.__access_token = kwargs.get("access_token")
        self.__access_token_expires_at = None
    
    @property
    def access_token(self):
        '''获取当前access token 值,本方法会自行维护access token有效性'''
        self._check_corpid_secret()
    
        if self.__access_token:
            now = time.time()
            if self.__access_token_expires_at - now >60:
                return self.__access_token
        
        self.grant_access_token()#从腾讯服务器获取access token并更新
        return self.__access_token
    
    @property
    def token(self):
        return self.__token
    @property
    def corpid(self):
        return self.__corpid
    @property
    def encoding_aes_key(self):
        return self.__encoding_aes_key
    @property
    def secret(self):
        return self.__secret
    
    
    
    def grant_access_token(self):
        '''
        获取access token并更新当前配置
        :return: 返回的JSON数据包(传入access_token_refreshfunc参数后返回None)
        '''
        self._check_corpid_secret()
        
        response_json = self.__request.get(
            url ="https://qyapi.weixin.qq.com/cgi-bin/gettoken",
            params={
                'corpid':self.__corpid,
                'corpsecret':self.__secret
            }
        )   
        self.__access_token = response_json["access_token"]
        self.__access_token_expires_at = int(time.time()) + response_json["expires_in"]
        
        return response_json
        
    
    def _check_corpid_secret(self):
        '''
        检查corpid和secret是否存在
        '''
        if not self.__corpid or not self.__secret:
            raise NeedParamError(u"请提供corpid和secret参数")
    
    def _check_token_aes(self):
        if not self.__encoding_aes_key or not self.__token:
            raise NeedParamError(u"请提供token和encoding_aes_key参数")            


class ActiveConf():
    '''
    主动调用配置配类
    该类存储主动调用的配置信息
    '''
    
    #单例模式
    def __new__(cls, *args, **kw):  
        if not hasattr(cls, '_instance'):  
            orig = super(ActiveConf, cls)  
            cls._instance = orig.__new__(cls, *args, **kw)  
        return cls._instance      
    

    
    def __init__(self,corpid=None,secret=None):
        '''
        :param kwargs: 配置信息字典，可用字典key值以及对应解释如下：
            'corpid': 企业号id
            'secret':管理组Secret
        '''        
        if not corpid:
            corpid = config.CORPID
        if not secret:
            secret = config.SECRET
            
        self.__corpid = corpid
        self.__secret = secret
        self.grant_access_token()#更新一次access_token

    @property
    def corpid(self):
        return self.__corpid

    @property
    def secret(self):
        return self.__secret

        
    def grant_access_token(self):
        '''获取access token并更新当前配置'''
        
        params = {"corpid":self.__corpid,"corpsecret":self.__secret}
        response = requests.get("https://qyapi.weixin.qq.com/cgi-bin/gettoken",params=params)        
        response_json = response.json()
        
        self.__access_token = response_json["access_token"]
        self.__access_token_expires_at = int(time.time()) + response_json["expires_in"]
        
    @property
    def access_token(self):
        '''获取当前access token 值,本方法会自行维护access token有效性'''
        
        if self.__access_token:
            now = time.time()
            if self.__access_token_expires_at - now >60:
                return self.__access_token
        
        self.grant_access_token()#从腾讯服务器获取access token并更新
        return self.__access_token
    

