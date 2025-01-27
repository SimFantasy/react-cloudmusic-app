import { ChartSpline, FileAudio, Home, SquareLibrary, SquareUserRound } from 'lucide-react'

// 站点配置
export const SITE = {
	NAME: 'Simusic',
	DESC: '分享音乐，发现音乐',
	STORE: {
		GLOBAL: 'SIM@MUSIC_GLOBAL',
		AUDIO_PLAYER: 'SIM@MUSIC_AUDIO_PLAYER'
	},
	THEME: {
		THEME_KEY: 'SIM@MUSIC_THEME',
		DEFAULT_THEME: 'light'
	},
	SERVER: {
		BASE_URL: 'http://localhost:4000',
		TIMEOUT: 50000
	},
	DISCOVER: {
		PLAYLIST_LIMIT: 12,
		NEWSONG_LIMIT: 12
	},
	PLAYLIST: {
		LIMIT: 24
	}
}

// 路由
export const ROUTES = {
	HOME: '/',
	DISCOVER: '/discover',
	PLAYLIST: '/playlist',
	PLAYLIST_DETAIL: '/playlist/:playlistId',
	TOPLIST: '/toplist',
	ARTIST: '/artist',
	ARTIST_DETAIL: '/artist/:artistId',
	ALBUM: '/album',
	SEARCH: '/search'
}

// 侧栏导航
export const NAVS = [
	{ name: '发现', route: ROUTES.DISCOVER, icon: Home },
	{ name: '歌单', route: ROUTES.PLAYLIST, icon: FileAudio },
	{ name: '排行', route: ROUTES.TOPLIST, icon: ChartSpline },
	{ name: '歌手', route: ROUTES.ARTIST, icon: SquareUserRound },
	{ name: '专辑', route: ROUTES.ALBUM, icon: SquareLibrary }
]

// 歌手分类
export const ARTIST_CATEGORY = {
	type: {
		'-1': '全部',
		'1': '男歌手',
		'2': '女歌手',
		'3': '乐队'
	},
	area: {
		'-1': '全部',
		'7': '华语',
		'96': '欧美',
		'8': '日本',
		'16': '韩国',
		'0': '其他'
	},
	initial: {
		'-1': '全部',
		'0': '#',
		A: 'A',
		B: 'B',
		C: 'C',
		D: 'D',
		E: 'E',
		F: 'F',
		G: 'G',
		H: 'H',
		I: 'I',
		J: 'J',
		K: 'K',
		L: 'L',
		M: 'M',
		N: 'N',
		O: 'O',
		P: 'P',
		Q: 'Q',
		R: 'R',
		S: 'S',
		T: 'T',
		U: 'U',
		V: 'V',
		W: 'W',
		X: 'X',
		Y: 'Y',
		Z: 'Z'
	}
}

// 榜单
export const TOPLIST_CATEGORY = {
	official: [19723756, 3779629, 3778678],
	chosen: [3779629, 7775163417, 6723173524, 8532443277, 2884035, 8246775932],
	genre: [
		1978921795, 991319590, 71385702, 5059633707, 5059661515, 71384707, 6886768100, 5059642708,
		12225155968
	],
	global: [60198, 180106, 60131, 27135204, 6939992364, 3812895, 8537588450, 7325478166],
	language: [2809513713, 2809577409, 5059644681, 745956260, 6732051320, 7095271308, 6732014811],
	feature: [7603212484, 7356827205, 6688069460, 5338990334, 21845217, 8661209031, 9651277674],
	vip: [7785123708, 5453912201, 7785066739, 7785091694, 12344472377],
	partner: [12911403728, 12911589513, 12911619970, 12911379734, 12768855486]
}
