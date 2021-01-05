import React, {useState,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList
} from "react-native";
import axios from 'axios'


const Doors = ({extraData}) => {

    const [DATA,setDATA] = useState(0)

    console.log("Floor is:",extraData)
    let url


useEffect(()=>{
    let getData=async()=>{
        if(extraData !== undefined)
        {

            url ="http://89.136.41.202:5000/etaj" + extraData

            console.log(url)
            await  axios.get(url)
                .then(res  => {
                        console.log(res["data"])
                        setDATA(res["data"])


                    }

                )
                .catch((err)=>console.log(err))
        }
    }
    getData()
    console.log("DATA DIN STATE:",DATA)
},[])




    return(
        <SafeAreaView style={styles.container}>
            <FlatList
            data = {DATA}
            renderItem={({item})=>{
                return(
                    <View style={styles.item}>
                        <Text style ={{fontSize:24}}> {item.sala} </Text>
                        <Text style ={{fontSize:20}}> {item.tip_sala} </Text>
                    </View>
                    )

            }}
            keyExtractor={(data)=>data.sala}
            />


        </SafeAreaView>

    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:10,
        marginBottom:10,
        marginHorizontal: 16
    },
    item: {
        alignItems:'center',
        padding: 15,
        marginVertical: 5,
        backgroundColor: "#E8E8E8",
    },
});

export default Doors
