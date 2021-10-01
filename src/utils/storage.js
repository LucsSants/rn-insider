import AsyncStorage from '@react-native-async-storage/async-storage'

// Buscar filmes salvos
export async function getMoviesSave(key) {
  const myMovies = await AsyncStorage.getItem(key)
  
  let moviesSave = JSON.parse(myMovies) || []
  
  return moviesSave
}

// Salvar novo filme
  export async function saveMovie(key, newMovie) {
    let moviesStored= await getMoviesSave(key)
    const hasMovie = moviesStored.some(item => item.id === newMovie.id)

    if (hasMovie) {
      console.log("Esse filme já está na sua lista")
      return;
    }
    moviesStored.push(newMovie)

    await AsyncStorage.setItem(key, JSON.stringify(moviesStored))
    console.log("Filme salvo com suscesso!")
  } 

// Deletar algum filme específico
export async function deleteMovie(id) {
  let moviesStored= await getMoviesSave('@primereact')
  let myMovies = moviesStored.filter(item=> {
    return(item.id !== id)
  })

  await AsyncStorage.setItem('@primereact', JSON.stringify(myMovies))
  console.log("Filme deletado com sucesso")
  return myMovies
}

//Filtrar algum filme já salvo
export async function hasMovie(movie){
  let moviesStored= await getMoviesSave('@primereact')
  const hasMovie = moviesStored.find(item=> item.id === movie.id)

  if(hasMovie) {
    return true
  }
  return false
}