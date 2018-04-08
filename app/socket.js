import * as appActions from './actions/appActions';
import io from "socket.io-client";

//const HOST_IP = "http://ridge-server.azurewebsites.net:8080";
//const HOST_IP = "http://10.0.0.253:8081";
const HOST_IP = "http://10.11.0.23:8081";
//const HOST_IP = "http://10.18.112.208:8081";
//const HOST_IP = "http://10.0.0.47:8081";
//const HOST_IP = "http://192.168.137.1:8081";

var socket;
export var connected = false;

export function connect(){
  if(!connected) {
      socket = io.connect(HOST_IP);
      socket.on('connect', () => {
          connected = true;
      });
  }
}
export function disconnect(){
    if(connected) {
        socket.disconnect();
    }
}

export function activateListener(dispatch, house, id) {
  if(connected){

      socket.emit("socket-client-server-init", {house: house});
      socket.on("socket-server-client-init", () => {
          socket.on('socket-server-client-redraw-minor', response => {
              if (house === response.house) {
                  dispatch(appActions.readStudentMinor(id));
              }
          });
          socket.on('socket-server-client-redraw-major', response => {
              if (house === response.house) {
                  dispatch(appActions.readStudentMajor(id));
                  dispatch(appActions.readLocations(house, id));
              }
          });
      });
}
}

export function emit(value, packet = {}) {
    socket.emit(value, packet);
}

export function on(value, callback) {
    socket.on(value, callback);
}
