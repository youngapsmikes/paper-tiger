import os 
from .scrapePDF import convertMultiple
import pandas as pd 
import numpy as np
from joblib import dump, load
from django.conf import settings
from scipy import spatial


def getAuthors(paper_ids, authors, paper_authors):
    return [" ".join(authors[authors.id.isin(paper_authors[paper_authors['paper_id'] == paper_id]['author_id'].values)].name.values) for paper_id in paper_ids] 

def getLinks(paper_ids):
    article_links = pd.read_csv('id_link.csv')
    return [list(article_links[article_links['id'] == paper_id]['link'].values) for paper_id in paper_ids]

def sortByTitle(zipped_results):
    return sorted(zipped_results, key=lambda x: x[0])

def getTopicButtons(topic_vecs):

    user_buttons = []
    for article_topics in topic_vecs:
        topic_idx = list(article_topics.argsort()[::-1])
        topic_sorted = sorted(article_topics)[::-1]

        max_topic = topic_sorted[0]
        max_topic2 = topic_sorted[1]

        if max_topic > .75:
            strength1 = 2
            strength2 = 0
        elif max_topic > .55 and max_topic <= .75:
            strength1 = 2
            strength2 = 1
        elif max_topic > 0.20 and max_topic <= 0.55:
            strength1 = 1 
            strength2 = 1 
        else:
            strength1 = 0
            strength2 = 0

        user_buttons.append(topic_idx[0:2]+[strength1, strength2])

    return user_buttons 


def recommend_lda(model, lda_X, tf_article, papers, authors, paper_authors):
    dists = np.zeros((lda_X.shape[0],))
    article = model.transform(tf_article)
    
    for idx, row in enumerate(lda_X):
        dists[idx] = np.linalg.norm(row-article)
    index = list(np.argsort(dists)[1:20])
    topic_vecs = list(lda_X[np.argsort(dists)[1:20]])

    paper_ids = papers.iloc[index].id.values
    authors = getAuthors(paper_ids, authors, paper_authors)
    links = getLinks(paper_ids)
    buttons = getTopicButtons(topic_vecs)

    zipped_results = zip(list(papers['title'][index]), topic_vecs, authors, links, buttons)
    if False:
        zipped_results = sortByTitle(zipped_results)
    return list(zipped_results)
    
def generate_Explanation(inputs, results, pdf_names):
	tree = spatial.KDTree(inputs)
	new_results = []
	for (title, topic_vec, author, links, buttons) in results:
	    (_, idx) = tree.query(topic_vec)
	    explanation = str(pdf_names[idx])
	    new_results.append((title, author, explanation, links, buttons))

	return new_results


def recommendMain(pdf_list, pdf_names):

	cwd = os.path.join(str(settings.BASE_DIR), "ML")
	print("cwd is: ", cwd)
	os.chdir(cwd)

	## load in the models 
	lda = load('lda_model.joblib') 
	tf_vectorizer = load('tf_vectorizer.joblib')
	lda_X = load('lda_X.joblib')
	papers = pd.read_csv('papers.csv')
	authors = pd.read_csv('authors.csv')
	paper_authors = pd.read_csv('paper_authors.csv')

	text = "".join(pdf_list)
	combined_tfidf = tf_vectorizer.transform([text])

	# vectorize all the papers associated with a project
	separated_tfidf = list(map(lambda text: lda.transform(tf_vectorizer.transform([text]))[0], pdf_list))
	recommendations = recommend_lda(lda, lda_X, combined_tfidf, papers, authors, paper_authors)

	return generate_Explanation(separated_tfidf, recommendations, pdf_names)
