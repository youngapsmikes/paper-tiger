from django.db import models
from django.conf import settings
from django.db import models
from django.utils import timezone

class SearchForm(models.Model):
	author = models.CharField(max_length = 200)
	title = models.CharField(max_length=200)
	abstract = models.TextField()

class Profile(models.Model):
   name = models.CharField(max_length = 50)
   file = models.FileField(upload_to = 'files')
   
   class Meta:
      db_table = "profile"