import pandas as pd
import math

doc = pd.read_excel("table_11_offenses_offense_type_by_participating_state_2016.xls", names=["State","Total offenses","Murder","Rape1","Rape2","Aggravated assault","Simple assault","Intimidation","Other3","Robbery","Burglary","Larceny- theft",	"Motor vehicle theft","Arson","Destruction-damage-vandalism","Other2","Crimes against society"])
doc = doc[5:56]
print doc["Rape2"]
for i in xrange(0,len(doc)):
	for j in xrange(0,len(doc.iloc[0])):
		try:
			if math.isnan(float(doc.iloc[i,j])):
				doc.iloc[i,j]=0
		except:
			continue
doc.to_csv("Table11_2016.csv",index=False)