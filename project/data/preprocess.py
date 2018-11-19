import pandas as pd
import math
import sys

year = sys.argv[1]
if int(year)>2012:
	doc = pd.read_excel("table_11_offenses_offense_type_by_participating_state_"+year+".xls", names=["State","Total offenses","Murder","Rape1","Rape2","Aggravated assault","Simple assault","Intimidation","Other3","Robbery","Burglary","Larceny- theft",	"Motor vehicle theft","Arson","Destruction-damage-vandalism","Other2","Crimes against society"])
else:
	doc = pd.read_excel("table_11_offenses_offense_type_by_participating_state_"+year+".xls", names=["State","Total offenses","Murder","Rape","Aggravated assault","Simple assault","Intimidation","Other3","Robbery","Burglary","Larceny- theft",	"Motor vehicle theft","Arson","Destruction-damage-vandalism","Other2","Crimes against society"])

doc = doc[5:56]
for i in xrange(0,len(doc)):
	for j in xrange(0,len(doc.iloc[0])):
		try:
			if math.isnan(float(doc.iloc[i,j])) or doc.iloc[i,j]=="###" or doc.iloc[i,j] == "":
				doc.iloc[i,j]=0
		except:
			continue
doc.to_csv("Table11_"+year+".csv",index=False)