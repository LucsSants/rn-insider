import React, {useState, useEffect} from "react";
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

import { getListMovies } from "../../utils/movie";

import Header from '../../components/Header'
import {Feather} from '@expo/vector-icons'
import SliderItem from "../../components/SliderItem";

import api, {key} from "../../services/api";

function Home() {

  const [nowMovies, setNowMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topMovies, setTopMovies] = useState([])


  useEffect(()=> {
    async function getMovies() {
      // const response = await api.get('/movie/now_playing', {
      //   params: {
      //     api_key:key,
      //     language: 'pt-BR',
      //     page: 1,
      //   }
      // })

      const [nowData, popualarData, topData] = await Promise.all([
        api.get('/movie/now_playing', {
            params:{
              api_key:key,
              language: 'pt-BR',
              page: 1,
            }
        }),
        api.get('/movie/popular', {
          params: {
            api_key:key,
            language: 'pt-BR',
            page: 1,
          }
        }),
        api.get('/movie/top_rated', {
          params: {
            api_key:key,
            language: 'pt-BR',
            page: 1,
          }
        }),

      ])

      const nowList = getListMovies(10,nowData.data.results)
      const popularList = getListMovies(5, popualarData.data.results)
      const topList = getListMovies(5, topData.data.results)

      setNowMovies(nowList)
      setPopularMovies(popularList)
      setTopMovies(topList)

    }

    getMovies()

  },[])

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
          data={nowMovies}
          renderItem={({item})=> <SliderItem data={item}/>}
          keyExtractor= { (item) => String(item.id)}
        />

        <Title>
          Populares
        </Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({item})=> <SliderItem data={item}/>}
          keyExtractor={ (item) => String(item.id)}
        />

        <Title>
          Mais Votados
        </Title>
        
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({item})=> <SliderItem data={item}/>}
          keyExtractor={ (item) => String(item.id)}
        />


      </ScrollView>

    </Container>
  )
}

export default Home;