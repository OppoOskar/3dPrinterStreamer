FROM node:12

#Set workdir
WORKDIR /usr/src/app

#Copy any package.json files to workdir
COPY package*.json ./

#Run installation of packages
RUN npm install --production

#Copy the rest of the files
COPY . .

#Give the node user access to all files (Especielly files/timelapses)
RUN chown -R node:node /

#Build the project
RUN npm run build

#Expose a port for the server ( doesnt really matter which)
EXPOSE 3000

#Set non-root user
USER node

#Set mode to production
RUN APP_ENV=production

#RUN IT!
CMD [ "node", "./server.js" ]