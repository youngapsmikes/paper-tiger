from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth.models import User 
from .models import Researcher


class GoogleBackend(object):

	def authenticate(self, django_request, token, CLIENT_ID):
		try:
		    # Specify the CLIENT_ID of the app that accesses the backend:
		    idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

		    if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
		        return None


		    # ID token is valid. Get the user's Google Account ID from the decoded token.
		    userid = idinfo['sub']
		    user_email = idinfo['email'] 
		    name = idinfo['name']


		    # Check if authenticated person is a new user. 
		    # If new, create new user object and return. 
		    # If its an old user, get old user object.
		    try:
		    	user = User.objects.get(username= user_email)
		    	return user 
		    except User.DoesNotExist:
		    	# Don't set the username to Google name since its possible for multiple names to have the same email
		    	user = User.objects.create_user(username = user_email)
		    	user.save()
		    	# create researcher model to store user and additonal information 
		    	user_details = Researcher(user = user)
		    	user_details.save()
		    	return user 
		    
		except ValueError:
		    # Invalid token
		    return None 


	def get_user(self, user_id):
	    try:
	        return User.objects.get(pk=user_id)
	    except User.DoesNotExist:
	        return None