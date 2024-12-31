const API_KEY = process.env.EXPO_PUBLIC_NEWSDATA_API_KEY;
const BASE_URL = `https://newsdata.io/api/1/latest`

import { PostType } from "@/store/interface";

interface FetchNewsParams {
    category?: string
    page?: string
    country?: string
    language?: string
}

interface ReturnType {
    results: PostType[],
    nextPage: string
}

const createNewsUrl = (params: FetchNewsParams): string => {
    const baseParams = new URLSearchParams({
        apikey: API_KEY || '',
        removeduplicate: '1',
        language: 'en',
        country: 'us',
        ...params
    })

    return `${BASE_URL}?${baseParams.toString()}`
}

const fetchNewsData = async (params: FetchNewsParams): Promise<ReturnType> => {
    try {
        const url = createNewsUrl(params)
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('News API Error:', error)
        throw new Error(
            error instanceof Error
                ? `Failed to fetch news: ${error.message}`
                : 'Failed to fetch news'
        )
    }
}

export const fetchLatestNews = () => fetchNewsData({})

export const fetchNewsByCategory = (category: string) =>
    fetchNewsData({ category })

export const fetchMoreNewsByCategory = (category: string, page: string) =>
    fetchNewsData({ category, page })
