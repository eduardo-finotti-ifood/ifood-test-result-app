import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground } from 'react-native';
import { Header, Left, Right, Icon, Body, Title } from 'native-base'

export default class AndroidHourlyScreen extends Component {

  state = {
    runs:[
      {build: '#123',
      result: 'success',
      date: '01/01/2020'},
      
      {build: '#344',
      result: 'success',
      date: '02/01/2020'},
      
      {build: '#555',
      result: 'error',
      date: '03/01/2020'},
    ]
  }

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon type="FontAwesome5" name='clock' style={{fontSize: 24, color: tintColor}} />
    )
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Title style={{fontSize: 15}}>Hourly Android</Title>          
          </Body>
          <Right/>
        </Header>
        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
          
        {this.state.runs.map((run, index) => (
            <View style={{paddingTop: 20}}>
              <ImageBackground 
                                
                                style={{width: 350, shadowColor: 'black',
                                shadowOffset: { width: 1, height: 2 },
                                shadowOpacity: 0.8, shadowRadius: 5,    
                                height: 100, alignContent: 'center', justifyContent: 'center', 
                                alignItems: 'left', paddingLeft: 75}}> 
                <Text>Build: {run.build}  Result: {run.result}</Text>  
                <Text>Hour: {run.date}</Text>
              </ImageBackground>
            </View>
        ))}        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
