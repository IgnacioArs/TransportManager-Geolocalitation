//importando todo
import * as React from 'react';
import * as Location from 'expo-location'

import {ListItem,Avatar} from '@rneui/themed'

import MapView, { Callout, Circle, Marker,Polyline  } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, ScrollView,RefreshControl } from 'react-native';
import MapViewDirections from 'react-native-maps-directions'
import {GOOGLE_MAPS_KEY} from '@env' 


//importamos los iconos
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Button } from 'react-native-paper';
//importamos la imagen de icono
const usuario = require('../assets/img/usuario.png') 
const camion = require('../assets/img/camionNuevo.png')
import { Card,Icon } from '@rneui/themed';

import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'





export default function Localizar() {


const [refrescar,setRefrescar] = React.useState(false)
const [user,setUser]=React.useState(undefined)
const [punto,setPunto] = React.useState({
    latitude: -42.477840,
    longitude: -73.764222,
})

const [region,setRegion] = React.useState({
  latitud:-42.477840,
  longitud: -73.764222,
  latitudeDelta:0.09,
  longitudeDelta:0.04
})



//estas cordenadas son para que se coloquen como propiedades en MapViewDirections
let origen = {latitude:region.latitud, longitude:region.longitud}
let destino = {latitude:punto.latitude, longitude:punto.longitude}




/* React.useEffect(() => {
  getLocationPermission();
}, [])

async function getLocationPermission() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if(status !== 'granted') {
    alert('Permission denied');
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  const current = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  }
  setPunto(current)
} */


const GuardarRecorrido = async (token) => {
  console.log("latitude",punto.latitude,"longitude",punto.longitude)
  const email = user.user.email;
  console.log("AQUI MOSTRANDO EL TOKEN",token)
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await axios.post('https://bf79-181-162-219-245.sa.ngrok.io/api/actualizarGps',{punto,region},config).then(()=>{
    alert("se ha enviado punto y region");
  /*   props.navigation.navigate("Listado"); */
  })
  
  }


const obtenerAlmacenamiento = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')

    const datosAsyncStorage =  JSON.parse(jsonValue)
    setUser(datosAsyncStorage)
    console.log("Los datos actuales de asinc storage",user.token);
    GuardarRecorrido(user.token)
  } catch(e) {
   
  }
}



//funcion para obtener nuestra localizacion
async function obtenerLocalizacionPersonal(){
  
  let { status } = await Location.requestForegroundPermissionsAsync()
  if(status !== 'granted'){
    alert('Tu geolocalizacion a sido denegada!')
    return;
  }
  
  //guardamos la posision actual con el metodo asincrono
  let localizando = await Location.getCurrentPositionAsync({})
  //guardamos los puntos donde estamos 
  const recorrido = {
    latitude:localizando.coords.latitude,
    longitude:localizando.coords.longitude
  }
  
  //AQUI AGREGAMOS A REGION
  setPunto(recorrido);
  if(!punto){
    obtenerAlmacenamiento();
   
  }else{
    obtenerAlmacenamiento();

  }

  }

  React.useEffect(()=>{
    if(user===undefined){
      return
     }
     const intervalId = setInterval(()=> {
      obtenerLocalizacionPersonal();
     },10000)
     return () => {clearInterval(intervalId)}
    },[user]);


const cargar = React.useCallback(()=> {
  setRefrescar(true)
  obtenerLocalizacionPersonal();
  setRefrescar(false)
  })
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refrescar} colors={["#002046"]} onRefresh={cargar}/>}>
          <View style={{marginTop:0,flex:1}}>
    {/*  aplicamos el buscador aqui */}
    <Card>
          <Card.Title>ACCIONES</Card.Title>
          <Card.Divider />
          <Button onPress={()=> GuardarRecorrido()}>Guardar Localizacion</Button>
        <Button onPress={()=>obtenerLocalizacionPersonal()}>Obtener Geolocalitation</Button>
        </Card>
    
    <Card containerStyle={{ marginTop: 15 }}>
        <Card.Title>Posicion actual</Card.Title>
        <MapView style={styles.map}  initialRegion={{
      //en la posicion en la que esta el circulo y va a mostrar primero el mapa
      latitude:-42.477840,
      longitude: -73.764222,
      //esta es la cantidad de zom que va hacer  el mapa al momento de encotrar tu posicion
      latitudeDelta:0.09,
     longitudeDelta:0.04
    }} 
    //le daremos otro tipo de vista
    provider="google"
  
    >
    <Marker coordinate={{ latitude: region.latitud, longitude: region.longitud }}   draggable={true}
      onDragStart={(e)=>{console.log("llegada recorrido",e.nativeEvent.coordinate)}}
      //donde termina
      onDragEnd={(e)=>{setRegion({
        latitud:e.nativeEvent.coordinate.latitude,
        longitud:e.nativeEvent.coordinate.longitude
      })}}
      image={usuario}
    >
    <Callout>
                <Text><MaterialCommunityIcons name="ray-start-end" size={24} color="black" /> Punto de llegada </Text>
                <Text><MaterialCommunityIcons name="latitude" size={24} color="black" /> Latitude: {region.latitud}</Text>
                <Text><MaterialCommunityIcons name="longitude" size={24} color="black" /> Longitude: {region.longitud}</Text>
    </Callout>
    </Marker>

   {/*  y marker con su latitude y longitude nos mostrara donde estara el punto rojo */}
    <Marker coordinate={{
     latitude:punto.latitude,
     longitude: punto.longitude}}
     pinColor="red"
     draggable={true}
     //aqui es donde empieza las cordenadas que asignaremos 
     onDragStart={(e)=>{console.log("inicio recorrido",e.nativeEvent.coordinate)}}
      //donde termina
     onDragEnd={(e)=>{setPunto({
        latitude:e.nativeEvent.coordinate.latitude,
        longitude:e.nativeEvent.coordinate.longitude
     })}}
     image={camion}
      >
      <Callout>
            <Text><MaterialCommunityIcons name="ray-start" size={24} color="black" /> Punto de inicio </Text>
            <Text><MaterialCommunityIcons name="latitude" size={24} color="black" /> Latitude: {punto.latitude}</Text>
            <Text><MaterialCommunityIcons name="longitude" size={24} color="black" /> Longitude: {punto.longitude}</Text>
      </Callout>
    </Marker>

     <MapViewDirections
      origin={origen}
      destination={destino}
      strokeColor="#000" 
      apikey={GOOGLE_MAPS_KEY}
      strokeColors={[
        '#7F0000',
        '#00000000', 
        '#B24112',
        '#E5845C',
        '#238C23',
        '#7F0000'
      ]}
      strokeWidth={6}
      /> 
 
  {/*   <Polyline
		coordinates={[
			{ latitude:region.latitud, longitude:region.longitud },
			{ latitude:punto.latitude, longitude:punto.longitude },
		]}
		strokeColor="#000" 
		strokeColors={[
			'#7F0000',
			'#00000000', 
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
	/>   */}
    </MapView>
        </Card>
    </View>
    

      <Card>
      <Card.Title>ASIGNAR DESTINO</Card.Title>
          <Card.Divider />
      <View style={{backgroundColor:"white",borderColor:"black",marginBottom:0,width:420,height:300}}>
      <ListItem

       onPress={() => alert("Ir Santiago")}
        >

          <ListItem.Chevron />
          <Avatar
            source={{
              uri:
              "https://cdn3.iconfinder.com/data/icons/unigrid-phantom-maps-travel-vol-1/60/007_045_road_route_travel_2-512.png",
            }}
            rounded
            />
         
          <ListItem.Content>
            <ListItem.Title ><Text>asignar santiago</Text></ListItem.Title>
            <ListItem.Subtitle><Text>Ir a Santiago</Text></ListItem.Subtitle>
          </ListItem.Content>
          </ListItem>
          <ListItem

    onPress={() => alert("Ir a Aereo Puerto Puerto Montt")} 
  >

    <ListItem.Chevron />
    <Avatar
      source={{
        uri:
        "https://cdn3.iconfinder.com/data/icons/unigrid-phantom-maps-travel-vol-1/60/007_045_road_route_travel_2-512.png",
      }}
      rounded
      />
   
    <ListItem.Content>
      <ListItem.Title ><Text>Asignar aereo puerto Puerto Montt</Text></ListItem.Title>
      <ListItem.Subtitle><Text>Ir a aereo puerto</Text></ListItem.Subtitle>
    </ListItem.Content>
    </ListItem>
    </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: 350,
    height: Dimensions.get('window').height,
  },
});


const styless = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  });