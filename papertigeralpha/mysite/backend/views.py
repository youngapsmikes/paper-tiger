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
import json
# insert the absolute path of ML directory
sys.path.insert(0, str(settings.BASE_DIR) + '\\ML')

# os.path.join(BASE_DIR, ...)
from ML import recommend

from account.models import Paper, Project, Researcher
from django.contrib.auth.models import User


json_list = []

# @csrf_exempt
# def SaveProfile(request):
#     print("saved_profile called")
    
#     # User should be authenticated before this function is called
#     user_name = request.POST.get('userID')
#     project_id = request.POST.get('projectID')
#     curr_user = User.objects.get(username=user_name)
#     user_info = Researcher.objects.get(user=curr_user)

#     # #Start new project for user or get old one 
#     try: 
#         # Blog.objects.filter(entry__authors__name='Lennon')
#         curr_proj = Researcher.objects.filter(user=curr_user, projects__pid=project_id)
#     except Exception as e:
#         curr_proj = Project(pid=project_id)
#         curr_proj.save()
#         user_info.projects.add(curr_proj)


#     saved = False

#     #Get the posted form
#     MyProfileForm = ProfileForm(request.POST, request.FILES)

#     if MyProfileForm.is_valid():
#          profile = Profile()
#          print("hello world2")
#          # profile.name = MyProfileForm.cleaned_data["name"]
#          profile.file = MyProfileForm.cleaned_data["file"]
#          profile.save()
#          saved = True
#     else:
#         MyProfileForm = ProfileForm()


#     pairs = recommend.recommendMain() 
#     for (title, author) in pairs:
#         json_list.append({'author': author, 'title': title})
#         p1 = Paper(title=title, author=author)
#         p1.save()
#         curr_proj.project_papers.add(p1)


#     curr_proj.save()

#     return JsonResponse([{'name':'Michael Li'}], safe = False)
#     # return HttpResponse(200)


@csrf_exempt
def saved(request):
    """ Get articles for users selected project. If new project, create and return. 

    Parameters
    ----------
    userID: int 
        Unique identifier for user. 
    projectID: int 
        Unique integer associated with a project

    Returns
    -------
    [{name: “filexyz.pdf”}, {name: “filewyz.pdf”}]
    """
    print("saved_profile called")
    
    if request.method == 'POST':
        print("FROM POST")
        # User should be authenticated before this function is called
        user_name = request.POST.get('userID')
        project_id = request.POST.get('projectID')
        curr_user = User.objects.get(username=user_name)
        user_info = Researcher.objects.get(user=curr_user)

        #Get the posted form
        MyProfileForm = ProfileForm(request.POST, request.FILES)

        if MyProfileForm.is_valid():
             profile = Profile()
             print("found form")
             # profile.name = MyProfileForm.cleaned_data["name"]
             profile.file = MyProfileForm.cleaned_data["file"]
             profile.save()
             saved = True
        else:
            MyProfileForm = ProfileForm()

        ## add this information to user object and project object 
        ## how are these files going to be stored locally lol - will we need different directories for usrees
        ## 

        return HttpResponse(200)
    elif request.method == 'GET': 
        print("FROM GET")
        user_name = request.GET.get('userID')
        project_id = request.GET.get('projectID')
        curr_user = User.objects.get(username=user_name)
        user_info = Researcher.objects.get(user=curr_user)

        # #Start new project for user or get old one 
        try: 
            print("from try")
            # curr_proj = Researcher.objects.get(user=curr_user, projects__pid=project_id)
            curr_proj = Researcher.objects.filter(user=curr_user, projects__pid=project_id)
        except Exception as e:
            print("from except")
            curr_proj = Project(pid=project_id)
            curr_proj.save()
            user_info.projects.add(curr_proj)
            return JsonResponse([{}], safe = False)

        curr_researcher = curr_proj[0]
        proj_json = []
        curr_proj = curr_researcher.projects.all()[0]
        print(curr_proj)

        for e in list(curr_proj.project_papers.all()):
            print(e.title)
            proj_json.append({'name': str(e.title)})


        return JsonResponse(proj_json, safe = False)


@csrf_exempt
def results(request):
    print("FROM RESULTS")
    user_name = request.GET.get('userID')
    project_id = request.GET.get('projectID')
    curr_user = User.objects.get(username=user_name)
    user_info = Researcher.objects.get(user=curr_user)
    
    ## how can i test this endpoint?
    ## get the list of pdf names in project
    ## iterate through the directory passing those names into the project 


    # if json_list is None:
    #     return JsonResponse([{'author':'', 'title': 'no prior POST'}], safe = False)
    # else:
    #     return JsonResponse(json_list, safe = False)

def index(request):
    objs = SearchForm.objects.all()
    jsondata = serializers.serialize('json', objs)
    return HttpResponse(jsondata, content_type='application/json')

@csrf_exempt
def create(request):
    print("hello world")
    return JsonResponse([{'author':'Michael Li', 'title': 'KGLQ'}], safe = False)

@csrf_exempt
def projects(request):
    """ Get the projects that a user has created
    Parameters
    ----------
    userID: int

    Returns
    -------
    [{'name': project name, 'id': project id}]
    """
    print("from projects")
    
    ## get user information based on user id 
    user_name = request.GET.get('userID')
    curr_user = User.objects.get(username=user_name)
    user_info = Researcher.objects.get(user=curr_user)

    proj_json = []
    print("USER INFO STORED PROPERLY??")
    for e in list(user_info.projects.all()):
        proj_json.append({'name': str(e.project_name), 'id': e.pid})

    print(proj_json)
    return JsonResponse(proj_json, safe = False)

@csrf_exempt 
def newproject(request):
    """Create a new project with the name sent in the data

    Parameters 
    ----------
    userID: int
    project: str 
    
    """
    print("from new project")
    request_dict = json.loads(request.body) 

    user_name = request_dict['userID']
    project_name = request_dict['project']

    # ## identify user
    curr_user = User.objects.get(username=user_name)
    user_info = Researcher.objects.get(user=curr_user)

    # ## have to do some logic to check the project ids 
    pid = 1
    curr_proj = Project(pid = pid, project_name=project_name)
    curr_proj.save()
    user_info.projects.add(curr_proj)
    print(user_info.projects.all())
    user_info.save()

    return HttpResponse(200)


