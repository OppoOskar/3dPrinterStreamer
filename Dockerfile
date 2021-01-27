FROM node:12

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

#Expose a port for the server ( doesnt really matter which)
EXPOSE 3000

#RUN IT!
RUN APP_ENV=production

#Set non-root user
USER node
CMD [ "node", "./server.js" ]