#!/usr/bin/env python

#-----------------------------------------------------------------------
# database.py
# Author: Bob Dondero
#-----------------------------------------------------------------------

from sqlite3 import connect
from sys import stderr
from os import path

#-----------------------------------------------------------------------

class Database:
    
    def __init__(self):
        self._connection = None

    def connect(self):      
        DATABASE_NAME = 'database.sqlite'
        if not path.isfile(DATABASE_NAME):
            raise Exception('Database connection failed')
        self._connection = connect(DATABASE_NAME)
                    
    def disconnect(self):
        self._connection.close()

    def search(self):
        cursor = self._connection.cursor() 

        QUERY_STRING =  'SELECT papers.title' + \
            ' FROM papers'

        cursor.execute(QUERY_STRING) 
        
        results = []
        row = cursor.fetchone()
        while row:  
            results.append(row)
            row = cursor.fetchone()
        cursor.close()
        return results

#-----------------------------------------------------------------------

# For testing:

if __name__ == '__main__':
    database = Database()
    database.connect()
    res = database.search()
    print(res)
    database.disconnect()
