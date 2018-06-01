import axios from 'axios';

export var WELLY_IP = "194.73.225.206";
export var INTERNAL_IP = "10.11.0.23";
export var PORT = "8081";
export var HOST_IP;
export var scriptsDirectory;
export var instance;
axios.get("http://" + INTERNAL_IP + ":" + PORT + "/api/view-token").then((response) => {
    HOST_IP = "http://" + INTERNAL_IP + ":" + PORT;
    scriptsDirectory = HOST_IP + '/api/';
    instance = axios.create({
        baseURL: scriptsDirectory
    });
}).catch((error) =>{
  HOST_IP = "http://" + WELLY_IP + ":" + PORT;
  scriptsDirectory = HOST_IP + '/api/';
  instance = axios.create({
      baseURL: scriptsDirectory
  });
});
