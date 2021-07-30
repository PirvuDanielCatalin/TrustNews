#############################################################################################
# Summary #
#############################################################################################
# Node      || BigchainDB API   || BigchainDB Websocket || MongoDB  || Tendermint RPC
# Node 1    || 9981             || 9982                 || 27011    || 26651
# Node 2    || 9983             || 9984                 || 27013    || 26653
# Node 3    || 9985             || 9986                 || 27015    || 26655
# Node 4    || 9987             || 9988                 || 27017    || 26657
#############################################################################################
action=$1
script_path="D:/Facultate/VMs/.SharedFolder/TrustNews"
# script_path=$(dirname $(realpath $0))

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
        --volume ${script_path}/Node1/MongoDB/data/db:/data/db \
        --volume ${script_path}/Node1/MongoDB/data/configdb:/data/configdb \
        --volume ${script_path}/Node1/Tendermint/tendermint:/tendermint \
        bigchaindb/bigchaindb:all-in-one
        echo "Node 1 created"
        echo "Creating node 2"
        docker run \
        --detach \
        --name bigchaindbnode2 \
        --publish 9983:9984 \
        --publish 9984:9985 \
        --publish 27013:27017 \
        --publish 26653:26657 \
        --volume ${script_path}/Node2/MongoDB/data/db:/data/db \
        --volume ${script_path}/Node2/MongoDB/data/configdb:/data/configdb \
        --volume ${script_path}/Node2/Tendermint/tendermint:/tendermint \
        bigchaindb/bigchaindb:all-in-one
        echo "Node 2 created"
        echo "Creating node 3"
        docker run \
        --detach \
        --name bigchaindbnode3 \
        --publish 9985:9984 \
        --publish 9986:9985 \
        --publish 27015:27017 \
        --publish 26655:26657 \
        --volume ${script_path}/Node3/MongoDB/data/db:/data/db \
        --volume ${script_path}/Node3/MongoDB/data/configdb:/data/configdb \
        --volume ${script_path}/Node3/Tendermint/tendermint:/tendermint \
        bigchaindb/bigchaindb:all-in-one
        echo "Node 3 created"
        echo "Creating node 4"
        docker run \
        --detach \
        --name bigchaindbnode4 \
        --publish 9987:9984 \
        --publish 9988:9985 \
        --publish 27017:27017 \
        --publish 26657:26657 \
        --volume ${script_path}/Node4/MongoDB/data/db:/data/db \
        --volume ${script_path}/Node4/MongoDB/data/configdb:/data/configdb \
        --volume ${script_path}/Node4/Tendermint/tendermint:/tendermint \
        bigchaindb/bigchaindb:all-in-one
        echo "Node 4 created"
        ;;
    "start")
        echo "Starting node 1"
        docker start bigchaindbnode1
        echo "Node 1 started"
        echo "Starting node 2"
        docker start bigchaindbnode2
        echo "Node 2 started"
        echo "Starting node 3"
        docker start bigchaindbnode3
        echo "Node 3 started"
        echo "Starting node 4"
        docker start bigchaindbnode4
        echo "Node 4 started"
        ;;
    "stop")
        echo "Stopping node 1"
        docker stop bigchaindbnode1
        echo "Node 1 stopped"
        echo "Stopping node 2"
        docker stop bigchaindbnode2
        echo "Node 2 stopped"
        echo "Stopping node 3"
        docker stop bigchaindbnode3
        echo "Node 3 stopped"
        echo "Stopping node 4"
        docker stop bigchaindbnode4
        echo "Node 4 stopped"
        ;;
    "clean")
        bash ./TrustNews.sh stop
        rm -rf ${script_path}/Node1/MongoDB
        rm -rf ${script_path}/Node1/Tendermint
        rm -rf ${script_path}/Node2/MongoDB
        rm -rf ${script_path}/Node2/Tendermint
        rm -rf ${script_path}/Node3/MongoDB
        rm -rf ${script_path}/Node3/Tendermint
        rm -rf ${script_path}/Node4/MongoDB
        rm -rf ${script_path}/Node4/Tendermint
        docker rm -v bigchaindbnode1
        docker rm -v bigchaindbnode2
        docker rm -v bigchaindbnode3
        docker rm -v bigchaindbnode4
        ;;
    *)
        echo "Action is not registered"
esac