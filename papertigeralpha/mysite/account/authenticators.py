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

		    user = User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')
		    
		    return user 

		except ValueError:
		    # Invalid token
		    return None 

	def get_user(self, user_id):
		return None
		# try:
		# 	return User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')
		# except User.DoesNotExist:
		# 	return None 
