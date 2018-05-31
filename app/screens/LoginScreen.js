import React from "react";
import { Platform } from "react-native";
import { Container, Header, Title, Content, Button, Item, Label, Input, Body, Left, Right, Icon, Form, Text } from "native-base";
import { connect } from "react-redux";
import * as Expo from "expo";
import { authenticateStudent } from "../actions/appActions";

class LoginScreen extends React.Component{
    state = {
        username: "",
        password: ""
    }
    submitData = () => {
        this.props.dispatch(authenticateStudent(this.state.username, this.state.password));
    }
    render(){
        var loginButton = (
            <Button onPress={this.submitData} block style={{ margin: 15, marginTop: 50 }}>
                <Text>Login</Text>
            </Button>
        );
        if(this.props.app.login.fetching){
            loginButton = (
                <Button onPress={null} iconLeft block info style={{ margin: 15, marginTop: 50 }}>
                    <Icon active name="ios-cloud-circle" />
                    <Text>Loading</Text>
                </Button>
            );
        }
        if(this.props.app.login.fetched){
            if(this.props.app.login.authenticated){
                loginButton = (
                    <Button onPress={null} iconLeft block success style={{ margin: 15, marginTop: 50 }}>
                        <Icon active name="ios-checkmark-circle" />
                        <Text>Logged In</Text>
                    </Button>
                );
            }
            else{
                loginButton = (
                    <Button onPress={this.submitData} iconLeft block danger style={{ margin: 15, marginTop: 50 }}>
                        <Icon active name="ios-close-circle" />
                        <Text>Incorrect Login</Text>
                    </Button>
                );
            }
        }
        return(
            <Container>
                <Header style={{ backgroundColor: "#23265C", color: "white", marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight }}>
                    <Left/>
                    <Body>
                    <Title>Login</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input onChangeText={text => this.setState({...this.state, username: text})}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry onChangeText={text => this.setState({...this.state, password: text})}/>
                        </Item>
                    </Form>
                    {loginButton}
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state){
    return {
        app: state.app
    };
}

export default connect(mapStateToProps)(LoginScreen);
