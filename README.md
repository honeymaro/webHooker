# webHooker
this is a simple git web hooker written in node.js.

### How to use:
  * clone and install this project.
  ```
  git clone https://github.com/honeymaro/webHooker.git
  cd webHooker
  npm install
  ```
  * open and edit *config.json*
  ```javascript
  {
    "port": 3030, // type the port number for which you want to receive a response.
    "url": "/myWebHookTest" , // Enter the address for the webhook call.
    "scriptFile": "pull.sh" // The shell code to execute when webhook is called.
  }
  ```
  * example of *pull.sh*(for linux)
  ```sh
  #!/bin/sh
  cd /home/user/project
  git pull
  sudo kill $(lsof -t -i:80)
  nohup npm start
  ```
  * Add a webhook definition from the git service, such as GitHub or Bitbucket.

  * Start!
  ```
  npm start
  ```
