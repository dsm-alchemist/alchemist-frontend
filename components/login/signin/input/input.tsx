import React from "react";
import { StyleSheet, TextInput, SafeAreaView, Text } from "react-native";

interface Props {
    onChange: any;
    borderWidth: any;
    placeholder: string;
    pw: boolean;
    display: any;
    title: string;
}

const Input = ({onChange, borderWidth, placeholder, pw, display ,title}: Props) => {
    return(
        <SafeAreaView style={{width: "100%", marginTop: 20, alignItems: "center"}}>
            <Text style={{ width: "85%", marginBottom: 5, fontSize: 11, color: "#ff7070", display: display}}>{title}</Text>
            <TextInput onChange={onChange} style={{width: "85%",
            height: 32,
            borderRadius: 5,
            color: "#434343",
            fontSize: 12,
            paddingLeft: 10,
            backgroundColor: "#DDDDDD",
            borderWidth: borderWidth,
            borderColor: "#ff7070",}} secureTextEntry={pw} placeholder={placeholder} />
        </SafeAreaView>
    )
}

export default Input;