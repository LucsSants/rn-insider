// gerar uma listade filme no tamanho que eu desejar

export function getListMovies(size, movies) {
  let movieList = []

  for(let i=0, l = size; i < l; i++) { // idk why he did that way, but at least now I know that can be done like that!
    movieList.push(movies[i])
  }

  return movieList;
}
