#!/bin/bash
# -------------------------------------------------------
# THE GREEN BRICK ROAD
# -------------------------------------------------------
# Copyright (c) [2023] The Green Brick Road
# All rights reserved
# -------------------------------------------------------
# Configure URLs accessible by search engine crawlers
# -------------------------------------------------------
# Nadège LEMPERIERE, @02 may 2023
# Latest revision: 02 may 2023
# -------------------------------------------------------

# Retrieve absolute path to this script
script=$(readlink -f $0)
scriptpath=`dirname $script`

# Launch node container in development mode
docker stop gbr-portal
docker rm gbr-portal
docker container run -it --rm --name=gbr-portal \
                     --volume ${scriptpath}/../:/work:rw \
                     -p 3000:3000 -p 9005:9005 --workdir /work \
                     --entrypoint /bin/sh \
                     node:alpine3.17
                     #npm start