import * as appActions from './actions/appActions';
import io from "socket.io-client";
import { HOST_IP } from "./constants";

var socket;
export var connected = false;
export function disconnect(){
    if(connected) {
        socket.disconnect();
        connected = false;
    }
}

export function activateListener(dispatch, house, id) {
      socket = io(HOST_IP, {
          transports: [
              'websocket',
              'htmlfile',
              'xhr-polling',
              'jsonp-polling',
              'polling'
          ]
      });
      socket.on('connect', () => {
          connected = true;
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
                      dispatch(appActions.readLocations(id));
                  }
              });
          });
      });
}
export function redrawMinor(house){
  if(connected){
    socket.emit("socket-client-server-redraw-minor"{house});
  }
}
