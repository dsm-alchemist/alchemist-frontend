import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from "react-native";
import Input from "./input/input";
import request from "../../../util/api/axios";
import { useHistory } from "react-router-dom";

interface Props{
    email: string;
    emailCode: string;
    name: string;
    password: string;
    checkEmail: boolean;
    checkName: boolean;
    checkCode: boolean;
}

const Signup = () => {

    const history = useHistory();

    const [state, setState] = useState<Props>({
        email: "",
        password: "",
        name: "",
        emailCode: "",
        checkCode: false,
        checkEmail: false,
        checkName: false,
    });

    const [email, setEmail] = useState(false);

    const [success, setSuccess] = useState({
        name: false,
        email: false,
        code: false,
        password: false,
    });

    const sendCode = () => {
        request({
            url: `/reduplication/email/${state.email}`,
            method: "GET",
            data: {}
        }).then((res) => {
            console.log(res);
            request({
                url: "/sms-certification/sends",
                method: "POST",
                data: {
                    "email": state.email,
                }
            }).then((res) => {
                setSuccess({
                    ...success,
                    email: false,
                });
                setState({
                    ...state,
                    checkEmail: true,
                })
                setEmail(false);
                alert("인증코드를 보냈습니다.");
            }).catch((err) => {
                if(err.response.status === 400) {
                    setEmail(false);
                    setSuccess({
                        ...success,
                        email: true,
                    })
                }
            })
        }).catch((err) => {
            if(err.response.status === 400 || err.response.status === 400) {
                setSuccess({
                    ...success,
                    email: true,
                })
                setEmail(true);
            }
        })
        
    }

    const checkName = () => {
        request({
            url: `/reduplication/name/${state.name}`,
            method: "GET",
            data: {}
        }).then((res) => {
            console.log(res);
            alert("사용가능한 이름 입니다.");
            setState({
                ...state, 
                checkName: true,
            })
            setSuccess({
                ...success,
                name: false,
            })
        }).catch((err) => {
            if(err.response.status === 409 || err.response.status === 400){
                setSuccess({
                    ...success,
                    name: true,
                })
            }
        })
    }

    const checkCode = () => {
        request({
            url: `/sms-certification/confirms?code=${state.emailCode}&email=${state.email}`,
            method: "GET",
            data: {},
        }).then((res) => {
            console.log(res);
            alert("이메일 인증 성공");
            setSuccess({
                ...success,
                code: false
            });
            setState({
                ...state,
                checkCode: true,
            })
        }).catch((err) => {
            if(err.response.status === 400 || err.response.status === 400) {
                setSuccess({
                    ...success,
                    code: true
                })
            }
        })
    }

    const signupBtn = () => {
        if(!state.checkEmail) {
            setSuccess({
                ...success,
                email: true
            })
        }
        else if(!state.checkCode) {
            setSuccess({
                ...success,
                code: true,
            })
        }
        else if(!state.checkName) {
            setSuccess({
                ...success,
                name: true,
            })
        }
        else{

            if(state.password.length < 3 || state.password.length > 10) {
                setSuccess({
                    ...success,
                    password: true,
                })
            }else{
                setSuccess({
                    ...success,
                    password: false,
                })
                request({
                    url: "/signup",
                    method: "POST",
                    data: {
                        "email": state.email,
                        "password": state.password,
                        "name": state.name,
                    }
                }).then((res) => {
                    console.log(res);
                    history.push("/signin")
                }).catch((err) => {
                    console.log(err);
                })
            }
        } 
    }


    const changeCode = (e: any) => {
        setState({
            ...state,
            emailCode: e.target.value,
        })
    }

    const changeName = (e: any) => {
        setState({
            ...state,
            name: e.target.value,
        })
    }

    const changePassword = (e: any) => {
        setState({
            ...state,
            password: e.target.value,
        })
    }

    const changeEmail = (e: any) => {
        setState({
            ...state,
            email: e.target.value
        })
    }

    console.log(state);

    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={require('../../../assets/logo.png')}></Image>
            <SafeAreaView style={styles.inputContainer}>
                <Input display={"flex"} placeholder={"사용할 이메일을 입력해 주세요"} buttonTitle={"인증코드 발송"} onClick={sendCode} padding={0} textVisible={success.email? "flex" : "none"} title={ email ? "사용중인 이메일 입니다." :"이메일을 형식을 지켜 주세요 ex) alchemist@gmail.com"} border={success.email? 1 : 0} onChange={changeEmail} borderColor={success.email? "#ff7070" : "none"}  />
                <Input display={"flex"} placeholder={"인증코드를 입력해 주세요"} buttonTitle={"이메일 인증"} onClick={checkCode} padding={5} textVisible={success.code ? "flex": "none"} title={"잘못된 인증번호 입니다."} border={success.code ? 1 : 0} onChange={changeCode} borderColor={success.code ? "#ff7070" : "none"}   />
                <Input display={"flex"} placeholder={"닉네임을 입력해 주세요"} buttonTitle={"중복 확인"} onClick={checkName} padding={10} textVisible={success.name ? "flex" : "none"} title={"사용불가능한 이름입니다."} border={success.name ? 1 : 0} onChange={changeName} borderColor={success.name ? "#ff7070" : "none"}   />
                <Input display={"none"} placeholder={"비밀번호를 입력해 주세요"} buttonTitle={""} onClick={sendCode} padding={0} textVisible={success.password ? "flex" : "none"} title={"비밀번호는 3글자 이상 10글자 이하입니다."} border={undefined} onChange={changePassword} borderColor={undefined}/>
            </SafeAreaView>
            <TouchableOpacity onPress={signupBtn} style={styles.login}>
               <Text style={styles.loginText}>회원가입</Text>
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
        height: 67,
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 20
    },
    input: {
        width: "85%",
        height: 32,
        borderRadius: 5,
        color: "#434343",
        fontSize: 12,
        paddingLeft: 10,
        backgroundColor: "#DDDDDD",
        marginTop: 20,
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

export default Signup;