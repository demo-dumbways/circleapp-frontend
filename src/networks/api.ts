import axios, { AxiosResponse } from 'axios'
import CONFIGS from '@/configs/configs'
import {
    DetailedThreadType,
    EditedUserType,
    FollowType,
    ForgotDataType,
    LikeType,
    LoginDataType,
    RegisterDataType,
    ReplyType,
    ResetDataType,
    UserType,
    ThreadType,
} from '@/types/types'

class API {
    async REGISTER(data: RegisterDataType): Promise<AxiosResponse> {
        try {
            return await axios.post(`${CONFIGS.BASE_URL}/register`, {
                username: data.username,
                name: data.name,
                email: data.email,
                password: data.password,
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    async LOGIN(data: LoginDataType): Promise<string> {
        try {
            const response: AxiosResponse = await axios.post(`${CONFIGS.BASE_URL}/login`, {
                username: data.username,
                password: data.password,
            })

            const token: string = response.data.data.token
            this.SET_TOKEN(token)

            return token
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    async GET_LOGGED_USER(): Promise<UserType> {
        try {
            const response: AxiosResponse = await axios.get(`${CONFIGS.BASE_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${this.GET_TOKEN()}`,
                },
            })

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    async FORGOT_PASSWORD(data: ForgotDataType): Promise<string> {
        try {
            const response: AxiosResponse = await axios.post(`${CONFIGS.BASE_URL}/auth/forgot`, {
                email: data.email,
            })

            return response.data.data.token
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    async RESET_PASSWORD(data: ResetDataType, token: string): Promise<AxiosResponse> {
        try {
            return await axios.patch(
                `${CONFIGS.BASE_URL}/auth/reset`,
                {
                    password: data.newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    GET_ALL_VIBES = async (): Promise<ThreadType[]> => {
        try {
            const response = await axios.get(`${CONFIGS.BASE_URL}/threads`, {
                headers: {
                    Authorization: `Bearer ${this.GET_TOKEN()}`,
                },
            })

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    GET_SINGLE_VIBE = async (id: number): Promise<DetailedThreadType> => {
        try {
            const response = await axios.get(`${CONFIGS.BASE_URL}/threads/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.GET_TOKEN()}`,
                },
            })

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    POST_VIBE = async (data: FormData): Promise<string> => {
        try {
            const response: AxiosResponse = await axios.post(`${CONFIGS.BASE_URL}/threads`, data, {
                headers: {
                    Authorization: `Bearer ${this.GET_TOKEN()}`,
                },
            })

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    DELETE_VIBE = async (targetUd: number): Promise<ThreadType> => {
        try {
            const response = await axios.delete(`${CONFIGS.BASE_URL}/threads/${targetUd}`, {
                headers: {
                    Authorization: `Bearer ${this.GET_TOKEN()}`,
                },
            })

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    GET_ALL_USERS = async (): Promise<UserType[]> => {
        try {
            const response = await axios.get(`${CONFIGS.BASE_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${this.GET_TOKEN()}`,
                },
            })

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    async GET_USER(id: number): Promise<UserType> {
        try {
            const response = await axios.get(`${CONFIGS.BASE_URL}/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.GET_TOKEN()}`,
                },
            })

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    EDIT_USER = async (data: FormData): Promise<EditedUserType> => {
        try {
            const response: AxiosResponse = await axios.patch(
                `${CONFIGS.BASE_URL}/users/me`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${this.GET_TOKEN()}`,
                    },
                }
            )

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    POST_REPLY = async (data: FormData): Promise<ReplyType> => {
        try {
            const response: AxiosResponse = await axios.post(`${CONFIGS.BASE_URL}/replies`, data, {
                headers: {
                    Authorization: `Bearer ${this.GET_TOKEN()}`,
                },
            })

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    DELETE_REPLY = async (targetUd: number): Promise<ReplyType> => {
        try {
            const response = await axios.delete(`${CONFIGS.BASE_URL}/replies/${targetUd}`, {
                headers: {
                    Authorization: `Bearer ${this.GET_TOKEN()}`,
                },
            })

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    FIND_USERS = async (keyword: string): Promise<UserType[]> => {
        try {
            const response = await axios.get(`${CONFIGS.BASE_URL}/find?keyword=${keyword}`, {
                headers: {
                    Authorization: `Bearer ${this.GET_TOKEN()}`,
                },
            })

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    TOGGLE_LIKE = async (targetId: number): Promise<LikeType> => {
        try {
            const response: AxiosResponse = await axios.post(
                `${CONFIGS.BASE_URL}/likes`,
                {
                    targetId: targetId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.GET_TOKEN()}`,
                    },
                }
            )

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    FOLLOW_USER = async (targetId: number): Promise<FollowType> => {
        try {
            const response = await axios.get(`${CONFIGS.BASE_URL}/follow/${targetId}`, {
                headers: {
                    Authorization: `Bearer ${this.GET_TOKEN()}`,
                },
            })

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    UNFOLLOW_USER = async (targetId: number): Promise<FollowType> => {
        try {
            const response = await axios.get(`${CONFIGS.BASE_URL}/unfollow/${targetId}`, {
                headers: {
                    Authorization: `Bearer ${this.GET_TOKEN()}`,
                },
            })

            return response.data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    DETECT_SENTIMENT = async (content: string): Promise<string[]> => {
        try {
            const response = await axios.post(
                CONFIGS.OPENAI_BASE_URL,
                {
                    input: content,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${CONFIGS.OPENAI_API_KEY}`,
                    },
                }
            )

            const categories = response.data.results[0].categories

            const labels = []
            for (const cat in categories) {
                if (categories[cat] === true) labels.push(cat)
            }

            return labels
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error
            }

            throw error
        }
    }

    SET_TOKEN(payload: string): void {
        localStorage.setItem('token', payload)
    }

    GET_TOKEN(): string | null {
        return localStorage.getItem('token')
    }
}

export default new API()
