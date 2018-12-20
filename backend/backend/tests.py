from django.test import TestCase
from account.models import Researcher, Project, Paper
from django.contrib.auth.models import User
from django.test import Client
import json 
class ViewVerification(TestCase):

	def setUp(self):
		user1 = User.objects.create_user(username = "user1")
		r1 = Researcher.objects.create(user = user1)
		project1 = Project.objects.create(pid = 1, project_name = "project1")
		p1 = Paper.objects.create(title = "Paper1")
		p2 = Paper.objects.create(title = "Paper2")
		r1.projects.add(project1)
		project1.project_papers.add(p1)
		project1.project_papers.add(p2)


	def test_bogus_user(self):
		"""
		Our json shold return false for a user not in a session 
		"""

		c = Client()


		response = c.get('/backend/session', data = {"userID": "user1"})
		res = response.json()[0]['in_session']

		self.assertEqual(res, "false")

	def test_honest_user(self):
		"""
		Our views should definetly recognzie a valid user. 
		"""
		c = Client()
		user1 = User.objects.get(username="user1")
		c.force_login(user1)

		response = c.get('/backend/session', data = {"userID": "user1"})
		res = response.json()[0]['in_session']

		self.assertEqual(res, "true")

	def test_logout(self):
		"""
		Our logout view function correctly detects that a user is signed out.
		"""

		c = Client()
		user1 = User.objects.get(username="user1")
		c.force_login(user1)

		response = c.post('/backend/logout')
		self.assertEqual(response.status_code, 200)

		response = c.get('/backend/session', data = {"userID": "user1"})
		res = response.json()[0]['in_session']
		self.assertEqual(res, "false")







