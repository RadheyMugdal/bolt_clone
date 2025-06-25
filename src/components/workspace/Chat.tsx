"use client";
import { Message } from "@/app/project/[id]/page";
import { Button } from "@/components/ui/button";
import { useGenerateInitialProject } from "@/hooks/ai/useGenerateInitialProject";
import { useGenerateProject } from "@/hooks/ai/useGenerateProject";
import { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import UserAvatar from "../auth/UserAvatar";
import BouncingLoader from "../global/BouncingLoader";

interface ChatProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[] | undefined>>;
  messages: Message[] | undefined;
  projectData?: SandpackBundlerFiles;
  setProjectData: React.Dispatch<
    React.SetStateAction<SandpackBundlerFiles | undefined>
  >;
}

const Chat: React.FC<ChatProps> = ({
  messages,
  setMessages,
  projectData,
  setProjectData,
}) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoading, data } = useGenerateInitialProject(messages);
  const { mutate } = useGenerateProject(
    setProjectData,
    setMessages,
    setLoading
  );
  useEffect(() => {
    if (!data) return;
    setMessages((prev: any) => [
      ...prev,
      { role: "assistant", message: data.messagesData.message },
    ]);
    setProjectData(data.files);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessages: Message[] = [
      ...(messages as Message[]),
      { role: "user", message: message.trim() },
    ];
    setMessages(newMessages as Message[]);
    setLoading(true);
    const payload: { role: "user"; content: string }[] = [
      { role: "user", content: message.trim() },
    ];
    setMessage("");
    if (projectData) {
      payload.push({
        role: "user",
        content: `Here is the project files: ${JSON.stringify(projectData)}`,
      });
    }

    await mutate(payload);
  };

  return (
    <div className="flex  w-full h-full px-16 py-4 gap-8  overflow-hidden items-center flex-col transition-all duration-300">
      {messages?.length === 0 ? (
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-5xl font-bold">What do you want to build?</h1>
          <p className="opacity-60">
            Start by describing what you want to create.
          </p>
        </div>
      ) : (
        <div className=" flex-1 flex flex-col gap-4  max-w-xl w-full px-6  overflow-y-scroll ">
          {messages?.map((message: any, index: any) => (
            <div key={index} className=" w-full ">
              {message.role === "user" ? (
                <div className="bg-card px-3 w-full  py-4 rounded-lg flex items-center gap-4">
                  <UserAvatar />
                  <p className="text-foreground/80 text-sm">
                    {message.message}
                  </p>
                </div>
              ) : (
                <div className="bg-card px-3 py-4 rounded-lg flex flex-col gap-4">
                  <p className="text-foreground/80 text-sm">
                    {message.message}
                  </p>
                </div>
              )}
            </div>
          ))}

          {(loading || isLoading) && <BouncingLoader />}
        </div>
      )}
      <form
        className="flex  max-w-xl  w-full rounded-lg border bg-input relative     "
        onSubmit={handleSubmit}
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-4 w-full  resize-none focus:outline-0 focus:ring-0"
          rows={4}
          placeholder="How can I help you?"
        />
        <div className="flex items-center p-4">
          <Button type="submit" disabled={!message.trim()}>
            <ArrowRight size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
