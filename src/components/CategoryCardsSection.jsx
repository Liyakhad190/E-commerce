import React from 'react';
import { Box, Typography } from '@mui/material';
import { CATEGORIES } from '../data/groceries';

export default function CategoryCardsSection({ selectedCategory, onSelectCategory }) {
  // Exclude 'all' for the visual category cards
  const displayCategories = CATEGORIES.filter((c) => c.id !== 'all');

  return (
    <Box sx={{ mb: { xs: 4.5, md: 6 } }}>
      <Box sx={{ mb: 2.5 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            color: '#F03A2A',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'block',
            mb: 0.4,
          }}
        >
          CURATED PANTRY SECTIONS
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: '#1B3350',
            fontSize: { xs: '1.4rem', sm: '1.75rem', md: '2rem' },
            lineHeight: 1.2,
          }}
        >
          Shop by Department
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.4, fontWeight: 500 }}>
          Explore our seasonal farm harvests, artisanal dairy, organic staples, and clean refreshments.
        </Typography>
      </Box>

      {/* Responsive Category Grid: 5 columns on desktop, 3 on tablet, 2 on mobile */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(5, 1fr)',
          },
          gap: { xs: 2, sm: 2.5 },
        }}
      >
        {displayCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <Box
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              sx={{
                cursor: 'pointer',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: isSelected ? '#1B3350' : '#F7F2E7',
                color: isSelected ? '#F0E8D8' : '#1B3350',
                border: isSelected
                  ? '2px solid #F03A2A'
                  : '1px solid rgba(27, 51, 80, 0.12)',
                boxShadow: isSelected
                  ? '0 8px 24px rgba(27, 51, 80, 0.2)'
                  : '0 2px 8px rgba(27, 51, 80, 0.04)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 24px rgba(27, 51, 80, 0.12)',
                  borderColor: '#F03A2A',
                },
              }}
            >
              <Box
                sx={{
                  height: 120,
                  width: '100%',
                  overflow: 'hidden',
                  backgroundColor: '#EDE4D1',
                }}
              >
                <Box
                  component="img"
                  src={cat.image}
                  alt={cat.label}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.35s ease',
                    '&:hover': {
                      transform: 'scale(1.08)',
                    },
                  }}
                />
              </Box>

              <Box sx={{ p: 1.5, textAlign: 'center' }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    color: isSelected ? '#F0E8D8' : '#1B3350',
                  }}
                >
                  {cat.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: isSelected ? 'rgba(240, 232, 216, 0.75)' : '#F03A2A',
                    fontWeight: 700,
                    display: 'block',
                    mt: 0.2,
                  }}
                >
                  Explore Items &rarr;
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
