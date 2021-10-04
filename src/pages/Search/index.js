import React, {useState, useEffect} from "react";

import { Container, ListMovies, NotFound } from "./style";

import SearchItem from "../../components/SearchItem";

import {useNavigation, useRoute} from '@react-navigation/native'

import api, {key} from '../../services/api'

import {ActivityIndicator} from 'react-native'
import { Wrapper } from "../Movies/styles";


function Search() {
  const [movie, setMovie] = useState([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()
  const route = useRoute()


  useEffect(()=>{
    let isActive = true
    async function getSearchMovie() {
      const response = await api.get('/search/movie', {
        params: {
          query: route?.params?.name,
          api_key: key,
          language:'pt-BR',
          page: 1,
        }
      })

      if(isActive) {
        setMovie(response.data.results)
        // console.log(response.data.results)
        setLoading(false)
      }
    }

    if(isActive) {
      getSearchMovie()
    }

    return ()=> {
      isActive = false
    }

  },[])

  function navigateDetailsPage(item) {
    navigation.navigate('Detail', {id: item.id})
 }

  if (loading) {
    return(
      <Container>
        <Wrapper>
        <ActivityIndicator size="large" color="#FFF"/>
        </Wrapper>
      </Container>
    )
  }

  return (
    <Container>
      {movie.length === 0 ? (
        <Wrapper>
          <NotFound>
            Nenhum filme encontrado
          </NotFound>
        </Wrapper>
      ):(
        <ListMovies
        data={movie}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item)=> String(item.id)}
        renderItem={({item})=> <SearchItem data={item} navigatePage={()=> navigateDetailsPage(item)} />}
        />
      )}

     
    </Container>
  )
}

export default Search;