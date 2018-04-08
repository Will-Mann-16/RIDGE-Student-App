import React from 'react';
import { Provider } from 'react-redux';
import AppLayout from 'app/screens/AppLayout';
import store from 'app/store';
import {connect} from 'app/socket';

export default class App extends React.Component {
    componentWillMount(){
        connect();
        store.dispatch(readStudent());
    }
  render() {
    return (
        <Provider store={store}>
            <AppLayout/>
        </Provider>
    );
  }
}

