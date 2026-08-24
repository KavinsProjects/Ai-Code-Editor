"use server"

import { db } from "@/lib/db";
import { currentUser } from "@/modules/dashboard/action"

export const getAllPlayGroundDataForUsers = async()=>{
    const user = await currentUser();

    try {
        const playground = await db.playground.findMany({
            where:{
                userId:user?.id
            },
            include:{
                user : true
            }
        });
        return playground
    } catch (error) {
        console.error(`Error-> in playGround ${error}`);
        return null;
    }
}