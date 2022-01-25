import React from "react";
import { SafeAreaView, StyleSheet, Image, TouchableOpacity } from "react-native";

const Header = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Image style={{width: 20, height: 20, opacity: 0, marginLeft: 10}} source={require('../../../assets/nav.png')}></Image>
            <Image style={styles.logo} source={require('../../../assets/logoMain.png')}></Image>
            <TouchableOpacity activeOpacity={0.2}>
                <Image style={styles.nav} source={require('../../../assets/nav.png')}></Image>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    logo: {
        width: 150,
        height: 30,
        marginTop: 10
    },
    nav:{
        width: 20,
        height: 18,
        marginTop: 10,
        marginRight: 10
    }
})

export default Header;