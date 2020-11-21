ARG PYTHON_BASE_IMAGE=3.8-slim-buster

FROM python:${PYTHON_BASE_IMAGE} AS build


#Install MJPG dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential \
  cmake \
  curl \
  ffmpeg \
  g++ \
  git \
  libjpeg-dev \
  libjpeg62-turbo \
  libprotobuf-dev \
  libv4l-dev \
  openssh-client \
  imagemagick 

  # Install mjpg-streamer
RUN curl -fsSLO --compressed --retry 3 --retry-delay 10 \
  https://github.com/jacksonliam/mjpg-streamer/archive/master.tar.gz \
  && mkdir /mjpg \
  && tar xzf master.tar.gz -C /mjpg

WORKDIR /mjpg/mjpg-streamer-master/mjpg-streamer-experimental
RUN make
RUN make install

#Set MJPG standard variables
ENV CAMERA_DEV /dev/video0
ENV MJPG_STREAMER_INPUT -y -n -r 640x480 -f 30

# Expose the MJPG port
EXPOSE 80
VOLUME /mjpg-streamer

#Reset workdir
WORKDIR /

# Install WSSGI dependecies
RUN apt-get update && apt-get install -y --no-install-recommends \
  apache2 \
  libapache2-mod-wsgi-py3

RUN a2enmmod wsgi

#Get the flaskApp
RUN curl -fsSLO --compressed --retry 3 --retry-delay 10 \
  https://github.com/OppoOskar/3dPrinterStreamer/archive/main.zip \
  && mkdir /webserver \
  && tar xzf master.tar.gz -C /webserver

#Create folder for flaskapp
RUN mkdir /var/www/flaskApp

# Create new flaskAppUser
RUN adduser --system --group --disabled-login flaskappuser ; cd /home/flaskappuser/

#Give flaskAppUser ownership of folder:
RUN chown -R flaskappuser:www-data /var/www/flaskApp

#Copy flaskApp to the created dir
COPY /webserver/. /var/www/flaskApp/

#Install pip requirements
RUN pip install -r /var/www/flaskApp/requirements.txt

# Copy server conf
COPY /webserver/3dPrinterStreamer-main/flaskApp/flaskApp.conf /etc/apache2/sites-available/flaskApp.conf

RUN a2ensite flaskApp

RUN service apache2 start
RUN sleep 10

RUN service apache2 start
RUN sleep 10

RUN chown -R flaskappuser:www-data /var/www/flaskApp

RUN service apache2 stop
RUN sleep 10

RUN service apache2 start
RUN sleep 4

ENTRYPOINT ["/bin/bash", "/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
CMD mjpg_streamer -i "input_uvc.so ${MJPG_STREAMER_INPUT} -d ${CAMERA_DEV}" -o "output_http.so -p 80 -w /usr/local/www" 