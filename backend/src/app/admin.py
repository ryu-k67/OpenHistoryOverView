from django.contrib import admin

# Register your models here.
from .models import Note,Graph,GraphImage
from django.contrib.admin import ModelAdmin

admin.site.register(Note)

# class GraphCustom(ModelAdmin):
#     # list_display=('id','image','data','updated_at','created_at')
#     list_display=['id','data','updated_at','created_at']
#     list_display_links=['id']

# admin.site.register(Graph,GraphCustom)
admin.site.register(Graph)
admin.site.register(GraphImage)