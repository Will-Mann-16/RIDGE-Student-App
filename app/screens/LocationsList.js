import React from "react"
import {connect} from "react-redux"
import { View,SectionList, Text, StyleSheet, TouchableOpacity } from "react-native"
import { H1, H2 } from "native-base"
import * as appActions from "../actions/appActions"

class LocationsList extends React.Component{
    updateLocation(location){
        this.props.dispatch(appActions.updateLocation(this.props.app.student._id, location));
        this.props.close(0)
    }
    refreshData(){
        this.props.dispatch(appActions.readLocations(this.props.app.student._house, this.props.app.student._id))
    }
    render(){
        var locationItem = ({item}) =>{
            return (<TouchableOpacity style={[styles.locationButton, {backgroundColor: item.colour}]} onPress={this.updateLocation.bind(this, item._id)}><Text style={styles.locationText}>{item.name}</Text></TouchableOpacity>)
        }
        var locationHeader = ({section}) => {
            return section.key !== "" ? (<H2 style={styles.locationHeader}>{section.key}</H2>) : null
        }
        var sections = [];
        for(var i = 0; i < this.props.app.config.LOCATION_HEADINGS.length; i++){
            var items = [];
            this.props.app.locations.forEach(function(location){
                if(location.heading == i){
                    items.push(location);
                }
            });
            sections.push({data: items, key: i > 0 ? this.props.app.config.LOCATION_HEADINGS[i] : ""});
        }
        return(
            <View style={styles.container}>
              <H1 style={{textAlign: "center"}}>LOCATIONS</H1>
              <SectionList renderItem={locationItem} renderSectionHeader={locationHeader} sections={sections} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        backgroundColor: "white",
        flex: 1
    },
    header:{
        textAlign: "center",
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },
    locationHeader:{
        textAlign: "center"
    },
    locationButton:{
        flex: 1,
        alignItems: "center",
        alignSelf: "stretch",
        padding: 20
    },
    locationText:{
        color: "white",
        fontWeight: "bold"
    }
});

function mapStateToProps(state){
    return {
        app: state.app
    };
}

export default connect(mapStateToProps)(LocationsList);
