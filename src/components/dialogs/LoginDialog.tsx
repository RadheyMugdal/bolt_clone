import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginButton from "../auth/LoginButton";

const LoginDialog = ({
  loaginDialogOpen,
  setLoginDialogOpen,
}: {
  loaginDialogOpen: boolean;
  setLoginDialogOpen: (value: boolean) => void;
}) => {
  return (
    <Dialog open={loaginDialogOpen} onOpenChange={setLoginDialogOpen}>
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
