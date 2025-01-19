/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { IMessage, useMessage } from "@/store/messages-store";
import { RefObject, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { DeleteAlert, EditAlert } from "./MessageActions";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { ArrowDown } from "lucide-react";
import LoadMoreMessages from "./LoadMoreMessages";

const ListMessages = () => {
  const scrollRef = useRef(undefined) as unknown as RefObject<HTMLDivElement>;
  const {
    messages,
    optimisticAddMessage,
    optimisticIds,
    optimisticDeleteMessage,
    optimisticEditMessage,
  } = useMessage();
  const supabase = supabaseBrowser();

  const [userScroll, setUserScroll] = useState(false);
  const [notification, setNotification] = useState(0);

  useEffect(() => {
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          if (!optimisticIds.includes(payload.new.id)) {
            const { error, data } = await supabase
              .from("users")
              .select("*")
              .eq("id", payload.new.send_by)
              .single();
            if (error) {
              toast.error(error.message);
            } else {
              const newMessage = {
                ...payload.new,
                users: data,
              };
              optimisticAddMessage(newMessage as IMessage);
            }
          }
          const scrollContainer = scrollRef.current;

          if (
            scrollContainer.scrollTop <
            scrollContainer.scrollHeight - scrollContainer.clientHeight - 10
          ) {
            setNotification((curr) => curr + 1);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          optimisticDeleteMessage(payload.old.id);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          optimisticEditMessage(payload.new as IMessage);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer && !userScroll) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const isScroll =
        scrollContainer.scrollTop <
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;

      setUserScroll(isScroll);
      if (
        scrollContainer.scrollTop ===
        scrollContainer.scrollHeight - scrollContainer.clientHeight
      ) {
        setNotification(0);
      }
    }
  };

  const scrollDown = () => {
    setNotification(0);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <>
      <div
        className="flex-1 flex flex-col p-5 h-full overflow-y-auto gap-5"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <div className="flex-1">
          <LoadMoreMessages/>
        </div>
        <div className="space-y-7">
          {messages.map((item) => (
            <Message key={item?.id} message={item} />
          ))}
        </div>

        <DeleteAlert />
        <EditAlert />
      </div>
      {userScroll && (
        <div className="absolute bottom-20 w-full">
          {notification ? (
            <div
              onClick={scrollDown}
              className="w-36 mx-auto bg-indigo-500 p-1 rounded-md cursor-pointer"
            >
              <h1>New {notification} messages</h1>
            </div>
          ) : (
            <div
              onClick={scrollDown}
              className="w-10 h-10 bg-blue-500 rounded-full justify-center items-center flex mx-auto border cursor-pointer hover:scale-110 transition-all"
            >
              <ArrowDown />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ListMessages;
