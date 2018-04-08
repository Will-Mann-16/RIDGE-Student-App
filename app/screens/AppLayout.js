import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, StatusBar, ActivityIndicator } from "react-native";
import {readStudent, readStudentMajor, readLocations, getHouseConfig} from "../actions/appActions";
import {activateListener} from "../socket";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
const LoadingScreen = (props) => {
    return (
        <View style={styles.loadingScreen}>
            <StatusBar barStyle="dark-content"/>
        <Text style={styles.loadingText}>Welcome To RIDGE</Text>
        <Text>{props.loading ? "Connecting" : "Connected"}</Text>
        <Text>{props.auth ? "Authenticated" : "Not Authenticated"}</Text>
        <ActivityIndicator animating size='large'/>
    </View>);
};

class AppLayout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            auth: false
        }
    }
    componentWillReceiveProps(newProps){
        if(newProps.app.authenticated && !this.state.auth){
            this.props.dispatch(getHouseConfig(newProps.app.student._house));
            this.props.dispatch(readStudentMajor(newProps.app.student._id));
            this.props.dispatch(readLocations(newProps.app.student._house));
            activateListener(this.props.dispatch, newProps.app.student._house, newProps.app.student._id);
            this.setState({...this.state, auth: true, loading: false});
        }
        else if(!newProps.app.authenticated && this.state.auth){
            this.setState({...this.state, auth: false});
        }
    }
  render(){
      if(this.props.app.fetching && !this.state.auth){
          return (<LoadingScreen auth={this.state.auth} loading={this.state.loading} />);
      }
      else if(this.props.app.authenticated){
          return (<HomeScreen/>)
      }
      else if(this.props.app.fetched){
          return (<LoginScreen/>);
      }
      return null;
  }
}

const styles = StyleSheet.create({
   loadingScreen:{
     flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
   },
   loadingText:{
     fontSize: 40,
       fontWeight: "bold"
   }
});

function mapStateToProps(state){
  return {
    app: state.app
  }
}

export default connect(mapStateToProps)(AppLayout);
