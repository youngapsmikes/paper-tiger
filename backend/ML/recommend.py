import os 
from .scrapePDF import convertMultiple
import pandas as pd 
import numpy as np
from joblib import dump, load
from django.conf import settings
from scipy import spatial


def recommend_lda(model, lda_X, tf_article, papers, authors):
    dists = np.zeros((lda_X.shape[0],))
    article = model.transform(tf_article)
    
    for idx, row in enumerate(lda_X):
        dists[idx] = np.linalg.norm(row-article)
    index = list(np.argsort(dists)[1:9])
    topic_vecs = list(lda_X[np.argsort(dists)[1:9]])
    authors = list(authors[authors['id'].isin(index)]['name'])
    return list(zip(list(papers['title'][index]), topic_vecs, authors))
    
def generate_Explanation(inputs, results, pdf_names):
	tree = spatial.KDTree(inputs)
	new_results = []
	for (title, topic_vec, author) in results:
	    (_, idx) = tree.query(topic_vec)
	    explanation = str(pdf_names[idx])
	    new_results.append((title, author, explanation))

	return new_results


def recommendMain(valid_titles):

	## make sure working directory is the current ML directory 
	# cwd = str(settings.BASE_DIR) + '//ML'
	cwd = os.path.join(str(settings.BASE_DIR), "ML")
	print("cwd is: ", cwd)
	os.chdir(cwd)
	
	## load in the model 
	lda = load('lda_model.joblib') 
	tf_vectorizer = load('tf_vectorizer.joblib')
	lda_X = load('lda_X.joblib')
	papers = pd.read_csv('papers.csv')
	authors = pd.read_csv('authors.csv')

	## For now, assume that the only files in the pdf directory 
	## are the ones we're interested in

	# NEED TO CHANGE THIS 
	pdfDir = os.path.join(str(settings.BASE_DIR), "media", "files")
	# pdfDir = str(settings.BASE_DIR) + "//media//files//"
	# pdfDir = os.getcwd() + '\\pdf\\'
	# text = convertMultiple(pdfDir, valid_titles)
	(text, pdf_list, pdf_names) = convertMultiple(pdfDir, valid_titles)

	tf_text = tf_vectorizer.transform([text])
	inputs = list(map(lambda text: lda.transform(tf_vectorizer.transform([text]))[0], pdf_list))
	results = recommend_lda(lda, lda_X, tf_text, papers, authors)
	return generate_Explanation(inputs, results, pdf_names)
	# if type(text) == list: 
	# 	tf_text = tf_vectorizer.transform(text)
	# else:
	# 	tf_text = tf_vectorizer.transform([text])
