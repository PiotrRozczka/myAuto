import { ChatSideBar } from "@/components/ChatSideBar";
import { ChatWindow } from "@/components/ChatWindow";

export default function Page() {
    return (
        <main className='flex w-full h-screen'>
            <ChatSideBar className='w-1/5' />
            <ChatWindow className='w-4/5' />
        </main>
    )
}
