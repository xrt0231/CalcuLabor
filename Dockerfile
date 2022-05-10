FROM node:16

# Create app directory
WORKDIR /usr/src/app

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION

ARG rds_HOST
ARG rds_USERNAME
ARG rds_PASSWORD

ARG client_id
ARG team_id
ARG key_id
ARG rds_DATABASE

ENV API_VERSION = 1.0
ENV NODE_ENV = rds
ENV PORT = 3000

ARG api_key=api_key
ARG gclient_id=gclient
ARG client_secret=client_secret
ARG redirect_uri=redirect_uri

#RDS

ENV rds_HOST = $rds_HOST
ENV rds_USERNAME = $rds_USERNAME
ENV rds_PASSWORD = $rds_PASSWORD
ENV rds_DATABASE = $rds_DATABASE

# apple_sign_in

ENV client_id=$client_id
ENV team_id=$team_id
ENV key_id=$key_id

# google_sign_in

ENV api_key=$api_key
ENV gclient_id=$gclient
ENV client_secret=$clinet_secret
ENV redirect_uri=$redirect_uri

#AWS ECS

ENV AWS_ACCESS_KEY_ID $AWS_ACCESS_KEY_ID
ENV AWS_SECRET_KEY $AWS_SECRET_ACCESS_KEY
ENV AWS_DEFAULT_REGION $AWS_DEFAULT_REGION

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]
