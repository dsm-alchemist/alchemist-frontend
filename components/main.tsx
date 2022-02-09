import React, { useEffect, useState } from "react";
import { Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView } from "react-native";
import {Calendar} from "react-native-calendars";
import { requestWithAccessToken } from "../util/api/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    todo: string;
};

export default function Main ({navigation}) {

    const [state, setState] = useState<Props>({
        todo: "",
    })

    const [edi, setEdi] = useState("");

    const tdYear = new Date().getFullYear().toString();
    const tdMonth = (new Date().getMonth() + 1).toString().length === 1 ?
                    "0" + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1).toString() 
    const tdDay = new Date().getDate().toString().length === 1 ? 
                    "0" + new Date().getDate().toString() : new Date().getDate().toString();
    const today = tdYear + "-" + tdMonth + "-" + tdDay;

    const [ed, setEd] = useState(false);

    const [date, setDate] = useState<any>(today.replace(/-/g, ""));
    const [refresh, setRefresh] = useState(false);
    const [marked, setMarked] = useState<any>();
    const [val, setVal] = useState<any>();
    const [list, setList] = useState<any[]>();

    const onDayPress = (day: any) => {
        let markedDates: any = {};
        markedDates[day.dateString] = {selected: true, selectedColor: 'blue'};
        setMarked(markedDates)
    }

    const getdata = async () => {
        try{
            setVal(await AsyncStorage.getItem('access_token'));
        }catch(err){
            console.log(err);
        }
    }

    const changeTodo = (e: any) => {
        setState({
            todo: e.nativeEvent.text
        })
    }

    const editChange = (e: any) => {
        setEdi(e.nativeEvent.text);
    }

    const editTask = (e: any) => {
        setEd(false);
        requestWithAccessToken({
            method: "PUT",
            url: `/task/${e.task_id}`,
            headers: {authorization: `Bearer ${val}`},
            data: {
                "task": edi
            },
        }).then((res) => {
            console.log(res);
            setRefresh(true);
            setEd(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    const plus = () => {
        requestWithAccessToken({
            method: "POST",
            url: "/task",
            headers: {authorization: `Bearer ${val}`},
            data: {
                "task": state.todo,
                "date": date
            },
        }).then((res) => {
            console.log(res.data);
            setState({
                todo: ""
            });
            setRefresh(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getdata();
        setDate(today.replace(/-/g, ""));
    }, []);

    const deleteTask = (e: any) => {
        requestWithAccessToken({
            method: "DELETE",
            url: `/task/${e.task_id}`,
            headers: {authorization: `Bearer ${val}`},
            data: {}
        }).then((res) => {
            console.log(res.data);
            setRefresh(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    const pushStorage = (e: any) => {
        requestWithAccessToken({
            method: "POST",
            url: `/task/${e.task_id}/storage`,
            headers: {authorization: `Bearer ${val}`},
            data: {}
        }).then((res) => {
            console.log(res.data);
            setRefresh(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        requestWithAccessToken({
            method: "GET",
            url: `/task?date=${date}`,
            headers: {authorization: `Bearer ${val}`},
            data: {

            },
        }).then((res) => {
            setList(res.data.taskList);
            setRefresh(false);
        }).catch((err) => {
            console.log(err);
        })
    }, [marked, val, refresh]);
    return(
        <>
                        <KeyboardAvoidingView>

        <TouchableOpacity onPress={() => {navigation.navigate("login")}}>
            <Text style={{fontSize: 20, marginTop: 40,}}>
                asdasd
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={plus}>
            <Text style={{fontSize: 20}}>Plus</Text>
        </TouchableOpacity>
        <TextInput value={state.todo} onChange={changeTodo} style={{width: 300, height: 20, backgroundColor: "black", color: "white"}}></TextInput>
        <Calendar
            markedDates={marked}
            current={today}
            onDayPress={(day: any) => {onDayPress(day); setDate(day.dateString.replace(/-/g, ""))}}
        ></Calendar>
        <ScrollView>
            {
                list?.map((e, index) => {
                    return(
                            <SafeAreaView style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Text style={{fontSize: 20, marginTop: 5, width: 200,  height: 50, backgroundColor: "black", color: "white"}}>{e.task}</Text>
                            <TouchableOpacity onPress={() => {deleteTask(list[index]);}}>
                                <Text style={{fontSize: 15, marginLeft: 10}}>삭제</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {pushStorage(list[index]);}}>
                                <Text style={{fontSize: 15, marginLeft: 10}}>보관함으로</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {editTask(list[index]);}}>
                                <Text style={{fontSize: 15, marginLeft: 10}}>EDIT</Text>
                            </TouchableOpacity>
                            </SafeAreaView>
                    )
                })
            }
        </ScrollView>
        
        </KeyboardAvoidingView>
        
        </>
    )
}