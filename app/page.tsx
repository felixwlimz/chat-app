import ChatAbout from "@/components/ChatAbout";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import { supabaseServer } from "@/lib/supabase/server";
import InitUser from "@/store/initUser";
import React from "react";

const Home = async () => {
  const supabase = await supabaseServer();

  const { data } = await supabase.auth.getUser();

  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="relative h-full border rounded-md flex flex-col">
          <ChatHeader user={data.user!} />

          {data.user ? (
            <>
              <ChatMessages />
              <ChatInput />
            </>
          ) : (
            <ChatAbout />
          )}
        </div>
      </div>
      <InitUser user={data.user!} />
    </>
  );
};

export default Home;
