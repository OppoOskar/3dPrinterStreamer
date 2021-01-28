FROM node:12

#Define ARGS
ARG OCTOPRINT_APIKEY=""
ARG OCTOPRINT_IP="127.0.0.1"
ARG OCTOPRINT_PORT=8081
ARG PORT=3000

#Set workdir
WORKDIR /usr/src/app

#Copy any package.json files to workdir
COPY package*.json ./

#Run installation of packages
RUN npm install --production

#Copy the rest of the files
COPY . .

#Build the project
RUN npm run build

#Expose a port for the server
EXPOSE $PORT

#Give the node user access to all files (Especielly files/timelapses)
RUN chown -R node:node /usr/src/app
RUN chmod -R 755 /usr/src/app


#Set non-root user
USER node

#Set all env variables
RUN APP_ENV=production
RUN OCTOPRINT_SETTINGS={"API_KEY":$OCTOPRINT_APIKEY, "IP":$OCTOPRINT_IP, "PORT":$OCTOPRINT_PORT}
RUN SERVER_PORT=$PORT

#RUN IT!
CMD [ "node", "./server.js" ]