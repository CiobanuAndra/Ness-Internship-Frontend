
## Dockerization

### Starting up

```shell
# to start all services
docker-compose up
# to start only one service
docker-compose up service_name
# for example
docker-compose up be-gamification
```
from this folder.

### other important docker commands you might need
```shell
# remove all containers created by a previous `docker-compose up` in same folder
docker-commpose down
# stop and remove containers having `ni23` in name
docker ps -aq --filter name="ni23*" | xargs docker stop | xargs docker rm
# remove images having `ni23` in name
docker images --format="{{.Repository}}" | grep ni23 | xargs docker rmi
# remove volumes having `ni23` in name
docker volume ls --format="{{.Name}}" | grep ni23 | xargs docker volume rm
# removes stopped containers
docker container prune
# removes images not used
docker image prune
# removes volumes not used
docker volume prune
```