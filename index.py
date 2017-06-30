#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Date    : 2015-01-17 13:45:07
# @Author  : Weizhong Tu (mail@tuweizhong.com)
# @Link    : http://www.tuweizhong.com

import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'jiahua.settings'

#------------日志设置----------------
import logging
#import logging.config
#logging.config.fileConfig( "/home/bae/app/logging.conf" )


logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S',
                    filename='/home/bae/log/appconf.log',
                    filemode='w')


from django.core.wsgi import get_wsgi_application
from bae.core.wsgi import WSGIApplication
application = WSGIApplication(get_wsgi_application())