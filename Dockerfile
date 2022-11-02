FROM node:16.18.0
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit=dev --legacy-peer-deps
# fix vulnerabilities
RUN npm audit fix
COPY . .
CMD [ "npm", "run", "build" ]
