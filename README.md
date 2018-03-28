# persona

## dev

1.  install dependencies

```
$ yarn
```

2.  make sure mongo is running

```
$ mongod
```

3.  start server (defaults to port :3232)

```
npm start
```

4.  personal is now running and you can access it `http://localhost:3232/graphql`

## docker

To get a local instance of persona running you can use the docker compose file. This will start mongo and persona in docker.

```
$ docker-compose up --build
```

If you need a different port you can use the `API_HOST_PORT` env variable

```
$ API_HOST_PORT=3232 docker-compose up --build
```
