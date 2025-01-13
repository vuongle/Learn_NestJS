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
