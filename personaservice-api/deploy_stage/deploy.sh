#!/bin/bash

export tag_version=`git tag -l --points-at HEAD`

if [ $1 = "dev" ]; then
  rm -rf aws-ecs-service-*
  git clone git@github.com:kids-first/aws-ecs-service-type-1-module.git 
  cd aws-ecs-service-type-1/
  echo "Setting up backend"
  cp ../dev.tfvar ../dev.conf .
  echo 'key        = "dev/kf-dev-pi-dataservice-us-east-1-RSF"' >> dev.conf
  terraform init -backend=true -backend-config=dev.conf
  terraform validate -var 'image=538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-dataservice:'$GIT_COMMIT \
   -var 'pg_host="kf-dataservice-postgres-dev.kids-first.io"' \
   -var 'db_secret_path="secret/aws/dataservice-api-postgres"' -var 'pg_db_name="kfpostgresdev"' \
   -var 'indexd_secret_path="secret/aws/dataservice-api-indexd"' -var 'indexd_url="http://gen3.kids-first.io/index/index/"' \
   -var 'task_role_arn="arn:aws:iam::538745987955:role/kfDataserviceApiRole-dev"' -var 'application=dataservice-api' \
   -var 'service_name="kf-api-dataservice"' -var 'owner="jenkins"' -var-file=dev.tfvar \
   -var 'vault_role="kf_dataservice_api_role"'
  terraform apply --auto-approve -var 'image=538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-dataservice:'$GIT_COMMIT \
   -var 'pg_host="kf-dataservice-api-dev.c3siovbugjym.us-east-1.rds.amazonaws.com"' \
   -var 'db_secret_path="secret/aws/dataservice-api-postgres"' -var 'pg_db_name="kfpostgresdev"' \
   -var 'indexd_secret_path="secret/aws/dataservice-api-indexd"' -var 'indexd_url="http://gen3.kids-first.io/index/index/"' \
   -var 'task_role_arn="arn:aws:iam::538745987955:role/kfDataserviceApiRole-dev"' -var 'application=dataservice-api' \
   -var 'service_name="kf-api-dataservice"' -var 'owner="jenkins"' -var-file=dev.tfvar \
   -var 'vault_role="kf_dataservice_api_role"'
fi

if [ $1 = "qa" ]; then
  rm -rf aws-ecs-service-*
  git clone git@github.com:kids-first/aws-ecs-service-type-1-module.git 
  cd aws-ecs-service-type-1/
  echo "Setting up backend"
  cp ../qa.tfvar ../qa.conf .
  echo 'key        = "qa/kf-qa-api-dataservice-us-east-1-RSF"' >> qa.conf
  terraform init -backend=true -backend-config=qa.conf
  terraform validate -var 'image=538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-dataservice:'$GIT_COMMIT \
   -var 'pg_host="kf-dataservice-postgres-qa.kids-first.io"' \
   -var 'db_secret_path="secret/aws/dataservice-api-postgres"' -var 'pg_db_name="kfpostgresqa"' \
   -var 'indexd_secret_path="secret/aws/dataservice-api-indexd"' -var 'indexd_url="http://gen3qa.kids-first.io/index/index/"' \
   -var 'task_role_arn="arn:aws:iam::538745987955:role/kfDataserviceApiRole-qa"' -var 'application="dataservice-api"' \
   -var 'service_name="kf-api-dataservice"' -var 'owner="jenkins"' -var-file=qa.tfvar \
   -var 'vault_role="kf_dataservice_api_role"'
  terraform apply --auto-approve -var 'image=538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-dataservice:'$GIT_COMMIT \
   -var 'pg_host="kf-dataservice-api-qa.c3siovbugjym.us-east-1.rds.amazonaws.com"' \
   -var 'db_secret_path="secret/aws/dataservice-api-postgres"' -var 'pg_db_name="kfpostgresqa"' \
   -var 'indexd_secret_path="secret/aws/dataservice-api-indexd"' -var 'indexd_url="http://gen3qa.kids-first.io/index/index/"' \
   -var 'task_role_arn="arn:aws:iam::538745987955:role/kfDataserviceApiRole-qa"' -var 'application=dataservice-api' \
   -var 'service_name="kf-api-dataservice"' -var 'owner="jenkins"' -var-file=qa.tfvar \
   -var 'vault_role="kf_dataservice_api_role"'
fi

if [ $1 = "prd" ]; then
    aws rds create-db-snapshot --db-instance-identifier "kf-dataservice-api-prd" /
      --db-snapshot-identifier "kf-dataservice-$GIT_COMMIT"
    rm -rf aws-ecs-service-*
  rm -rf aws-ecs-service-*
  git clone git@github.com:kids-first/aws-ecs-service-type-1.git
  cd aws-ecs-service-type-1/
  echo "Setting up backend"
  echo 'key        = "prd/kf-prd-api-dataservice-us-east-1-RSF"' >> prd.conf
  terraform init -backend=true -backend-config=prd.conf
  terraform validate -var 'image=538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-dataservice:'$tag_version \
   -var 'pg_host="kf-dataservice-postgres-prd.kids-first.io"' \
   -var 'db_secret_path="secret/aws/dataservice-api-postgres"' -var 'pg_db_name="kfpostgresprd"' \
   -var 'indexd_secret_path="secret/aws/dataservice-api-indexd"' -var 'indexd_url="http://gen3.kids-first.io/index/index/"' \
   -var 'task_role_arn="arn:aws:iam::538745987955:role/kfDataserviceApiRole-prd"' -var 'application=dataservice-api' \
   -var 'service_name="kf-api-dataservice"' -var 'owner="jenkins"' -var-file=prd.tfvar \
   -var 'vault_role="kf_dataservice_api_role"'
  terraform apply --auto-approve -var 'image=538745987955.dkr.ecr.us-east-1.amazonaws.com/kf-api-dataservice:'$tag_version \
   -var 'pg_host="kf-dataservice-api-prd.c3siovbugjym.us-east-1.rds.amazonaws.com"' \
   -var 'db_secret_path="secret/aws/dataservice-api-postgres"' -var 'pg_db_name="kfpostgresprd"' \
   -var 'indexd_secret_path="secret/aws/dataservice-api-indexd"' -var 'indexd_url="http://gen3.kids-first.io/index/index/"' \
   -var 'task_role_arn="arn:aws:iam::538745987955:role/kfDataserviceApiRole-prd"' -var 'application=dataservice-api' \
   -var 'service_name="kf-api-dataservice"' -var 'owner="jenkins"' -var-file=prd.tfvar \
   -var 'vault_role="kf_dataservice_api_role"'
fi
