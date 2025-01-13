Here are the key points covered in the video #5 to #12:

- TypeORM with postgres
- CRUD with TypeORM: provides 2 ways for CRUD
  1.Query Builder
  2.Repository pattern

- Relations in TypeORM
  1.OneToOne
  2.ManyToOne, OneToMany
  3.ManyToMany
- Seeding database
  1.Create a factory for each entity: The factory creates instances of entities
  2.Create a main seeder: Run the seeding process
  3.Create the entry point of the seeding process
  4.Add seed script in package.json
- Environment variables (video #12)
  1.Use ConfigModule from nestjs
  2.Use multiple config files for each environment

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
