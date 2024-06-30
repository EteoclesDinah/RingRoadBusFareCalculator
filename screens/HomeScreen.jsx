import { Text,
     View,
     StyleSheet,
     Button,
     } from "react-native";


function HomeScreen (props) {
    console.log(props);


    return (
        <View >
            <Text>HomeScreen</Text>

            <Button 
                title="Profile" 
                onPress={()=> props.navigation.navigate("Profile")} 
            />
            </View>
    );
}

export default HomeScreen;