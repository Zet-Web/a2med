#!/bin/bash
tmp=$(docker ps -a | grep $1 ) 
if [[ $tmp ]];
	then 
	  docker rm -f $1 || true;
	else 
          echo 0; 
fi
