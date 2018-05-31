import React from "react";
import * as Expo from "expo";
import {connect} from "react-redux";
import SlidingUpPanel from 'rn-sliding-up-panel';
import { StyleSheet, Platform } from "react-native";
import { Link } from "react-router-native";
import { Container, Header, Left, Right, Body, Text, Title, Icon, Content, Button, Footer, FooterTab } from "native-base";
import StudentCard from "./StudentCard";
import LocationsList from "./LocationsList";
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
class HomeScreen extends React.Component {
    state = {
        visible: false
    }

    closePanel() {
        this._panel.transitionTo(0);
    }

    render() {
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
            <Container style={{ backgroundColor: backgroundColour}}>
                <Header style={{ backgroundColor: headerColour, marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight }}>
                    <Body>
                    <Title style={{ color: textColour }}>{this.props.app.fetched ? this.props.app.house.name : "RIDGE"}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Link to="/calendar"><Icon name="calendar" /></Link>
                        </Button>
                        <Button transparent>
                            <Link to="/settings"><Icon name="cog" /></Link>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <StudentCard/>

                    <SlidingUpPanel visible={this.state.visible} ref={c => this._panel = c}
                                    onRequestClose={() => this.setState({visible: false})}>
                        <LocationsList close={this.closePanel.bind(this)}/>
                    </SlidingUpPanel>
                </Content>
                <Footer >
                  <FooterTab style={{backgroundColor: headerColour}}>
                  <Button full onPress={() => this.setState({...this.state, visible: !this.state.visible})}>
                      <Text style={{color: textColour}}>{this.state.visible ? "CLOSE" : "LOCATIONS"}</Text>
                  </Button>
                </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button: {
        margin: 10,
        padding: 30,
        backgroundColor: "#333",
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    buttonText: {
        color: "white",
        fontWeight: "400"
    },
    logoutButton: {
        alignSelf: "stretch",
        padding: 10,
        backgroundColor: "red",
    },
    subView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        height: 100,
    }
});

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

export default connect(mapStateToProps)(HomeScreen);
