"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";
import { values } from "lodash";
import { createAuditLog } from "@/lib/create-audit-log";
import { ENTITY_TYPE, ACTION } from "@prisma/client";
import { list } from "postcss";

const handler = async(data:InputType): Promise<ReturnType>=>{
    const{userId,orgId} = auth();

    if(!userId ||!orgId){
        return{
            error:"Unauthorize",
        };
    }

    const { id,boardId,...values} = data;
    let card;


    try{
        card= await db.card.update({
            where:{
                id,
                list:{
                    board:{
                        orgId,
                    },
                },
            },
            data:{
                ...values,
            },
        });
           
        await createAuditLog({
            entityTitle: card.title,
            entityId:card.id,
            entityType:ENTITY_TYPE.CARD,
            action:ACTION.CREATE,
        })

    }catch (error){
        return{
            error: "Failed to update."
        }

    }

    revalidatePath(`/board/${boardId}`);
    return {data:card};
};

export const updateCard = createSafeAction(UpdateCard,handler);