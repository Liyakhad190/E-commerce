import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { SearchX, RotateCcw } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onResetFilters, onSelectProduct }) {
  if (products.length === 0) {
    return (
      <Box
        sx={{
          py: 9,
          px: 3,
          textAlign: 'center',
          backgroundColor: '#F7F2E7',
          borderRadius: '24px',
          border: '1px dashed rgba(27, 51, 80, 0.22)',
          my: 4,
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'rgba(240, 58, 42, 0.12)',
            color: '#F03A2A',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2.5,
          }}
        >
          <SearchX size={40} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.2, color: '#1B3350' }}>
          No matching grocery essentials found
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 460, mx: 'auto', mb: 3.5, lineHeight: 1.6 }}>
          We couldn&apos;t find any products matching your search term or active category filters.
          Try clearing filters to explore our full artisanal pantry selection.
        </Typography>
        {onResetFilters && (
          <Button
            variant="contained"
            onClick={onResetFilters}
            startIcon={<RotateCcw size={17} />}
            sx={{
              backgroundColor: '#1B3350',
              color: '#F0E8D8',
              fontWeight: 800,
              px: 3.5,
              py: 1.2,
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: '#26456B',
              },
            }}
          >
            Reset All Filters
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(3, 1fr)',
        },
        gap: { xs: 2.5, sm: 3, md: 3 },
        width: '100%',
      }}
    >
      {products.map((product) => (
        <Box key={product.id} sx={{ height: '100%', minWidth: 0 }}>
          <ProductCard product={product} onSelectProduct={onSelectProduct} />
        </Box>
      ))}
    </Box>
  );
}
