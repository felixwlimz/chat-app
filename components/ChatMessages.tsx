import React, { Suspense } from "react";
import ListMessages from "./ListMessages";
import { supabaseServer } from "@/lib/supabase/server";
import InitMessages from "@/store/initMessage";
import { LIMIT_MESSAGES } from "@/constant";

const ChatMessages = async () => {
  const supabase = await supabaseServer();

  const { data } = await supabase
    .from("messages")
    .select("*,users(*)")
    .range(0, LIMIT_MESSAGES)
    .order("created_at", { ascending: false });

  return (
    <Suspense fallback={"Loading..."}>
      <ListMessages />
      <InitMessages messages={data?.reverse() || []} />
    </Suspense>
  );
};

export default ChatMessages;
