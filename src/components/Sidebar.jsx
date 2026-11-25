import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Chip,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Sparkles,
  Carrot,
  Milk,
  Wheat,
  Cookie,
  Coffee,
  ShieldCheck,
  Truck,
  RotateCcw,
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

export default function Sidebar({
  selectedCategory,
  onSelectCategory,
  selectedTag,
  onSelectTag,
  onResetFilters,
}) {
  // Count items per category
  const categoryCounts = React.useMemo(() => {
    const counts = { all: GROCERY_ITEMS.length };
    GROCERY_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Collect popular tags
  const availableTags = [
    'Organic',
    'GI Tagged',
    'Pesticide Free',
    'A2 Beta-Casein',
    'High Protein',
    'Gluten Free',
    'No Added Sugar',
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#F7F2E7', // Ricotta elevated surface
        borderRadius: '20px',
        border: '1px solid rgba(27, 51, 80, 0.14)',
        p: 2.5,
        boxShadow: '0 4px 16px rgba(27, 51, 80, 0.05)',
        position: 'sticky',
        top: 96,
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 800,
            color: '#1B3350', // 30% Prussian Blue
            letterSpacing: '-0.01em',
            fontSize: '1.05rem',
          }}
        >
          Grocery Filters
        </Typography>

        {(selectedCategory !== 'all' || selectedTag) && (
          <Chip
            label="Reset"
            size="small"
            onClick={onResetFilters}
            icon={<RotateCcw size={12} />}
            sx={{
              fontWeight: 700,
              fontSize: '0.72rem',
              color: '#F03A2A',
              backgroundColor: 'rgba(240, 58, 42, 0.1)',
              border: '1px solid rgba(240, 58, 42, 0.25)',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#F03A2A',
                color: '#FFFFFF',
              },
            }}
          />
        )}
      </Box>

      <Divider sx={{ mb: 2, borderColor: 'rgba(27, 51, 80, 0.1)' }} />

      {/* Category List */}
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
        Departments
      </Typography>

      <List disablePadding sx={{ mb: 2.5 }}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const IconComponent = ICON_MAP[cat.icon] || Sparkles;
          const count = categoryCounts[cat.id] || 0;

          return (
            <ListItemButton
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              sx={{
                borderRadius: '12px',
                mb: 0.6,
                py: 0.9,
                px: 1.4,
                backgroundColor: isSelected ? '#1B3350' : 'transparent',
                color: isSelected ? '#F0E8D8' : '#1B3350',
                transition: 'all 0.18s ease',
                '&:hover': {
                  backgroundColor: isSelected ? '#122438' : 'rgba(240, 58, 42, 0.1)',
                  color: isSelected ? '#F0E8D8' : '#F03A2A',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  color: isSelected ? '#F0E8D8' : '#F03A2A',
                }}
              >
                <IconComponent size={18} />
              </ListItemIcon>
              <ListItemText
                primary={cat.label}
                primaryTypographyProps={{
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: '0.88rem',
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.74rem',
                  color: isSelected ? 'rgba(240, 232, 216, 0.8)' : 'text.secondary',
                  bgcolor: isSelected ? 'rgba(240, 232, 216, 0.15)' : 'rgba(27, 51, 80, 0.08)',
                  px: 0.9,
                  py: 0.2,
                  borderRadius: '6px',
                }}
              >
                {count}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ mb: 2.5, borderColor: 'rgba(27, 51, 80, 0.1)' }} />

      {/* Dietary & Quality Tags */}
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
        Dietary &amp; Quality
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 3 }}>
        {availableTags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onClick={() => onSelectTag(isSelected ? '' : tag)}
              sx={{
                fontWeight: 700,
                fontSize: '0.74rem',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: isSelected ? '#F03A2A' : '#EDE4D1',
                color: isSelected ? '#FFFFFF' : '#1B3350',
                border: isSelected ? '1px solid #F03A2A' : '1px solid rgba(27, 51, 80, 0.12)',
                transition: 'all 0.15s ease',
                '&:hover': {
                  backgroundColor: isSelected ? '#D82F20' : 'rgba(240, 58, 42, 0.15)',
                  color: isSelected ? '#FFFFFF' : '#F03A2A',
                },
              }}
            />
          );
        })}
      </Box>

      {/* Assurance Card */}
      <Box
        sx={{
          p: 2,
          borderRadius: '14px',
          backgroundColor: '#EDE4D1',
          border: '1px solid rgba(27, 51, 80, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Truck size={17} color="#F03A2A" />
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#1B3350' }}>
            Free Delivery above ₹100
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShieldCheck size={17} color="#10B981" />
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#1B3350' }}>
            100% Quality Replacement
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
