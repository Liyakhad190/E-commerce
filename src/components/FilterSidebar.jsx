import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Chip,
  Slider,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
} from '@mui/material';
import {
  RotateCcw,
  Sparkles,
  Carrot,
  Milk,
  Wheat,
  Cookie,
  Coffee,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { CATEGORIES, GROCERY_ITEMS } from '../data/groceries';

const ICON_MAP = {
  Sparkles: Sparkles,
  Carrot: Carrot,
  Milk: Milk,
  Wheat: Wheat,
  Cookie: Cookie,
  Coffee: Coffee,
};

export default function FilterSidebar({
  selectedCategory = 'all',
  onSelectCategory,
  priceRange = [0, 1000],
  onPriceChange,
  minRating = 0,
  onRatingChange,
  minDiscount = 0,
  onDiscountChange,
  inStockOnly = false,
  onInStockChange,
  selectedTag = '',
  onSelectTag,
  onResetAll,
}) {
  const categoryCounts = React.useMemo(() => {
    const counts = { all: GROCERY_ITEMS.length };
    GROCERY_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const popularTags = [
    'Organic',
    'GI Tagged',
    'Pesticide Free',
    'A2 Beta-Casein',
    'High Protein',
    'Gluten Free',
    'Zero Sugar',
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#F7F2E7', // Ricotta elevated surface
        borderRadius: '20px',
        border: '1px solid rgba(27, 51, 80, 0.14)',
        p: 2.5,
        boxShadow: '0 4px 16px rgba(27, 51, 80, 0.04)',
      }}
    >
      {/* Sidebar Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 800,
            color: '#1B3350',
            letterSpacing: '-0.01em',
            fontSize: '1.05rem',
          }}
        >
          Filters &amp; Refinements
        </Typography>

        <Button
          size="small"
          onClick={onResetAll}
          startIcon={<RotateCcw size={13} />}
          sx={{
            fontWeight: 700,
            fontSize: '0.74rem',
            color: '#F03A2A',
            p: '2px 8px',
            borderRadius: '6px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(240, 58, 42, 0.1)',
            },
          }}
        >
          Reset All
        </Button>
      </Box>

      <Divider sx={{ mb: 2.5, borderColor: 'rgba(27, 51, 80, 0.1)' }} />

      {/* 1. Category Department Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'text.secondary',
            display: 'block',
            mb: 1.2,
          }}
        >
          Categories
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const IconComp = ICON_MAP[cat.icon] || Sparkles;
            const count = categoryCounts[cat.id] || 0;

            return (
              <Box
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: '7px 12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#1B3350' : 'transparent',
                  color: isSelected ? '#F0E8D8' : '#1B3350',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    backgroundColor: isSelected ? '#122438' : 'rgba(240, 58, 42, 0.08)',
                    color: isSelected ? '#F0E8D8' : '#F03A2A',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <IconComp size={16} color={isSelected ? '#F0E8D8' : '#F03A2A'} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isSelected ? 800 : 600,
                      fontSize: '0.86rem',
                    }}
                  >
                    {cat.label}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    bgcolor: isSelected ? 'rgba(240, 232, 216, 0.18)' : 'rgba(27, 51, 80, 0.08)',
                    color: isSelected ? '#F0E8D8' : 'text.secondary',
                    px: 0.8,
                    py: 0.2,
                    borderRadius: '4px',
                  }}
                >
                  {count}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Divider sx={{ mb: 2.5, borderColor: 'rgba(27, 51, 80, 0.1)' }} />

      {/* 2. Price Range Slider */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'text.secondary',
            }}
          >
            Price Range
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#F03A2A' }}>
            ₹{priceRange[0]} – ₹{priceRange[1]}
          </Typography>
        </Box>

        <Box sx={{ px: 1 }}>
          <Slider
            value={priceRange}
            onChange={(_, val) => onPriceChange(val)}
            valueLabelDisplay="auto"
            min={0}
            max={700}
            step={25}
            sx={{
              color: '#F03A2A',
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                backgroundColor: '#FFFFFF',
                border: '2px solid #F03A2A',
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 8px rgba(240, 58, 42, 0.16)',
                },
              },
              '& .MuiSlider-rail': {
                backgroundColor: 'rgba(27, 51, 80, 0.2)',
              },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.2 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
            Min: ₹0
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
            Max: ₹700
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2.5, borderColor: 'rgba(27, 51, 80, 0.1)' }} />

      {/* 3. Customer Rating */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'text.secondary',
            display: 'block',
            mb: 1,
          }}
        >
          Customer Rating
        </Typography>

        <RadioGroup value={minRating} onChange={(e) => onRatingChange(Number(e.target.value))}>
          {[
            { val: 0, label: 'All Ratings' },
            { val: 4.8, label: '4.8 ★ & above' },
            { val: 4.5, label: '4.5 ★ & above' },
          ].map((r) => (
            <FormControlLabel
              key={r.val}
              value={r.val}
              control={<Radio size="small" sx={{ color: '#F03A2A', '&.Mui-checked': { color: '#F03A2A' }, py: 0.5 }} />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  {r.val > 0 && <Star size={13} fill="#F03A2A" color="#F03A2A" />}
                  <Typography variant="body2" sx={{ fontSize: '0.82rem', fontWeight: minRating === r.val ? 800 : 500 }}>
                    {r.label}
                  </Typography>
                </Box>
              }
              sx={{ m: 0 }}
            />
          ))}
        </RadioGroup>
      </Box>

      <Divider sx={{ mb: 2.5, borderColor: 'rgba(27, 51, 80, 0.1)' }} />

      {/* 4. Minimum Discount */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'text.secondary',
            display: 'block',
            mb: 1,
          }}
        >
          Minimum Discount
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
          {[
            { val: 0, label: 'Any' },
            { val: 10, label: '10%+ Off' },
            { val: 15, label: '15%+ Off' },
            { val: 20, label: '20%+ Off' },
          ].map((d) => {
            const isSelected = minDiscount === d.val;
            return (
              <Chip
                key={d.val}
                label={d.label}
                size="small"
                onClick={() => onDiscountChange(d.val)}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.74rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#F03A2A' : '#EDE4D1',
                  color: isSelected ? '#FFFFFF' : '#1B3350',
                  border: isSelected ? '1px solid #F03A2A' : '1px solid rgba(27, 51, 80, 0.12)',
                  '&:hover': {
                    backgroundColor: isSelected ? '#D82F20' : 'rgba(240, 58, 42, 0.12)',
                    color: isSelected ? '#FFFFFF' : '#F03A2A',
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Divider sx={{ mb: 2.5, borderColor: 'rgba(27, 51, 80, 0.1)' }} />

      {/* 5. Availability Checkbox */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'text.secondary',
            display: 'block',
            mb: 1,
          }}
        >
          Availability
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={inStockOnly}
              onChange={(e) => onInStockChange(e.target.checked)}
              sx={{ color: '#F03A2A', '&.Mui-checked': { color: '#F03A2A' }, py: 0.5 }}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <CheckCircle2 size={15} color="#10B981" />
              <Typography variant="body2" sx={{ fontSize: '0.84rem', fontWeight: 600 }}>
                In-Stock Only
              </Typography>
            </Box>
          }
          sx={{ m: 0 }}
        />
      </Box>

      <Divider sx={{ mb: 2.5, borderColor: 'rgba(27, 51, 80, 0.1)' }} />

      {/* 6. Popular Dietary / Quality Tags */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'text.secondary',
            display: 'block',
            mb: 1.2,
          }}
        >
          Quality &amp; Sourcing
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
          {popularTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onClick={() => onSelectTag(isSelected ? '' : tag)}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#1B3350' : '#EDE4D1',
                  color: isSelected ? '#F0E8D8' : '#1B3350',
                  border: isSelected ? '1px solid #1B3350' : '1px solid rgba(27, 51, 80, 0.12)',
                  '&:hover': {
                    backgroundColor: isSelected ? '#122438' : 'rgba(240, 58, 42, 0.12)',
                    color: isSelected ? '#F0E8D8' : '#F03A2A',
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
