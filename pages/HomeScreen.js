import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import { Icon } from 'native-base'
import { FlatGrid } from 'react-native-super-grid';
import { SafeAreaView } from 'react-navigation';
import axios from 'axios';

import ios from '../assets/ios-b2.png'
import android from '../assets/android-b.png'

import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

export default class HomeScreen extends Component {

  state = {
    runs:[],
    health: null,
    showAlert: false
  }

  showAlert = () => {
    console.log(1)
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  async componentDidMount() {

    var run = []
    this.setState({ runs: run })
    // health ios/android
    axios.get('http://192.168.169.105:8000/api/results?run=health&platform=ios&quantity=1')
    .then(response => {
      this.setState({ health: response.data.f[0].result })

      axios.get('http://192.168.169.105:8000/api/results?run=health&platform=android&quantity=1')
      .then(response => {
        this.setState({ health: response.data.f[0].result })
      })
      .catch(error => {
        console.log(error);
      });

        //daily ios
        axios.get('http://192.168.169.105:8000/api/results?run=daily&platform=ios&quantity=1')
        .then(response => {
          var run = [...this.state.runs]
          run.push({
            id:1, name: 'Daily iOS', page: 'IOSDaily', platform: 'ios', result: response.data.f[0].result
          })
          this.setState({ runs: run })

          // daily android
          axios.get('http://192.168.169.105:8000/api/results?run=daily&platform=android&quantity=1')
          .then(response => {
            var run = [...this.state.runs]
            run.push({
              id:2, name: 'Daily Android', page: 'AndroidDaily', platform: 'android', result: response.data.f[0].result
            })
            this.setState({ runs: run })

            // hourly ios
            axios.get('http://192.168.169.105:8000/api/results?run=hourly&platform=ios&quantity=1')
            .then(response => {
              var run = [...this.state.runs]
              run.push({
                id:3, name: 'Hourly iOS', page: 'IOSHourly', platform: 'ios', result: response.data.f[0].result
              })
              this.setState({ runs: run })

                // hourly android
                axios.get('http://192.168.169.105:8000/api/results?run=hourly&platform=android&quantity=1')
                .then(response => {
                  var run = [...this.state.runs]
                  run.push({
                    id:4, name: 'Hourly Android', page: 'AndroidHourly', platform: 'android', result: response.data.f[0].result
                  })
                  this.setState({ runs: run })
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
      })
      .catch(error => {
        console.log(error);
      });
      showMessage({
        message: "Atualizado",
        description: "Dados atualizados! :)",
        type: "success",
        floating: true,
        position: "bottom",
        animationDuration: "400",
        duration: 2000
      });
    })
    
    .catch(error => {
      console.log(error);
    });
  }

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon type="FontAwesome5" name='home' style={{fontSize: 24, color: tintColor}} />
    )
  }

  render() {

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
      
        {/* HEADER */}
        <SafeAreaView  style={{backgroundColor: '#1f1f1f', height:70}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 30}}>
            <Icon style={{color: 'white', paddingLeft: 20}} name='menu' onPress={() => this.props.navigation.openDrawer()} />
            <Text style={{color: 'white', fontSize: 20, }}>Home</Text>
            <Icon style={{color: 'white', paddingRight: 15}} name='refresh' onPress={()=>this.componentDidMount()} />
          </View>
        </SafeAreaView>
      
      <View >
        {/* HEALTH TEST */}
        <Text style={{color: 'white', fontSize: 25, paddingLeft: 20, 
                        paddingTop: 10, paddingBottom: 10}}>Health</Text>

        <View style={[styles.itemHealth, {backgroundColor: this.state.health=='success'?'#2EAB3D':'#E74949'}]}> 
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 10}}>
            <View style={{  flexDirection: 'column', alignItems: 'flex-start'}}>
              <View style={{  flexDirection: 'row'}}>
                <Image source={ios} style={{width: 40, height: 50, margin: 10}}></Image>
                <Image source={android} style={{width: 40, height: 50, margin: 10}}></Image>
              </View>
              {this.state.health=='success' &&
                <Text style={styles.itemName}>YOUR APP IS OK!!!</Text> }
              {this.state.health!='success' &&
                <Text style={styles.itemName}>YOUR APP IS NOT OK!!!</Text> }
            </View>
          </View>
        </View>

        {/* DAILY AND HOURLY */}
        <Text style={{color: 'white', fontSize: 25,  paddingLeft: 20, paddingTop: 10}}>Runs</Text>

        <View style={{height: '80%'}}>
          <FlatGrid itemDimension={130} items={this.state.runs} style={styles.gridView}
            renderItem={({ item, index }) => (            
              <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate(item.page)}>
                <View style={[styles.itemContainer, { backgroundColor: item.result=='success'?'#2EAB3D':'#E74949' }]}>
                  <Image source={item.platform=='ios'?ios:android} style={{width: 40, height: 50, marginBottom: 10}}></Image>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCode}>{item.result}</Text>
                </View>
              </TouchableOpacity>
          )}/>
        </View>
      </View>
      <FlashMessage position="top" />
      
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D2D',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  gridView: {
    
  },

  itemHealth: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    margin: 10,
    marginTop: 0,
    height: 100,
  },

  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: '#E74949'
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
