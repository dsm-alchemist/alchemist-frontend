import {Text, StyleSheet, SafeAreaView} from "react-native";
import Login from "./components/login";
import Main from "./components/main";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./modules/store";
import React from "react";
import User from "./components/user";


const Stack = createStackNavigator();

export default function App() {
  return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        >
          <Stack.Screen
            name="main"
            component={Main}
          />
          <Stack.Screen
            name="login"
            component={Login}
          />
          <Stack.Screen 
            name="user"
            component={User}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
})