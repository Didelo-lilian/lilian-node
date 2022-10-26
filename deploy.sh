#!/bin/bash
DIR="/home/pvdk8469/public_html/lilian/api/$1"
SERVER="pvdk8469@109.234.164.253"

echo "🗑🚀 Synchronize all files"
rsync -avzhe ssh --progress --delete "dist/" "$SERVER:$DIR/"
echo "🎉 API deployed"