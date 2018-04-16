#!/bin/bash
export tag_version=`git tag -l --points-at HEAD`

docker push 538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-personaservice:latest
docker push 538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-personaservice:$GIT_COMMIT
