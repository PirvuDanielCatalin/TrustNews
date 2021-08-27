script_path="/home/danielpirvu/Workdir/TrustNews/BigchainDBSingleNode"
docker run \
    --detach \
    --name bigchaindbnode1 \
    --publish 39984:9984 \
    --publish 39985:9985 \
    --publish 37017:27017 \
    --publish 36657:26657 \
    --volume ${script_path}/MongoDB/data/db:/data/db \
    --volume ${script_path}/MongoDB/data/configdb:/data/configdb \
    --volume ${script_path}/Tendermint/tendermint:/tendermint \
bigchaindb/bigchaindb:all-in-one