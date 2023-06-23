import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const Tab = createBottomTabNavigator();

import Map from './Map';
import Profile from './Profile';
import Wallet from './Wallet';
import Services from './Services';
import Offers from './Offers';

var orangeColor = '#f77d0a';
const Drawer = createDrawerNavigator();
const Home = () => {
  const route = useRoute();
  const { token } = route.params;

  return (

  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarActiveTintColor: '#f77d0a',
    tabBarInactiveTintColor: 'gray',
    tabBarLabelStyle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    tabBarStyle: {
      backgroundColor: 'white',
    },
    headerStyle: {
            backgroundColor: '#F77D0A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
  })}
>
  <Tab.Screen name="Rakna" component={Map}
     initialParams={{ token: token }}
  options={{
    tabBarIcon:(focused)=>{
      return(
        <Image source={require('../assets/images/home-icon.png')}  style={styles.barIcon}   />
      )
    }
  }}
  
   />
  <Tab.Screen name="Services" component={Services}
  options={{
    tabBarIcon:(focused)=>{
      return(
        <Image source={require('../assets/images/services-icon.png')}  style={styles.barIcon}   />
      )
    }
  }}
  
   />
  <Tab.Screen name="Offers" component={Offers}
  options={{
    tabBarIcon:(focused)=>{
      return(
        <Image source={require('../assets/images/offer2-icon.png')}  style={styles.barIcon}   />
      )
    }
  }}
  
   />
  <Tab.Screen name="Profile" component={Profile} 
    initialParams={{ token: token }}
    options={{
    tabBarIcon:(focused)=>{
      return(
        <Image source={require('../assets/images/user-icon.png')}  style={styles.barIcon}   />
      )
    }
  }}
  
  />
</Tab.Navigator>
  
 

  );
};

const styles = StyleSheet.create({
  
  barIcon: {
    width: 25,
    height: 25,
  }
});


export default Home;
