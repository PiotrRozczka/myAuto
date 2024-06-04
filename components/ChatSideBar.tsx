import {auth} from "@/auth";
import {db} from "@/lib/db";
export const ChatSideBar = async({ className }:{className: string}) => {

    const session = await auth();

    const chats = await db.chat.findMany({
        where:{
            users:{
                some:{
                    email:session?.user?.email as string
                }
            }

        }
        ,include:{
        users:true}

    })

    return (
        <div className={`${className}`}>
            <h2 className='text-2xl'>Your chats</h2>
            <div className='flex flex-col gap-2'>
                {chats.map(chat => (
                    <div key={chat.id} className='flex gap-2'>
                        <h5>{chat.users.filter(u => u.email != session?.user?.email)[0].email}</h5>
                    </div>
                ))}
        </div>
        </div>
    )
}