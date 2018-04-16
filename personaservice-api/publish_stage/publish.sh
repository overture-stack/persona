#!/bin/bash
export tag_version=`git tag -l --points-at HEAD`

docker push 538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-dataservice:latest
docker push 538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-dataservice:$GIT_COMMIT
