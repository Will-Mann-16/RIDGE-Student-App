import React from "react";
import {connect} from "react-redux";
import SlidingUpPanel from 'rn-sliding-up-panel';
import { StyleSheet } from "react-native";
import { Container, Header, Left, Right, Body, Text, Title, Icon, Content, Button } from "native-base";
import StudentCard from "./StudentCard";
import LocationsList from "./LocationsList";

class HomeScreen extends React.Component {
    state = {
        visible: false
    }

    closePanel() {
        this._panel.transitionTo(0);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                    <Title>RIDGE</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="calendar" />
                        </Button>
                        <Button transparent>
                            <Icon name="cog" />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <StudentCard/>
                    <Button full dark onPress={() => this.setState({visible: true})}>
                        <Text>Locations</Text>
                    </Button>
                    <SlidingUpPanel visible={this.state.visible} ref={c => this._panel = c}
                                    onRequestClose={() => this.setState({visible: false})}>
                        <LocationsList close={this.closePanel.bind(this)}/>
                    </SlidingUpPanel>
                </Content>
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