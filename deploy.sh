aws configure set aws_access_key_id $AWSKEY
aws configure set aws_secret_access_key $AWSSECRETKEY
aws configure set default.region ap-northeast-2

aws s3 rm --recursive s3://uphereprod/

