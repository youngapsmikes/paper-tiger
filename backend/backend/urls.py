from django.urls import path
from . import views
from django.views.generic import TemplateView
from django.conf.urls import *

urlpatterns = [
	path('saved', views.saved, name='saved'), # Get articles for users selected project.
	path('results', views.results, name='results'),
	path('projects/', views.projects, name = 'projects'),
	path('newproject', views.newproject, name = 'newproject'),
	path('removefile', views.removefile, name = 'removefile'),
	path('session', views.in_session, name = 'session'),
	path('logout', views.exit, name = 'logout'),
    path('getusertoken', views.getUserToken, name = 'getusertoken'),
    path('signoutuser', views.signOut, name = 'signoutuser'),
    path('deleteproject', views.deleteproject, name = 'deleteproject'),
    path('renameproject', views.renameproject, name = 'renameproject'),
    path('tagorder', views.tagorder, name = 'tagorder')
]
