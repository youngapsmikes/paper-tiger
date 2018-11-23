from os import path 
from sys import argv, stderr, exit 
from sqlite3 import connect 
from collections import defaultdict 

def executeSearch():
	database_name = 'database.sqlite'

	if not path.isfile(database_name):
			raise Exception('database database.sqlite not found')
	
	connection = connect(database_name)
	cursor = connection.cursor() 
	queryStr = 'SELECT papers.title' + \
			' FROM papers'

	cursor.execute(queryStr)
	row = cursor.fetchone()
	print row
	return row

def main():
	executeSearch()

if __name__ == '__main__':
	main()
