import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useAppContainer } from '../components/Context';
import { ref, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import ProductDetailsSection from '../components/productDetailsPage/ProductDetailsSection';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useAppContainer();

  return (
    <div>
      {products &&
        products.map(product => {
          if (product.id.toString() === id) {
            return <ProductDetailsSection key={product.id} product={product} />;
          }
        })}
    </div>
  );
};
export default ProductDetails;
