FROM node:14.21.0
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
# seems like comments help
RUN npm install -g npm@6.14.17
# nobody knows why
RUN npm install --production
# fix vulnerabilities
RUN npm audit fix
COPY . .
CMD [ "npm", "run", "build" ]
