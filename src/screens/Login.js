import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Alert } from 'react-native'
import {Colors} from '../../src/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import Buttons from '../components/Buttons'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Profile from './Profile'






const Login = ({navigation }) => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    // const navigation = useNavigation();
    const [token, setToken] = useState();
  
    const handleLogin = async () => {
        try {
          const response = await axios.post('https://rakna.site/api/user/login?', formData);
          console.log('Response data:', response.data);
          const token = response.data.user.token;
          setToken(token);
          navigation.navigate('Home', { token });
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Invalid email or password. Please try again.');
        }
      };
      
    useEffect(() => {
        console.log('user token:', token);
      }, [token]);



    



    return (
        <ScrollView style={{flex:1,backgroundColor:'#fff',flexDirection:'column'}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {/* login form section */}
            <View style={{flex:2,flexDirection:'column',backgroundColor:'#fff',paddingTop:10,paddingHorizontal:'3%'}} >
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}} >
                    <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:30,color:Colors.black}} >Welcome Back</Text>
                    <Image source={require('../assets/images/waving_hand.png')} style={{width:30,height:30}}  />
                </View>
                <Text style={{fontFamily:"OpenSans-Regular",fontSize:14,paddingTop:10,color:"#777"}} >I am happy to see you again. You can continue where you left off by logging in</Text>

                <View style={{flexDirection:'column',paddingTop:20}} >
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'95%',borderRadius:10,height:60,paddingLeft:20}} >
                       
                        <TextInput onChangeText={(text) => { setFormData((prevState) => ({ ...prevState, email: text })) }} style={styles.input} placeholder="Enter Email" placeholderTextColor="#818181" />

                    </View>

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'95%',borderRadius:10,height:60,paddingLeft:20,marginTop:20}} >

                        <TextInput onChangeText={(text) => { setFormData((prevState) => ({ ...prevState, password: text })) }}  style={styles.input} placeholder="Enter Password" secureTextEntry={true} placeholderTextColor="#818181" />
                    </View>

                    <View style={{width:'95%',marginBottom:10}} >
                        <Text style={{fontSize:17,fontFamily:'OpenSans-SemiBold',
                    color:'#818181',alignSelf:'flex-end',paddingTop:10}} >Forgot Password?</Text>
                    </View>

       

                    <Buttons btn_text={"Sign In"}  on_press={ handleLogin } />


                </View>
            </View>

            {/* social login section */}
            <View style={{flex:2,backgroundColor:'#fff',flexDirection:'column',paddingHorizontal:'3%'}} >
                <Text style={{fontFamily:"OpenSans-Bold",textAlign:'center',marginVertical:35,color:'#818181',fontSize:20}} >Or</Text>

                <View style={{flexDirection:'column',alignItems:'center',width:'95%'}} >
                    <TouchableOpacity  onPress={()=>alert("This option will come in Next version.")} style={styles.social_btn} >
                        <Image style={styles.social_img} source={require('../assets/images/google_icon.png')} />
                        <Text style={{width:'80%',textAlign:'center',fontSize:16,fontFamily:'OpenSans-Medium'}} >Sign in with Google </Text>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>alert("This option will come in Next version.")} style={styles.social_btn} >
                        <Image style={styles.social_img} source={require('../assets/images/facebook_icon.png')} />
                        <Text style={{width:'80%',textAlign:'center',fontSize:16,fontFamily:'OpenSans-Medium'}} >Sign in with Facebook </Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'flex-end',backgroundColor:'#fff',marginBottom:40}} >
                    <Text style={{fontFamily:'OpenSans-Medium',fontSize:17,color:'#818181'}} >Don't have a account? </Text>
                    <Text style={{fontSize:18,fontFamily:'OpenSans-SemiBold',color:'#333'}}
                      onPress={()=>navigation.navigate("SignUp")} >

                     Sign Up</Text>
         
                </View>
                 


            </View>
            
        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    input:{
        position:'relative',
        height:'100%',
        width:'90%',
        fontFamily:'OpenSans-Medium',
        paddingLeft:20,
    },
    social_btn:{
        height:55,
        width:'100%',
        borderWidth:1,
        borderRadius:10,
        borderColor:'#ddd',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20
    },
    social_img:{
        width:25,
        height:25,
        marginLeft:15
    }
})
