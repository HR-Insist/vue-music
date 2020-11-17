import request from '@/utils/axios'

export const getArtists = id => request.get(`/artists?id=${id}`)

export const getArtistsSongs = params => request.get('/artist/songs', {
  params
})

// export const getArtistsMvs = id => request.get(`/artist/mv?id=${id}`)
export const getArtistsMvs = params => request.get('/artist/mv', {
  params
})

export const getArtistsAlbums = params => request.get('/artist/album', {
  params
})

export const getArtistsDesc = id => request.get(`/artist/desc?id=${id}`)

export const getArtistList = params => request.get('/artist/list', {
  params
})
export const getSimilarArtist = id => request.get(`/simi/artist?id=${id}`)