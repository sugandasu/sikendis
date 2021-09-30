import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import React from "react";

interface DeleteDialogProps {
  deleteDialogOpen: boolean;
  deleteDialogCancel: React.MutableRefObject<undefined>;
  deleteDialogClose: () => void;
  currentRow: { id: number };
  dialogKey: string;
  deleteConfirm: any;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  deleteDialogOpen,
  deleteDialogCancel,
  deleteDialogClose,
  currentRow,
  dialogKey,
  deleteConfirm,
}) => {
  return (
    <AlertDialog
      isOpen={deleteDialogOpen}
      leastDestructiveRef={deleteDialogCancel}
      onClose={deleteDialogClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Konfirmasi Penghapusan
          </AlertDialogHeader>

          <AlertDialogBody>
            Apakah anda yakin menghapus data{" "}
            {currentRow ? currentRow[dialogKey] : null}? Penghapusan permanen
            tidak bisa dikembalikan.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={deleteDialogCancel} onClick={deleteDialogClose}>
              Batal
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                if (currentRow && currentRow?.id) {
                  deleteConfirm();
                }
                deleteDialogClose();
              }}
              ml={3}
            >
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
