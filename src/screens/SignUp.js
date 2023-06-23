import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity,Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';

import {Colors} from '../../src/constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import Buttons from '../components/Buttons'


import { useNavigation } from '@react-navigation/native';


const  SignUp = () => {

    const navigation = useNavigation();
    
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');
  const [gender, setGender] = useState('Male');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('https://rakna.site/api/user/register?', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          age: age,
          address: address,
          phone: phone,
          job: job,
          gender: gender,
          password: password,
        }),
      });
      const json = await response.json();
      console.log(json);
      // Handle success case
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      // Handle error case
      Alert.alert('Error', 'Invalid Sign up.');
    }
  };
  

    return (
        <ScrollView style={{flex:1,backgroundColor:'#fff',flexDirection:'column'}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {/* login form section */}
            <View style={{flex:2,flexDirection:'column',backgroundColor:'#fff',paddingTop:10,paddingHorizontal:'3%'}} >
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}} >
                    <Text style={{fontFamily:'OpenSans-SemiBold',fontSize:30,color:Colors.black}} >Hi</Text>
                    <Image source={require('../assets/images/waving_hand.png')} style={{width:30,height:30}}  />
                </View>
                <Text style={{fontFamily:"OpenSans-Regular",fontSize:14,paddingTop:10,color:"#777"}} >Join us now , sign up to book parking area from any location </Text>

                <View style={{flexDirection:'column',paddingTop:20}} >
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'95%',borderRadius:10,height:60,paddingLeft:20, margin:10}} >
                       
                        <TextInput  style={styles.input} placeholder="Full Name" placeholderTextColor="#818181" onChangeText={setName}  />

                    </View>
                    
                   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'95%',borderRadius:10,height:60,paddingLeft:20, marginBottom:10, margin:10}} >
                       
                       <TextInput  style={styles.input} keyboardType="email-address" placeholder="Email" placeholderTextColor="#818181"  onChangeText={setEmail}  />

                   </View>
                   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'95%',borderRadius:10,height:60,paddingLeft:20, marginBottom:10, margin:10}} >
                       
                       <TextInput  style={styles.input}   keyboardType="numeric" placeholder="Age" placeholderTextColor="#818181"  onChangeText={setAge} />

                   </View>
                   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'95%',borderRadius:10,height:60,paddingLeft:20, marginBottom:10, margin:10}} >
                       
                       <TextInput  style={styles.input} placeholder="Address" placeholderTextColor="#818181"  onChangeText={setAddress}  />

                   </View>
                   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'95%',borderRadius:10,height:60,paddingLeft:20, marginBottom:10, margin:10}} >
                       
                       <TextInput  style={styles.input} keyboardType="phone-pad" placeholder="Phone Number" placeholderTextColor="#818181"  onChangeText={setPhone}  />

                   </View>
                   
                   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'95%',borderRadius:10,height:60,paddingLeft:20, marginBottom:10, margin:10}} >
                       
                       <TextInput  style={styles.input} placeholder="Jop" placeholderTextColor="#818181"  onChangeText={setJob}  />

                   </View>

                   <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                            color="#818181"
                        >
                        <Picker.Item label="Select Gender" value="" />
                        <Picker.Item label="Male" value="Male" color='#F77D0A'/>
                        <Picker.Item label="Female" value="Female" color='#F77D0A' />
                        </Picker>
                    </View>



                    

                   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#ededed',width:'95%',borderRadius:10,height:60,paddingLeft:20, marginBottom:10, margin:10}} >
                       
                       <TextInput  style={styles.input}   placeholder="Password" placeholderTextColor="#818181"  secureTextEntry={true}  onChangeText={setPassword}/>

                   </View>



                    <View style={{margin:10, width:370}}>
                        <Buttons  btn_text={"Sign Up"}  on_press={handleRegister}/>
                    </View>

                    {/* on_press={()=>navigation.navigate("Login")}
                 */}
                </View>
            </View>

            {/* social login section */}
            <View style={{flex:2,backgroundColor:'#fff',flexDirection:'column',paddingHorizontal:'3%'}} >
                <Text style={{fontFamily:"OpenSans-Bold",textAlign:'center',marginVertical:35,color:'#818181',fontSize:20}} >Or</Text>

                <View style={{flexDirection:'column',alignItems:'center',width:'100%'}} >
                    <TouchableOpacity  onPress={()=>alert("This option will come in Next version.")} style={styles.social_btn} >
                        <Image style={styles.social_img} source={require('../assets/images/google_icon.png')} />
                        <Text style={{width:'80%',textAlign:'center',fontSize:16,fontFamily:'OpenSans-Medium'}} >Sign up with Google </Text>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>alert("This option will come in Next version.")} style={styles.social_btn} >
                        <Image style={styles.social_img} source={require('../assets/images/facebook_icon.png')} />
                        <Text style={{width:'80%',textAlign:'center',fontSize:16,fontFamily:'OpenSans-Medium'}} >Sign up with Facebook </Text>
                    </TouchableOpacity>
                </View>

                 


            </View>
            
        </ScrollView>
    )
}

export default SignUp;

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
    },
    pickerContainer: {
        backgroundColor: '#ededed',
        borderRadius: 10,
        height: 60,
        justifyContent: 'center',
        marginBottom: 10,
        marginHorizontal: 10,
        paddingLeft:40,
        color:'#818181',

      },



      

})
