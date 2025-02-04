Here are the key points covered in the video #12 to #:

- Hashing password
- Authentication(local strategy) by passport.js
- Create custom guard for local strategy
- Use jwt strategy to generate access token, validate and protect routes
  1.Define jwt config
  2.Create jwt strategy
  3.Create jwt guard: use this guard in routes that need protecting
  1.Config JwtModule: JwtModule.registerAsync(jwtConfig.asProvider()),

## 1. Install dependencies

```
npm i --save @nestjs/typeorm typeorm pg
```

## 2. Config

- Define a db config
- Import TypeOrmModule.forRoot() to app module and pass the config to forRoot()
- Define entities
- Register entities in config automatically

## 3. Use repository pattern

- Inject Repository from type orm to service class, the generic is the entity that this repo works with
- Import the repository and entity in the module where to use the repository (property.module.ts)

## Postgres in docker

This example use the "postgres:13.3-alpine" image to run the container with configs:
container name:nextjs_school_dashboard
port: 5432
user: lamadev
pwd: lama123456
db name: school

## DB_URL=postgresql://lamadev:lama123456@localhost:5432/nestjs_realestate

## DB_PORT=5432

## cmd to generate secret key: openssl rand -hex 16

## JWT_SECRET=5c7628ed0425463387479976567f74ed

## JWT_EXPIRE_IN="5m"

## REFRESH_JWT_SECRET=f10ec87f5f3514fb0d9f05c51d110d5c

## REFRESH_JWT_EXPIRE_IN="1d"
