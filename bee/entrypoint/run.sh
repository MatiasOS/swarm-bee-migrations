#!/bin/sh

bee start \
  --password /password \
  --verbosity 5 \
  --swap-endpoint https://rpc.slock.it/goerli \
  --debug-api-enable
  --bootnode /dnsaddr/bootnode.staging.ethswarm.org