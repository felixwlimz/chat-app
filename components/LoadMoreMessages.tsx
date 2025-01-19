import React from "react";
import { Button } from "./ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { LIMIT_MESSAGES } from "@/constant";
import { getFromAndTo } from "@/lib/utils";
import { useMessage } from "@/store/messages-store";
import { toast } from "sonner";

const LoadMoreMessages = () => {
  const { page, setMessages, hasMore } = useMessage();

  const fetchMore = async () => {
    const { from, to } = getFromAndTo(page, LIMIT_MESSAGES);

    const supabase = supabaseBrowser();

    const { data, error } = await supabase
      .from("messages")
      .select("*,users(*)")
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setMessages(data.reverse());
    }
  };

  if (hasMore) {
    return (
      <Button variant="outline" className="w-full" onClick={fetchMore}>
        Load More
      </Button>
    );
  } else {
    return <></>;
  }
};

export default LoadMoreMessages;
