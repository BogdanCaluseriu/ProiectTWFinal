import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
} from 'react-native';

import MapView from "react-native-maps";
import Permissions from './Permissions';
import Geolocation from "react-native-geolocation-service";

function Maps()
{
    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });


    useEffect(()=>{
        console.log("Component did mount in Maps")

        async function Localization()
        {
        let response = await Permissions.requestLocationPermission()
            console.log("response is: "+response)

            if (response === 'granted') {

                this.watchID = Geolocation.watchPosition(position => {
                    setRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01

                    })
                 console.log("Location has been updated")
                });

            }

        }
        Localization()




    },[])
    const mounted = useRef()
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
        } else {

            console.log("Component did update MAPS")
        }
    });


    StatusBar.setHidden(true, 'none');




    return (
    <View style = {styles.container}>
        <MapView
            style={styles.map}
            region={region}
            showsUserLocation={true}

        >


        </MapView>
    </View>

    )

}
export default Maps

const styles = StyleSheet.create(
    {
        container: {
            height: '100%',

        },
        map: {
            ...StyleSheet.absoluteFillObject,

        },
    })
