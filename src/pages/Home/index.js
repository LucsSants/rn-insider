import React from "react";
import {ScrollView} from 'react-native'
import { 
  Container, 
  SearchConainer,
  SearchButton ,
  Input,
  Title,
  BannerButton,
  Banner,
  SliderMovie
} from './styles'
import Header from '../../components/Header'

import {Feather} from '@expo/vector-icons'

import SliderItem from "../../components/SliderItem";

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

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>

        <BannerButton
        activeOpacity={0.7}
        onPress= {()=> alert("TESTE")}
        >
          <Banner
          resizeMethod="resize"
          source={{uri: 'https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'}}
          />
        </BannerButton>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[1,2,3,4]}
          renderItem={({item})=> <SliderItem/>}
        />

        <Title>
          Populares
        </Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[1,2,3,4]}
          renderItem={({item})=> <SliderItem/>}
        />

        <Title>
          Mais Votados
        </Title>
        
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[1,2,3,4]}
          renderItem={({item})=> <SliderItem/>}
        />


      </ScrollView>

    </Container>
  )
}

export default Home;