"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Circle, User2 } from "lucide-react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BouncingLoader from "./BouncingLoader";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessages([...messages, { role: "user", content: message }]);
    setLoading(true);
    const response = await axios.post("/api/chat", {
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });
    setMessages([
      ...messages,
      { role: "assistant", content: response.data.response.description },
    ]);
    console.log(messages);

    setLoading(false);
  };
  return (
    <div className=" flex p-6 items-center justify-center w-full h-full  flex-col gap-12 transition-all duration-300 ">
      {messages.length == 0 ? (
        <div className=" flex flex-col items-center gap-3 ">
          <h1 className=" text-5xl font-bold">What you want to build?</h1>
          <p className=" opacity-60">
            Start by describing what you want to create.
          </p>
        </div>
      ) : (
        <div className=" flex-1 flex flex-col gap-4  max-w-xl w-full px-6  ">
          {messages.map((message, index) => (
            <>
              {message.role === "user" ? (
                <div className=" bg-card px-3 py-4 rounded-lg flex  items-center gap-4 ">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className=" text-foreground/80 text-sm ">
                    {message.content}
                  </p>
                </div>
              ) : (
                <div className=" bg-card px-3 py-4 rounded-lg text-sm">
                  {message.content}
                </div>
              )}
            </>
          ))}

          {loading && <BouncingLoader />}
        </div>
      )}

      <form
        action=""
        className=" flex  max-w-xl w-full rounded-lg border  border-foreground/20"
        onSubmit={handleSubmit}
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name=""
          id=""
          className="  p-4  w-full  resize-none  focus:outline-0 focus:ring-0"
          rows={4}
        />
        <div className=" flex items-center p-4">
          <Button type="submit" className=" cursor-pointer" disabled={!message}>
            <ArrowRight size={20} className=" text-black" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
