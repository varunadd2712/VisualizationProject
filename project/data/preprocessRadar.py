import pandas as pd
import json
import sys

year = sys.argv[1]
data = pd.read_csv("Table11_"+year+".csv")

main_dict={}
for i in xrange(1,len(data)):
	main_dict[data["State"][i]]=[]
	total = float(data["Total offenses"][i])
	if total==0:
		total = 1.0
	axis="axis"
	value="value"
	main_dict[data["State"][i]].append({axis:"Murder",value:(data["Murder"][i]/total)})
	if int(year)>2012:
		rape_value = data["Rape1"][i] + data["Rape2"][i]
	else:
		rape_value = data["Rape"][i]
	main_dict[data["State"][i]].append({axis:"Rape",value:(rape_value/total)})
	assault_value = data["Aggravated assault"][i] + data["Simple assault"][i]
	main_dict[data["State"][i]].append({axis:"Assault",value:(assault_value/total)})
	main_dict[data["State"][i]].append({axis:"Intimidation",value:(data["Intimidation"][i]/total)})
	main_dict[data["State"][i]].append({axis:"Robbery",value:(data["Robbery"][i]/total)})
	main_dict[data["State"][i]].append({axis:"Burglary",value:(data["Burglary"][i]/total)})
	main_dict[data["State"][i]].append({axis:"Larceny",value:(data["Larceny- theft"][i]/total)})
	main_dict[data["State"][i]].append({axis:"VehicleTheft",value:(data["Motor vehicle theft"][i]/total)})
	main_dict[data["State"][i]].append({axis:"Arson",value:(data["Arson"][i]/total)})
	main_dict[data["State"][i]].append({axis:"Vandalism",value:(data["Destruction-damage-vandalism"][i]/total)})
	main_dict[data["State"][i]].append({axis:"Society",value:(data["Crimes against society"][i]/total)})
	other_value = data["Other3"][i] + data["Other2"][i]
	main_dict[data["State"][i]].append({axis:"Other",value:(other_value/total)})
print main_dict
with open('Types'+year+'.json', 'w') as outfile:
    json.dump(main_dict, outfile)