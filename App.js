 import React from 'react';
import { Provider } from 'react-redux';
import AppLayout from './app/screens/AppLayout';
import store from './app/store';

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <AppLayout/>
        </Provider>
    );
  }
}
