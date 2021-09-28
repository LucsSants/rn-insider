import React from "react";
import {View, Text} from 'react-native'
import { Container, SearchConainer, SearchButton , Input} from './styles'
import Header from '../../components/Header'

import {Feather} from '@expo/vector-icons'

function Home() {
  return(
    <Container>

      <Header title="React Prime"/>

      <SearchConainer>
        <Input
          placeholder="Ex.: Vingadores"
          placeholderTextColor = "#ddd"        
        />

        <SearchButton>
          <Feather name="search" size={30} color="#FFF"/>
        </SearchButton>
      </SearchConainer>
    </Container>
  )
}

export default Home;