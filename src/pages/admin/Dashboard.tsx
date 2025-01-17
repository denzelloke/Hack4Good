import { Card, Text, Grid, Group, Button, Divider } from "@mantine/core";
import { IconUsers, IconFileText, IconBox } from "@tabler/icons-react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  // Placeholder data for the overview statistics (these could come from your API)
  const overviewData = {
    peopleCount: 120,   // Number of people
    transactionCount: 450,   // Number of transactions
    inventoryCount: 58,    // Number of items in inventory
  };
  const navigate = useNavigate();
  
  return (
    <div style={{ padding: '20px' }}>
      <Text align="center" size="xl" weight={600} style={{ marginBottom: '20px' }}>
        Dashboard Overview
      </Text>

      <Grid>
        {/* People Overview */}
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg">
            <Group justify="space-between">
              <Group>
                <IconUsers size={40} color="#4caf50" />
                <Text size="lg" weight={500}>People</Text>
              </Group>
              <Text size="xl" weight={700}>{overviewData.peopleCount}</Text>
            </Group>
            <Divider my="sm" />
            <Text size="sm" color="dimmed">Total number of people in the system</Text>
            <Button onClick={() => navigate("/admin/people")} variant="light" color="green" fullWidth style={{ marginTop: '10px' }}>
              View People
            </Button>
          </Card>
        </Grid.Col>

        {/* Transactions Overview */}
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg">
            <Group justify="space-between">
              <Group>
                <IconFileText size={40} color="#2196f3" />
                <Text size="lg" weight={500}>Transactions</Text>
              </Group>
              <Text size="xl" weight={700}>{overviewData.transactionCount}</Text>
            </Group>
            <Divider my="sm" />
            <Text size="sm" color="dimmed">Total number of transactions</Text>
            <Button onClick={() => navigate("/admin/transactions")} variant="light" color="blue" fullWidth style={{ marginTop: '10px' }}>
              View Transactions
            </Button>
          </Card>
        </Grid.Col>

        {/* Inventory Overview */}
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg">
            <Group justify="space-between">
              <Group>
                <IconBox size={40} color="#ff9800" />
                <Text size="lg" weight={500}>Inventory</Text>
              </Group>
              <Text size="xl" weight={700}>{overviewData.inventoryCount}</Text>
            </Group>
            <Divider my="sm" />
            <Text size="sm" color="dimmed">Total number of items in inventory</Text>
            <Button onClick={() => navigate("/admin/inventory")} variant="light" color="orange" fullWidth style={{ marginTop: '10px' }}>
            View Inventory
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}
