import { ChartSpline, FileAudio, Home, SquareLibrary, SquareUserRound } from 'lucide-react'

// 站点配置
export const SITE = {
	NAME: 'Simusic',
	DESC: '分享音乐，发现音乐',
	STORE: {
		GLOBAL: 'SIM@MUSIC_GLOBAL',
		AUDIO_PLAYER: 'SIM@MUSIC_AUDIO_PLAYER',
		USER: 'SIM@MUSIC_USER',
		COOKIE_KEY: 'SIM@MUSIC_COOKIE_KEY'
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
		LIMIT: 24,
		COMMENT_LIMIT: 24,
		SUBSCRIBE_LIMIT: 24
	},
	ARTIST: {
		ARTIST_LIMIT: 24,
		SONG_LIMIT: 24,
		ALBUM_LIMIT: 24,
		MV_LIMIT: 24
	},
	ALBUM: {
		ALBUM_LIMIT: 24,
		NEWSONG_LIMIT: 50,
		SONG_LIMIT: 24,
		COMMENT_LIMIT: 20
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
	NEWSONG: '/newsong',
	SEARCH: '/search',
	NOTFOUND: '/notfound'
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
		'-1': '热门',
		'0': '#',
		a: 'A',
		b: 'B',
		c: 'C',
		d: 'D',
		e: 'E',
		f: 'F',
		g: 'G',
		h: 'H',
		i: 'I',
		j: 'J',
		k: 'K',
		l: 'L',
		m: 'M',
		n: 'N',
		o: 'O',
		p: 'P',
		q: 'Q',
		r: 'R',
		s: 'S',
		t: 'T',
		u: 'U',
		v: 'V',
		w: 'W',
		x: 'X',
		y: 'Y',
		z: 'Z'
	}
}

// 新歌速度分类
export const NEWSONG_TYPE = {
	'0': '全部',
	'7': '华语',
	'8': '日本',
	'16': '韩国',
	'96': '欧美'
}

// 新碟地区分类
export const NEWALBUM_AREA = {
	// ALL: '全部',
	ZH: '华语',
	EA: '欧美',
	KR: '韩国',
	JP: '日本'
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
