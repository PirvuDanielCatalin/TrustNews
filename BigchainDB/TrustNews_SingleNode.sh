#############################################################################################
# Summary #
#############################################################################################
# Node      || BigchainDB API   || BigchainDB Websocket || MongoDB  || Tendermint RPC
# Node 1    || 9981             || 9982                 || 27011    || 26651
#############################################################################################
action=$1
script_path="D:/Facultate/VMs/.SharedFolder/TrustNews/BigchainDB"

case "$action" in
    "create")
        echo "Creating node 1"
        docker run \
        --detach \
        --name bigchaindbnode1 \
        --publish 9981:9984 \
        --publish 9982:9985 \
        --publish 27011:27017 \
        --publish 26651:26657 \
        --volume ${script_path}/MongoDB/data/db:/data/db \
        --volume ${script_path}/MongoDB/data/configdb:/data/configdb \
        --volume ${script_path}/Tendermint/tendermint:/tendermint \
        bigchaindb/bigchaindb:all-in-one
        echo "Node 1 created"
        ;;
    "start")
        echo "Starting node 1"
        docker start bigchaindbnode1
        echo "Node 1 started"
        ;;
    "stop")
        echo "Stopping node 1"
        docker stop bigchaindbnode1
        echo "Node 1 stopped"
        ;;
    "clean")
        bash ./TrustNews.sh stop
        rm -rf ${script_path}/MongoDB
        rm -rf ${script_path}/Tendermint
        docker rm -v bigchaindbnode1
        ;;
    *)
        echo "Action is not registered"
esac