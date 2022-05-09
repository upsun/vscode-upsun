#!/usr/bin/env bash
# -*- coding: utf-8 -*-

echo "Copy file from Google Drive Asset Brand..."
echo "@ https://drive.google.com/drive/folders/1gf8mtMssu_NKDaBkk57ANV_t2wgHvUfZ"
echo "to resources/logo/drop"
echo "--------------------------------------------------------------------------"

cd resources/logo/drop || exit

echo "- Crop image..."
[ -d cropped ] || mkdir cropped
for f in *.png; do
    convert "$f" -crop 80x80+60+60 cropped/"$f" 
done

echo "- Normalize name file..."
cd cropped || exit
rename 's/\@2x//' *.png &> /dev/null
rename 's/ //' *.png &> /dev/null
rename 'y/A-Z/a-z/' *.png &> /dev/null

echo "- Install applications file..."
cp dotnet.png ../../
cp gogopher.png ../../golang.png
cp java.png ../../
cp js.png ../../nodejs.png
cp php.png ../../
cp python.png ../../
cp ruby.png ../../

echo "- Install services file..."
cp elasticsearch.png ../../
cp opensearch.png ../../
# cp chrome-headless.png ../../
cp influxdata.png ../../influxdb.png
# cp apachekafka.png ../../kafka.png
cp memcached.png ../../
cp mongodb.png ../../
cp mariadb.png ../../
cp mysql.png ../../
cp postgresql.png ../../
cp rabbitmq.png ../../
cp redis.png ../../
cp solr.png ../../
cp varnish.png ../../
