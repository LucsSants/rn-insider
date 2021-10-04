import React, {useState, useEffect} from "react";
import {ScrollView, ActivityIndicator} from 'react-native'
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

import { getListMovies, randomBanner } from "../../utils/movie";

import Header from '../../components/Header'
import {Feather} from '@expo/vector-icons'
import SliderItem from "../../components/SliderItem";

import api, {key} from "../../services/api";

import {useNavigation} from '@react-navigation/native'
import { Wrapper } from "../Movies/styles";



function Home() {

  const [nowMovies, setNowMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topMovies, setTopMovies] = useState([])

  const [bannerMovie, setBannerMovie] = useState({})  

  const [loading, setLoading] = useState(true)

  const [input, setInput] = useState('')

  const navigation = useNavigation()

  useEffect(()=> {
    let isActive = true

    const ac = new AbortController()

    async function getMovies() {
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

      if(isActive) {
        const nowList = getListMovies(10,nowData.data.results)
        const popularList = getListMovies(5, popualarData.data.results)
        const topList = getListMovies(5, topData.data.results)
        
        setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)])

        setNowMovies(nowList)
        setPopularMovies(popularList)
        setTopMovies(topList)
        setLoading(false)
      }

    }

    getMovies()

    return () => {
      isActive= false
      ac.abort()
    }
  },[])

    function navigateDetailsPage(item) {
       navigation.navigate('Detail', {id: item.id})
    }

    function handleSearchMovie() {
      if(input === '') return

      navigation.navigate('Search',{name: input})
      setInput('')
    }

  if(loading) {
    return (
      <Container>
        <Wrapper>
        <ActivityIndicator size="large" color="#FFF"/>
        </Wrapper>
      </Container>
    )
  }

  return(
    <Container>
      
      <Header title="React Prime"/>

      <SearchConainer>
        <Input
          placeholder="Ex.: Vingadores"
          placeholderTextColor = "#ddd"
          value={input}
          onChangeText={(text)=> setInput(text)}
          returnKeyType='search'   
          onSubmitEditing={handleSearchMovie}   
        />

        <SearchButton onPress={handleSearchMovie}> 
          <Feather name="search" size={30} color="#FFF"/>
        </SearchButton>
      </SearchConainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>

        <BannerButton
        activeOpacity={0.7}
        onPress= {()=> navigateDetailsPage(bannerMovie)}
        >
          <Banner
          resizeMethod="resize"
          source={{uri: `https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path}`}}
          />
        </BannerButton>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({item})=> <SliderItem data={item} navigatePage={()=> navigateDetailsPage(item)} />} 
          keyExtractor= { (item) => String(item.id)}
        />

        <Title>
          Populares
        </Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({item})=> <SliderItem data={item} navigatePage={()=> navigateDetailsPage(item)} />}
          keyExtractor={ (item) => String(item.id)}
        />

        <Title>
          Mais Votados
        </Title>
        
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({item})=> <SliderItem data={item} navigatePage={()=> navigateDetailsPage(item)} />}
          keyExtractor={ (item) => String(item.id)}
        />


      </ScrollView>

    </Container>
  )
}

export default Home;