from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.http import HttpResponse
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

from .models import SearchForm
from .models import Profile
from .forms import ProfileForm

from django.http import JsonResponse
from django.conf import settings


import sys
import json
import os
import glob
import stat
import shutil
from uuid import uuid4
# insert the absolute path of ML directory
sys.path.insert(0, os.path.join(str(settings.BASE_DIR), "ML"))
from ML import recommend
from ML import scrapePDF

from account.models import Paper, Project, Researcher
from django.contrib.auth.models import User
from django.contrib.auth import logout


# def convertToUser(user_token):
#     user = User.objects.get(last_name = user_token)
#     return user

@csrf_exempt
def getUserToken(request):
    print("FROM user token")
    ## if token is not None 
    user_name = json.loads(request.body)['userName']
    # user_name = request.POST.get('userName')
    curr_user = User.objects.get(username=user_name)
    rand_token = str(uuid4())

    curr_user.last_name = rand_token
    curr_user.save()
    print(rand_token)
    return JsonResponse([{'token': rand_token}], safe = False)

@csrf_exempt
def signOut(request):
    print("FROM sign out")
    user_token = request.POST.get('userID')
    ## receiving token
    curr_user = User.objects.get(last_name = user_token)
    curr_user.last_name = "None"

    return JsonResponse()

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
    print("FROM SAVED")

    ## SAVE USER uploaded files
    if request.method == 'POST':
        # User should be authenticated before this function is called
        user_token = request.POST.get('userID')
        project_id = request.POST.get('projectID')
        curr_user = User.objects.get(last_name=user_token)
        user_info = Researcher.objects.get(user=curr_user)

        MyProfileForm = ProfileForm(request.POST, request.FILES)
        proj_json = []

        if MyProfileForm.is_valid():
             profile = Profile()
             profile.file = MyProfileForm.cleaned_data["file"]
             file_name = str(profile.file)

             ## treat media/files as a temporary directory and point convertMultiple to that folder
             pdfDir = os.path.join(str(settings.BASE_DIR), "media", "files")
             if not os.path.exists(pdfDir):
                os.mkdir(pdfDir)
             profile.save()

             # scrape the current uploaded file and save paper
             text = scrapePDF.convertMultiple(pdfDir)
             p1 = Paper(title = file_name, body = text)
             p1.save()

             # remove the temp directory
             shutil.rmtree(pdfDir)

             # save paper to researcher's projects
             curr_researcher = Researcher.objects.filter(user=curr_user, projects__pid=project_id)[0]
             curr_proj = list(curr_researcher.projects.filter(pid = project_id))[0]
             print("LEN OF QUERY SET")
             print(len(list(curr_researcher.projects.filter(pid = project_id))))
             curr_proj.project_papers.add(p1)

             for e in list(curr_proj.project_papers.all()):
                proj_json.append({'name': str(e.title)})


             saved = True
        else:
            MyProfileForm = ProfileForm()
        print("SAVE PROFILE")
        print(proj_json)
        return JsonResponse(proj_json, safe = False)
    elif request.method == 'GET':
        user_token = request.GET.get('userID')
        project_id = request.GET.get('projectID')
        curr_user = User.objects.get(last_name=user_token)
        user_info = Researcher.objects.get(user=curr_user)

        # Start new project for user or get old one
        try:
            # print("from try")
            # curr_proj = Researcher.objects.get(user=curr_user, projects__pid=project_id)
            curr_proj = Researcher.objects.filter(user=curr_user, projects__pid=project_id)
        except Exception as e:
            # print("from except")
            curr_proj = Project(pid=project_id)
            curr_proj.save()
            user_info.projects.add(curr_proj)
            return JsonResponse([{}], safe = False)

        curr_researcher = curr_proj[0]
        proj_json = []


        # curr_proj = curr_researcher.projects.all()[0]
        curr_proj = list(curr_researcher.projects.filter(pid = project_id))[0]


        for e in list(curr_proj.project_papers.all()):
            # print(e.title)
            proj_json.append({'name': str(e.title)})


        return JsonResponse(proj_json, safe = False)


@csrf_exempt
def results(request):
    # print("IS THE USER AUTHENTICATED" + str(request.user.is_authenticated))
    # # logout(request)
    # if request.user.is_authenticated:
    #     print("USER IS AUTHENTICATED")
    # else:
    #     print("USER IS NOT AUTHENTICATED")
    # print("USERNAME" + str(request.session['username']))
    # print("FROM RESULTS")
    user_token = request.GET.get('userID')
    project_id = request.GET.get('projectID')
    curr_user = User.objects.get(last_name=user_token)
    curr_researcher = Researcher.objects.filter(user=curr_user, projects__pid=project_id)[0]
    curr_proj = list(curr_researcher.projects.filter(pid = project_id))[0]

    json_list = []

    papers = list(curr_proj.project_papers.all())

    if len(papers) < 1:
        return JsonResponse(json_list, safe = False)

    pdf_names = []
    pdf_list = []

    ## create pdf names list and pdf list to pass into recommender
    for e in papers:
        pdf_names.append(e.title)
        pdf_list.append(e.body)

    pairs = recommend.recommendMain(pdf_list, pdf_names, tag = None)

    topic_names = ["Application", "Comp Neuro", "Experimental", "Neural Nets", "Stats/Models"]
    print(len(pairs))
    for (title, author, why, link, buttons) in pairs:
        topic1 = topic_names[buttons[0]]
        topic2 = topic_names[buttons[1]]
        strength1 = buttons[2]
        strength2 = buttons[3]
        json_list.append({'author': author, 'title': title, 'why':why, 'link': link, 'topic1': topic1, 'topic2': topic2, 'strength1': strength1, 'strength2':strength2})
        # p1 = Paper(title=title, author=author)
        # p1.save()
        # curr_proj.project_papers.add(p1)

    print(json_list)
    return JsonResponse(json_list, safe = False)


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
    print("FROM PROJECTS")

    ## get user information based on user id
    user_token = request.GET.get('userID')
    print("USER TOKEN" + str(user_token))
    # curr_user = User.objects.get(username=user_name)
    curr_user = User.objects.get(last_name = user_token)

    user_info = Researcher.objects.get(user=curr_user)

    proj_json = []
    # print("USER INFO STORED PROPERLY??")
    for e in list(user_info.projects.all()):
        proj_json.append({'name': str(e.project_name), 'id': e.pid})

    # print(proj_json)
    return JsonResponse(proj_json, safe = False)

@csrf_exempt
def newproject(request):
    """Create a new project with the name sent in the data

    Parameters
    ----------
    userID: int
    project: str

    """
    print("FROM NEW PROJECT")
    request_dict = json.loads(request.body)

    user_token = request_dict['userID']
    project_name = request_dict['project']

    # ## identify user
    curr_user = User.objects.get(last_name=user_token)
    user_info = Researcher.objects.get(user=curr_user)

    # ## have to do some logic to check the project ids
    pid = user_info.max_id + 1
    # print(pid)

    ## 
    user_info.max_id = pid
    curr_proj = Project.objects.create(pid = pid, project_name=project_name)
    user_info.projects.add(curr_proj)
    user_info.save()



    proj_json = []
    for e in list(user_info.projects.all()):
        proj_json.append({'name': str(e.project_name), 'id': e.pid})
    print(proj_json)
    return JsonResponse(proj_json, safe = False)

@csrf_exempt
def removefile(request):
    """Remove a file that has been uploaded by a user
    Parameters
    ----------
    userID: int
    projectID: int
    fileName: str
    """

    print("FROM REMOVE FILE")

    request_dict = json.loads(request.body)
    user_token = request_dict['userID']
    proj_id = int(request_dict['projectID'])
    file_name = str(request_dict['fileName'])


    user_info = Researcher.objects.get(user=User.objects.get(last_name=user_token))

    try:
        targ_paper = user_info.projects.get(pid=proj_id).project_papers.get(title=file_name)
        targ_paper.delete()
    except Exception as e:
        pass

    user_info.save()

    updated_projects = []
    print("AFTER FOR LOOP")
    for proj in list(user_info.projects.all()):
        if(proj.pid == proj_id):
            updated_projects = list(proj.project_papers.all())

    json_list = []
    for proj in updated_projects:
        json_list.append({'name': str(proj.title)})
    return JsonResponse(json_list, safe = False)
@csrf_exempt
def in_session(request):

    # print(dir(request.session))

    # CHECK THAT LOGGED IN <=> IN SESSION
    if (request.user.is_authenticated):
        return JsonResponse([{"in_session": "true"}], safe= False)
    else:
        return JsonResponse([{"in_session": "false"}], safe = False)

@csrf_exempt 
def deleteproject(request):

    print("FROM DELETE")
    request_dict = json.loads(request.body)
    user_token = request_dict['userID']
    proj_id = int(request_dict['projectID'])

    user_info = Researcher.objects.get(user=User.objects.get(last_name=user_token))

    try:
        proj = user_info.projects.get(pid=proj_id)
        proj.delete()
        user_info.projects.save()
    except Exception as e:
        pass


    ## return updated projects
    proj_json = []
    for e in list(user_info.projects.all()):
        proj_json.append({'name': str(e.project_name), 'id': e.pid})

    print(proj_json)
    return JsonResponse(proj_json, safe = False)
@csrf_exempt
def renameproject(request):
    request_dict = json.loads(request.body)
    user_token = request_dict['userID']
    proj_id = int(request_dict['projectID'])
    newTitle = str(request_dict['newTitle'])

    user_info = Researcher.objects.get(user=User.objects.get(last_name=user_token))

    try:
        proj = user_info.projects.get(pid=proj_id)
        proj.project_name = str(newTitle)
        proj.save()    
    except Exception as e:
        pass

    proj_json = []
    for e in list(user_info.projects.all()):
        proj_json.append({'name': str(e.project_name), 'id': e.pid})

    print(proj_json)
    return JsonResponse(proj_json, safe = False)

@csrf_exempt
def tagorder(request):

    request_dict = json.loads(request.body)
    user_token = request_dict['userID']
    proj_id = int(request_dict['projectID'])
    tag = request_dict['tag']
    topic_dict = {"Application":0, "Comp Neuro":1, "Experimental":2, "Neural Nets":3, "Stats/Models":4}
    tag = topic_dict[tag]
    
    print("USER TOKEN" + str(user_token))
    print("Project id" + str(proj_id))
    print("tag" + str(tag))

    curr_user = User.objects.get(last_name=user_token)
    curr_researcher = Researcher.objects.filter(user=curr_user, projects__pid=proj_id)[0]
    curr_proj = list(curr_researcher.projects.filter(pid = proj_id))[0]

    json_list = []

    papers = list(curr_proj.project_papers.all())

    if len(papers) < 1:
        return JsonResponse(json_list, safe = False)

    pdf_names = []
    pdf_list = []

    ## create pdf names list and pdf list to pass into recommender
    for e in papers:
        pdf_names.append(e.title)
        pdf_list.append(e.body)

    pairs = recommend.recommendMain(pdf_list, pdf_names, tag)

    topic_names = ["Application", "Comp Neuro", "Experimental", "Neural Nets", "Stats/Models"]
    for (title, author, why, link, buttons) in pairs:
        topic1 = topic_names[buttons[0]]
        topic2 = topic_names[buttons[1]]
        strength1 = buttons[2]
        strength2 = buttons[3]
        json_list.append({'author': author, 'title': title, 'why':why, 'link': link, 'topic1': topic1, 'topic2': topic2, 'strength1': strength1, 'strength2':strength2})
        # p1 = Paper(title=title, author=author)
        # p1.save()
        # curr_proj.project_papers.add(p1)

    # print(json_list)
    return JsonResponse(json_list, safe = False)



@csrf_exempt
def exit(request):
    logout(request)
    return HttpResponse(200)
