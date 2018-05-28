from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.load_map, name='load-map'),
    url(r'^attractions/$', views.load_attractions, name='load-attractions'),
]