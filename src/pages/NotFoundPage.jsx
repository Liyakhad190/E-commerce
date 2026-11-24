import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ShoppingBasket, Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F0E8D8',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Minimal Header */}
      <Box
        sx={{
          backgroundColor: '#1B3350',
          py: 2,
          px: { xs: 2, md: 4 },
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box
          onClick={() => navigate('/')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              backgroundColor: '#F03A2A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShoppingBasket size={20} color="#FFFFFF" />
          </Box>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: '1.3rem',
              color: '#F0E8D8',
              letterSpacing: '-0.02em',
            }}
          >
            VegBasket
          </Typography>
        </Box>
      </Box>

      {/* 404 Content */}
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 6, md: 10 },
          textAlign: 'center',
        }}
      >
        {/* Illustration */}
        <Box
          sx={{
            width: { xs: 140, md: 180 },
            height: { xs: 140, md: 180 },
            borderRadius: '50%',
            backgroundColor: '#1B3350',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
            boxShadow: '0 20px 60px rgba(27, 51, 80, 0.2)',
            position: 'relative',
          }}
        >
          <ShoppingBasket size={72} color="#F0E8D8" strokeWidth={1.3} />
          {/* Red cross badge */}
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: '#F03A2A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(240, 58, 42, 0.5)',
            }}
          >
            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1rem', lineHeight: 1 }}>
              !
            </Typography>
          </Box>
        </Box>

        {/* 404 Number */}
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: { xs: '5rem', md: '8rem' },
            lineHeight: 1,
            color: '#1B3350',
            letterSpacing: '-0.04em',
            mb: 1,
            fontFamily: '"Playfair Display", Georgia, serif',
          }}
        >
          4
          <Box
            component="span"
            sx={{ color: '#F03A2A' }}
          >
            0
          </Box>
          4
        </Typography>

        {/* Error label */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: '#F03A2A',
            color: '#fff',
            px: 2,
            py: 0.5,
            borderRadius: '6px',
            mb: 3,
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Page Not Found
          </Typography>
        </Box>

        {/* Heading */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: '#1B3350',
            mb: 2,
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontFamily: '"Playfair Display", Georgia, serif',
          }}
        >
          Oops! This item got lost on its way from the farm!
        </Typography>

        {/* Subtext */}
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: 480,
            mx: 'auto',
            mb: 1.5,
            lineHeight: 1.7,
            fontSize: '1.05rem',
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back to the freshest picks in our pantry.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#F03A2A',
            fontWeight: 700,
            mb: 5,
            fontStyle: 'italic',
          }}
        >
          &ldquo;Looks like this item is out of stock from the web shelf!&rdquo;
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
            startIcon={<Home size={18} />}
            sx={{
              backgroundColor: '#1B3350',
              color: '#F0E8D8',
              fontWeight: 800,
              px: 3.5,
              py: 1.4,
              borderRadius: '14px',
              fontSize: '0.95rem',
              boxShadow: '0 6px 20px rgba(27, 51, 80, 0.25)',
              '&:hover': {
                backgroundColor: '#26456B',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 28px rgba(27, 51, 80, 0.35)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Back to Home
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/category/fruits-vegetables')}
            startIcon={<Search size={18} />}
            sx={{
              backgroundColor: '#F03A2A',
              color: '#FFFFFF',
              fontWeight: 800,
              px: 3.5,
              py: 1.4,
              borderRadius: '14px',
              fontSize: '0.95rem',
              boxShadow: '0 6px 20px rgba(240, 58, 42, 0.3)',
              '&:hover': {
                backgroundColor: '#D82F20',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 28px rgba(240, 58, 42, 0.45)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Explore Products
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(-1)}
            startIcon={<ArrowLeft size={18} />}
            sx={{
              borderColor: '#1B3350',
              color: '#1B3350',
              fontWeight: 700,
              px: 3,
              py: 1.4,
              borderRadius: '14px',
              fontSize: '0.95rem',
              borderWidth: 2,
              '&:hover': {
                borderColor: '#F03A2A',
                color: '#F03A2A',
                backgroundColor: 'rgba(240, 58, 42, 0.05)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Go Back
          </Button>
        </Box>

        {/* Decorative Divider */}
        <Box sx={{ mt: 7, display: 'flex', alignItems: 'center', gap: 2, opacity: 0.4 }}>
          <Box sx={{ height: 1, flex: 1, bgcolor: '#1B3350' }} />
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#1B3350', letterSpacing: '0.08em' }}>
            VEGBASKET
          </Typography>
          <Box sx={{ height: 1, flex: 1, bgcolor: '#1B3350' }} />
        </Box>
        <Typography variant="caption" sx={{ mt: 1.5, color: 'text.secondary', fontWeight: 500 }}>
          Fresh from the farm to your basket — just not this page.
        </Typography>
      </Container>
    </Box>
  );
}
