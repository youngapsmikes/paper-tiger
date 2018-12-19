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


		user2 = User.objects.create_user(username = "user2")
		r2 = Researcher.objects.create(user = user2)
		project2 = Project.objects.create(pid= 1, project_name = "project2")
		p3 = Paper.objects.create(title = "Paper3")
		r2.projects.add(project2)
		project2.project_papers.add(p3)

	def test_bogus_user(self):
		"""
		Our json shold return false for a user not in a session 
		"""
		c = Client()

		test_user = User.objects.create_user(username="rando")
		test_user.save()

		#WHY???
		self.assertEqual(test_user.is_authenticated, True)
		self.assertEqual(test_user.is_active, True)

		# c.force_login(test_user, backend = 'account.authenticators.GoogleBackend')
		c.force_login(test_user)


		response = c.get('/backend/session', data = {"userID": "rando"})
		res = response.json()[0]['in_session']

		self.assertEqual(res, "true")

		resposne = c.get('/backend/logout')
		self.assertEqual(response, "true")




