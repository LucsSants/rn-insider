import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
flex: 1;
background-color: #141a29;
padding: 4px 0;


`

export const ListMovies = styled.FlatList`

`
export const Wrapper = styled.View`
flex:1;
align-items: center;
justify-content:center;
`

export const EmptyMessage = styled.Text `
color: #FFF;
font-size: 20px;
font-weight:bold;
background-color: rgba(255,255,255, 0.1);
padding: 10px 30px;
border-radius:30px;
`