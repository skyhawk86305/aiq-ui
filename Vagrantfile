# -*- mode: ruby -*-
# vi: set ft=ruby :

# To use this vagrant file, you will need to install
# Vagrant (at least version 1.6.2) and VirtualBox.
# Both downloads can be found easily online.
#
# Once the programs are installed, navigate to the directory
# containing this Vagrantfile in the command line and
# run: "vagrant up". This will automatically download
# the latest version of the Windows 10 box (if not already
# in your Vagrant cache) and launch the VM.
#
# After the box is up and running, you can connect to
# the box via Remote Desktop by running: "vagrant rdp".
# NOTE: you need to have an RDP client installed on your
# machine for this to work. Vagrant should launch the RDP
# client with the correct IP and port. If prompted to login,
# use vagrant/vagrant as the username/password.
#
# Finally, once you are inside the VM, to connect to a service
# being run locally, in a web browser, use the IP "10.0.2.2" with
# whatever port you are using locally. This should connect to your
# local web server.
#
# If you need to run a VM with MacOS Sierra, run the command
# "vagrant up osx". This will automatically download the Mac
# box and launch the VM.

Vagrant.require_version ">= 1.6.2"

Vagrant.configure("2") do |config|
    config.vm.define "osx", autostart: false do |osx|
        osx.vm.box = "http://files.dryga.com/boxes/osx-sierra-0.3.1.box"
    end

    config.vm.define "win10", primary: true do |win10|
        win10.vm.box_url = "http://sf-artifactory.eng.solidfire.net/api/vagrant/webdev-vagrant/windows_10"
        win10.vm.box = "windows_10"
        win10.vm.communicator = "winrm"

        # Admin user name and password
        win10.winrm.username = "vagrant"
        win10.winrm.password = "vagrant"

        win10.vm.guest = :windows
        win10.windows.halt_timeout = 15
    end

    config.vm.network :forwarded_port, guest: 3389, host: 3389, id: "rdp", auto_correct: true
    config.vm.network :forwarded_port, guest: 22, host: 2222, id: "ssh", auto_correct: true
    config.vm.network :forwarded_port, guest: 3000, host: 3000, id: "webapp", auto_correct: true

    config.vm.provider :virtualbox do |v, override|
        #v.gui = true
        v.customize ["modifyvm", :id, "--memory", 2048]
        v.customize ["modifyvm", :id, "--cpus", 2]
        v.customize ["setextradata", "global", "GUI/SuppressMessages", "all" ]
    end
end
