import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native";
import InicioScreen from "./Inicio";
import Menu from "./Menu";
//import Admin from "./Admin";


const Stack = createNativeStackNavigator()

const AppNavigator = () => 
( 
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName = "Inicio">
            <Stack.Screen name = "Inicio" component = {InicioScreen} />
            <Stack.Screen name = "Menu" component = {Menu}/>
        </Stack.Navigator>
    </NavigationContainer>
)

export default AppNavigator;
