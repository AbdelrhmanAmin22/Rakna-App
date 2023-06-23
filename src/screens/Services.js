
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Text, Image } from 'react-native';



const Services= ({navigation}) => {

    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/images/underground-parking.jpg')} style={styles.headerImage} />
          <Text style={styles.headerText}>Our Services</Text>
        </View>
        <View style={styles.services}>
          <View style={styles.service}>
            <Image  source={require('../assets/images/parking-icon.png')} style={styles.serviceImage} />
            <Text style={styles.serviceText}>Get parking area </Text>
          </View>
          <View style={styles.service}>
            <Image source={require('../assets/images/payment.png')}   style={styles.serviceImage} />
            <Text style={styles.serviceText}>Easy Payment </Text>
          </View>
          <View style={styles.service}>
            <Image source={require('../assets/images/parking-space.jpg')} style={styles.serviceImage} />
            <Text style={styles.serviceText}>Easy Enter and Out</Text>
          </View>
          <View style={styles.service}>
            <Image source={require('../assets/images/save.jpg')} style={styles.serviceImage} />
            <Text style={styles.serviceText}>Monthly and weekly Reservation</Text>
          </View>
        </View>
      </View>

    );
}

export default  Services;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F0f0f2',
  },
  header: {
    height: 150,
    backgroundColor: '#F0f0f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    width: 300,
    height: 100,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  service: {
    width: '48%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});



