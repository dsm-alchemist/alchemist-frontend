import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Base} from "./assets/base.jpeg";
import MainRouter from './route';

export default function App() {
  return (  
    <>
      <MainRouter></MainRouter>
    </>
  );
}

const styles = StyleSheet.create({
  
});
