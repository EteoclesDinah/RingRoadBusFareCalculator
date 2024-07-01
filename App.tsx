import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginPage from './screens/LoginAndRegister/Login';
import RegisterPage from './screens/LoginAndRegister/Register';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserScreen from './screens/UserScreen';
import DrawerContent from './DrawerContent'; // Make sure to import your DrawerContent

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const StackNav = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'lightblue',
        },
        headerTintColor: 'maroon',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <Icon
              name="menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={30}
              color="white"
            />
          ),
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="User" component={UserScreen} />

      <Stack.Screen name="LoginUser" component={LoginNav} />
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={StackNav} />
      {/* Add other drawer screens here if needed */}
    </Drawer.Navigator>
  );
};

const LoginNav = () => {
  return(
    
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Home" component={DrawerNav} />
   </Stack.Navigator>
  );
};

const App = () => {

  //for keeping user logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data,'at app.tsx');
    setIsLoggedIn(data);
  }

  useEffect(() => {

    getData();

    setTimeout(() => {
      SplashScreen.hide();
    }, 900);
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNav /> : <LoginNav />}
    </NavigationContainer>
  );
};

export default App;
