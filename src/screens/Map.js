import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image,TouchableOpacity, Alert} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SearchBar from '../components/SearchBar';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';



export default function Map() {

  const route = useRoute();
  const { token } = route.params;

  const navigation = useNavigation();

  const [regions, setRegions] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [parkings, setParkings] = useState();
  const [CarPlate, setCarPlate] = useState(null);

  const [qrCode, setQrCode] = useState('');
  const [allcars , setAllCars]= useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [allCarsId, setAllCarsId] = useState(null);
  const [allCars_plate, setAllCars_plate] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  // for car part open and close 
 


  const headers = {
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    // Make the request to the API
    fetch('https://rakna.site/api/user/all-parkings', {
      method: 'GET',
      headers: headers,
    })
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError('The response is not valid JSON.');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data
        setParkings(data.parkings);
        setLatitude(data.parkings.latitude);
        setLongitude(data.parkings.longitude);
      })
      .catch((error) => {
        // Handle any errors that occur
        console.error(error);
      });
  }, []);

  const [region, setRegion] = useState({
    latitude: 30.0444,
    longitude: 31.2357,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [selectedPark, setSelectedPark] = useState(null);

  const handleMarkerPress = (park) => {
    setSelectedPark(park);
  };

  const handleConfirmation = () => {
    // Do something with selected park
    setSelectedPark(null); // Hide the box
  };
  const [uid, setUid] = useState(null);
  const reserve = () => {

    async function makeReservation() {
      //make reservation
      const now = new Date();
      const formattedStartTime = now.toISOString();
      try {
        const url = `https://rakna.site/api/user/make-reservation?parking_id=${selectedPark.id}&car_id=${selectedCar}&start_time=${formattedStartTime}&price_per_hour=${ selectedPark.price_per_hour}`;
        const options = {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        
    
        const response = await fetch(url, options);
        const data = await response.json();
    
        console.log(data);
        if (data.reservation && data.reservation.uid) {
          setUid(data.reservation.uid);
        }
        if(!selectedCar){
          Alert.alert('Error' ,'Please Select one Car  .');
        }
        return data;
      
        return data;
      } catch (error) {
        console.error(error);
        Alert.alert('Error' ,'Failed to make reservation.');
        throw new Error('Failed to make reservation.');
      }
    }
     //cancle reservation 

     async function CancleReservation() {
      //make reservation
      try {
        const url = `https://rakna.site/api/user/cancel-reservation?uid=${uid}`;
        const options = {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
    
        const response = await fetch(url, options);
        const data = await response.json();
    
        console.log(data);
      
          setUid(null);
        return data;
      
        return data;
      } catch (error) {
        console.error(error);
        Alert.alert('Error' ,'Failed to cancle reservation.');
        throw new Error('Failed to make reservation.');
      }
    }

    return (
      <>
        <View style={styles.box} >
          <Text style={styles.input2}>Park Now in easy way !</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedPark(null)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{selectedPark.name}</Text>
          <Text style={styles.title}>Price per hour = {selectedPark.price_per_hour} EGP</Text>
          {!uid && (
            <TouchableOpacity
              style={styles.buttonContainerconfirm}
              onPress={makeReservation}
            >
            
              <Text style={styles.buttonText}>Confirm Reservation</Text>
            </TouchableOpacity>
            )}   
            {uid && (
            <TouchableOpacity
              style={styles.buttonContainerconfirm}
              onPress={CancleReservation}
            >
            
              <Text style={styles.buttonText}>Cancle Reservation</Text>
            </TouchableOpacity>
            )}        

        </View>
   
  {uid && (
    <View style={{ alignItems: 'center' , marginBottom:10}}>
      <QRCode
        value={uid}
        size={140}
        color="#000"
        backgroundColor="#F77D0A"
      />
    </View>
  )}




      </>
    );
           
  }
  //get car data 
  async function getCarData() {
    try {
      const response = await fetch('https://rakna.site/api/user/car-data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      const data = await response.json();
      setAllCars(data);
  
      // Extract the car IDs
      setAllCarsId (data.cars.map(car => car.id));
      setAllCars_plate(data.cars.map(car => car.plat_number));
  
      // Print the car IDs
      // console.log(JSON.stringify(carIds));
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch car data.');
    }
  }
  
  useEffect(() => {
    getCarData(token);
  }, []);
  




  return (
    <>
  {/* <TouchableOpacity
  onPress={()=>{console.log(selectedCar)}}>
  <Text>Test</Text>
  </TouchableOpacity> */}

           <TouchableOpacity
  style={styles.toggleButton}
  onPress={() => setIsVisible(!isVisible)}
>
  <Text style={styles.toggleButtonText}>
    {isVisible ? "Hide" : "Your cars"} 
  </Text>

</TouchableOpacity>

{isVisible && (
      <View style={styles.addCarContainer}>
  <Text style={styles.title}>Add a new car</Text>
  <View style={styles.inputContainer2}>
    <TextInput
      style={styles.input}
      placeholder="Enter car plate"
      onChangeText={setCarPlate}
    />
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={async () => {
        try {
          const response = await fetch(`https://rakna.site/api/user/add-car?plat_number=${CarPlate}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          const data = await response.json();
          console.log(data); // do something with the response data
          Alert.alert('Welcome', 'car added successfuly.');
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'car not added.');
        }
      }}
    >
      <Text style={styles.buttonText}>Add car</Text>
    </TouchableOpacity>

  </View>
  <View style={styles.pickerContainer}>
  <Picker
 selectedValue={selectedCar}
  onValueChange={(itemValue, itemIndex) => setSelectedCar(itemValue)}
>
  <Picker.Item label="Select Car" value="" />
  {allcars.cars.map(car => (
    <Picker.Item key={car.id} label={car.plat_number} value={car.id.toString()} />
  ))}
</Picker>


                    </View>
</View>
)}

      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          {parkings &&
            Object.keys(parkings).map((key) => (
              <Marker
                onPress={() => handleMarkerPress(parkings[key])}
                key={key}
                coordinate={{
                  latitude: parseFloat(parkings[key].latitude),
                  longitude: parseFloat(parkings[key].longitude),
                }}
              >
                <Image
                  source={require('../assets/images/location.png')}
                  style={{ height: 35, width: 35 }}
                />
              </Marker>
            ))}
        </MapView>

        {selectedPark && reserve()}

      </View>
    </>
 

  );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCarContainer:{
    padding:5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height:50, 
    width:300,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 15,
  },
  buttonContainer: {
    borderRadius: 5,
    backgroundColor: '#F77D0A',
    padding: 10,
    marginLeft:5,
    width:100,
  },
  buttonContainerconfirm:{
    borderRadius: 5,
    backgroundColor: '#F77D0A',
    padding: 10,
    marginLeft:5,

  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    paddingHorizontal: 20,
    marginVertical: 20,

  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:20 ,
  },
  input2: {
    fontSize:24,
    marginBottom:60,
    borderColor: 'gray',
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F2',
    padding:20,

  },
  toggleButton: {
    backgroundColor: '#000',
    padding: 10,
    // borderRadius: 5,
    // marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize:18,
    fontWeight: 'bold',
  },
  buttonTextConfirmation:{

  },

});
