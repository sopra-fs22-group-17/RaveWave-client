FROM node:14.21.0
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i react-scripts
RUN npm install --production
# fix vulnerabilities
RUN npm audit fix
COPY . .
CMD [ "npm", "run", "build" ]
