redis-server:
  pkg:
    - installed

nodejs:
  cmd.script:
    - source: salt://install/nodejs.sh
    - unless: "command -v forever | grep forever"
    - stateful: true
