import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, PermissionsAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';




const Stack = createNativeStackNavigator();

const Profile = () => {
  const route = useRoute();
  const { token } = route.params;

  const navigation = useNavigation();
  const [userData, setUserData] =useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone,setPhone] = useState();
  const [source, setSource] = useState(null); // added this line


  const getProfileData = async () => {
    try {
      const response = await fetch(`https://rakna.site/api/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      // console.log(data); // do something with the response data
      setUserData(data);
      setName(data.user.name);
      setEmail(data.user.email);
      setPhone(data.user.phone);

    } catch (error) {
      console.error(error);
  
    }
  }
  
  getProfileData();

  const defaultImage = require('../assets/images/default-avatar.jpg');

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo' },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can use the `response.uri` property to display the selected image
          // or upload it to your server
          const source = { uri: response.uri };
          // Do something with the selected image
          setSource(source); // added this line
        }
      },
    );
  };
  




  return (
    <>

        <View style={styles.lcontainer}>
          <View style={styles.avatarContainer}>
          <TouchableOpacity  >
          {source ? (
            <Image source={{ uri: source}} style={styles.avatar} />
          ) : (
            <Image source={defaultImage} style={styles.avatar} />
          )}


          </TouchableOpacity>

            <Text style={styles.name}>{name}</Text>
            {/* <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => console.log({userData})}>
              <Text style={styles.uploadButtonText}>Add</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>{phone}</Text>
          </View>
        </View>



    <View style={styles.optionContainer}>
    
        <View style={styles.option}>

      
        <TouchableOpacity onPress={()=>alert("Coming Sooon !.")}>
            <View style={styles.container}>
            <Image source={require('../assets/images/wallet-icon.png')}  style={styles.barIcon}   />
            <Text style={styles.optionText}>Wallet</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>alert("No Message To show.")}>
        <View style={styles.container}>
        <Image source={require('../assets/images/email-icon.png')}  style={styles.barIcon}   />
        <Text style={styles.optionText}>Message</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=>alert("Coming Sooon !.")}>
        <View style={styles.container}>
        <Image source={require('../assets/images/updated.-icon.png')}  style={styles.barIcon}   />
        <Text style={styles.optionText}>Update Profile Info</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=>alert("Coming Sooon !.")} >
        <View style={styles.container}>
        <Image source={require('../assets/images/delete-icon.png')}  style={styles.barIcon}   />
        <Text style={styles.optionText}>Delete Account </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>  navigation.navigate("Splash")}>
      <View style={styles.container}>
        <Image source={require('../assets/images/logout-icon.png')} style={styles.barIcon} />
        <Text style={styles.logOut}>Logout</Text>
      </View>
    </TouchableOpacity>
 
        </View>
    </View>

    
   </>
  );
};

const styles = StyleSheet.create({
  lcontainer: {
    flex: 1,
    padding: 16,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    marginTop:10,
  },
  button: {
    backgroundColor: '#f77d0a',
    borderRadius: 5,
    padding: 20,
    width:150,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom:150,
  },
  option: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logOut:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'#E40F00',

  },
  barIcon: {
    marginRight:20,
    width: 25,
    height: 25,
  },
  uploadButton: {
    backgroundColor: '#F77D0A',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
  
});

export default Profile;
