import React, { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  searchTerm,
  onSearchChange,
  placeholder = 'Search farm produce, dairy, staples, snacks...',
}) {
  const [internalVal, setInternalVal] = useState(searchTerm || '');

  // Debounce input to notify parent
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(internalVal);
    }, 220);

    return () => clearTimeout(handler);
  }, [internalVal, onSearchChange]);

  // Keep in sync if parent resets
  useEffect(() => {
    setInternalVal(searchTerm || '');
  }, [searchTerm]);

  const handleClear = () => {
    setInternalVal('');
    onSearchChange('');
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={internalVal}
        onChange={(e) => setInternalVal(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ pl: 0.5, mr: 1 }}>
                <Search size={18} color="#1B3350" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" sx={{ pr: 0.5 }}>
                {internalVal ? (
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    aria-label="Clear search input"
                    sx={{
                      color: 'text.secondary',
                      p: 0.4,
                      '&:hover': {
                        color: '#F03A2A',
                      },
                    }}
                  >
                    <X size={16} />
                  </IconButton>
                ) : (
                  <Box
                    component="span"
                    sx={{
                      display: { xs: 'none', sm: 'inline-flex' },
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: 0.9,
                      py: 0.2,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      borderRadius: '6px',
                      backgroundColor: 'rgba(27, 51, 80, 0.08)',
                      color: 'text.secondary',
                      userSelect: 'none',
                    }}
                  >
                    /
                  </Box>
                )}
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '14px',
            backgroundColor: '#FDFBF7', // Clean, elevated card surface
            color: '#1B3350',
            border: '1px solid rgba(240, 232, 216, 0.35)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            '&:hover': {
              borderColor: '#F03A2A',
              boxShadow: '0 3px 12px rgba(27, 51, 80, 0.12)',
            },
            '&.Mui-focused': {
              borderColor: '#F03A2A',
              boxShadow: '0 0 0 3px rgba(240, 58, 42, 0.2)',
            },
          },
          '& .MuiInputBase-input': {
            fontSize: '0.92rem',
            fontWeight: 500,
            py: 1.15,
            color: '#1B3350',
            '&::placeholder': {
              color: 'rgba(27, 51, 80, 0.6)',
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  );
}
