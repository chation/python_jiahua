#coding:utf-8
'''部门'''
from ..lib.request import WechatRequest
class Part(object):
    def __init__(self):
        self.__requests = WechatRequest() 
        self.data = None
    
    
    #获取部门
    def get_part(self,id=None):
        #id:部门id。获取指定部门及其下的子部门,不是必须 
        url = "https://qyapi.weixin.qq.com/cgi-bin/department/list"
    
        self.data = self.__requests.get(url)
        return self.data
        
    