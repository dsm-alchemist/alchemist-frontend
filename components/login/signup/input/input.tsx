import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";

interface Props {
    placeholder: string;
    buttonTitle: string;
    onClick: any;
    padding: number;
    display: any;
    textVisible: any;
    title: string;
    onChange: any;
    border: any;
    borderColor: any;
}

const Input = ({ onChange, borderColor, placeholder, buttonTitle, onClick, padding, display ,textVisible, border, title}: Props) => {
    return(
        <SafeAreaView style={{width: "100%", alignItems: "center", marginTop: 20,}}>
            <Text style={{width: "85%", marginBottom: 3, display: textVisible, fontSize: 11, color: "#ff7070" }}>{title}</Text>
            <SafeAreaView style={{flexDirection: "row", alignItems: "center", width: "85%"}}>
                <TextInput onChange={onChange} placeholder={placeholder} style={{
                    width: "100%",
                    height: 32,
                    borderRadius: 5,
                    color: "#434343",
                    fontSize: 12,
                    paddingLeft: 10,
                    backgroundColor: "#DDDDDD",
                    borderColor: borderColor,
                    borderWidth: border,
                }} />
                <TouchableOpacity style={{
                    backgroundColor: "black",
                    paddingHorizontal: 7,
                    paddingVertical: 8,
                    marginLeft: 5,
                    borderRadius: 5, display: display  }}>
                    <Text onPress={() => {onClick();}} style={{color: "white", fontSize: 11, paddingHorizontal: padding,}}>{buttonTitle}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default Input;