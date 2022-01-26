import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Image, TextInput, Text, TouchableOpacity } from "react-native";
import { useHistory } from "react-router-dom";
import request from "../../../util/api/axios";
import Input from "./input/input";

interface Props {
    email: string;
    password: string;
}

const Signin = () => {

    const history = useHistory();

    const [state, setState] = useState<Props>({
        email: "",
        password: ""
    });

    const [view, setView] = useState({
        email: false,
        password: false
    });

    const login = () => {
        request({
            url: "/login",
            method: "POST",
            data: {
                "email": state.email,
                "password": state.password
            }
        }).then((res) => {
            console.log(res);
            history.push("/");
        }).catch((err) => {
            console.log(err.response.status);
            if(err.response.status === 400) {
                setView({
                    email: false,
                    password: true
                });
            }else if(err.response.status === 404) {
                setView({
                    email: true,
                    password: false,
                });
            }
        })
    }

    const changeEmail = (e: any) => {
        setState({
            ...state,
            email: e.target.value
        })
    }

    const changePassword = (e: any) => {
        setState({
            ...state,
            password: e.target.value
        })
    }

    return( 
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={require('../../../assets/logo.png')}></Image>
            <SafeAreaView style={styles.inputContainer}>
                <Input onChange={changeEmail} borderWidth={view.email ? 1 : 0} placeholder={"이메일을 입력해 주세요"} display={view.email? "flex" : "none"} title="이메일을 입력해 주세요" pw={false} />
                <Input onChange={changePassword} borderWidth={view.password ? 1: 0} placeholder={"비밀번호를 입력해 주세요"} display={view.password ? "flex": "none"} pw={true} title="이메일이나 비밀번호를 잘못 입력하셨습니다." />
            </SafeAreaView>
            <SafeAreaView style={styles.goSignup}>
                <Text style={styles.signup}>계정이 없으신가요?</Text>
            </SafeAreaView>
            <TouchableOpacity onPress={login} style={styles.login}>
               <Text style={styles.loginText}>로그인</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    },
    logo: {
        width: 97,
        height: 67
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 20
    },
    goSignup: {
        width: "100%",
        alignItems: "flex-end",
        marginTop: 10
    },
    signup: {
        color: "#699CFF",
        marginRight: "10%"
    },
    login: {
        width: "85%",
        backgroundColor: "#9AB7F0",
        alignItems: "center",
        height: 35,
        borderRadius: 7,
        justifyContent: "center",
        marginTop: 20
    },
    loginText: {
        color: "#fff",
    }
})

export default Signin;