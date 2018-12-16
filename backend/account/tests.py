"""
These tests are really written to get some understanding of Django's QuerySet API 
and for learning how to use the testing infastructure.
"""


from django.test import TestCase
from .models import Researcher, Project, Paper
from django.contrib.auth.models import User



class AssociationTestCase(TestCase):

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

	def test_sanity(self):
		"""
		Check that users data can be retreived and is unchanged 
		"""

		user1 = User.objects.get(username="user1")
		r1 = Researcher.objects.get(user=user1)
		ls_projects = r1.projects.all()
		self.assertEqual(1, len(ls_projects))

		project1 = r1.projects.get(pid =1)
		self.assertEqual(2, len(project1.project_papers.all()))
		p1 = project1.project_papers.get(title = "Paper1")
		p2 = project1.project_papers.get(title = "Paper2")


	def test_user_seperation(self):
		user2 = User.objects.get(username="user2")
		r2 = Researcher.objects.get(user=user2)

		self.assertEqual(1, len(r2.projects.all()))

		project2 = r2.projects.get(pid = 1)
		self.assertEqual(1, len(project2.project_papers.all()))

		p3 = project2.project_papers.get(title = "Paper3")
		self.assertEqual("Paper3", p3.title)
