import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../backend/authProvider";  
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Text,
  Container,
  Radio,
  Paper,
  Title,
  Divider,
} from "@mantine/core";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [isAdmin, setIsAdmin] = useState<string>("user");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await login(username, password, isAdmin === "admin");
      if (isAdmin === "admin") {
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
      <Paper
        radius="md"
        p="xl"
        withBorder
        shadow="md"
        style={{ backgroundColor: "#f9fafc" }}
      >
        <Title align="center" order={2} mb="lg">
          Welcome Back!
        </Title>


        <form onSubmit={handleSubmit}>
          <Radio.Group
            label="Login as"
            value={isAdmin}
            onChange={(value) => setIsAdmin(value)}
            mb="lg"
          >
            <Group position="center" spacing="xl">
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
            size="md"
            mb="lg"
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            size="md"
            mb="lg"
          />

          {error && (
            <Text color="red" size="sm" align="center" mb="lg">
              {error}
            </Text>
          )}

          <Button fullWidth type="submit" loading={loading} mt="lg" size="md">
            Login
          </Button>
        </form>
      </Paper>

      <Text align="center" size="sm" mt="md" color="dimmed">
        Don’t have an account? <Text component="a" color="blue">Contact your admin.</Text>
      </Text>
    </Container>
  );
}
