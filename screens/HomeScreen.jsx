/*
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TouchableOpacity,
    Image,
    BackHandler,
    Alert,
    Picker,
  } from 'react-native';
  import React from 'react';
  import {Avatar} from 'react-native-paper';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import Check from 'react-native-vector-icons/Feather';
  import Back from 'react-native-vector-icons/Ionicons';
  import Gender from 'react-native-vector-icons/Foundation';
  import Mobile from 'react-native-vector-icons/Entypo';
  import Error from 'react-native-vector-icons/MaterialIcons';
  import Email from 'react-native-vector-icons/MaterialCommunityIcons';
  import Profession from 'react-native-vector-icons/AntDesign';
  import {DrawerActions, useNavigation} from '@react-navigation/native';
  import {useEffect, useState} from 'react';
  import axios from 'axios';
  //import AsyncStorage from '@react-native-async-storage/async-storage';
  import {useFocusEffect} from '@react-navigation/native';
  //import Toast from 'react-native-toast-message';
  
  function HomeScreen(props) {
    const navigation = useNavigation();
    console.log(props);
    const [userData, setUserData] = useState('');
  
    async function getData() {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      axios
        .post('http://192.168.1.70:5001/userdata', {token: token})
        .then(res => {
          console.log(res.data);
          setUserData(res.data.data);
        });
    }
  
    //alert box whn clicking back button
    
    const handleBackPress = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };
  
    useFocusEffect(
      React.useCallback(() => {
        getData();
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
      },[]),
    );
  
    useEffect(() => {
     
    }, []);

    
    
  
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{position: 'relative'}}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}>
              <Mobile name="menu" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => {
                navigation.navigate('UpdateProfile', {data: userData});
              }}>
              <Icon name="user-edit" size={24} color={'white'} />
            </TouchableOpacity>
            <Image
              width={100}
              height={60}
              resizeMode="contain"
              style={{
                marginTop: -250,
              }}
              source={require('../assets/wave.png')}
            />
          </View>
          
          <View style={{alignItems: 'center'}}>
            <Avatar.Image
              size={180}
              style={styles.avatar}
              source={{
                uri:userData==""||userData==null?
                
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC'
              :userData.image
              }}
            />
          </View>
  
          
  
          
        </View>
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    editIcon: {
      zIndex: 1,
      color: 'white',
      position: 'absolute',
      right: 2,
      margin: 15,
    },
    backIcon: {
      zIndex: 1,
      color: 'white',
      position: 'absolute',
      left: 2,
      margin: 15,
    },
    avatar: {
      borderRadius:100,
      marginTop: -200,
      // marginLeft: 105,
      backgroundColor: 'white',
      height: 100,
      width: 100,
      padding: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      elevation: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
  
  });
  export default HomeScreen;
 */



import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Mobile from 'react-native-vector-icons/Entypo';
import { DrawerActions, useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const options = [
  { label: 'Balkhu', value: '0' },
  { label: 'Sanepa', value: '346' },
  { label: 'Sanepa Height', value: '701' },
  { label: 'Nayabato', value: '1016' },
  { label: 'Dhobighat', value: '1331' },
  { label: 'Nakhu Dobato', value: '1751' },
  { label: 'Ekantakuna', value: '2057' },
  { label: 'Kusunti', value: '2543' },
  { label: 'Thasikhel', value: '2714' },
  { label: 'Mahalaxmisthan Patan', value: '3207' },
  { label: 'Satdobato', value: '4092' },
  { label: 'BNB', value: '4847' },
  { label: 'Gwarko', value: '5235' },
  { label: 'Kharibot', value: '5885' },
  { label: 'Balkumari', value: '6485' },
  { label: 'Bhatbhateni Koteshwor', value: '7160' },
  { label: 'Koteshwor', value: '7485' },
  { label: 'Tinkune Ringroad', value: '8440' },
  { label: 'Sinamangal', value: '9340' },
  { label: 'Airport', value: '9965' },
  { label: '1.Airport-Gaushala', value: '10830' },
  { label: 'Gaushala', value: '11430' },
  { label: 'Jayabageswori', value: '11805' },
  { label: 'Mitrapark', value: '12140' },
  { label: 'Chabahil', value: '12595' },
  { label: 'Gopikrishna', value: '13120' },
  { label: 'Sukedhara', value: '13920' },
  { label: 'Dhumbarahi', value: '14275' },
  { label: 'Chappal Karkhana', value: '14645' },
  { label: 'Narayangopal Chowk', value: '15443' },
  { label: 'Basundhara', value: '15950' },
  { label: 'Talim Kendra', value: '17250' },
  { label: 'Samakhusi', value: '17665' },
  { label: 'Gongabu', value: '18015' },
  { label: 'Naya Buspark', value: '18535' },
  { label: 'Machhapokhari', value: '18905' },
  { label: 'Balaju', value: '19795' },
  { label: 'Banasthali', value: '20530' },
  { label: 'Dhungedhara', value: '20880' },
  { label: 'Sano Bharyang', value: '21495' },
  { label: 'Thulo Bharyang', value: '21755' },
  { label: 'Swayambhu', value: '22335' },
  { label: 'Sitapaila', value: '23245' },
  { label: 'Bafal', value: '23605' },
  { label: 'Kalanki', value: '25105' },
  { label: 'Khasibazar Kalanki', value: '25815' },
  { label: 'Sita Pump', value: '26075' },
  { label: 'Balkhu', value: '27325' },
];

function HomeScreen(props) {
  const navigation = useNavigation();
  const [userData, setUserData] = useState('');

  const [origin, setOrigin] = useState(options[0].value);
  const [destination, setDestination] = useState(options[1].value);
  const [group, setGroup] = useState('');

  const [fare, setFare] = useState(0); // Added state variable for displaying fare
  const [totalDistance, setTotalDistance] = useState(0); // State variable for total distance

  async function getData() {
    const token = await AsyncStorage.getItem('token');
    axios
      .post('http://192.168.1.70:5001/userdata', { token: token })
      .then(res => {
        setUserData(res.data.data);
      });
  }

  const handleBackPress = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [])
  );

  const calculateFare = () => {
    const selectedValue1 = parseFloat(origin);
    const selectedValue2 = parseFloat(destination);
    //const subtractedResult = selectedValue1 - selectedValue2;
    //const subtractedResultText = subtractedResult < 0 ? subtractedResult.toString().substring(1) : subtractedResult.toString();
    const subtractedResult = Math.abs(selectedValue1 - selectedValue2); // Absolute difference for distance
    setTotalDistance(subtractedResult); // Set total distance


    let displayValue = 0;
    if (subtractedResult >= 0 && subtractedResult <= 5000) {
      displayValue = 20;
    } else if (subtractedResult <= 10000) {
      displayValue = 25;
    } else if (subtractedResult <= 15000) {
      displayValue = 30;
    } else if (subtractedResult <= 20000) {
      displayValue = 33;
    } else if (subtractedResult <= 25000) {
      displayValue = 35;
    } else {
      displayValue = 40; // Default value
    }

    if (group === 'student') {
      displayValue *= 0.85; // 15% discount for students
    } else if (group === 'aged') {
      displayValue *= 0.8; // 20% discount for aged
    }


    setFare(displayValue.toFixed(2));

    {fare > 0 && (
      <View style={styles.fareContainer}>
        <Text style={styles.fareLabel}>Bus Fare:</Text>
        <Text style={styles.fareAmount}>Rs {fare}</Text>
      </View>
    )}
    

    //alert(`Total Distance: ${subtractedResult} m\nBus Fare: Rs ${displayValue.toFixed(2)}`);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <Mobile name="menu" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => {
              navigation.navigate('UpdateProfile', { data: userData });
            }}>
            <Icon name="user-edit" size={24} color={'white'} />
          </TouchableOpacity>
          <Image
            width={100}
            height={60}
            resizeMode="contain"
            style={{
              marginTop: -300,
            }}
            source={require('../assets/wave.png')}
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Avatar.Image
            size={150}
            style={styles.avatar}
            source={{
              uri: userData == "" || userData == null ?
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJvA8ysbmf9vOGFvwDhLsNm9oAhz8rPBMwP1u4hVqEDtwBaAKd3P8uObqOCkHgRd0ZBaiZC7BCB3CHvQ2Vwi4K0G1WwCE7gjTzWPhg0n5W8FMEIAd5+xik4BsgAbwXmDhJwHY/Aw5N+IUEHCnvgaPDkBdEUKdQAKdPn1+UnwjTwCiDJvaVtbAPccLbD3p+AKVb8PoK+MAoSPK5APNT7++OTGq9G1V+yA8KHz5QAQCdTpk/x2Va5yrwA/otgx3sq+BzQkXAo8DLy1VtyYUX7JhTL4AiglvG4ArfPgArbhoAkhtMJvPb4AorX/jRZ1EHElsR5Cy8EdZbFQ8zq6PBnVi2ZLPw1VE1MPK7ONVMX0J7DDVAAyLs+7mMQF0ANvsan8Gn7obCvgM8LKbQIWHA7kp+pGEuZ59yS/rAVMIb0APuUPhWzQyt7n/L0DL/HWAqZtJ4O/+2pWYPA6tBXddr5OfHL3UlF4nZA8F+ydKjLC+DPQEjPrKP3qW7gbW/q5dsHbOsjlgZXASUnWxr78l9H7tHoH/MUSseblpl1Z0/njZ/hzQYX75G5p2tf91sBjTcKHxnsRFLhYOCi6tyJ8ayPAyY1uoAWWn0hUyOD+Y2/n4AW+LQ5OaMfPgfwr1tkCbQMCiE/9aZMBuxoIOgoe8h43AZ+rO5g3QNLx64iHPBbmDeA7j/e6AGxNkBoZ1g3wMiG6DLQ1BqBmuRj/AWm4Eo1gQAvlww0A9WNsJl0bwgMBHgthdNrIG+PFy5g3uRMuDPAUs4PSf4fsR7g5+BhxPLDqXCDYd1mP8Db2+kOoF0mHEUD8/kXYGj1VtY0GvE++ZWZGH7T2BrALuDtBxAUPPNTPAUs3KgnULfQD7nPTfAUs+v8T0CGg/Y/05GLIAWtMzQw/tMB+wYXl9A3AD5U0seibYDUz1cQRHkWFSjxOZ1/A2BLnW4/0D4A1zT0PB6hX8Khf1CwTZonWG/fk4gFA0vpbQLWDRQOktaI9m8ZRoEBjU9ANgYvM5PMlbvgy9gI9s5+bNC+nH9hoX34T0p+8CMRdazdpgvYDzQ4vQMgxRWsbeAKst+8lfXt7Mz/PhuZgh9BzXZ1uIbQE29CdWL1AvNDkZ0E2qrFXUoLU0UtYG3IjrTOWAPoBvObkVEKrQ7KwNOgR67+Qp8XBDLmfv8AmgP95TUbBRnWAa1E5xOYXer8XyHkBtEOCeBrWI14LX4frcQ0tR7bWD3ZrsmndgD/JzMrN4DJ1vM2NYhfICbSW9g/XUNrIMuDdUb4s/m/NHoIOtJr4/7s5GYAp1TWzEMvTOQPG7oALvRfbtgDbQDlc9yX0EF+0JmwCrfzGzpAB5AZ6Lf+5Xzhr/ohL2DF4mFvTzQrYPc8FkAb3jmwnYxC7Zs40A95X8nlniHQE1hymSP7C8MB74U4p95Tv7OZ4z3H6JlgzTseUAKfPb09c1yBxNuvSPw2QZ/lkAq8ruRfUyDduzYQl+hq/8iQP/bkns2AGf/4WTh5T8AfUpU4P/1+y0AAAAASUVORK5CYII=' :
                userData.profilepic
            }}
          />
          <Text style={{ fontSize: 20 }}>{userData.username}</Text>
          <Text>{userData.email}</Text>
        </View>




        <View style={styles.container}>
          <Text style={styles.label}>Origin:</Text>
          <Picker
            selectedValue={origin}
            style={styles.picker}
            onValueChange={(itemValue) => setOrigin(itemValue)}
          >
            {options.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>

          <Text style={styles.label}>Destination:</Text>
          <Picker
            selectedValue={destination}
            style={styles.picker}
            onValueChange={(itemValue) => setDestination(itemValue)}
          >
            {options.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>

          <Text style={styles.label}>Group:</Text>
          <Picker
            selectedValue={group}
            style={styles.picker}
            onValueChange={(itemValue) => setGroup(itemValue)}
          >
            <Picker.Item label="Select Group" value="" />
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Aged" value="aged" />
          </Picker>

          <Button title="Calculate Fare" onPress={calculateFare} />

          {fare > 0 && (
            <View style={styles.fareContainer}>
              <Text style={styles.fareLabel}>Bus Fare:</Text>
              <Text style={styles.fareAmount}>Rs {fare}</Text>
            </View>
          )}

          {totalDistance > 0 && (
            <View style={styles.fareContainer}>
              <Text style={styles.fareLabel}>Total Distance:</Text>
              <Text style={styles.fareAmount}>{totalDistance} meters</Text>
            </View>
          )}

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginLeft: 10,
  },
  fareContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  fareLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  fareAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
    color: 'purple',
  },
  backIcon: {
    position: 'absolute',
    top: 60,
    left: 30,
  },
  editIcon: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
  avatar: {
    marginTop: -170,
  },
});

export default HomeScreen;
