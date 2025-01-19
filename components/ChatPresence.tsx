/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useUser } from "@/store/user-store";
import React, { useEffect, useState } from "react";

const ChatPresence = () => {
  const { user } = useUser();
  const supabase = supabaseBrowser();
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    const channel = supabase.channel("room1");
    channel
      .on("presence", { event: "sync" }, () => {
        console.log("Synced presence state: ", channel.presenceState());
        const userIds = []
        for(const id in channel.presenceState()){
            // @ts-expect-error "user_id" does not exist on type 'PresenceMessage'
            userIds.push(channel.presenceState()[id][0].user_id)
        }
        setOnlineUsers([...new Set(userIds)].length)
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });
  }, [user]);

  if (user) {
    return (
      <div className="flex items-center gap-1">
        <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse" />
        <h1 className="text-sm text-gray-400">{onlineUsers} online</h1>
      </div>
    );
  } else {
    return <div className="h-3 w-1"></div>;
  }
};

export default ChatPresence;
