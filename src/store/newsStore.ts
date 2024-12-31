import { create } from 'zustand'
import { PostType } from './interface'
import { categories } from '@/constants/categories'

interface NewsStoreType {
    latestNews: Array<PostType>,
    category: string,
    categoryWiseNews: Array<PostType>,
}

interface NewStoreAction {
    setLatestNews: (latestNews: Array<PostType>) => void,
    setCategory: (category: string) => void,
    setCategoryWiseNews: (categoryWiseNews: Array<PostType>) => void
}

const useNewsStore = create<NewsStoreType & NewStoreAction>((set) => ({
    latestNews: [],
    category: categories[0],
    categoryWiseNews: [],


    setLatestNews: (posts) => set({ latestNews: posts }),
    setCategory: (category) => set({ category: category }),
    setCategoryWiseNews: (posts) => set({ categoryWiseNews: posts }),
}))

export default useNewsStore;