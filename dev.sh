#!/bin/bash

yarn remove @ournet/domain
yarn remove @ournet/topics-domain

yarn link @ournet/domain
yarn link @ournet/topics-domain

yarn test
