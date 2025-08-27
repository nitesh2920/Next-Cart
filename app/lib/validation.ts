import { z } from 'zod';

export const addProductSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  price: z
    .number()
    .min(0.01, 'Price must be greater than 0')
    .max(10000, 'Price must be less than $10,000'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  category: z
    .string()
    .min(1, 'Please select a category'),
  image: z
    .string()
    .url('Please enter a valid image URL')
    .refine(
      (url) => {
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
        return imageExtensions.test(url) || url.includes('placeholder') || url.includes('picsum');
      },
      'Image URL must end with .jpg, .jpeg, .png, .gif, or .webp'
    ),
});

export type AddProductFormData = z.infer<typeof addProductSchema>;
