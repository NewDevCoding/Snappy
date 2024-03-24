import { INewPost, INewUser, IUpdatePost } from "@/types";
import { ID, Query } from "appwrite"
import { account, appwriteConfig, avatars, databases, storage } from "./config";

export async function createUserAccount(user: INewUser){
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        );

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            imageURL: avatarUrl,
            username: user.username,
            
        })

        return newUser;
    }   catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageURL: URL;
    username: string;
}) {
    try {
      const newUser = await databases.createDocument(
        '65751a26b8b6a4d30093',
        appwriteConfig.userCollectionId,
        ID.unique(),
        user,
      )
    
      return newUser;
    } catch (error) {
      console.log(error);
    }
}


export async function signInAccount(user: { email: string, password: string 
    }){
        try {
            const session = await account.createEmailSession(user.email, user.password);
            return session;
                } catch (error) {
            console.log(error)
        }
}

export async function getCurrentUser(){
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            // appwriteConfig.databaseId
            '65751a26b8b6a4d30093',
            // appwriteConfig.userCollectionId
            '65761b4b113c481d6490',
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export async function signOutAccount(){
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
        
    }
}

 export async function createPost(post: INewPost){
     try {
         // upload image to storage
         const uploadedFile = await uploadFile(post.file[0])

         if(!uploadedFile) throw Error;

         // get file url
         const fileUrl = getFilePreview(uploadedFile.$id)
        //  console.log(fileUrl)
        //  console.log('yes/no')
         if(!fileUrl) {
             await deleteFile(uploadedFile.$id)
             throw Error;
         }

         // convert tags in an array
         const tags = post.tags?.replace(/ /g,'').split(',') || [];

         // save post to database
         const newPost = await databases.createDocument(
             '65751a26b8b6a4d30093',
            //  appwriteConfig.postCollectionId
            '65761b081a49f776c550',
             ID.unique(),
             {
                  Creator: post.userId,
                  caption: post.caption,
                //   imageURL: fileUrl,
                // 'http://127.0.0.1:5500/public/assets/icons/back.svg'
                  imageURL: fileUrl,
                  
                  imageId: uploadedFile.$id,
                  location: post.location,
                  tags: tags,
             }
         )


         if(!newPost) {
             await deleteFile(uploadedFile.$id);
             throw Error;
         }
         return newPost;
     } catch (error) {
         console.log(error)
     }
 }

 export async function uploadFile(file: File) {
     try {
         const uploadedFile = await storage.createFile(
            //  appwriteConfig.storageId
            '657519daa826ae67d29c',
             ID.unique(),
             file,
         );

         return uploadedFile;
     } catch (error) {
         console.log(error)
     }
 }

 export function getFilePreview(fileId: string){
     try {
         const fileUrl = storage.getFilePreview(
            //  appwriteConfig.storageId
            '657519daa826ae67d29c',
             fileId,
             2000,
             2000,
             "top",
             100,
         )

         if(!fileUrl) throw Error;

         return fileUrl;
     } catch (error) {
         console.log(error)
     }
 }

 export async function deleteFile(fileId: string){
     try {
         await storage.deleteFile('657519daa826ae67d29c', fileId)
     } catch (error) {
         console.log(error)
     }
 }

 export async function getRecentPosts() {
     const posts = await databases.listDocuments(
        //  appwriteConfig.databaseId,
         '65751a26b8b6a4d30093',
        //  appwriteConfig.postCollectionId,
         '65761b081a49f776c550',
         [Query.orderDesc('$createdAt'), Query.limit(20)]
     )
     if (!posts) throw Error

     return posts;
 }


 export async function likePost(postId: string, likesArray: string[]){
    try {
        const updatedPost = await databases.updateDocument(
            '65751a26b8b6a4d30093',
            '65761b081a49f776c550',
            postId,
            {
                likes: likesArray
            }
        )

        if(!updatedPost) throw Error

        return updatedPost;
    } catch (error) {
        console.log(error)
    }
 }

 export async function savePost(postId: string, userId: string){
    try {
        const updatedPost = await databases.createDocument(
            // database id
            '65751a26b8b6a4d30093',
            // saves collection id
            '65761b679a8b87eeaad0',
            ID.unique(),
            {
                user: userId,
                post: postId
            }
        )

        if(!updatedPost) throw Error

        return updatedPost;
    } catch (error) {
        console.log(error)
    }
 }

 export async function deleteSavedPost(savedRecordId: string){
    try {
        const statusCode = await databases.deleteDocument(
            // database id
            '65751a26b8b6a4d30093',
            // saves collection id
            '65761b679a8b87eeaad0',
            savedRecordId,
        )

        if(!statusCode) throw Error

        return { status: 'ok' };
    } catch (error) {
        console.log(error)
    }
 }

 export async function getPostById(postId: string){
    try {
        const post = await databases.getDocument(
            // database id
            '65751a26b8b6a4d30093',
            // post collection id
            '65761b081a49f776c550',
            postId,

        )
        return post;
    } catch (error) {
        console.log(error)
    }
 }

 export async function updatePost(post: IUpdatePost){

    const hasFileToUpdate = post.file.length > 0;
    try {
        let image = {
            imageUrl: post.imageUrl,
            imageId: post.imageId,
        }
        if(hasFileToUpdate) {
            const uploadedFile = await uploadFile(post.file[0])
            if(!uploadedFile) throw Error;

            const fileUrl = getFilePreview(uploadedFile.$id)

            if(!fileUrl) {
                await deleteFile(uploadedFile.$id)
                throw Error;
            }

            image = {...image, imageUrl: fileUrl, imageId: uploadedFile.$id}
        }
        

        // convert tags in an array
        const tags = post.tags?.replace(/ /g,'').split(',') || [];

        // save post to database
        const updatedPost = await databases.updateDocument(
            '65751a26b8b6a4d30093',
           //  appwriteConfig.postCollectionId
           '65761b081a49f776c550',
            post.postId,
            {
                 caption: post.caption,
                 imageURL: image.imageUrl,
                 
                 imageId: image.imageId,
                 location: post.location,
                 tags: tags,
            }
        )


        if(!updatedPost) {
            await deleteFile(post.imageId);
            throw Error;
        }
        return updatedPost;
    } catch (error) {
        console.log(error)
    }
}

export async function deletePost(postId: string, imageId:string){
    if(!postId || !imageId) throw Error

    try {
        await databases.deleteDocument(
            '65751a26b8b6a4d30093',
            '65761b081a49f776c550',
            postId,
        )
    } catch (error) {
        console.log(error)
    }
}

export async function getInfinitePosts({ pageParam }: { pageParam: number}){
    const queries: any[] = [Query.orderDesc('$updatedAt'), Query.limit(10)]

    if(pageParam){
        queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try {
        const posts = await databases.listDocuments(
            //  appwriteConfig.databaseId,
             '65751a26b8b6a4d30093',
            //  appwriteConfig.postCollectionId,
             '65761b081a49f776c550',
             queries
        )

        if(!posts) throw Error

        return posts;
    } catch (error) {
        console.log(error);
    }
}

export async function searchPosts(searchTerm: string){  

    try {
        const posts = await databases.listDocuments(
            //  appwriteConfig.databaseId,
             '65751a26b8b6a4d30093',
            //  appwriteConfig.postCollectionId,
             '65761b081a49f776c550',
             [Query.search('caption', searchTerm)]
        )

        if(!posts) throw Error

        return posts;
    } catch (error) {
        console.log(error);
    }
}