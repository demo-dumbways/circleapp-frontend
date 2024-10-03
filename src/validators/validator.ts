import { ForgotDataType, LoginDataType, RegisterDataType, ResetDataType } from '@/types/types'
import { z, ZodType } from 'zod'

export const LoginSchema: ZodType<LoginDataType> = z.object({
    username: z
        .string()
        .min(4, {
            message: 'Username must be at least 4 chars long.',
        })
        .max(255),
    password: z.string().min(4, {
        message: 'Password must be at least 4 chars long.',
    }),
})

export const RegisterSchema: ZodType<RegisterDataType> = z.object({
    username: z
        .string()
        .min(4, {
            message: 'Username must be at least 4 chars long.',
        })
        .max(255),
    name: z.string().min(4, {
        message: 'Name must be at least 4 chars long.',
    }),
    email: z.string().email({
        message: 'Please provide a valid email.',
    }),
    password: z.string().min(4, {
        message: 'Password must be at least 4 chars long.',
    }),
})

export const ForgotSchema: ZodType<ForgotDataType> = z.object({
    email: z.string().email({
        message: 'Please provide a valid email.',
    }),
})

export const ResetSchema: ZodType<ResetDataType> = z
    .object({
        newPassword: z.string().min(4, {
            message: 'New Password must be at least 4 chars long.',
        }),
        confirmedPassword: z.string().min(4, {
            message: 'Confirmed password must be at least 4 chars long.',
        }),
    })
    .refine((data) => data.newPassword === data.confirmedPassword, {
        message: 'Passwords do not match.',
        path: ['general'],
    })

export const VibeSchema: ZodType = z.object({
    content: z
        .string()
        .min(1, {
            message: 'Vibe must not be empty.',
        })
        .max(255, {
            message: 'Vibe must be less than 255 chars.',
        }),
    image: z.any(),
})

export const EditUserSchema: ZodType = z.object({
    username: z
        .string()
        .min(4, {
            message: 'Username must be at least 4 chars long.',
        })
        .max(255),
    name: z.string().min(4, {
        message: 'Name must be at least 4 chars long.',
    }),
    bio: z.string().min(1, {
        message: 'Bio must not be empty.',
    }),
    filterContent: z.boolean(),
    avatar: z.any(),
    banner: z.any(),
})
