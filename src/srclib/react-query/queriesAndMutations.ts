import { INewPost, INewUser } from '@/types'
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query'
import { createPost, createUserAccount, signInAccount, signOutAccount } from '../appwrite/api'
//  import { QUERY_KEYS } from './queryKeys'

 export enum QUERY_KEYS {
     // AUTH KEYS
     CREATE_USER_ACCOUNT = "createUserAccount",
  
     // USER KEYS
     GET_CURRENT_USER = "getCurrentUser",
     GET_USERS = "getUsers",
     GET_USER_BY_ID = "getUserById",
  
     // POST KEYS
     GET_POSTS = "getPosts",
     GET_INFINITE_POSTS = "getInfinitePosts",
     GET_RECENT_POSTS = "getRecentPosts",
     GET_POST_BY_ID = "getPostById",
     GET_USER_POSTS = "getUserPosts",
     GET_FILE_PREVIEW = "getFilePreview",
  
     //  SEARCH KEYS
     SEARCH_POSTS = "getSearchPosts",
   }



// initialized new mutation function so query knows what we are doing
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: { 
            email: string; 
            password: string
        }) => signInAccount(user)
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount,
    })
}


 export const useCreatePost = () => {

     const queryClient = useQueryClient();

     return useMutation({
         mutationFn: (post: INewPost) => createPost(post),
         onSuccess: () => {
            queryClient.invalidateQueries({
                 queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
             })
         }
     })

 }

 