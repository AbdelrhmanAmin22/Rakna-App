import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Offers = () => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Special Offers</Text>
        <View style={styles.offer}>
          <Text style={styles.offerTitle}>Book First Time Free!</Text>
          <Text style={styles.offerDescription}>For first Time , Book for free by using Promo code FirstRakna </Text>
        </View>
        <View style={styles.offer}>
          <Text style={styles.offerTitle}>25% discount for first Weekly or Monthly Reservation!</Text>
          <Text style={styles.offerDescription}>For Weekly or Monthly Reservation , Book now with 25% discount by using Promo code FirstRe25 </Text>
        </View>
        <View style={styles.offer}>
          <Text style={styles.offerTitle}>Great offer !</Text>
          <Text style={styles.offerDescription}>Coming soon!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F0f0f2'
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    textShadowColor: 'rgba(0 ,0, 0, 0.3)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  offer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  offerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  offerDescription: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
  },
});

export default Offers;
