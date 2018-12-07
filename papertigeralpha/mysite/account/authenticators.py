from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth.models import User 


class GoogleBackend(object):

	def authenticate(self, django_request, token, CLIENT_ID):
		try:
		    # Specify the CLIENT_ID of the app that accesses the backend:
		    idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

		    # Or, if multiple clients access the backend server:
		    # idinfo = id_token.verify_oauth2_token(token, requests.Request())
		    # if idinfo['aud'] not in [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]:
		    #     raise ValueError('Could not verify audience.')

		    if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
		        return None

		    # If auth request is from a G Suite domain:
		    # if idinfo['hd'] != GSUITE_DOMAIN_NAME:
		    #     raise ValueError('Wrong hosted domain.')

		    # ID token is valid. Get the user's Google Account ID from the decoded token.
		    userid = idinfo['sub']
		    user_email = idinfo['email'] 
		    name = idinfo['name']

		    # Check if authenticated person is a new user. 
		    # If new, create new user object and return. 
		    # If its an old user, get old user object.
		    try:
		    	user = User.objects.get(email = user_email)
		    	return user 
		    except User.DoesNotExist:
		    	print("USER DOES NOT EXIST")
		    	user = User.objects.create_user(username = name, email = user_email)
		    	user.save()
		    	return user 
		    
		except ValueError:
		    # Invalid token
		    return None 


	def get_user(self, user_id):
	    try:
	        return User.objects.get(pk=user_id)
	    except User.DoesNotExist:
	        return None
