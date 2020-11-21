ARG PYTHON_BASE_IMAGE=3.8-slim-buster

FROM python:${PYTHON_BASE_IMAGE} AS build


#Install dependencies
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

#Set standard variables
ENV CAMERA_DEV /dev/video0
ENV MJPG_STREAMER_INPUT -y -n -r 640x480 -f 30

# Expose the port
EXPOSE 80

VOLUME /mjpg-streamer

CMD mjpg_streamer -i "input_uvc.so ${MJPG_STREAMER_INPUT} -d ${CAMERA_DEV}" -o "output_http.so -p 80 -w /usr/local/www"