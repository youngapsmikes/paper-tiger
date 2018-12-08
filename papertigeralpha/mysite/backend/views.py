from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.http import HttpResponse
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt

from .models import SearchForm
from .models import Profile
from .forms import ProfileForm

from databaseML import Database 
from django.http import JsonResponse
from django.conf import settings


import sys 

# insert the absolute path of ML directory
sys.path.insert(0, str(settings.BASE_DIR) + '\\ML')

# os.path.join(BASE_DIR, ...)
from ML import recommend 

json_list = []

def profile(request):
   return render(request, 'profile.html')

@csrf_exempt
def SaveProfile(request):

    saved = False
    # if request.method == "POST":

    #Get the posted form
    MyProfileForm = ProfileForm(request.POST, request.FILES)
    print("hello world")

    if MyProfileForm.is_valid():
         profile = Profile()
         print("hello world2")
         # profile.name = MyProfileForm.cleaned_data["name"]
         profile.file = MyProfileForm.cleaned_data["file"]
         profile.save()
         saved = True
    else:
        MyProfileForm = ProfileForm()



    pairs = recommend.recommendMain()
    for (title, author) in pairs:
        json_list.append({'author': author, 'title': title})
    # print(json_list)
    return HttpResponse(200)

@csrf_exempt
def results(request):
    if json_list is None:
        return JsonResponse([{'author':'', 'title': 'no prior POST'}], safe = False)
    else:
        return JsonResponse(json_list, safe = False)

def index(request):
    objs = SearchForm.objects.all()
    jsondata = serializers.serialize('json', objs)
    return HttpResponse(jsondata, content_type='application/json')

@csrf_exempt
def create(request):
    print("hello world")
    return JsonResponse([{'author':'Michael Li', 'title': 'KGLQ'}], safe = False)


def searchresults(request):
    database = Database()
    database.connect()
    articles = database.search()
    database.disconnect()

    html = ''
    html += '<!DOCTYPE html>\n'
    html += '<html>\n'
    html += '<head>\n'
    html += '<title>paper-tiger.com</title>\n'
    html += '</head>\n'
    html += '<body>\n'
    # html += getHeader()
    html += 'Click here to do another '
    html += '<a href="create2/">article search</a>.\n'
    html += '<br>\n'
    html += '<h1>Article Search Results</h1>\n'
    if len(articles) == 0:
        html += '(None)<br>\n'
    else:
        for res in articles:
            html += str(res[0]) + '\n'
            html += '<br> \n'
    html += '<br>\n'
    html += '<br>\n'
    html += '<br>\n'
    html += '<br>\n'
    html += '<br>\n'
    # html += getFooter()
    html += '</body>\n'
    html += '</html>\n'

    response = HttpResponse(html)
    # response.set_cookie('prevAuthor', author)
    return response
