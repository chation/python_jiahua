#coding:utf-8
from django.http import HttpResponse
from wechatLib.lib.callback import Callback,CallBackHandle
import logging
#微信回调
def wechatCallback(request):
    wechatCall =Callback()
    if request.method == "GET":#如果是第一次验证
        result=wechatCall.verify(request)
        if result[0]:#如果验证成功
            return HttpResponse(result[1])
        else:
            return HttpResponse(result[1])
    else:
        msg_signature=request.GET.get("msg_signature")
        timestamp=request.GET.get("timestamp")
        nonce=request.GET.get("nonce")
        result=wechatCall.decryptMsg(request.body, msg_signature, timestamp, nonce)#解密消息
        dic=result[1]
        CallBackHandle(dic)#处理器
        
        #result = wechatCall.sendText("收到", dic, nonce, timestamp)
        #return HttpResponse(result[1])
        return HttpResponse("")
        
            
        