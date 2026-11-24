import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ProductCard from './ProductCard';

export default function GrocerySection({
  title,
  subtitle,
  badgeText,
  products = [],
  onViewAll,
  viewAllText = 'See All',
  onSelectProduct,
}) {
  if (!products || products.length === 0) return null;

  return (
    <Box sx={{ mb: { xs: 4.5, md: 6 } }}>
      {/* Section Header */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          mb: 2.5,
          gap: 1.5,
        }}
      >
        <Box>
          {badgeText && (
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: '#F03A2A', // 10% Lobster Red accent
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                mb: 0.4,
              }}
            >
              {badgeText}
            </Typography>
          )}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#1B3350', // 30% Prussian Blue
              fontSize: { xs: '1.4rem', sm: '1.75rem', md: '2rem' },
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.4, fontWeight: 500 }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        {onViewAll && (
          <Button
            size="small"
            onClick={onViewAll}
            sx={{
              color: '#F03A2A',
              fontWeight: 800,
              fontSize: '0.86rem',
              p: '4px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(240, 58, 42, 0.25)',
              backgroundColor: 'rgba(240, 58, 42, 0.05)',
              '&:hover': {
                backgroundColor: '#F03A2A',
                color: '#FFFFFF',
              },
            }}
          >
            {viewAllText} &rarr;
          </Button>
        )}
      </Box>

      {/* Grid: 4 cards on desktop, 3 on tablet, 2 on mobile */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: { xs: 2, sm: 2.5, md: 3 },
        }}
      >
        {products.map((product) => (
          <Box key={product.id} sx={{ height: '100%', minWidth: 0 }}>
            <ProductCard product={product} onSelectProduct={onSelectProduct} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
