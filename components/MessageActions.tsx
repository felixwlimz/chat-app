"use client";
import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { IMessage, useMessage } from "@/store/messages-store";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const DeleteAlert = () => {
  const { actionMessage, optimisticDeleteMessage } = useMessage();

  const onDeleteMessage = async () => {
    const supabase = supabaseBrowser();

    optimisticDeleteMessage(actionMessage?.id as string);

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", actionMessage?.id as string);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Message deleted successfully");
    }

    document.getElementById('trigger-edit')?.click()
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button id="trigger-delete"></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteMessage}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const EditAlert = () => {
  const { actionMessage, optimisticEditMessage } = useMessage();
  const inputRef = useRef('div') as unknown as React.RefObject<HTMLInputElement>;

  const onUpdateMessage = async () => {
    const supabase = supabaseBrowser();
    const text = inputRef.current.value.trim();

    if(text){
      optimisticEditMessage({
        ...actionMessage, text,
        is_edit : true 
      } as IMessage) 
  
      const { error } = await supabase
        .from("messages")
        .update({ text, is_edit : true })
        .eq("id", actionMessage?.id as string);
  
        if(error){
          toast.error(error.message);
        } else {
          toast.success("Message updated successfully");
        }
      
        document.getElementById('trigger-edit')?.click()
    } else {
      document.getElementById('trigger-edit')?.click()
      document.getElementById('trigger-delete')?.click()
    }

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id="trigger-edit"></button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Edit Message</DialogTitle>
        </DialogHeader>
        <Input ref={inputRef} defaultValue={actionMessage?.text} />
        <DialogFooter>
          <Button type="submit" onClick={onUpdateMessage}>Edit Message</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
