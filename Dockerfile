FROM node:12.22

RUN mkdir -p /home/aws_web_taynguyen

ADD . /home/aws_web_taynguyen

WORKDIR  /home/aws_web_taynguyen

ENV PATH /home/aws_web_taynguyen/node_modules/.bin:$PATH

#RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
