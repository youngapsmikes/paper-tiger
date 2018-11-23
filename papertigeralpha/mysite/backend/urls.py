from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('create2/', views.create, name='create'),
    path('create/', views.create, name='create'),
	path('searchresults', views.searchresults, name='searchresults'),
	path('test', views.test, name='test'),
]
