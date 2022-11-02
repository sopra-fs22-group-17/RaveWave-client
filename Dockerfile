FROM node:14.21.0
ENV NODE_ENV=production
RUN npm install npm@6.14.17
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
# fix vulnerabilities
RUN npm audit fix
COPY . .
CMD [ "npm", "run", "build" ]
