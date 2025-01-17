import { Modal, TextInput, Button, Stack } from "@mantine/core";
import { useState } from "react";
import { User } from "../../../types";

interface AdjustPointsModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

export default function AdjustPointsModal({
  user,
  onClose,
  onSave,
}: AdjustPointsModalProps) {
  const [points, setPoints] = useState<number>(user.points);

  const handleSave = () => {
    onSave({ ...user, points }); // Pass the updated user back to the parent
  };

  return (
    <Modal
      opened={true}
      onClose={onClose}
      title={`Adjust Points for ${user.username}`}
      centered
    >
      <Stack spacing="md">
        <TextInput
          label="Points"
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.currentTarget.value))}
        />
        <Button onClick={handleSave} fullWidth>
          Save
        </Button>
      </Stack>
    </Modal>
  );
}
