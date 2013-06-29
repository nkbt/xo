xo
==

Advanced tic-tac-toe game with offline mode

Pure frontend offline version is available on [GitHub pages](http://nkbt.github.io/xo).


Installation
====

1. Install [Vagrant](http://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/)
2. Add Ubuntu 13.04 i386 box:

        vagrant box add raring32 http://cloud-images.ubuntu.com/vagrant/raring/current/raring-server-cloudimg-i386-vagrant-disk1.box

3. Add salt plugin:

        vagrant plugin install vagrant-salt

4. Checkout project:

        git clone git://github.com/nkbt/xo.git xo

5. Run vagrant:

        cd xo
        vagrant up

6. Go to [http://localhost:10080](http://localhost:10080)


TODO
====

- [x] Vagrant sandbox configuration (Node, Redis)
- [x] Configure Node app dependencies (package.json)
- [x] Automatically install NPM dependencies and run Node app
- [ ] BUG: fix dead-end situation
- [ ] FEATURE: rooms
- [ ] FEATURE: backend state validation and sync
- [ ] FEATURE: scores
- [ ] FEATURE: leader board
