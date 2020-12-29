#!/usr/bin/env bash
npm run build
docker build -t raid-comp-api .
