"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/store/dialogStore";
import LoginButton from "../auth/LoginButton";

const LoginDialog = () => {
  const { isOpen, setOpen } = useDialogStore();
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" text-center font-bold text-3xl">
            Login to continue using Bolt
          </DialogTitle>
          <DialogDescription className=" text-center">
            To continue creating your project, please login.
          </DialogDescription>
        </DialogHeader>
        <div className=" my-5">
          <LoginButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
