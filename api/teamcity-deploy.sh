IMAGE_NAME=%docker.registry%/%deploy.name%:%dep.RaidComp_BeBuildCi.build.number%
docker pull $IMAGE_NAME
docker rm -f %deploy.name%
docker run -d \
    --restart always \
    -p 11004:3000 \
    -e WOWAUDIT_API_KEYS="%config.env.WOWAUDIT_API_KEYS%" \
    -e DISCORD_BOT_TOKEN="%config.env.DISCORD_BOT_TOKEN%" \
    -v %config.env.GOOGLE_DATASTORE_CREDENTIALS%:/config/google-datastore.json \
    --name %deploy.name% $IMAGE_NAME