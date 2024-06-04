"use client";

import { Button } from "@/components/ui/button";
import { MessageSquareMore } from "lucide-react";
import { findOrCreateChat } from "@/actions/findOrCreateChat";
import { useRouter } from "next/navigation";

export const ChatButton = ({ ownerEmail }: { ownerEmail: string }) => {
  const { push } = useRouter();
  const handleChat = async () => {
    const chatId = await findOrCreateChat({ ownerEmail });
    push(`/chat/${chatId}`);
  };

  return (
    <Button onClick={handleChat} className="flex gap-2">
      <MessageSquareMore />
      Message
    </Button>
  );
};
