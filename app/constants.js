import axios from 'axios';

export var WELLY_ADDRESS = "ridge.wellingtoncollege.org.uk";
export var PORT = "8081";
export var HOST_IP = "http://" + WELLY_ADDRESS + ":" + PORT;
export var scriptsDirectory = HOST_IP + '/api/';
export var instance = axios.create({
    baseURL: scriptsDirectory
});
