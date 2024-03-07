FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package.json

RUN npm install --production

COPY . .

RUN npm run build

FROM nginx

RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx

# 빌더 단계에서 생성된 빌드 파일을 복사하여 Nginx에 배포
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]