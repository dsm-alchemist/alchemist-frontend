import { useEffect, useState } from "react";
import { TextInput, SafeAreaView, TouchableOpacity, Text, StyleSheet} from "react-native";
import { ACCESS_TOKEN, REFRESH_TOKEN, requestWithoutAccesToken } from "../util/api/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";

interface Props {
    email: string;
    password: string;
}


export default function Login({navigation}) {

    

    const getdata = async () => {
        try{
            const val = await AsyncStorage.getItem('access_token');
            if(val !== null) {
                console.log(val);
            }else{
                console.log("nullyse");
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getdata();
    }, [AsyncStorage])

    const [state, setState] = useState<Props>({
        email: "",
        password: ""
    });

    const login = (e: any) => {
        requestWithoutAccesToken({
            url: "/login", 
            method: "POST",
            headers: {},
            data: {
                "email": state.email,
                "password": state.password,
            }
        }).then((res) => {
            alert("success");
            navigation.navigate("main");
            try{
                console.log("ehlfrjf")
                AsyncStorage.setItem('access_token', res.data.accessToken);
                AsyncStorage.setItem('refresh_token', res.data.refreshToken);
            }catch(err) {
                console.log(err);
            }
        }).catch((err) => {
            alert(err);
        })
    }

    const idChange = (e: any) => {
        setState({
            ...state,
            email: e.nativeEvent.text,
        })
    }
    const pwChange = (e: any) => {
        setState({
            ...state,
            password: e.nativeEvent.text,
        })
    }

    return(
        <SafeAreaView style={styles.container}>
            <TextInput onChange={idChange} style={styles.input} />
            <TextInput onChange={pwChange} style={styles.input} />
            <TouchableOpacity onPress={login}>
                <Text>asdasd</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    },
    input: {
        width: 300,
        height: 50,
        borderColor: "white",
        borderWidth: 1,
        color: "white",
        backgroundColor: "gray"
    }
})

