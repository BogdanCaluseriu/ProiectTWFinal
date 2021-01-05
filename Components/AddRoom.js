import React,{useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from "./Form.styles"
import axios from 'axios'


function Register()
{
    const [floor,setFloor] = useState(0)
    const [roomName,setRoomName] = useState(0)
    const [roomType,setRoomType] = useState(0)


    let uvtAddRoom=()=>{
        return axios.put("http://89.136.41.202:5000/etaj" +floor,
            'data={"sala":"'+roomName+'", "tip_sala":"'+roomType+'"}'
            ).then(res=> {
                console.log(res.data)
            console.log(roomName,"     ",roomType)

            let addRoomStatus
            if(res.data === 1) addRoomStatus = 'Room added'
            else if(res.data === 0) addRoomStatus = "Failed to add room"

            Alert.alert(
                addRoomStatus,
                "",
                [

                    { text: "OK", onPress: () => console.log("") }
                ],
                { cancelable: false }
            );



            })
            .catch(err=>console.log(err))
    }

    return(
        <View style = {styles.container}>


            <Text style={styles.logoText}>Adauga Sala</Text>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Etaj"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setFloor(text)}
                />
            </View>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Nume Camera"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setRoomName(text)}
                />
            </View>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Tip Sala"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setRoomType(text)}
                />
            </View>


            <TouchableOpacity
                style={styles.loginButton}
            onPress={uvtAddRoom}>
                <Text style={{color:'white',fontSize: 22}}>Adauga Sala</Text>
            </TouchableOpacity>

        </View>
    )
}



export default Register
