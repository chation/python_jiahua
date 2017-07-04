#coding:utf-8
'''发送消息接口'''
from ..conf import ActiveConf
from ..lib.request import WechatRequest

class Send(object):
    
    def __init__(self):
        self.__activeConf = ActiveConf()
        self.__requests = WechatRequest()
        self.data = {}
    def sendText(self,content,agentid,touser="@all",toparty=None,totag=None,safe=None):
        if touser:#成员ID列表（消息接收者，多个接收者用‘|’分隔，最多支持1000个）。特殊情况：指定为@all，则向关注该企业应用的全部成员发送
            self.data["touser"] = touser
        if toparty:#部门ID列表，多个接收者用‘|’分隔，最多支持100个。当touser为@all时忽略本参数
            self.data["toparty"] = toparty
        if totag:#标签ID列表，多个接收者用‘|’分隔，最多支持100个。当touser为@all时忽略本参数
            self.data["totag"] = totag
        if safe:#表示是否是保密消息，0表示否，1表示是，默认0
            self.data["safe"] = safe
        if isinstance(content,unicode):
            content = content.encode("utf-8")
        self.data["text"] = {"content":content}#消息内容，最长不超过2048个字节，注意：主页型应用推送的文本消息在微信端最多只显示20个字（包含中英文）
        self.data["msgtype"] = "text"#消息类型，此时固定为：text （支持消息型应用跟主页型应用）
        self.data["agentid"] = agentid#企业应用的id，整型。可在应用的设置页面查看
         
        self._send()
        
    #发送新闻消息,contentList内容请使用utf-8
    '''
    contentList内容
    [
           {
               "title": "Title",
               "description": "Description",
               "url": "URL",
               "picurl": "PIC_URL"
           },
           {
               "title": "Title",
               "description": "Description",
               "url": "URL",
               "picurl": "PIC_URL"
           }    
       ]
    '''
    def sendNews(self,contentList,agentid,touser="@all",toparty=None,totag=None,safe=None):
        if touser:#成员ID列表（消息接收者，多个接收者用‘|’分隔，最多支持1000个）。特殊情况：指定为@all，则向关注该企业应用的全部成员发送
            self.data["touser"] = touser
        if toparty:#部门ID列表，多个接收者用‘|’分隔，最多支持100个。当touser为@all时忽略本参数
            self.data["toparty"] = toparty
        if totag:#标签ID列表，多个接收者用‘|’分隔，最多支持100个。当touser为@all时忽略本参数
            self.data["totag"] = totag
        if safe:#表示是否是保密消息，0表示否，1表示是，默认0
            self.data["safe"] = safe
        
        #处理contentList大于等于10的情况
        other = None
        if len(contentList)>10:
            other = contentList[10:]
            contentList = contentList[:10]

        self.data["msgtype"] = "news"#消息类型，此时固定为：text （支持消息型应用跟主页型应用）
        self.data["agentid"] = agentid#企业应用的id，整型。可在应用的设置页面查看
        self.data["news"] = {}
        self.data["news"]["articles"] = contentList
        self._send()        
        
        if other:
            self.sendNews(other, agentid, touser, toparty, totag, safe)
            print u"新闻过长，分块发布"
        print contentList
    def _send(self):
        url = "https://qyapi.weixin.qq.com/cgi-bin/message/send"
        response_json = self.__requests.post(url,self.data)
        print response_json
    

        
        
