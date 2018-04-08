import React from "react";
import {
    Platform,
    ToolbarAndroid,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Button,
    StatusBar,
    Animated
} from "react-native";
import {connect} from "react-redux";
import StudentCard from "./StudentCard";
import LocationsList from "./LocationsList";
import {logout} from "../actions/appActions"
import SlidingUpPanel from 'rn-sliding-up-panel';

const NAVACTIONS = [
    {title: 'Logout', show: 'always'}
]

class HomeScreen extends React.Component {
    state = {
        visible: false
    }

    onActionSent(id){
        switch(id){
            case 0:
                this.logout();
        }
    }

    logout() {
        this.props.dispatch(logout());
    }

    closePanel() {
        this._panel.transitionTo(0);
    }

    render() {
        const Navbar = Platform.select({
            ios: () => <View styles={styles.androidToolbar}><TouchableOpacity style={styles.button}><Text style={styles.buttonText}>LOGOUT</Text></TouchableOpacity></View>,
            android: () => <ToolbarAndroid style={styles.androidToolbar} title="RIDGE" actions={NAVACTIONS} onActionSelected={this.onActionSent.bind(this)}/>
        });
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content"/>
                <Navbar/>
                <StudentCard student={this.props.app.student} yeargroup={this.props.app.config.YEARGROUP_NAMES[this.props.app.student.yeargroup]}/>
                <TouchableOpacity style={styles.button} onPress={() => this.setState({visible: true})}>
                    <Text style={styles.buttonText}>LOCATIONS</Text>
                </TouchableOpacity>
                <SlidingUpPanel visible={this.state.visible} ref={c => this._panel = c}
                                onRequestClose={() => this.setState({visible: false})}>
                    <LocationsList close={this.closePanel.bind(this)}/>
                </SlidingUpPanel>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    androidToolbar: {
            backgroundColor: '#FFFFFF',
        height: 56,
            alignSelf: 'stretch',
            textAlign: 'center',
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
