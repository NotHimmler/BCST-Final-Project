#Instrumententafel Dashboard#

This is the repository for the Physiotherapy Dashboard and Walk Tracking App developed as part of the SOFT3413 Software Project Course.

An example of the latest build is available to use at: [https://soft3413-physio-dashboard.herokuapp.com](https://soft3413-physio-dashboard.herokuapp.com)

##Requirements/Dependencies##

###Dashboard###
1. Node.js - Node.js needs to be installed. Node is the server software, and it's package manager NPM is used for dependencies  
Node.js can be acquired here: [https://nodejs.org/en/](https://nodejs.org/en/)
2. MacOS/Linux OR Windows Subsystem for Linux 

###App###
1. An Apple Computer with Intel 64bit CPU running MacOS
2. XCode - Apples development environment for MacOS and iOS  
Can be acquired in the MacOS App Store for free  
3. XCode command line tools for MacOS  
Can be acquired in the MacOS App Store for free  
4. Optional - An iPhone  

##How to run the Dashboard##

1. Pull the repository to your machine
2. Change directory to the merged dashboard directory  
    ```cd ./dashboard/Merged-Dashboard```
3. Run NPM's Install command  
    ```npm install```
4. Run the command to build the javascript bundle
    ```npm run build-prod```
5. Run the command to start the development server - NOTE - Port 8080 must be open
    ```npm run dev```
6. Go to ```http://localhost:8080/```
7. Login with username: "leanneh" and password: "leanne" - Or create an account


##How to run the App##

1. Pull the repository to your machine if not already done
2. Open the repository folder in finder
3. Go to the WalkforwardTest folder
4. Double click the ```WalkforwardTest.xcworkspace``` XCode workspace file
5. Click the play button to launch on your phone or a simulator
