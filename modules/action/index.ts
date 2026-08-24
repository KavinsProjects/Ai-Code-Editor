"use server"

import { db } from "@/lib/db"
import { auth } from "@/auth"

export const getUserById = async(id:string)=>{
    try {
        const user = await db.user.findUnique({
            where:{id},
            include:{
                account : true
            }
        })
        return user;
    } catch (error) {
        console.log(`There is error in geting the userInfo =  ${error}`);
        return null;
    }   
}



export const getAccounById = async(id:string)=>{
    try {
       const account = await db.account.findFirst({
        where:{
            userId: id
        },
       }) 
           return account;
    } catch (error) {
        console.log(`There is error in getting the userinfor ${error}`);
        return null
    }
}

export const currentUser = async()=>{
    const user = await auth()
    return user?.user
}