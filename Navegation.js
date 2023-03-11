import React,{useEffect,useState} from "react";
//bottom tabs nos ayudara a crear nuestra navegacion con tabs
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
//ayuda encapsular nuestra navegacion
import { NavigationContainer } from "@react-navigation/native";
//y aqui con este modulo o hooks nos ayudara a crear las demas ventanas 
//que estan encapsuladas en nuestra stack
import {createNativeStackNavigator} from '@react-navigation/native-stack'


//VENTANAS PRINCIPALES DEL TABS SON (3)
import Inicio from "./screens/Inicio";
import Localizar from './screens/Localizar'
import Listado from './screens/Listado'



//inicializamos nuestros modulos para crear nuestra navegacion
const StackInicio = createNativeStackNavigator()

//aqui inicializamos tambien nuestro tab
const Tab = createMaterialBottomTabNavigator()

//importamos los iconos
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

function MyStack(){
    return(
    //aqui ya empezamos a crear nuestras subventanas y nombre de la aplicacion
    <StackInicio.Navigator  initialRouteName="Inicio Aplicacion" screenOptions={{statusBarColor:"#273746 ",headerTintColor:"#273746",contentStyle:"#273746",statusBarStyle:"dark"}}>
            {/* ventanas de la aplicaion */}
            {/*ventana de inicio de la aplicacion */}
            <StackInicio.Screen name="Inicio Aplicacion"  options={{headerShown:false,headerStyle:'#273746'}}  component={Inicio}></StackInicio.Screen>
            {/* ventanas funcionales */}
             <StackInicio.Screen name="Localizar" options={{header:false,headerStyle:'#273746 '}} component={Localizar}></StackInicio.Screen>
            <StackInicio.Screen name="Listado" options={{header:false,headerStyle:'#273746 '}} component={Listado}></StackInicio.Screen> 
    </StackInicio.Navigator>
    )
}

function MyTabs(){
    return(
        <Tab.Navigator  initialRouteName="Inicio"  activeColor="#002046" inactiveColor="#8b8b8e" barStyle={{backgroundColor:"#ffffff"}} tabBarActiveTintColor="black" >
   
               <Tab.Screen name="Listado"   component={Listado} options={{tabBarLabel:'Listado',tabBarIcon:({color,size})=>(
           <MaterialCommunityIcons name="view-list-outline" size={24} color="#002046" />
        ),
        //ahora para ocultar lo de arriba es asi o el header
        headerShown:false,
        //para ver notificaciones es este
       /*  tabBarBadge:10 */
        }}/>

      <Tab.Screen name="Inicio"  component={MyStack}  options={{tabBarLabel:'Inicio',tabBarIcon:({color,size})=>(
             <MaterialCommunityIcons name="home" size={24} color="#002046" />
        ),
        //ahora para ocultar lo de arriba es asi o el header
        headerShown:false,
        //para ver notificaciones es este
       /*  tabBarBadge:10 */
        }}/>
            <Tab.Screen name="Localizar" component={Localizar} options={{tabBarLabel:'Localizar',tabBarIcon:({color,size})=>(
            <MaterialCommunityIcons name="satellite-variant" size={24} color="#002046" />
        ),
        //ahora para ocultar lo de arriba es asi o el header
        headerShown:false,
        //para ver notificaciones es este
       /*  tabBarBadge:10 */
        }}/>
      </Tab.Navigator>
    )
}


export default function Navegacion(){
  return(
    <NavigationContainer>
   <MyTabs/>
    </NavigationContainer>
  )
}

