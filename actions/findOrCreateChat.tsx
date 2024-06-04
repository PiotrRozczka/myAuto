"use server"
import {db} from "@/lib/db";
import {Car} from '@prisma/client'
import {auth} from "@/auth";

export const findOrCreateChat = async ({ownerEmail}:{ownerEmail:string}) => {
    const session = await auth();
    if(session?.user?.email == ownerEmail) throw new Error('You cannot chat with yourself');

    const chat = await db.chat.findFirst({
        where: {
            users:{
                some:{
                    AND:[
                        {email:session?.user?.email as string},
                        {email:ownerEmail}
                    ]
                }
            },
        },
    });

    if(chat) chat.id;
    const newChat = await db.chat.create({
        data:{
            users:{
                connect:[
                    {email:session?.user?.email as string},
                    {email:ownerEmail}
                ]
            }
        }
    })
    return newChat.id;
}