FROM node:18.12.0
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit=dev
COPY . .
CMD [ "npm", "run", "build" ]
