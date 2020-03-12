import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import { Header, Left, Right, Icon, Body, Title } from 'native-base'
import axios from 'axios';
import { SafeAreaView } from 'react-navigation';
import { PieChart } from 'react-native-svg-charts'
import { Text as SvgText} from 'react-native-svg'

export default class IOSDailyScreen extends Component {

  componentDidMount() {
    axios.get('http://192.168.169.104:8000/api/results?run=daily&platform=ios&quantity=5')
    .then(response => {
      this.setState({ runs: response.data.f })

      let ok = 0
      let err = 0

      for (let index = 0; index < response.data.f.length; index++) {
        if(response.data.f[index].result=='fail'){
          err = err + 1
        } else {
          ok  = ok + 1
        }

        this.setState({ ok })
        this.setState({ err })

      }

    })
    .catch(error => {
      console.log(error);
    });
  }

  state = {
    runs:[],
    errors: [],
    ok: 0,
    err: 0
  }

  static navigationOptions = {
    drawerIcon: ({tintColor}) => (
      <Icon type="FontAwesome5" name='cloud-sun' style={{fontSize: 24, color: tintColor}} />
    )
  }

  render() {

    let data = [
      {
        key: 1,
        amount: this.state.ok,
        svg: { fill: 'green' },
      },
      {
          key: 2,
          amount: this.state.err,
          svg: { fill: 'red' }
      },
    ]
 
    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
          const { labelCentroid, pieCentroid, data } = slice;
          return (
              <SvgText
                  key={index}
                  x={pieCentroid[ 0 ]}
                  y={pieCentroid[ 1 ]}
                  fill={'white'}
                  textAnchor={'middle'}
                  alignmentBaseline={'middle'}
                  fontSize={24}
                  stroke={'black'}
                  strokeWidth={0.2}
              >
                {data.amount > 0
                ?data.amount:` `}
                  
              </SvgText>
          )
      })
  }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <SafeAreaView  style={{backgroundColor: '#1f1f1f', height: 75}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 35}}>
            <Icon style={{color: 'white', paddingLeft: 20}} name='menu' onPress={() => this.props.navigation.openDrawer()} />
            <Text style={{color: 'white', fontSize: 20, paddingLeft: '8%'}}>Daily iOS</Text>
          </View>
        </SafeAreaView>
    
        <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>        
         
          <FlatList style={{ width: '97%'}}
                      data={this.state.runs}
                      keyExtractor={item => item.build_number.toString()}
                      renderItem={({ item }) => 
        
            <View style={{ width: '75%', height: 40, margin: 8, marginLeft: '12%',
                      backgroundColor: '#474747', flexDirection: 'row',
                      shadowColor: 'black',shadowOffset: { width: 1, height: 1 },
                      shadowOpacity: 0.5, shadowRadius: 4, }}> 

              <View style={{ backgroundColor: item.result == 'success'? 'green': 'red', width: 15,}}></View>
              <Text style={{color: 'white', padding: 10, fontSize: 20}}>#{item.build_number}</Text>  
              <Text style={{color: 'white', fontSize: 15,  padding: 10, fontWeight: 'bold',}}>{item.result}</Text> 
              <Text style={{color: 'white', fontSize: 15, padding: 10}}>{item.date}</Text>  
            </View> 
          }/>  

        </View>

        {/* <PieChart style={ { height: 200, margin: 30 } } data={ pieData } > <Labels/> </PieChart> */}
        
        <View style={{margin:20}}>
          <PieChart
            style={{ height: 200 }}
            valueAccessor={({ item }) => item.amount}
            data={data}
            spacing={0}
            outerRadius={'95%'} >
            <Labels/>
          </PieChart>
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

