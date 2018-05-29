import React from "react";
import { connect } from "react-redux"
import { View, Text, StyleSheet } from "react-native"

class StudentCard extends React.Component{
    render(){
        var timelastout = new Date(this.props.app.student.timelastout);
        var style = StyleSheet.flatten([styles.container, {borderColor: this.props.app.student.location.colour}]);
        console.log(this.props.app.config);
        return(
            <View style={style}>
                <View style={styles.dateTimeContainer}><Text style={styles.dateTimeText}>{timelastout.toLocaleTimeString()}</Text>
                    <Text style={styles.dateTimeText}>{timelastout.toLocaleDateString()}</Text></View>
                <Text style={styles.nameText}>{this.props.app.student.firstname} {this.props.app.student.surname}</Text>
                <Text style={styles.locationText}>{this.props.app.config.YEARGROUP_NAMES}</Text>
                <Text style={styles.locationText}>{this.props.app.student.location.name}</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        borderWidth: 10,
        backgroundColor: "#FFFFFF",
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 40,
        alignSelf: "stretch"
    },
    dateTimeContainer:{
        alignSelf: "stretch"
    },
    dateTimeText:{
        textAlign: "center",
        fontSize: 20,
        fontWeight: "400",
        color: "gray"
    },
    nameText:{
        textAlign: "center",
        alignSelf: "stretch",
        fontSize: 40,
        fontWeight: "400"
    },
    locationText: {
        textAlign: "center",
        alignSelf: "auto",
        fontSize: 20,
        fontWeight: "400",
        color: "gray"
    }
});

function mapStateToProps(state){
    return { app: state.app };
}
export default connect(mapStateToProps)(StudentCard);