from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login

@csrf_exempt 
def user_login(request):
	if request.method == 'POST':
		print("user_login function called")
		token = request.POST.get('idtoken')
		print("token is: ", token)
		user = authenticate(request, token = token, CLIENT_ID = "218437734175-0vhiaomko61rgce732icedd8ehfug697.apps.googleusercontent.com")
		if user is None :
			print("USER INVALID!!!")
		else:
			print("USER IS SIGNED IN")
		return HttpResponse("LOGIN HAS FINISHED")