import React from "react";

import { Container, Banner, Title, RateContainer,Rate } from "./style";
import {Ionicons} from '@expo/vector-icons'

import Toast from 'react-native-root-toast'

function SearchItem({data, navigatePage}) {
  function detailMovie() {
    if (data?.release_date === '') {
      //alert("Filme sem data")
      let toast = Toast.show("Filme sem data de lançamento!", {
        duration: 2000,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#E72F49',
        shadow: false,
        opacity:1
    })
      return
    }
    navigatePage(data) 
    
  }

  return(
    <Container activeOpacity={0.6} onPress={detailMovie}>
      {data?.poster_path ? (
        <Banner
        resizeMethod="resize"
        source={{uri: `https://image.tmdb.org/t/p/w500/${data?.poster_path}`}}
        />
      ) : (
        <Banner
        resizeMethod="resize"
        source={require('../../assets/semfoto.png')}
        />
      ) }

      <Title>{data?.title}</Title>
      <RateContainer>
        <Ionicons name="md-star" size={15} color="#e7a74e"/>
        <Rate>{data?.vote_average}/10 </Rate>
      </RateContainer>
    </Container>
  )
}

export default SearchItem;