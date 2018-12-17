import io 
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
import os
import sys, getopt
import pandas as pd 
from scipy import spatial


#converts pdf, returns its text content as a string
def convert(fname, pages=None):
    if not pages:
        pagenums = set()
    else:
        pagenums = set(pages)

    output = io.StringIO()
    manager = PDFResourceManager()
    converter = TextConverter(manager, output, laparams=LAParams())
    interpreter = PDFPageInterpreter(manager, converter)

    infile = open(fname, 'rb')
    for page in PDFPage.get_pages(infile, pagenums):
        interpreter.process_page(page)
    infile.close()
    converter.close()
    text = output.getvalue()
    output.close
    return text    
#converts all pdfs in directory pdfDir, saves all resulting txt files to txtdir
def convertMultiple(pdfDir):
    print("FROM CONVERT MULTIPLE")
    if pdfDir == "": pdfDir = os.path.join(os.getcwd, "")
    print(pdfDir)
    for pdf in os.listdir(pdfDir): #iterate through pdfs in pdf directory
        fileExtension = pdf.split(".")[-1]
        if fileExtension == "pdf":
            pdfFilename = os.path.join(pdfDir, pdf) 
            text = convert(pdfFilename) #get string of text content of pdf
            return text

    return ""