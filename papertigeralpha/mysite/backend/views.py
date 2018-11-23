from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.http import HttpResponse
from .models import SearchForm
from databaseML import Database 
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

def index(request):
    objs = SearchForm.objects.all()
    jsondata = serializers.serialize('json', objs)
    return HttpResponse(jsondata, content_type='application/json')

@csrf_exempt
def create(request):
	print("hello world")
	return JsonResponse([{'author':'Michael Li', 'title': 'KGLQ'}], safe = False)

	

def test(request):
	# num_articles = SearchForm.objects.all().count()
	return render(request, 'test.html')

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

# Create your views here.
# def index(request):
#     return HttpResponse("Hello, world. You're at the backend index now.")