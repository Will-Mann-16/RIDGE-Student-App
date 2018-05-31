import React from "react";
import { connect } from "react-redux";
import { Content, List, ListItem, Left, Right, Icon, Body, Text } from "native-base";

import { logout } from "../actions/appActions";

class SettingsScreen extends React.Component{
    render(){
        return (
            <Content>
                <List>
                    <ListItem icon button onPress={() => this.props.dispatch(logout())}>
                        <Left>
                            <Icon name="exit" />
                        </Left>
                        <Body>
                        <Text>Logout</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                </List>
            </Content>
        );
    }
}

function mapStateToProps(state){
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(SettingsScreen);
