# Node 1
bigchaindb election new upsert-validator \
<node2-public-key> \
<node2-power> \
<node2-node-id> \
--private-key <node1-path-to-the-private-key>

# Same for node3 and node4

# Multiple votes from different nodes
bigchaindb election approve <election-id> 
--private-key <node-path-to-the-private-key>