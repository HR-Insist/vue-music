const Discovery = () => import('@/views/discovery/Discovery.vue')
const Recommend = () => import("@/views/recommend/Recommend.vue")
const LatestSongs = () => import("@/views/latest-songs/LatestSongs.vue")
const MVs = () => import("@/views/mv/MVs.vue")
const MvDetail = () => import('@/views/mv-detail/MvDetail.vue')
const Singers = () => import("@/views/singer/Singers.vue")
const ArtistDetail = () => import("@/views/artist-detail/ArtistDetail.vue")
const PlayListDetail = () => import("@/views/playlist-detail/PlayListDetail.vue")
const Search = () => import("@/views/search/Search.vue")
const SearchSongs = () => import('@/views/search/Songs')
const SearchPlaylists = () => import('@/views/search/Playlists')
const SearchMVs = () => import('@/views/search/MVs')
const ArtistDesc = () => import('@/views/artist-detail/ArtistDesc.vue')
const ArtistMvs = () => import('@/views/artist-detail/ArtistMvs.vue')
const ArtistAlbums = () => import('@/views/artist-detail/ArtistAlbums.vue')
const Login = () => import('@/views/login/Login.vue')

export default {
  mode: "history",
  routes: [{
      path: '/',
      redirect: {
        name: 'Discovery'
      }
    },
    {
      path: '/discovery',
      name: 'Discovery',
      component: Discovery,
      meta: {
        keepAlive: true,
        scrollTop: 0
      }
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      meta: {
        keepAlive: true,
        scrollTop: 0
      }
    },
    {
      path: '/playlist/:id',
      name: 'PlayList',
      component: PlayListDetail,
      meta: {
        keepAlive: false,
        scrollTop: 0
      }
    },
    {
      path: '/latestmusic',
      name: 'LatestSongs',
      component: LatestSongs,
      meta: {
        keepAlive: true,
        scrollTop: 0
      }
    },
    {
      path: '/mvs',
      name: 'MVs',
      component: MVs,
      meta: {
        keepAlive: true,
        scrollTop: 0
      }
    },
    {
      path: '/mv-detail/:id',
      name: 'MvDetail',
      component: MvDetail,
      props: route => ({
        id: +route.params.id
      }),
      meta: {
        keepAlive: false,
        scrollTop: 0
      }
    },
    {
      path: '/singers',
      name: 'Singers',
      component: Singers,
      meta: {
        keepAlive: false,
      }
    },
    {
      path: '/artist',
      name: 'artistDetail',
      component: ArtistDetail,
      meta: {
        keepAlive: false,
      },
      children: [{
          path: '',
          name: 'ArtistSongs',
        },
        {
          path: 'albums',
          name: 'ArtistAlbums',
          component: ArtistAlbums
        },
        {
          path: 'mvs',
          name: 'ArtistMvs',
          component: ArtistMvs
        },
        {
          path: 'desc',
          name: 'ArtistDesc',
          component: ArtistDesc
        }

      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        keepAlive: false,
      },
      children: [{
          path: '/',
          redirect: 'songs',
        },
        {
          path: 'songs',
          name: 'SearchSongs',
          component: SearchSongs,
        },
        {
          path: 'playlists',
          name: 'SearchPlaylists',
          component: SearchPlaylists,
        },
        {
          path: 'mvs',
          name: 'SearchMVs',
          component: SearchMVs,
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
}