"use client";
import React from "react";
import { Input } from "./ui/input";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/store/user-store";
import { IMessage, useMessage } from "@/store/messages-store";

const ChatInput = () => {
  const supabase = supabaseBrowser();
  const { user } = useUser();
  const { optimisticAddMessage } = useMessage();

  const handleSendMessage = async (text: string) => {
    if (text.trim()) {
      const newMessage = {
        id: uuidv4(),
        text,
        send_by: user?.id,
        is_edit: false,
        users: {
          id: user?.id,
          avatar_url: user?.user_metadata.avatar_url,
          created_at: new Date().toISOString(),
          display_name: user?.user_metadata.user_name,
        },
      };

      optimisticAddMessage(newMessage as unknown as IMessage);

      const { error } = await supabase.from("messages").insert({
        is_edit : false,
        text,
      });

      if (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    } else {
      toast.error("Message cannot be empty!");
    }
  };

  return (
    <div className="p-5">
      <Input
        placeholder="Send your message.."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
};

export default ChatInput;
