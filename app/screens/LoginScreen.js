import React from "react";
import { StatusBar, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { authenticateStudent } from "../actions/appActions";

class LoginScreen extends React.Component{
  state = {
    username: "",
    password: ""
  }

  submitData() {
      this.props.dispatch(authenticateStudent(this.state.username, this.state.password));
  }
  render(){
    return(
        <KeyboardAvoidingView behavior={'height'} style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <Text style={styles.titleText}>Login to RIDGE</Text>
          <TextInput style={styles.textBox} placeholderTextColor='#555' placeholder='Username' autoCapitalize={'characters'} onChangeText={(username) => this.setState({username})} returnKeyType={'done'} autoCorrect={false} />
          <TextInput style={styles.textBox} placeholderTextColor='#555' placeholder='Password' returnKeyType={'done'} onChangeText={(password) => this.setState({password})} autoCapitalize={'none'} autoCorrect={false} secureTextEntry />
            <TouchableOpacity style={styles.button} onPress={this.submitData.bind(this)} ><Text style={styles.buttonText}>LOGIN</Text></TouchableOpacity>
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
        marginBottom: 75
    },
    textBox:{
      alignSelf: 'stretch', textAlign: 'center', fontSize: 16, padding: 10, margin: 5, color: "#333"
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button:{
        margin: 10,
        padding: 30,
        backgroundColor: "#333",
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    buttonText:{
        color: "white",
        fontWeight: "400"
    }
});

function mapStateToProps(state){
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(LoginScreen);
