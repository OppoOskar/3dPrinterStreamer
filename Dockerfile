FROM node:12

#Set workdir
WORKDIR /usr/src/app

#Copy any package.json files to workdir
COPY package*.json ./

#Run installation of packages (ci and --only=productio because building for production)
RUN npm ci --only=productio

#Copy the rest of the files
COPY . .

#Build the project
RUN npm run build

#Expose a port for the server ( doesnt really matter which)
EXPOSE 8080

#RUN IT!
CMD [ "npm run", "start" ]