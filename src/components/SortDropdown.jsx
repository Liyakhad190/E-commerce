import React from 'react';
import { Box, FormControl, Select, MenuItem, Typography } from '@mui/material';
import { ArrowUpDown } from 'lucide-react';

export default function SortDropdown({ sortBy, onSortChange }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <ArrowUpDown size={16} color="#1B3350" />
      <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', whiteSpace: 'nowrap' }}>
        Sort by:
      </Typography>
      <FormControl size="small">
        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          sx={{
            minWidth: 175,
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.86rem',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(240, 232, 216, 0.08)' : '#F7F2E7',
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(240, 232, 216, 0.2)'
                : '1px solid rgba(27, 51, 80, 0.16)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.2s ease',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover': {
              borderColor: '#F03A2A',
              boxShadow: '0 3px 10px rgba(27, 51, 80, 0.1)',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 2px rgba(240, 58, 42, 0.25)',
            },
          }}
        >
          <MenuItem value="featured" sx={{ fontWeight: 600, fontSize: '0.88rem' }}>
            Featured Essentials
          </MenuItem>
          <MenuItem value="price-asc" sx={{ fontWeight: 600, fontSize: '0.88rem' }}>
            Price: Low to High
          </MenuItem>
          <MenuItem value="price-desc" sx={{ fontWeight: 600, fontSize: '0.88rem' }}>
            Price: High to Low
          </MenuItem>
          <MenuItem value="rating" sx={{ fontWeight: 600, fontSize: '0.88rem' }}>
            Top Rated (Stars)
          </MenuItem>
          <MenuItem value="discount" sx={{ fontWeight: 600, fontSize: '0.88rem' }}>
            Biggest Savings
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
