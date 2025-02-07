import { z } from 'zod'

const phoneSchema = z
	.string()
	.refine(
		value => /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(value),
		'请输入正确的手机号'
	)

export const phonePasswordSchema = z.object({
	phone: phoneSchema,
	password: z.string().min(6, '密码至少6位').max(24, '密码最多24位')
})

export type PhonePasswordType = z.infer<typeof phonePasswordSchema>

export const phoneSmsSchema = z.object({
	phone: phoneSchema,
	code: z.string().min(4, '验证码为4位').max(4, '验证码为4位')
})
export type PhoneSmsType = z.infer<typeof phoneSmsSchema>

export const emailSchema = z.object({
	email: z.string().email('请输入正确的邮箱'),
	password: z.string().min(6, '密码至少6位').max(24, '密码最多24位')
})
export type EmailType = z.infer<typeof emailSchema>
