import numpy as np
import xlrd
import pandas as pd
import json

from sklearn.utils import shuffle
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report,confusion_matrix,roc_curve,auc,precision_recall_curve,roc_curve
import seaborn as sns
import plotly.graph_objs as go 

import plotly.plotly as py
from plotly.offline import download_plotlyjs, init_notebook_mode, plot, iplot


class testScript():
	##topWriteUps = 0

	def __init__(self):
		self.dfWriteUps = pd.read_excel("../C4G/drive/C4G Outcomes Counselor Issues Write Ups.xlsx")
		self.topWriteUps =[]
		self.phoneReportNum = self.dfWriteUps[['CallReportNum','PhoneNumberFull']]
		self.callCounts = []
		self.top10 = []

		## Hard coding the phone number for the top caller
		self.topCaller = 8453893220


	def init_function(self):
		mvpWUP=pd.DataFrame(self.dfWriteUps.isna().mean().round(4) * 100)
		mvpWUP.columns
		mvpWUP = mvpWUP.sort_values(by=[0])
		##mvpWUP

		topParamWUps=[]
		for i in mvpWUP.index:
		    if mvpWUP.loc[i][0]<1:
		        topParamWUps.append(i)
		topParamWUps

		self.topWriteUps = self.dfWriteUps[topParamWUps]
		test=self.topWriteUps[['CallReportNum','Caller Issues - Suicidal Thoughts - 1st Party','Caller Issues - Change in Anxiety Levels']]
		##test = test[test['Caller Issues - Suicidal Thoughts - 1st Party']=='Yes']
		##test[test['Caller Issues - Change in Anxiety Levels']=='High to Low']
		##print(test)


	def call_counts(self):
		self.callCounts = pd.DataFrame(self.topWriteUps['PhoneNumberFull'].value_counts())
		if (self.callCounts.iloc[0][0]-self.callCounts.iloc[1][0])>1500:
			self.callCounts.drop([0],inplace=True)
		dist_plot = sns.distplot(self.callCounts[self.callCounts['PhoneNumberFull']>5],hist=False,rug=True).get_figure()
		dist_plot.savefig("countDist.png")
		print(self.callCounts.to_json('callCounts.json'))

	def print_top10(self):
		self.top10 = self.callCounts.reset_index()[:10]
		print(self.top10)
		##Uncomment this to export json of the same as well
		#
		##self.top10.to_json('top10.json')
		#

	def print_anxiety(self,param):
		callSet = self.dfWriteUps[self.dfWriteUps['PhoneNumberFull']==param]
		topCallSet = pd.DataFrame(callSet.isna().mean().round(4) * 100)
		topCallSet = topCallSet.sort_values(by=[0])
		topCallSet = topCallSet.reset_index()
		tempDates = pd.to_datetime(callSet['CallDateAndTimeEnd']).values
		callSet['time'] = tempDates
		startEmotion=[]
		endEmotion=[]
		for i in callSet['Caller Issues - Change in Anxiety Levels']:
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
		callSet['startEmotion']=startEmotion
		callSet['endEmotion']=endEmotion
		avgEmotion = []
		index=0
		for i in startEmotion:
		    avgEmotion.append((startEmotion[i]+endEmotion[i])/2)
		callSet['avgEmotion']=avgEmotion
		graphTable = callSet[['avgEmotion','time']]
		graphTable = graphTable.reset_index()
		graphTable = graphTable[['index','avgEmotion']]
		anxPlot = sns.lmplot(x='index',y='avgEmotion',data=graphTable)
		anxPlot.savefig('anxPlot')
		print(param)

if __name__ == '__main__':
	np.warnings.filterwarnings('ignore')
	ts = testScript()
	ts.init_function()
	ts.call_counts()
	ts.print_top10()
	ts.print_anxiety(8453893220)



