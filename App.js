import React from 'react';
import { View,StyleSheet,StatusBar} from 'react-native';
import Router from './Components/Router';


let  App = () =>{



    return(

        <View style={styles.container}>
            <StatusBar hidden={true}/>
            <Router/>


        </View>
    );


}

export default App

const styles = StyleSheet.create(
    {
        container: {

            height: '100%',

        },
        map: {
            ...StyleSheet.absoluteFillObject,

        },
        button:
            {

                alignItems: 'flex-end',
                justifyContent: 'space-around',
                paddingRight: 20,
                paddingBottom:35,


            },

    }
);
