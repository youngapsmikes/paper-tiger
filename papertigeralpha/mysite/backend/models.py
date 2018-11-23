from django.db import models
from django.conf import settings
from django.db import models
from django.utils import timezone

class SearchForm(models.Model):
	author = models.CharField(max_length = 200)
	title = models.CharField(max_length=200)
	abstract = models.TextField()
