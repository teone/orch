echo 'export http_proxy="http://127.0.0.1:3128/"' >> /etc/default/docker
echo 'export DOCKER_HOST="tcp://127.0.0.1:3128"' >> /etc/default/docker
export DOCKER_HOST="tcp://127.0.0.1:3128"