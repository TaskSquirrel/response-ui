import numpy as np
#import xlrd
import pandas as pd
import json

#from sklearn.utils import shuffle
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report,confusion_matrix
import seaborn as sns
import plotly.graph_objs as go 

import plotly.plotly as py
from plotly.offline import download_plotlyjs, init_notebook_mode, plot, iplot

class mainHub():

    def __init__(self):
        self.dfWriteUps = pd.read_excel("../C4G/drive/C4G Outcomes Counselor Issues Write Ups.xlsx")
        ## Initialize the file name here.
        ## ## Should be ported to a function outside of the init function
        self.thisFile = [] # Subset of file to be used in file functions
        self.fileColumns = [] # These are the 'non-null' columns of the whole file
        self.personColumns = [] # These are the non-null' columns of the specific person
        self.topCallers = [] #Specific array for the top callers to be presented from the main file
        self.allCallers = [] #Holds call counts for all callers

        ## Hard coding the phone number for the top caller
        self.topCaller = 8453893220

    def getAnxietyGraph(self,personReport):
        tempDates = pd.to_datetime(personReport['CallDateAndTimeEnd']).values
        personReport['time'] = tempDates
        if 'Caller Issues - Change in Anxiety Levels' in personReport.columns:
            ##
            startEmotion=[]
            endEmotion=[]
            for i in personReport['Caller Issues - Change in Anxiety Levels']:
                #print(i)
                if i.startswith('None'):
                    startEmotion.append(0)
                elif i.startswith('Low'):
                    startEmotion.append(1)
                elif i.startswith('Med'):
                    startEmotion.append(2)
                elif i.startswith('High'):
                    startEmotion.append(3)
                    
                if i.endswith('None'):
                    endEmotion.append(0)
                elif i.endswith('Low'):
                    endEmotion.append(1)
                elif i.endswith('Med'):
                    endEmotion.append(2)
                elif i.endswith('High'):
                    endEmotion.append(3)
            avgEmotion = []
            index=0
            for i in startEmotion:
                avgEmotion.append((startEmotion[i]+endEmotion[i])/2)
            personReport['avgEmotion']=avgEmotion
            graphTable = personReport[['avgEmotion','time']]
            graphTable = graphTable.reset_index()
            graphTable = graphTable[['index','avgEmotion']]
            anxPlot = sns.lmplot(x='index',y='avgEmotion',data=graphTable)
            anxPlot.savefig('anxPlot')
        else:
            print(" this person's files don't have good information about anxiety levels")



    def initialAnalysis(self):
        ## Return value : This function should only be run once and has one output
        ## After setting the initial values, this function will also print out the
        ## top most callers ( top20 )

        # Here we will simply figure out the non-empty columns of the main file
        ## Anything with more than 1% of null data will be excluded in this list
        allColumns = pd.DataFrame(self.dfWriteUps.isna().mean().round(4) * 100)
        allColumns = allColumns.sort_values(by=[0])

        for i in allColumns.index:
            if allColumns.loc[i][0]<1:
                self.fileColumns.append(i)

        ## Now the final file we will use will have only these columns
        self.thisFile = self.dfWriteUps[self.fileColumns]

        ## Here we will skip all call reports without a phone number,
        ## these are special cases, and this part of the dataset and analysis
        ## of the same is better left for future iterarions of this code, if any.

        ## We assume presence of phone numbers in our file. The function
        ## breaks if phone numbers come into the list of 'non-null' columns
        self.allCallers = pd.DataFrame(self.thisFile[self.thisFile['PhoneNumberFull']!=0])
        self.allCallers = pd.DataFrame(self.allCallers['PhoneNumberFull'].value_counts())
        self.topCallers = self.allCallers.reset_index()[:20]
        print(self.topCallers)
        self.topCallers.to_json('topCallers.json',orient='index')


    def fileAnalysis(self):
        ## Left for future interations
        ## The user may want to work with overview of the whole file
        ## or to find for a specific person to study
        return

    def personAnalysis(self,phoneNumber):
        ## This function pulls in everything for a provided number
        ## it can then print specific tables and graphs accordingly
        reportSet = self.dfWriteUps[self.dfWriteUps['PhoneNumberFull']==phoneNumber]
        reportColumns = pd.DataFrame(reportSet.isna().mean().round(4) * 100)
        reportColumns = reportColumns.sort_values(by=[0])

        self.personColumns=[] # This variable gets reset for every current user
        for i in reportColumns.index:
            if reportColumns.loc[i][0]<1:
                self.personColumns.append(i)

        reportSet = reportSet[self.personColumns]
        ## This reportSet can now be exported with json
        ## Also the user can call on graph functions available with the code

        ## Parth : For now I'm just going to print this to json 
        ## and call seperate functions for each seperate graph we want from python
        print(reportSet.head(10))
        reportSet.to_json('selectedPerson.json')

        ## For example here we call the anxiety report graph because we
        ## currently have the function for the same.
        ## Other graphs that can be made are with suicidal thoughts, age, and other params
        self.getAnxietyGraph(reportSet)

if __name__ == '__main__':
    np.warnings.filterwarnings('ignore')
    ts = mainHub()
    ts.initialAnalysis()
    ts.personAnalysis(8453893220)
