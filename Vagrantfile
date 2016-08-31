Vagrant.configure("2") do |config|

    config.vm.box = "ubuntu/trusty64"


    config.vm.network :private_network, ip: '10.0.33.34'

    config.vm.synced_folder "./www", "/var/www", create: true
    config.vm.synced_folder ".", "/vagrant", disabled: true

    config.vm.provision "docker" do |d|
      d.pull_images "rabbitmq"
      d.pull_images "node"

      d.run "rabbitmq",
        args: "-h 'rabbitmq'"
    end

    config.vm.provision :shell, :path => "node-bootstrap.sh"
end
