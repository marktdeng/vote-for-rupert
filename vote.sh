#!/bin/bash

bool=true

while [ "$bool" = true ]; do
  phantomjs tabvote.js;
  sleep 8;
done
