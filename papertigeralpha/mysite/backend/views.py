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

from account.models import Paper, Project, Researcher
from django.contrib.auth.models import User


json_list = []

@csrf_exempt
def projects(request):


@csrf_exempt
def SaveProfile(request):

    # User should be authenticated before this function is called
    user_email = request.POST.get('email')
    project_id = request.POST.get('project_id')
    curr_user = User.objects.get(username=user_email)
    user_info = Researcher.objects.get(user=curr_user)

    #Start new project for user or get old one 

    try: 
        # Blog.objects.filter(entry__authors__name='Lennon')
        curr_proj = Researcher.objects.filter(user=curr_user, projects__pid=project_id)
    except Exception as e:
        curr_proj = Project(pid=project_id)
        curr_proj.save()
        user_info.projects.add(curr_proj)


    saved = False

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
        p1 = Paper(title=title, author=author)
        p1.save()
        curr_proj.project_papers.add(p1)


    curr_proj.save()

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
