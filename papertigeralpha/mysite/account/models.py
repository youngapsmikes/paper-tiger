from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Researcher(models.Model):
	user = models.OneToOneField(User, on_delete = models.CASCADE)
	pton_researcher = models.BooleanField(default = True)