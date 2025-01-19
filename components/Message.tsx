import { IMessage, useMessage } from "@/store/messages-store";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useUser } from "@/store/user-store";

const Message = ({ message }: { message: IMessage }) => {

  const { user } = useUser()


  return (
    <div className="flex gap-2">
      <div>
        <Image
          className="rounded-full ring-2"
          src={message?.users?.avatar_url as string}
          width={40}
          height={40}
          alt={message?.users?.display_name as string}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold">{message?.users?.display_name}</h1>
            <h1 className="text-sm text-gray-400">
              {new Date(message?.created_at).toDateString()}
            </h1>
            {
              message.is_edit && (
                <h1 className="text-sm text-gray-400">Edited</h1>
              )
            }
          </div>
          {
            message?.users?.id === user?.id && <MessageMenu message={message}/>
          }
        </div>
        <p className="text-gray-300">{message?.text}</p>
      </div>
    </div>
  );
};

const MessageMenu = ({ message } : { message : IMessage}) => {

  const { setActionMessage } = useMessage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          document.getElementById('trigger-edit')?.click()
          setActionMessage(message)
        }}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          document.getElementById('trigger-delete')?.click()
          setActionMessage(message)
        }} className="text-red-500">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Message;
