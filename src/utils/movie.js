// gerar uma listade filme no tamanho que eu desejar

export function getListMovies(size, movies) {
  let movieList = []

  for(let i=0, l = size; i < l; i++) { // idk why he did that way, but at least now I know that can be done like that!
    movieList.push(movies[i])
  }

  return movieList;
}


// gerar um número aleatório com base na lista

export function randomBanner(movies) {
  return Math.floor(Math.random()* movies.length)
}