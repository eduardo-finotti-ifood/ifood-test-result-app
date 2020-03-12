import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import { Header, Left, Right, Icon, Body, Title } from 'native-base'
import axios from 'axios';
import { SafeAreaView } from 'react-navigation';

export default class IOSHourlyScreen extends Component {

  componentDidMount() {
    axios.get('http://192.168.169.105:8000/api/results?run=hourly&platform=ios&quantity=10')
    .then(response => {
      this.setState({ runs: response.data.f})
    })
    .catch(error => {
      console.log(error);
    });
  }

  state = {
    runs:[]
  }

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon type="FontAwesome5" name='cloud-sun' style={{fontSize: 24, color: tintColor}} />
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <SafeAreaView  style={{backgroundColor: '#1f1f1f', height: 75}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 35}}>
            <Icon style={{color: 'white', paddingLeft: 20}} name='menu' onPress={() => this.props.navigation.openDrawer()} />
            <Text style={{color: 'white', fontSize: 20, paddingLeft: '8%'}}>Hourly iOS</Text>
          </View>
        </SafeAreaView>

        <View style={{ alignItems: 'flex-start', justifyContent: 'center', marginTop: 30}}>
          {/* <View style={{ padding: 10}}>
            <Text style={{color: 'white', fontSize: 25, padding:10}}>Hourly Run for iOS</Text>
          </View> */}
          
           <FlatList style={{ width: '97%', height: '75%', paddingLeft: '5%',}}
                      data={this.state.runs}
                      keyExtractor={item => item.build_number.toString()}
                      renderItem={({ item }) => 
        
            <View style={{ width: '92%', height: 80, margin: 10,
                      backgroundColor: '#474747', flexDirection: 'row',
                      shadowColor: 'black',shadowOffset: { width: 1, height: 1 },
                      shadowOpacity: 0.5, shadowRadius: 4,}}> 

              <View style={{ backgroundColor: item.result == 'success'? 'green': 'red', width: 15,}}></View>

              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: 'white', padding: 20, fontSize: 35}}>#{item.build_number}</Text>  
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'flex-start', 
                          justifyContent: 'flex-start', padding: 20}}>

                <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold',}}>{item.result}</Text> 
                </View>   

                <View style={{  flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10}}>
                  <Text style={{color: 'white', fontSize: 15}}>{item.date}</Text>  
                </View>

              </View>

          </View> }/>  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D2D',
  },
});

