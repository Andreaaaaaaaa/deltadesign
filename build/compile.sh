#!/bin/bash
set -e

WORKSPACE=$(dirname $(cd "$(dirname $0)"; pwd));
BUILD_ENV=$1
CDN_URL=$2

# install dependencies
npm config set registry https://mirrors.tencent.com/npm/
echo "[INSTALL] install dependencies"
npm install
echo "[INSTALL] install dependencies done"

# compile
BUILD_ENV=${BUILD_ENV} CDN_URL=${CDN_URL} npm run build:docs

