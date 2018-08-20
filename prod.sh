#!/bin/bash

yarn unlink @ournet/domain
yarn unlink @ournet/images-domain
yarn unlink dynamo-model

yarn add @ournet/domain
yarn add @ournet/images-domain
yarn add dynamo-model

yarn test
