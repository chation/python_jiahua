#coding:utf-8

from wechatLib.wechatbasic import WechatBasic
from wechatLib.conf import WechatConf
from django.http.response import HttpResponse,HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt


TOKEN = "fy09Ne2063kbucr"
ENCODING_AES_KEY = "cueq5L85X4JpemCOqiKXWR5FV8Xe61IlwHAIbwcHeYp"
CORPID = "wxc6db6d0138ffebe2"
SECRET = "pc-YezZH-69bNRXyq9IpHt8X_Fyf3Ce8rS-jieWGlUs8BD5CaOLc2S9WCKzvwq80"

conf = WechatConf(
    corpid=CORPID,
    secret=SECRET,
    token=TOKEN,
    encoding_aes_key=ENCODING_AES_KEY
)

#实例化WechatBasic
wechat_instance = WechatBasic(conf)

@csrf_exempt
def index(request):
    """
    所有的消息都会先进入这个函数进行处理，函数包含两个功能，
    微信接入验证是GET方法，
    微信正常的收发消息是用POST方法。
    """    
    if request.method == "GET":
        #检验合法性
        #从request中提取基本信息(signature,timestamp,nonce,xml)
        signature = request.GET.get('signature')
        timestamp = request.GET.get("timestamp")
        nonce = request.GET.get("nonce")     
        echostr = request.GET.get("echostr")
        
        #验证URL有效性
        if not wechat_instance.check_signature(signature, timestamp, nonce,echostr):
            return HttpResponseBadRequest("Verify Failed")
        
        #得到echostr明文
        replyEchoStr = wechat_instance.get_replyEchoStr(echostr)        
        
        #验证URL成功，将echostr明文返回给企业号
        return HttpResponse(
            replyEchoStr,content_type="text/plain"        
        )
    
    #解析本次请求的XML数据
    try:
        wechat_instance.parse_data(data=request.body)
    except ParseError:
        return HttpResponseBadRequest("Invalid XML Data")
    
    #获取解析好的微信请求信息
    message = wechat_instance.get_message()
    print message
    
    #关注事件以及不匹配时的默认回复
    response = wechat_instance.response_text(
        content = (
            '感谢您的关注！\n回复[功能]两字查看支持的功能，还可以回复任意内容开始聊天\n]'        
        )
    )     
    
    if isinstance(message,TextMessage):
        #当前会话内容
        content = message.content.strip()
        if content == "功能":
            reply_text = (
                '目前支持的功能：\n1. 关键词后面加上【教程】两个字可以搜索教程，'
                '比如回复 "Django 后台教程"\n'
                '2. 回复任意词语，查天气，陪聊天，讲故事，无所不能！\n'
                '还有更多功能正在开发中哦 ^_^\n'
                '【<a href="http://www.ziqiangxuetang.com">自强学堂手机版</a>】'
            ) 
        elif content.endswitch("教程"):
            reply_text = '您要找的教程如下:'
        response = wechat_instance.response_text(content=reply_text)
    
    return HttpResponse(response,content_type="application/xml")

#from wechatLib.application import send

#s = send.Send()
#s.sendText(content="<a href='http://www.baidu.com'>百度一下，你就知道</a>",agentid=1)



