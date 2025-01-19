/* eslint-disable @typescript-eslint/no-unused-expressions */
import { LIMIT_MESSAGES } from "@/constant";
import { create } from "zustand";

export type IMessage = {
  created_at: string;
  id: string;
  is_edit: boolean;
  send_by: string;
  text: string;
  users: {
    avatar_url: string;
    created_at: string;
    display_name: string;
    id: string;
  } | null;
};

interface MessageState {
  hasMore: boolean;
  page: number;
  messages: IMessage[];
  actionMessage: IMessage | undefined;
  optimisticIds: string[];
  optimisticAddMessage: (message: IMessage) => void;
  setActionMessage: (message: IMessage | undefined) => void;
  optimisticDeleteMessage: (messageId: string) => void;
  optimisticEditMessage: (message: IMessage) => void;
  setOptimisticIds: (ids: string) => void;
  setMessages: (message: IMessage[]) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  hasMore : true,
  page: 1,
  messages: [],
  actionMessage: undefined,
  optimisticIds: [],
  setOptimisticIds: (id) =>
    set((state) => ({
      optimisticIds: [...state.optimisticIds, id],
    })),
  optimisticAddMessage: (message: IMessage) => {
    set((state) => ({
      messages: [...state.messages, message],
      optimisticIds: [...state.optimisticIds, message.id],
    }));
  },
  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  optimisticDeleteMessage: (messageId) => {
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== messageId),
    }));
  },
  optimisticEditMessage: (message) => {
    set((state) => ({
      messages: state.messages.filter((updateMessage) => {
        if (message.id === updateMessage.id) {
          (message.text = updateMessage.text),
            (message.is_edit = updateMessage.is_edit);
        }
        return message;
      }),
    }));
  },
  setMessages: (messages) => {
    set((state) => ({
      messages: [...messages, ...state.messages],
      page: state.page + 1,
      hasMore : messages.length >= LIMIT_MESSAGES
    }));
  },
}));
