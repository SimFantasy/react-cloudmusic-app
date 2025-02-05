/**
 * 评论
 */

export interface Comments {
	isMusician: boolean
	cnum: number
	userId: number
	moreHot: boolean
	hotComments: Comment[]
	code: number
	comments: Comment[]
	total: number
	more: boolean
}

export interface Comment {
	user: User
	showFloorComment: ShowFloorComment
	status: number
	commentId: number
	content: string
	time: number
	timeStr: string
	needDisplayTime: boolean
	likedCount: number
	commentLocationType: number
	parentCommentId: number
	owner: boolean
	liked: boolean
}

export interface User {
	anonym: number
	userType: number
	avatarUrl: string
	followed: boolean
	mutual: boolean
	vipRights?: VipRights
	nickname: string
	authStatus: number
	vipType: number
	userId: number
}

export interface VipRights {
	associator?: Associator
	musicPackage?: MusicPackage
	redVipAnnualCount: number
	redVipLevel: number
	relationType: number
}

export interface Associator {
	vipCode: number
	rights: boolean
	iconUrl: string
}

export interface MusicPackage {
	vipCode: number
	rights: boolean
	iconUrl: string
}

export interface ShowFloorComment {
	replyCount: number
	showReplyCount: boolean
}
