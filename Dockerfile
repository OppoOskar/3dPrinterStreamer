FROM tiangolo/uwsgi-nginx-flask:python3.8

COPY ./flaskApp /app

RUN pip install -r /app/requirements.txt
