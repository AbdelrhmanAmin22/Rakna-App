import React from 'react'
import { StyleSheet, Text, View,StatusBar,Image } from 'react-native'
import {Colors} from '../../src/constants'


const Splash = ({navigation}) => {

    setTimeout(()=>{
        navigation.replace('Onboarding')
    },1000)
    return (
        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#F77D0A'}} >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#465bd8" />
            {/* <Image source={require('../assets/images/rakna.png')} style={{width:200,height:200}}  />     */}
            <Text style={{fontFamily:'OpenSans-Bold',fontSize:82,color:Colors.white, marginTop:50}} >Rakna</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({})
