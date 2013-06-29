screen:
  pkg:
    - installed

git:
  pkg:
    - installed

redis-server:
  pkg:
    - installed

nodejs:
  pkg:
    - installed
    - require:
       - cmd: nodejs-ppa

nodejs-ppa:
  cmd.run:
    - name: "add-apt-repository -y ppa:chris-lea/node.js && apt-get update"
    - unless: "[ -f /etc/apt/sources.list.d/chris-lea-node_js-{{ grains['oscodename'] }}.list ]"

forever:
  npm:
    - installed
    - require:
      - pkg: nodejs
    
supervisor:
  npm:
    - installed
    - require:
      - pkg: nodejs

#
#
#
#
#
# Application setup and run
#

app-install:
  cmd.run:
    - name: npm install
    - cwd: /vagrant/
    - require:
      - pkg: nodejs
      
app-run:
  cmd.run:
    - name: screen -dmS newscreen nohup npm start
    - cwd: /vagrant/
    - unless: "pgrep npm"
    - require:
      - pkg: nodejs
      - cmd: app-install