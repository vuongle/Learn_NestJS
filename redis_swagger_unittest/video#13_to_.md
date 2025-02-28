Here are the key points covered in the video:
https://www.youtube.com/watch?v=VD9XMGJQaT8&list=PLHVUNsO6sqSpeFjQBl1KZMYEI-IL5idqZ&index=13

- use redis for caching
- use redis/redis-stack image
- use swagger for api documentation

## 1. Install dependencies

```
npm i --save @nestjs/cache-manager cache-manager // for memory cache
npm install cacheable @keyv/redis --save // for redis cache
```

## Postgres in docker

container name: postgres_13

## Redis in docker

#### On mac

#### On win

run command: docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
image name: redis/redis-stack:latest
container name: redis-stack
port: 6379
user: <none>
pwd: <none>

## DB_URL=postgresql://lamadev:lama123456@localhost:5432/nestjs_realestate

## DB_PORT=5432

## cmd to generate secret key: openssl rand -hex 16

## JWT_SECRET=5c7628ed0425463387479976567f74ed

## JWT_EXPIRE_IN="5m"

## REFRESH_JWT_SECRET=f10ec87f5f3514fb0d9f05c51d110d5c

## REFRESH_JWT_EXPIRE_IN="1d"
