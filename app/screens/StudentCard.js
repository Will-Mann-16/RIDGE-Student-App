import React from "react";
import { View, Text, StyleSheet } from "react-native"

export default class StudentCard extends React.Component{
  render(){
    var timelastout = new Date(this.props.student.timelastout);
    var style = StyleSheet.flatten([styles.container, {borderColor: this.props.student.location.colour}])
    return(
      <View style={style}>
        <View style={styles.dateTimeContainer}><Text style={styles.dateTimeText}>{timelastout.toLocaleTimeString()}</Text>
          <Text style={styles.dateTimeText}>{timelastout.toLocaleDateString()}</Text></View>
        <Text style={styles.nameText}>{this.props.student.firstname} {this.props.student.surname}</Text>
          <Text style={styles.locationText}>{this.props.student.yeargroup}</Text>
          <Text style={styles.locationText}>{this.props.student.location.name}</Text>
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
})
