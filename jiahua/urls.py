#coding:utf-8
"""jiahua URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from jiahuaApp import views
from jiahuaApp import jsonViews,accountView,callbackViews
from jiahua import settings
from django.conf.urls.static import static
from django.contrib.auth import urls as auth_urls


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    #url(r'^accounts/', include(auth_urls, namespace='accounts')),#登录系统
    url(r'^accounts/login/$', accountView.userLogin),#用户登录
    url(r'^accounts/logout/$', accountView.userLogout),#用户注销
    url(r'^accounts/register/$', accountView.userRegister),#用户注册
    url(r'^accounts/query/$', accountView.userQuery),#用户查询
    url(r'^accounts/delete/$', accountView.userDelete),#用户删除
    url(r'^accounts/active/$', accountView.userActive),#用户激活与禁用
    url(r'^accounts/change_password/$', accountView.change_password),#密码修改
    
    url(r'^$', views.index),
    url(r'^fleet/$', views.fleet),#车队管理
    url(r'^header/$', views.header),#公共内容
    url(r'^driver/$', views.driver),#司机管理
    url(r'^uploadFile/$', views.uploadFile),#上传文件
    url(r'^createform/$', views.createForm),#开单
    url(r'^orderManage/$', views.orderManage),#订单管理
    url(r'^clientsManage/$', views.clientsManage),#客户管理
    url(r'^operateHistory/$', views.operateHistory),#操作历史
    url(r'^activeTimeout/$', views.activeTimeout),#取卸超时时间
    
    
    url(r'^wechat/order/today/$', views.wechatOrder),#微信订单
    #url(r'^wechat/order/yesterday/$', views.wechatOrder),#微信昨天订单
    url(r'^wechat/order/history/$', views.wechatHistoryOrder),#微信历史订单
    url(r'^wechat/order/state/$', jsonViews.orderState),#微信订单状态修改,数据格式{"orderList":[119,366],"name":"df","program":1}
    url(r'^wechat/order/timeout/$', jsonViews.waitTimeout),#微信订单超时上报,数据格式{"data":[id,开始时间,结束时间,持续分钟,上报类型]}
    url(r'^wechat/$', callbackViews.wechatCallback),#微信服务器接收消息接口
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    url(r'^json/',include('jiahuaApp.jsonUrls')),
]
