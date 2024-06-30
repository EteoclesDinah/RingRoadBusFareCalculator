
import'react-native-gesture-handler';

import React from 'react';

import { Text } from "react-native";

import { 
  NavigationContainer,
  useNavigation,
  DrawerActions,
 } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Icon } from 'react-native-paper';
import DrawerContent from './DrawerContent';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';

import LoginPage from './screens/LoginAndRegister/Login';
import RegisterPage from './screens/LoginAndRegister/Register';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserScreen from './screens/UserScreen';



const StackNav=() => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return(
      <Stack.Navigator 
        //initialRouteName="Home" 
        screenOptions={{
          statusBarColor:'blue',
          headerStyle: {
            backgroundColor: 'lightblue',
          },
          headerTintColor: 'maroon',
          headerTitleAlign: "center",
          
        }}>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            headerLeft: () => {
              return(
                <Icon 
                  name= "menu"
                  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                  size={30}
                  color='white'
                />
              );
            },
          }}  
          
          />

        <Stack.Screen 
          name="Profile" c
          omponent={ProfileScreen} 
          />

        <Stack.Screen 
          name="User" 
          component={UserScreen}
           />
      </Stack.Navigator>

  );
}

const DrawerNav=() =>{
  const Drawer = createDrawerNavigator();

  return(
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
        <Drawer.Screen name="Home" component={StackNav} />
        
      </Drawer.Navigator>
  );
}

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 900);
  }, []);
  const Stack = createNativeStackNavigator();

  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );


}

export default App;


/*
import'react-native-gesture-handler';

import React from 'react';

import { Text } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserScreen from './screens/UserScreen';

const StackNav=() => {
  const Stack = createNativeStackNavigator();

  return(
    <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
          statusBarColor:'blue',
          headerStyle: {
            backgroundColor: 'lightblue',
          },
          headerTintColor: 'maroon',
          headerTitleAlign: "center",
          
        }}>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          
          />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen 
          name="User" 
          component={UserScreen}
           />
      </Stack.Navigator>
  );
}


function App() {
  

  return(
    <NavigationContainer>
      
      <StackNav />


    </NavigationContainer>
  );


}

export default App;
*/
