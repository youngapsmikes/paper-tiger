import os 
from scrapePDF import convertMultiple
import pandas as pd 
import numpy as np
from joblib import dump, load

def recommend_lda(model, lda_X, tf_article, papers):
    dists = np.zeros((lda_X.shape[0],))
    article = model.transform(tf_article)
    
    for idx, row in enumerate(lda_X):
        dists[idx] = np.linalg.norm(row-article)
    index = np.argsort(dists)[10]
    
    return papers['title'][index]
    


def recommendMain():
	## make sure model is in the same directory 

	## make sure we're in the right path
	## when this is being called by another module 
	## i think the default directory is the directory of that module

	cwd = 'C:\\Users\\myli\\Desktop\\paper-tiger\\papertigeralpha\\mysite\\ML'
	os.chdir(cwd)

	## load in the model 
	lda = load('lda_model.joblib') 
	tf_vectorizer = load('tf_vectorizer.joblib')
	lda_X = load('lda_X.joblib')
	papers = pd.read_csv('papers.csv')

	## For now, assume that the only files in the pdf directory 
	## are the ones we're interested in

	# NEED TO CHANGE THIS 
	pdfDir = 'C:\\Users\\myli\\Desktop\\paper-tiger\\papertigeralpha\\mysite\\media\\files\\'
	# pdfDir = os.getcwd() + '\\pdf\\'
	text = convertMultiple(pdfDir)

	if type(text) == list: 
		tf_text = tf_vectorizer.transform(text)
	else:
		tf_text = tf_vectorizer.transform([text])

	print("success")
	return recommend_lda(lda, lda_X, tf_text, papers)

# if __name__ == '__main__':
# 	print(recommendMain())