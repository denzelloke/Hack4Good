import React, { useState } from 'react';
import { TextInput, Textarea, Button, Group, Box, Notification, Slider, Text } from '@mantine/core';
import { ProductRequestFormData } from '../types';

interface ProductRequestFormProps {
  onSubmit: (data: ProductRequestFormData) => void;
}

export function ProductRequestForm({ onSubmit }: ProductRequestFormProps) {
  const [formData, setFormData] = useState<ProductRequestFormData>({
    name: '',
    productName: '',
    quantity: 1,
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleChange = (field: keyof ProductRequestFormData) => (value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setNotification('Product request submitted successfully!');
      setFormData({
        name: '',
        productName: '',
        quantity: 1,
        description: '',
      });
    } catch (error) {
      setNotification('Failed to submit product request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ maxWidth: '500px', margin: '0 auto' }}>
      {notification && (
        <Notification
          color={notification.startsWith('Failed') ? 'red' : 'teal'}
          title={notification.startsWith('Failed') ? 'Error' : 'Success'}
          onClose={() => setNotification(null)}
        >
          {notification}
        </Notification>
      )}
      
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Full Name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => handleChange('name')(e.target.value)}
          required
          mb="md"
        />

        <TextInput
          label="Product Name"
          placeholder="Enter the product you're requesting"
          value={formData.productName}
          onChange={(e) => handleChange('productName')(e.target.value)}
          required
          mb="md"
        />

        <Slider
          label="Quantity"
          value={formData.quantity}
          onChange={(value) => handleChange('quantity')(value)}
          min={1}
          max={30}
          step={1}
          marks={[{ value: 1, label: '1'}, {value: 30, label: '30'}]}
          mb="md"
        />

        <Text style={{ textAlign: 'center' }} mt="xs">
            You request {formData.quantity} Items.
        </Text>

        <Textarea
          label="Description"
          placeholder="Provide additional details or requirements"
          value={formData.description}
          onChange={(e) => handleChange('description')(e.target.value)}
          mb="md"
        />

        <Group justify="center" mt="md">
          <Button type="submit" loading={loading}>Submit Request</Button>
        </Group>
      </form>
    </Box>
  );
}
