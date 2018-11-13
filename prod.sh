#!/bin/bash

yarn unlink @ournet/domain
yarn unlink @ournet/topics-domain

yarn add @ournet/domain
yarn add @ournet/topics-domain

yarn test
