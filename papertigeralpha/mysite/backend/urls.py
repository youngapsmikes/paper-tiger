from django.urls import path
from . import views
from django.views.generic import TemplateView
from django.conf.urls import *

urlpatterns = [
    path('', views.index, name='index'),
    path('create2/', views.create, name='create'),
    path('create/', views.create, name='create'),
	path('searchresults', views.searchresults, name='searchresults'),
	path('saved', views.SaveProfile, name='saved'),
	path('profile/', TemplateView.as_view(template_name="profile.html")),
]
