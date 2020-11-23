ARG PYTHON_BASE_IMAGE=3.8-slim

FROM python:${PYTHON_BASE_IMAGE} AS build


#Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
  python3-dev \
  build-essential

#Copy flask app to work dir
COPY flaskApp/. /srv/flask_app
WORKDIR /srv/flask_app


# Install requirements
RUN pip install -r requirements.txt --src /usr/local/src

COPY /srv/flask_app/nginx.conf /etc/nginx
RUN chmod +x ./start.sh
CMD ["./start.sh"]