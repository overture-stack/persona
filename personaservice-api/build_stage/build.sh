#/bin/bash
export tag_version=`git tag -l --points-at HEAD`
passwd=`aws ecr get-login --region us-east-1 | awk '{ print \$6 }'`
set +x
docker login -u AWS -p $passwd 538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-dataservice:latest
set -x
docker build -t 538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-dataservice:latest -t 538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-dataservice:$GIT_COMMIT .
