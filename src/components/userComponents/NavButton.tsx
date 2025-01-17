import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

interface NavButtonProps {
  label: string;
  route: string;
}

export default function NavButton({ label, route }: NavButtonProps){
  const navigate = useNavigate();

  const onClick = () => {
    navigate(route); 
  };

  return (
    <Button onClick={onClick}>
      {label}
    </Button>
  );
}
