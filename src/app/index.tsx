import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Text from '@/components/ui/text'
import { Redirect } from 'expo-router';
import { Colors } from '@/constants/colors';
import { getData, storeData } from '@/utils/persistent-storage';
import { FIRST_TIME_LAUNCH } from '@/constants/key';
import { FONTS } from '@/constants/fonts';

const GetStartedScreen = () => {
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const checkFirstTimeLaunch = async () => {
      try {
        const storedData = await getData(FIRST_TIME_LAUNCH);

        if (storedData) {
          setIsFirstTime(false);
        }
      } catch (error) {
        console.error("Error checking first launch:", error);
      }
    };

    checkFirstTimeLaunch();
  }, []);

  const handleFirstTimeLaunch = async () => {
    try {
      await storeData(FIRST_TIME_LAUNCH, true);
      setIsFirstTime(false);
    } catch (error) {
      console.error("Error storing first launch data:", error);
    }
  };

  if (!isFirstTime) {
    return <Redirect href='/home' />
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/get-started.jpg')}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Newsly</Text>
        <Text style={styles.subtitle}>
          Your one-stop destination for real-time news and updates from around the globe.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleFirstTimeLaunch}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '60%'
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    height: '45%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    fontFamily: FONTS.BOLD,
    color: Colors.title,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: Colors.active,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: Colors.active,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default GetStartedScreen;
