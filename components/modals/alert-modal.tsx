import React, { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { Button } from "../ui/button";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}
const AlertModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  if (!isMounted) return null;
  return (
    <Modal
      title="Are you sure?"
      description="This action can be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} onClick={onClose} variant={"outline"}>
          Cancel
        </Button>{" "}
        <Button disabled={loading} onClick={onConfirm} variant={"destructive"}>
          Continue
        </Button>{" "}
      </div>
    </Modal>
  );
};

export default AlertModal;
