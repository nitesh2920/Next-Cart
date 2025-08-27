'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AddProductForm } from './AddProductForm';

export const AddProductButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add Product</span>
      </Button>

      <AddProductForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
