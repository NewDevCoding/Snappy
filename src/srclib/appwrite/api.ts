import { INewUser } from "@/types";
import { ID, Query } from "appwrite"
import { account, appwriteConfig, avatars, databases } from "./config";

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