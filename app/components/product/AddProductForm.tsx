'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useCategories } from '@/hooks/useCategories';
import { addProductSchema, AddProductFormData } from '@/lib/validation';
import Image from 'next/image';

interface AddProductFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: categories } = useCategories();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AddProductFormData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
    },
  });

  const imageUrl = watch('image');

  const onSubmit = async (data: AddProductFormData) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Product data to submit:', data);
      
      alert('Product added successfully! (This is a mock data)');
      
      reset();
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Product"
      className="max-w-2xl text-black"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Title */}
        <Input
          label="Product Title *"
          {...register('title')}
          error={errors.title?.message}
          placeholder="Enter product title"
        />

        {/* Price */}
        <Input
          label="Price (USD) *"
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          error={errors.price?.message}
          placeholder="0.00"
        />

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            {...register('category')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none capitalize focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Image URL */}
        <Input
          label="Image URL *"
          {...register('image')}
          error={errors.image?.message}
          placeholder="https://example.com/image.jpg"
        />

        {/* Image Preview */}
        {imageUrl && !errors.image && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Preview
            </label>
            <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-contain"
                width={200}
                height={200}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
