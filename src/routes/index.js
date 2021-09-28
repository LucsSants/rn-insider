import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import Movies from '../pages/Movies'
import StackRouts from './stackRouts'


const Drawer = createDrawerNavigator()

function Routes(){
  return(
    <Drawer.Navigator
      screenOptions= {{
        headerShown: false,

        drawerStyle: {
          backgroundColor: '#090a0e',
          paddingTop:20
        },

        drawerActiveBackgroundColor:'#E72F49',
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#FFF',
      }}
    >
      <Drawer.Screen 
      name="HomeDrawer" 
      component={StackRouts}
      options={{
        title: 'Home',
        drawerIcon: ({focused,size, color}) => (
          <MaterialCommunityIcons
          name={focused ? 'movie-open' : 'movie-outline'}
          size= {size}
          color = {color}
          />
        )
      }}
      >
      </Drawer.Screen>

          <Drawer.Screen 
          name="Movies" 
          component={Movies}
          options={{
            title: 'Meus Filmes',
            drawerIcon: ({focused,size, color}) => (
              <MaterialCommunityIcons
              name={focused ? 'archive' : 'archive-outline'}
              size= {size}
              color = {color}
              />
            )
          }}
          ></Drawer.Screen>

      </Drawer.Navigator>
  )
}

export default Routes;