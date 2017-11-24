#!/bin/bash
dirname="/home/ubuntu/workspace/myprogram/data/"
mkdir -p $dirname
filename="${dirname}/jr_kanto/jr-delay-`date +'%Y%m%d%H%M'`.xml"
echo "Save to $filename"
filenamenow="${dirname}/jrkanto-now.xml"
echo "Save to $filenamenow"

curl -s -o $filename -H "User-Agent: CrawlBot; rinkei.krt6006@gmail.com" http://traininfo.jreast.co.jp/train_info/kanto.aspx
curl -s -o $filenamenow -H "User-Agent: CrawlBot; rinkei.krt6006@gmail.com" http://traininfo.jreast.co.jp/train_info/kanto.aspx