import React from "react";
import { SectionList, StatusBar } from "react-native";
import { List, ListItem, Text, H2, Content } from "native-base";
import { connect } from "react-redux";

class CalendarScreen extends React.Component{
    render(){
        return(
            <Content>
              <SectionList
                  renderItem={({item, index, section}) => {
                      var startTime = new Date(item.starttime);
                      var endTime = new Date(item.endtime);
                      return (
                          <ListItem>
                            <Text style={{fontWeight: "bold"}}>{startTime.getHours()}:{startTime.getMinutes()} - {endTime.getHours()}:{endTime.getMinutes()}</Text>
                            <H2>{item.title}</H2>
                            <Text>{item.description}</Text>
                          </ListItem>
                      );
                  }}
                  renderSectionHeader={({ section: { title }}) => <ListItem itemDivider><Text>{title}</Text></ListItem>}
                  sections={() => {
                      var list = this.props.app.calendar.find((element) => {
                          return new Date(element.starttime) > new Date().setHours(0).setMinutes(0).setSeconds(0).setMilliseconds(0);
                      });
                      var currentDay = new Date().toDateString();
                      var result = [];
                      var index = 0;
                      while(index < list.length){
                          var currentEvent = this.props.app.calendar[index];
                          var date = new Date(currentEvent.startime);
                          var day = date.toDateString();
                          if(day === currentDay){
                              var findRes = result.find((element) => {
                                  return element.title === day
                              });
                              if(findRes.length == 0){
                                  result.push({title: day, data: [currentEvent]});
                              }
                              else{
                                  var resIndex = result.indexOf(findRes[0]);
                                  var oldRes = result[resIndex];
                                  oldRes.data.push(currentEvent);
                                  result[resIndex] = oldRes;
                              }
                              index++;
                          }
                          else{
                              currentDay = day;
                          }
                      }
                      return result;
                  }}        />
            </Content>
        );
    }
}

function mapStateToProps(state){
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(CalendarScreen);