import { Text,
        View,
        StyleSheet,
        Button,
    } from "react-native";


function HomeScreen (props) {
    console.log(props);
   return (
       <View >
           <Text>ProfileScreen</Text>
           <Button 
                title="User" 
                onPress={()=> props.navigation.navigate("User")} 
            />
           </View>
   );
}

export default HomeScreen;