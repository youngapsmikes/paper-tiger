from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
import json

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        print("FROM ACCOUNT/LOGIN")

        # token = json.loads(request.body)['idtoken']
        token = request.POST.get('idtoken')
        user = authenticate(request, token=token,
                            CLIENT_ID="218437734175-0vhiaomko61rgce732icedd8ehfug697.apps.googleusercontent.com")


        # request.session['username'] = 'myli'
        if user is None:
            print("FAILED")
            pass
        else:
            print("before login")
            login(request, user)
        return HttpResponse("LOGIN PROCESS")
