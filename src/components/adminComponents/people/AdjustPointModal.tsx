import { Modal, Button, Stack, Group, NumberInput, Text } from "@mantine/core";
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

  const handleAddPoints = (amount: number) => {
    setPoints((prevPoints) => prevPoints + amount);
  };

  const handleSave = () => {
    onSave({ ...user, points }); // Pass the updated user back to the parent
  };

  return (
    <Modal
      opened={true}
      onClose={onClose}
      title={`Adjust Points for ${user.username}`}
      centered
      size="md" // Make the modal larger
    >
      <Stack spacing="md">
        {/* Container for Points and Buttons, equally distributed */}
        <Group position="apart" noWrap style={{ display: 'flex', width: '100%' }}>
          {/* Left side: Points input, take 50% space */}
          <Stack align="flex-start" spacing="xs" style={{ flex: 1 }}>
            <Text size="lg" fw={700}>
              Points
            </Text>
            <NumberInput
              value={points}
              onChange={(value) => setPoints(value || 0)} // Handling possible null value
              min={0}
              hideControls
              styles={{
                input: {
                  textAlign: "center", // Center the text inside the input field
                  fontSize: "1.2rem", // Increase the font size for better readability
                  width: "100%", // Make the input field take up full width
                  padding: "10px", // Add padding for better visual balance
                },
              }}
            />
          </Stack>

          {/* Right side: Buttons, take 50% space */}
          <Stack spacing="xs" align="center" style={{ flex: 1 }}>
            <Button onClick={() => handleAddPoints(5)} variant="light" color="blue" style={{ width: "100%" }}>
              Add 5 Points
            </Button>
            <Button onClick={() => handleAddPoints(10)} variant="light" color="green" style={{ width: "100%" }}>
              Add 10 Points
            </Button>
            <Button onClick={() => handleAddPoints(20)} variant="light" color="orange" style={{ width: "100%" }}>
              Add 20 Points
            </Button>
          </Stack>
        </Group>

        {/* Save button */}
        <Button onClick={handleSave} fullWidth>
          Save
        </Button>
      </Stack>
    </Modal>
  );
}
