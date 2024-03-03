from django.db import models
from django.conf import settings
# from django_mysql.models import ListCharField

# Create your models here.
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from accounts.models import UserAccount

class Note(models.Model):
    user=models.ForeignKey(UserAccount,on_delete=models.CASCADE,null=True)
    body=models.TextField(null=True)


# 年表の画像とデータを格納するモデルを追加する
class Graph(models.Model):
    user_id=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,)
    # image=models.ImageField(upload_to="images/",verbose_name='画像')
    # image = models.ImageField(upload_to='graph_images/', blank=True, null=True)
    # graph_point = models.IntegerField('',verbose_name='画像')
    # graph_point=ListCharField(models.IntegerField('グラフの点の値',default=50),size=10,max_length=10)
    graph_point_0=models.IntegerField('グラフの点の値',default=50)
    graph_point_1=models.IntegerField('グラフの点の値',default=50)
    graph_point_2=models.IntegerField('グラフの点の値',default=50)
    graph_point_3=models.IntegerField('グラフの点の値',default=50)
    graph_point_4=models.IntegerField('グラフの点の値',default=50)
    graph_point_5=models.IntegerField('グラフの点の値',default=50)
    graph_point_6=models.IntegerField('グラフの点の値',default=50)
    # graph_point_7=models.IntegerField('グラフの点の値',default=50)
    # graph_point_8=models.IntegerField('グラフの点の値',default=50)
    # graph_point_9=models.IntegerField('グラフの点の値',default=50)

    graph_point_num=models.IntegerField('グラフの点の数',default=0)
    updated_at=models.DateTimeField('更新日',auto_now=True)
    created_at=models.DateTimeField('作成日',auto_now_add=True)
    
class GraphImage(models.Model):
    user_id=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,)
    # image=models.ImageField(upload_to="images/",verbose_name='画像')
    image = models.ImageField(upload_to='graph_images/', blank=True, null=True)
    updated_at=models.DateTimeField('更新日',auto_now=True)
    created_at=models.DateTimeField('作成日',auto_now_add=True)