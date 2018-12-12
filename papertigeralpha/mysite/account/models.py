from django.db import models
from django.contrib.auth.models import User
from ML import recommend


# Model to represent a single document
class Paper(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    abstract = models.TextField()


# Assocaite an id with multiple papers
class Project(models.Model):
    pid = models.IntegerField()  # Shoudl this be unique?
    project_papers = models.ManyToManyField(Paper)


# Base class that contains additonal information about a user
class Researcher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    projects = models.ManyToManyField(Project)
    pton_researcher = models.BooleanField(default=True)
