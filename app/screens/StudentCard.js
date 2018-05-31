import React from "react";
import { connect } from "react-redux"
import { View, Text, StyleSheet } from "react-native"

class StudentCard extends React.Component{
    render(){
        var timelastout = new Date(this.props.app.student.timelastout);
        var style = StyleSheet.flatten([styles.container, {borderColor: this.props.app.student.location.colour}]);
        return(
            <View style={style}>
                <View style={styles.dateTimeContainer}><Text style={styles.dateTimeText}>{timelastout.toLocaleTimeString()}</Text>
                    <Text style={styles.dateTimeText}>{timelastout.toLocaleDateString()}</Text></View>
                <Text style={styles.nameText}>{this.props.app.student.firstname} {this.props.app.student.surname}</Text>
                <View style={{flex: 1}}><Text style={styles.locationText}>{this.props.app.fetched && this.props.app.config.YEARGROUP_NAMES[this.props.app.student.yeargroup]}</Text>
                <Text style={styles.locationText}>{this.props.app.student.location.name}</Text></View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        borderWidth: 10,
        backgroundColor: "#FFFFFF",
        flex: 1,
        padding: 10,
        margin: 40
    },
    dateTimeContainer:{
        flex: 5
    },
    dateTimeText:{
        textAlign: "center",
        fontSize: 20,
        fontWeight: "400",
        color: "gray"
    },
    nameText:{
        textAlign: "center",
        fontSize: 40,
        fontWeight: "400",
        flex: 5
    },
    locationText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "400",
        color: "gray"
    }
});

function mapStateToProps(state){
    return { app: state.app };
}
export default connect(mapStateToProps)(StudentCard);
