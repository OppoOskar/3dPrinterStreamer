import requests
import json
import math
from flask import Flask, redirect, url_for, render_template, request, flash
app = Flask(__name__)

@app.route("/")
def index_page():
    return render_template("index.html")

@app.route("/data")
def data_page():
    url = 'http://192.168.0.122:8081/api/job'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7',
        'Content-Type': 'application/json',
        "X-Api-Key": "BD86451B85D3458FA21FA8291188D4B0"
    }
    result = requests.get(url, headers=headers)
    jsonRes = json.loads(result.content)

    job = jsonRes["job"]
    jobfile = job["file"]
    progress  = jsonRes["progress"]

    filename = jobfile["name"]
    status = jsonRes["state"]
    timeleft = progress["printTimeLeft"]
    completion = progress["completion"]

    if timeleft != None:
        timeleft = int(timeleft/60)
    
    if completion != None:
        completion = math.trunc(completion)

    return render_template("data.html", name=filename, status=status, timeleft=timeleft, completion=completion)

if __name__ == "__main__":
    app.run()


##{'job': 
# {'averagePrintTime': 6532.69438346001, 
# 'estimatedPrintTime': 4407.3505589662045, 
# 'filament': {'tool0': {'length': 3841.2110399999942, 'volume': 0.0}},
#  'file': {'date': 1605786040, 'display': 'CE3PRO_3DBenchy.gcode', 'name': 'CE3PRO_3DBenchy.gcode', 'origin': 'local', 'path': 'CE3PRO_3DBenchy.gcode', 'size': 7245710}, 
# 'lastPrintTime': 6532.69438346001, 'user': 'oppo_oskar'}, 
# 'progress': {'completion': None, 'filepos': None, 'printTime': None, 'printTimeLeft': None, 'printTimeLeftOrigin': None}, 'state': 'Operational'}

