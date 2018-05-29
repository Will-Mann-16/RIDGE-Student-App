import axios from 'axios';

var WELLY_IP = "194.73.225.206";
var INTERNAL_IP = "10.11.0.23";
var PORT = "8081";
export var HOST_IP = "http://" + WELLY_IP + ":" + PORT;
export var scriptsDirectory = HOST_IP + '/api/';

export var instance = axios.create({
    baseURL: scriptsDirectory
});
/*axios.get("http://" + INTERNAL_IP + ":" + PORT + "/api/view-token", (response) => {
  if(response.status !== 404){
    HOST_IP = "http://" + INTERNAL_IP + ":" + PORT;
    scriptsDirectory = HOST_IP + '/api/';
    instance = axios.create({
        baseURL: scriptsDirectory
    });
  }
});
*/
