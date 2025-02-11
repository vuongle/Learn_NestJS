Here are the key points covered in the video #20: https://www.youtube.com/watch?v=-pbT0uKRWX8&list=PLhnVDNT5zYN_PfPXedWpMy_UTeYNExbfR&index=20 (dang tam dung tai 15:54)
- Create client ID and client secret on console.cloud.google.com (for Google OAuth 2.0)
- Config them in the project (.env file and config obj)
- Use google auth strategy
- Use a guard

## 1. Install dependencies 
```
npm i --save passport-google-oauth20
npm i -D @types/passport-google-oauth20
```

## 2. Config
- Create an app on console.cloud.google.com
- Generate a client ID and client secret
- Add the client ID and client secret to the .env file
- Config

## 3. Use repository pattern

## Postgres in docker

This example use the "postgres:13.3-alpine" image to run the container with configs:
container name:nextjs_school_dashboard
port: 5432
user: lamadev
pwd: lama123456
db name: school
