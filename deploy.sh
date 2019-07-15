#!/bin/sh

# Deploy via rsync
# Assume key was added via ssh-add and variables are set
rsync -avz --delete-after public/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_DIRECTORY

# Purge the cloudflare cache
#curl -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE/purge_cache" \
#    -H "X-Auth-Email: $CF_EMAIL" -H "X-Auth-Key: $CF_AUTH" -H "Content-Type: application/json" \
#    --data '{"purge_everything":true}'