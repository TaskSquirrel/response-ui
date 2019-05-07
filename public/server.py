# Dependencies to maintain webserver
import signal, random
import zerorpc, gevent

# Analytics-related dependencies
import numpy as np
import pandas as pd

# For exporting
import json

class ResponseApi():
    # base initialization of instance variables
    # we wait for the 'start' method to be called to populate with data
    def __init__(self):
        self.writeups = None    # Writeups file after we parse all the unneeded columns
        self.columns = []       # All the columns with non-null data
        self.callers = []       # Callers whose phone numbers aren't zero

    # Pass in filename (of the writeup) and read the excel, do processing...
    def start(self, filename):
        dfWriteUps = pd.read_excel(filename)

        # Anything with more than 1% of null data will be excluded in this list
        allColumns = pd.DataFrame(dfWriteUps.isna().mean().round(4) * 100)
        allColumns = allColumns.sort_values(by=[0])
        self.columns = self.getcolumns(allColumns)

        # We filter the main file with all the relevant columns
        self.writeups = dfWriteUps[self.columns]

        # Get writeups with valid phone numbers (which means not zero)
        # Parth: "breaks if phone numbers come into the list of 'non-null' columns"
        self.callers = pd.DataFrame(self.writeups[self.writeups['PhoneNumberFull'] != 0])
        self.callers = pd.DataFrame(self.callers['PhoneNumberFull'].value_counts())

        return 'Initial analysis complete!'

    def randcallers(self, amount=5):
        length = len(self.callers)
        nums = random.sample(range(length), amount)

        rcallers = []
        for num in nums:
            rcallers.append(self.json(self.callers.reset_index()[num:num + 1]))
        return rcallers

    # Sample output:
    # {"0":{"index":8453893220,"PhoneNumberFull":746},
    # "1":{"index":6315866348,"PhoneNumberFull":733}}
    def topcallers(self, start=0, amount=10):
        end = start + amount
        topcallers = self.callers.reset_index()[start:end]
        return self.json(topcallers)

    def getreport(self, phonenumber):
        # Pull all data for one number
        reportSet = self.writeups[self.writeups['PhoneNumberFull'] == phonenumber]
        reportColumns = pd.DataFrame(reportSet.isna().mean().round(4) * 100)
        reportColumns = reportColumns.sort_values(by=[0])

        # Grab relevant columns for this person
        personColumns = self.getcolumns(reportColumns)

        reportSet = reportSet[personColumns]
        return reportSet

    def person(self, phonenumber):
        reportSet = self.getreport(phonenumber)
        self.addanxiety(reportSet)
        return self.json(reportSet)

    def rankanxiety(self, level):
        if 'None' in level:
            return 0
        elif 'Low' in level:
            return 1
        elif 'Med' in level:
            return 2
        else:   # Assume 'High'
            return 3

    def addanxiety(self, reportSet):
        ANXIETY_COL = 'Caller Issues - Change in Anxiety Levels'
        if ANXIETY_COL in reportSet.columns:
            startEmotion = []
            endEmotion = []
            avgEmotion = []
            for i in reportSet[ANXIETY_COL]:
                levels = i.split(' to ')
                starte = self.rankanxiety(levels[0])
                ende = self.rankanxiety(levels[1])

                startEmotion.append(starte)
                endEmotion.append(ende)
                avgEmotion.append((starte + ende) / 2)

            reportSet['startEmotion'] = startEmotion
            reportSet['endEmotion'] = endEmotion
            reportSet['avgEmotion'] = avgEmotion
        else:
            print('This number has no information about anxiety levels!')

    # Get columns that are relevant (basically non-null columns)
    def getcolumns(self, dataset):
        columns = []
        for i in dataset.index:
            if dataset.loc[i][0] < 1:
                columns.append(i)
        return columns

    def json(self, dataframe):
        return dataframe.to_json(orient='index')

    def echo(self, text='Connection successful!'):
        return text

def main():
    port = 6111
    addr = 'tcp://127.0.0.1:' + str(port)

    srvr = zerorpc.Server(ResponseApi(), heartbeat=1)
    srvr.bind(addr)
    print('Server running on {}...'.format(addr))
    srvr.run()

    gevent.signal(signal.SIGTERM, srvr.stop)
    gevent.signal(signal.SIGKILL, srvr.stop)
    print('Zerorpc stopped!')

if __name__ == '__main__':
    main()
    # ra = ResponseApi()
    # ra.start("../data/Write-ups.xlsx")
    # print(ra.person(8453893220))
