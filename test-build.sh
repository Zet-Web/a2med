#!/bin/bash
x=$(curl -si -XGET localhost:3001 | grep -o 'HTTP/1.1 200' | cut -d ' ' -f2)
if [[ $x == 200 ]]; 
then
  echo 1;
else
  echo 0;
fi
