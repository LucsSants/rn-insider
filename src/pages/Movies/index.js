import React, {useEffect, useState} from "react";
import  Header  from "../../components/Header";
import { Container, ListMovies, EmptyMessage,Wrapper} from "./styles";
import FavoriteItem from "../../components/FavoriteItem";
import Toast from "react-native-root-toast";

import { deleteMovie, getMoviesSave } from '../../utils/storage'
import {useNavigation, useIsFocused} from '@react-navigation/native'

function Movies() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [movies, setMovies] = useState([])
  
  useEffect(()=> {
    let isActive = true

    async function getFavoriteMovies() {
      const result = await getMoviesSave('@primereact')

      if(isActive) {
        setMovies(result)
      }
    }

    if(isActive) {
      getFavoriteMovies()
    }

    return()=>{
      isActive=false
    }
  }, [isFocused])

  async function handleDelete(id) {
    const result = await deleteMovie(id)
    setMovies(result)
    let toast = Toast.show("Filme removido da sua lista!", {
      duration: 1000,
      position: Toast.positions.BOTTOM,
      backgroundColor: '#E72F49',
      shadow: false
  })
  }

  async function navigateDetailsPage(item) {
    navigation.navigate('Detail', {id: item.id})
  }

  return (
    <Container>
        <Header
        title="Meus Filmes"
        />
        {movies.length === 0 ? (
        <Wrapper>
          <EmptyMessage>Sem filmes salvos</EmptyMessage>
        </Wrapper>

        ) : 
        (
          <ListMovies
          showsVerticalScrollIndicator={false}
          data={movies}
          keyExtractor={item=> String(item.id)}
          renderItem={({item})=> (
            <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
            navigatePage= {()=> navigateDetailsPage(item)}
            />
          )}
          />
        )}
        
      </Container>
  )
}



export default Movies;