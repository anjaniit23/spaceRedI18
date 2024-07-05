import { Button } from "@sprinklrjs/spaceweb/button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@sprinklrjs/spaceweb/modal";
import { Snackbar } from "@sprinklrjs/spaceweb/snackbar";
import { useState } from "react";

export function CodemodModal({
  onClose,
  codemod,
}: {
  onClose: () => void;
  codemod: string;
}) {
  const [message, setMessage] = useState<string>();
  return (
    <Modal onClose={onClose} isOpen size="md" animate>
      <ModalHeader noBorder>Codemod</ModalHeader>
      <ModalBody>
        <pre> {codemod} </pre>
      </ModalBody>
      <ModalFooter noBorder>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(codemod);
            setMessage("Copied to clipboard");
          }}
        >
          copy
        </Button>
      </ModalFooter>
      <Snackbar message={message} />
    </Modal>
  );
}
