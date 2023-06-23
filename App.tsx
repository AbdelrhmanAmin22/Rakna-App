import React from 'react';
import {View,Text} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Splash,Onboarding,Login} from './src/screens'
import { NavigationContainer } from '@react-navigation/native';
// import Main from './src/screens/Home';
import Home from './src/screens/Home';
import SignUp from './src/screens/SignUp';
import Profile from './src/screens/Profile';

const Stack = createNativeStackNavigator();
const App = ()=>{
  return (
          <NavigationContainer>


             <Stack.Navigator screenOptions={{headerShown:false}} >
         
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="SignUp" component={SignUp} />
     

            </Stack.Navigator> 
   
          </NavigationContainer>
  );
}

export default App