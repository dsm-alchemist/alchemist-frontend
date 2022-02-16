import React, { useEffect, useState } from "react";
import { Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, View } from "react-native";
import { requestWithAccessToken, requestWithoutAccesToken } from "../util/api/axios";
import useAccess from "../util/hooks/useAccess/useAccess";


export default function User() {

    const access = useAccess();
    const [list, setList] = useState<any>();

    useEffect(() => {
        requestWithAccessToken({
            method: "GET",
            url: '/explore',
            headers: {authorization: `Bearer ${access.state.access}`},
            data: {}
        }).then((res) => {
            setList(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        requestWithAccessToken({
            method: "GET",
            url: `/rank?page=${0}&size=${20}`,
            headers: {authorization: `Bearer ${access.state.access}`},
            data: {}
        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    return(
        <SafeAreaView style={{marginTop: 40}}>
            <Text>asdasd</Text>
            {
                list?.map((e: any) => {
                    return(
                        <SafeAreaView>
                            <Text>{e.userName}</Text>
                            <Text>{e.userEmail}</Text>
                        </SafeAreaView>
                    )
                })
            }
            <SafeAreaView>

            </SafeAreaView>
        </SafeAreaView>
    )
}
