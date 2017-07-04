#coding:utf-8
from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponseRedirect 


#自定义验证登录中间件
class VerifyLoginMiddleware(MiddlewareMixin):
    def __init__(self, get_response=None):
        super(VerifyLoginMiddleware,self).__init__(get_response)
        self.allowDomain = [
            "/accounts/login/",#登录
            "/wechat/",#微信
        ]
    def process_request(self, request):
        if not request.user.is_authenticated():#如果用户没有登录
            for url in self.allowDomain:
                if url in request.path:
                    return #如果匹配到了url则通过
            return HttpResponseRedirect("/accounts/login/")
            