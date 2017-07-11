#coding:utf-8
from django.conf.urls import url
from jiahuaApp import jsonViews,callbackViews
urlpatterns = [
    
    #url(r'^/$', views.get),#地址：www.*/oneApp/get?id=*
    url(r'^order/create/$', jsonViews.orderCreate),#订单创建
    url(r'^order/query/$', jsonViews.orderQuery),#订单查询
    url(r'^order/update/$', jsonViews.orderUpdate),#订单修改
    url(r'^order/batchUpdate/$', jsonViews.orderBatchUpdate),#订单批量修改
    url(r'^order/delete/$', jsonViews.orderDelete),#订单删除,发送id键
    url(r'^order/delbydate/$',jsonViews.deleteOrder),#按日期删除订单
    url(r'^order/count/$', jsonViews.orderCount),#订单统计，发送createTime键
    
    url(r'^order/batch/insert/$', jsonViews.batchCreate),#批处理导入订单
    url(r'^order/batch/query/$', jsonViews.batchQuery),#查询历史导入订单
    
    #url(r'^cat/query/$', jsonViews.queryCat),#车辆查询
    url(r'^cat/department/$', jsonViews.departmentList),#部门列表
    url(r'^cat/query/$', jsonViews.getDriver),#车辆查询
    url(r'^cat/create/$', jsonViews.createCat),#车辆创建
    url(r'^cat/update/$', jsonViews.updateCat),#车辆修改
    url(r'^cat/delete/$', jsonViews.deleteCat),#车辆删除
    
    url(r'^client/query/$', jsonViews.queryClient),#客户查询
    url(r'^client/create/$', jsonViews.createClient),#客户创建
    url(r'^client/update/$', jsonViews.updateClient),#客户修改
    url(r'^client/delete/$', jsonViews.deleteClient),#客户删除
    
    
    url(r"^postCat/$", jsonViews.postCat),#指派车辆功能
    url(r"^batchPostCat/$", jsonViews.batchPostCat),#指派车辆功能#批量指派
    url(r"^getCat/$", jsonViews.getCat),#查询所有车牌号
    url(r"^postCat/$", jsonViews.postCat),#订单按车次派送,{"userid":1,"plateNum:"鄂A12312","orderList":[..... ]}
    
    url(r'^operateHistory/$', jsonViews.operateHistory),#查询操作历史
    url(r'^activeTimeout/$', jsonViews.activeTimeout),#查询取卸超时
    url(r'^deleteActiveTimeout/$', jsonViews.deleteActiveTimeout),#删除取卸超时
    
    url(r'^location/$', jsonViews.location),#获取位置
    
    
    
    
    
]