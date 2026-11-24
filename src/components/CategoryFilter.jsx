import React from 'react';
import { Box, Chip } from '@mui/material';
import { Sparkles, Carrot, Milk, Wheat, Cookie, Coffee } from 'lucide-react';
import { CATEGORIES } from '../data/groceries';

const ICON_MAP = {
  Sparkles: Sparkles,
  Carrot: Carrot,
  Milk: Milk,
  Wheat: Wheat,
  Cookie: Cookie,
  Coffee: Coffee,
};

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.2,
        overflowX: 'auto',
        py: 0.8,
        maxWidth: '100%',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const IconComponent = ICON_MAP[cat.icon] || Sparkles;

        return (
          <Chip
            key={cat.id}
            icon={
              <IconComponent
                size={16}
                color={isSelected ? '#F0E8D8' : undefined}
                style={{ marginLeft: 6 }}
              />
            }
            label={cat.label}
            onClick={() => onSelectCategory(cat.id)}
            clickable
            sx={{
              px: 1.4,
              py: 2.3,
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '0.88rem',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: 'nowrap',
              boxShadow: isSelected ? '0 4px 14px rgba(27, 51, 80, 0.25)' : 'none',
              // 30% Prussian Blue when active, Ricotta elevated background when inactive
              backgroundColor: isSelected
                ? '#1B3350'
                : (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(240, 232, 216, 0.08)' : '#F7F2E7',
              color: isSelected
                ? '#F0E8D8'
                : (theme) =>
                    theme.palette.mode === 'dark' ? '#F0E8D8' : '#1B3350',
              border: isSelected
                ? '1px solid #1B3350'
                : (theme) =>
                    theme.palette.mode === 'dark'
                      ? '1px solid rgba(240, 232, 216, 0.18)'
                      : '1px solid rgba(27, 51, 80, 0.14)',
              '&:hover': {
                backgroundColor: isSelected ? '#122438' : 'rgba(240, 58, 42, 0.12)',
                borderColor: '#F03A2A',
                color: isSelected ? '#F0E8D8' : '#F03A2A',
                transform: 'translateY(-2px)',
                '& .MuiChip-icon': {
                  color: isSelected ? '#F0E8D8' : '#F03A2A',
                },
              },
              '&:active': {
                transform: 'scale(0.97)',
              },
              '& .MuiChip-icon': {
                color: isSelected
                  ? '#F0E8D8'
                  : (theme) =>
                      theme.palette.mode === 'dark' ? '#F0E8D8' : '#1B3350',
              },
            }}
          />
        );
      })}
    </Box>
  );
}
