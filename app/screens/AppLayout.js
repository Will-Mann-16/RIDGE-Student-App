import React from "react";
import { connect } from "react-redux";
import * as Expo from "expo";
import { View, Text, StyleSheet, StatusBar, ActivityIndicator } from "react-native";
import { Switch, MemoryRouter as Router, Route } from "react-router-native";
import createHistory from 'history/createMemoryHistory';
import { Right, Left, Header, Body, Container, Title, Icon, Button } from "native-base";

import {readStudent, readStudentMajor, readLocations, readCalendar} from "../actions/appActions";
import {activateListener} from "../socket";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import CalendarScreen from "./CalendarScreen";
import SettingsScreen from "./SettingsScreen";

const history = createHistory();

class AppLayout extends React.Component{
    state = {
        loading: true
    };
    componentWillMount(){
        this.props.dispatch(readStudent());
        this.loadFonts();
    }
    async loadFonts() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({...this.state, loading: false});
    }
    render(){
        if(this.props.app.fetching || this.state.loading){
            return (
                <View style={styles.loadingScreen}>
                    <StatusBar barStyle="dark-content"/>
                    <Text style={styles.loadingText}>Welcome To RIDGE</Text>
                    <Text>Connecting</Text>
                    <ActivityIndicator animating size='large'/>
                </View>);
        }
        else if(this.props.app.authenticated){
            this.props.dispatch(readStudentMajor(this.props.app.student._id));
            this.props.dispatch(readLocations(this.props.app.student._id));
            this.props.dispatch(readCalendar(this.props.app.student._id))
            activateListener(this.props.dispatch, this.props.app.student._house, this.props.app.student._id);
            return (
                <Router history={history}>
                    <View style={{flex: 1}}>
                        <StatusBar barStyle="light-content" color="#FFFFFF"/>
                        <Switch>
                            <Route exact path="/" component={HomeScreen} />
                            <Route path="/">
                                <Container>
                                    <Header>
                                        <Left>
                                            <Button transparent onPress={() => history.goBack()}>
                                                <Icon name="arrow-back" />
                                            </Button>
                                        </Left>
                                        <Body>
                                        <Title>RIDGE</Title>
                                        </Body>
                                        <Right/>
                                    </Header>
                                    <Switch>
                                        <Route exact path="/calendar" component={CalendarScreen} />
                                        <Route exact path="/settings" component={SettingsScreen} />
                                    </Switch>
                                </Container>
                            </Route>
                        </Switch>
                    </View>
                </Router>
            );
        }
        else if(this.props.app.fetched){
            return (<LoginScreen />);
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
