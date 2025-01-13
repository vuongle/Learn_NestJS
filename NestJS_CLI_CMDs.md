## Install NextJS CLI

```
npm i -g @nestjs/cli
```

## Create new project

```
nest new [app-name]
```

## Generate a resource

Resource: include module, controller, service, entity, dto, ...
At the root of project, run:

```
nest g res [resource-name]
```

## Generate a module

At the root of project, run:

```
nest g module [module-name]
```

## Generate a controller

At the root of project, run:

```
nest g co [controller-name]
```

## Generate a service

At the root of project, run:

```
nest g s [service-name] --no-spec
```

## Generate a guard

```
nest g gu [path]
path: auth/guards/local-auth
```
