import React, {useState, useEffect} from 'react'
import { 
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description

 } from './styles'
import {Feather, Ionicons} from '@expo/vector-icons'
import {useNavigation, useRoute} from '@react-navigation/native'
import api, {key} from '../../services/api'
import Stars from 'react-native-stars'
import Genres from '../../components/Genres'
import ModalLink from '../../components/ModalLink'
import {ScrollView, Modal,ActivityIndicator} from 'react-native'
import {saveMovie, hasMovie, deleteMovie} from '../../utils/storage'
import { Wrapper } from '../Movies/styles'

import Toast from 'react-native-root-toast'

function Detail() {

  const navigation = useNavigation()
  const route = useRoute()

  const [movie, setMoive] = useState({})
  const [openLink, setOpenLink] = useState(false)
  const [favoritedMovie, setFavoritedMovie] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    let isActive=true

    async function getMovie() {
      const response = await api.get(`/movie/${route.params?.id}`, {
        params: {
          api_key: key,
          language: 'pt-BR'

        }
      })
      .catch((err)=> {console.log(err)}) 

      if(isActive) {
        setMoive(response.data)
        const isFavorite = await hasMovie(response.data)
        setFavoritedMovie(isFavorite)
        setLoading(false)
        //console.log(response.data)
      }
    }
    if(isActive) {
      getMovie()
    }

    return ()=>{
      isActive= false
    }
  }, [])

  async function handleFavoriteMovie(movie) {
    if (favoritedMovie) {
      await deleteMovie(movie.id)
      setFavoritedMovie(false)
      //alert('Filme removido da sua lisa!')
      let toast = Toast.show("Filme removido da sua lista!", {
        duration: 2000,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#E72F49',
        shadow: false
    })
    } else {
      await saveMovie('@primereact', movie)
      setFavoritedMovie(true)
      //alert("Filme salvo na sua lista!")
      let toast = Toast.show("Filme salvo na sua lista!", {
          duration: 2000,
          position: Toast.positions.BOTTOM,
          backgroundColor: '#E72F49',
          shadow: false
      })
    }
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

  return (
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={()=> navigation.goBack()}>
          <Feather
          name="arrow-left"
          size={28}
          color="#FFF"
          />
        </HeaderButton>

        <HeaderButton activeOpacity={0.7} onPress={()=> handleFavoriteMovie(movie)}>
          {favoritedMovie ? (
            <Ionicons
            name="bookmark"
            size={28}
            color="#FFF"
            />
          ): (
            <Ionicons
            name="bookmark-outline"
            size={28}
            color="#FFF"
            />
          )}
        </HeaderButton>
      </Header>

      <Banner
      resizeMethod="resize"
      source={{uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`}}
      />

      <ButtonLink onPress={()=>setOpenLink(true)}> 
        <Feather
        name="link" size={24} color="#FFF"
        />
      </ButtonLink>

      <Title numberOfLines={2}>
        {movie.title}
      </Title>

      <ContentArea>
        <Stars
        default={movie.vote_average}
        count={10}
        half={true}
        starSize={20}
        fullStar={<Ionicons name="md-star" size={24} color="#e7a74e" />}
        emptyStar={<Ionicons name="md-star-outline" size={24} color="#e7a74e" />}
        halfStar={<Ionicons name="md-star-half" size={24} color="#e7a74e" />}
        disabled={true}
        />
        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>

      <ListGenres
      data={movie?.genres}
      horizontal= {true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item)=>String(item.id)}
      renderItem={({item})=> <Genres data={item}/>}

      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title> Descrição</Title>
        <Description>{movie?.overview}</Description>

      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={openLink}>
        <ModalLink
        link={movie?.homepage}
        title={movie?.title}
        closeModal={()=> setOpenLink(false)}
        />
      </Modal>

      
    </Container>
  )
}

export default Detail;

