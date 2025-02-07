/* eslint-disable @typescript-eslint/no-explicit-any */

export enum QRCodeStatus {
	LOADING = 404, // 二维码加载
	FAIL = 800, // 二维码失效或已过期
	WAITING = 801, // 等待扫码
	AUTHORIZING = 802, // 待确认，授权中
	SUCCESS = 803 // 登录成功
}

export enum AuthTypeStatus {
	QRCODE = 'qrcode',
	EMAIL = 'email',
	PHONE = 'phone',
	SMS = 'sms'
}

export type AuthType = 'qrcode' | 'eamil' | 'phone' | 'sms'

export interface UserDetail {
	level: number
	listenSongs: number

	mobileSign: boolean
	pcSign: boolean
	profile: UserInfo
	peopleCanSeeMyPlayRecord: boolean
	adValid: boolean
	code: number
	newUser: boolean
	recallUser: boolean
	createTime: number
	createDays: number
}

export interface UserInfo {
	privacyItemUnlimit: PrivacyItemUnlimit
	avatarDetail: any
	vipType: number
	mutual: boolean
	remarkName: any
	avatarImgId: number
	birthday: number
	gender: number
	nickname: string
	accountStatus: number
	authStatus: number
	avatarUrl: string
	backgroundImgId: number
	backgroundUrl: string
	city: number
	detailDescription: string
	djStatus: number
	expertTags: any
	followed: boolean
	province: number
	userType: number
	defaultAvatar: boolean
	createTime: number
	avatarImgIdStr: string
	backgroundImgIdStr: string
	description: string
	userId: number
	signature: string
	authority: number
	followeds: number
	follows: number
	blacklist: boolean
	eventCount: number
	allSubscribedCount: number
	playlistBeSubscribedCount: number
	followTime: any
	followMe: boolean
	artistIdentity: any[]
	cCount: number
	inBlacklist: boolean
	sDJPCount: number
	playlistCount: number
	sCount: number
	newFollows: number
}

export interface PrivacyItemUnlimit {
	area: boolean
	college: boolean
	gender: boolean
	age: boolean
	villageAge: boolean
}

export interface UserAccount {
	id: number
	userName: string
	type: number
	status: number
	whitelistAuthority: number
	createTime: number
	tokenVersion: number
	ban: number
	baoyueVersion: number
	donateVersion: number
	vipType: number
	anonimousUser: boolean
	paidFee: boolean
}

export interface UserStateus {
	data: StatusData
}

export interface StatusData {
	code: number
	account: UserAccount
	profile: any
}
