import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../backend/authProvider";  
import { TextInput, PasswordInput, Button, Group, Text, Container, Radio } from "@mantine/core";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [userType, setUserType] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await login(username, password, userType);
      if (userType === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Container size={420} my={40}>
      <Text size="xl">
        Welcome to the Login Page
      </Text>
      <form onSubmit={handleSubmit}>
        <Radio.Group
          label="Login as"
          value={userType}
          onChange={(value) => setUserType(value as "user" | "admin")}
          mb="lg"
        >
          <Group>
            <Radio value="user" label="User" />
            <Radio value="admin" label="Admin" />
          </Group>
        </Radio.Group>

        <TextInput
          label="Username"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          mb="lg"
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mb="lg"
        />

        {error && <Text color="red" size="sm">{error}</Text>}

        <Button fullWidth type="submit" loading={loading} mt="xl">
          Login
        </Button>
      </form>
    </Container>
  );
}
