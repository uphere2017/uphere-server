if [ $CIRCLE_BRANCH = 'dev' ]; then
    aws configure set region ap-northeast-2
    aws s3 rm --recursive s3://practice2433/
fi
