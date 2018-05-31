import React from "react";
import { connect } from "react-redux";
import * as Expo from "expo";
import { StyleSheet, StatusBar, Platform, View } from "react-native";
import { Switch, Router, Route } from "react-router-native";
import createHistory from 'history/createMemoryHistory';
import { Right, Left, Header, Body, Container, Title, Icon, Button, Spinner, Text } from "native-base";

import {readStudent} from "../actions/appActions";
import {activateListener} from "../socket";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import CalendarScreen from "./CalendarScreen";
import SettingsScreen from "./SettingsScreen";

const history = createHistory();

const getRGB = function(b){
    var a;
    if(b&&b.constructor==Array&&b.length==3)return b;
    if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))return[parseInt(a[1]),parseInt(a[2]),parseInt(a[3])];
    if(a=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b))return[parseFloat(a[1])*2.55,parseFloat(a[2])*2.55,parseFloat(a[3])*2.55];
    if(a=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b))return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],
16)];
    if(a=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b))return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)];
    return null;
};

const calculateLuminance = function(color) {
    var rgb = getRGB(color);
    if (!rgb) return null;
        return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

class AppLayout extends React.Component{
    state = {
        loading: true,
        title: "RIDGE"
    };
    componentWillMount(){
        this.props.dispatch(readStudent());
        this.loadFonts();
        history.listen((location, action) => {
          var pathname = location.pathname.charAt(1).toUpperCase() + location.pathname.substr(2);
          this.setState({...this.state, title: pathname});
        })
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
                <Expo.AppLoading />);
        }
        else if(this.props.app.authenticated){
          var headerColour = "#23265C";
          var textColour = "#FFFFFF";
          var backgroundColour = "#E7E7E7";
          if(this.props.app.fetched){
            var colours = this.props.app.house.colours;
            colours.sort((a, b) => {
              return calculateLuminance(a) - calculateLuminance(b);
            });
            if(colours.length > 1){
                headerColour = colours[0];
            }
            if(colours.length > 2){
                if(calculateLuminance(colours[1]) > 180){
                  backgroundColour = colours[1];
                }
            }
            if(calculateLuminance(headerColour) > 180){
              textColour = "#000000";
            }
          }
            return (
                <Router history={history}>
                    <View style={{flex: 1}}>
                        <StatusBar backgroundColor={headerColour}/>
                        <Switch>
                            <Route exact path="/" name="Home" component={HomeScreen} />
                            <Route path="/">
                                <Container  style={{ backgroundColor: backgroundColour }}>
                                    <Header style={{ backgroundColor: headerColour, marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight }}>
                                        <Left>
                                            <Button transparent onPress={() => history.goBack()}>
                                                <Icon name="arrow-back" />
                                            </Button>
                                        </Left>
                                        <Body>
                                        <Title style={{ color: textColour }}>{this.state.title}</Title>
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
