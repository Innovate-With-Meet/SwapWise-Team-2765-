import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const articleInfo = [
    {
        tag: 'Features',
        title: 'Top Features of PackPal',
        description: 'Explore the advanced features of PackPal that make inventory management seamless and efficient.',
        authors: [
            { name: 'Sophia Turner', avatar: '/static/images/avatar/9.jpg' },
            { name: 'Liam Johnson', avatar: '/static/images/avatar/10.jpg' },
        ],
    },
    {
        tag: 'Benefits',
        title: 'How PackPal Benefits Your Business',
        description: 'Discover how PackPal can save time, reduce errors, and improve overall inventory efficiency.',
        authors: [
            { name: 'Alice Johnson', avatar: '/static/images/avatar/3.jpg' },
            { name: 'Bob Brown', avatar: '/static/images/avatar/4.jpg' },
        ],
    },
    {
        tag: 'Case Study',
        title: 'How PackPal Helped ABC Corp',
        description: 'Learn how ABC Corp improved inventory accuracy by 40% using PackPal’s real-time tracking features.',
        authors: [
            { name: 'Jane Smith', avatar: '/static/images/avatar/5.jpg' },
            { name: 'Michael Lee', avatar: '/static/images/avatar/6.jpg' },
        ],
    },
    {
        tag: 'Updates',
        title: 'Latest Updates in PackPal',
        description: 'Stay informed about the latest features and enhancements in PackPal’s inventory management system.',
        authors: [
            { name: 'Chris Evans', avatar: '/static/images/avatar/7.jpg' },
            { name: 'Emma Watson', avatar: '/static/images/avatar/8.jpg' },
        ],
    },
    {
        tag: 'Guides',
        title: 'Getting Started with PackPal',
        description: 'A step-by-step guide to help you set up and start using PackPal for your inventory needs.',
        authors: [
            { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
        ],
    },
    {
        tag: 'Customer Stories',
        title: 'Success Stories with PackPal',
        description: 'Read inspiring stories from businesses that transformed their inventory processes with PackPal.',
        authors: [
            { name: 'Olivia Brown', avatar: '/static/images/avatar/11.jpg' },
            { name: 'Noah Wilson', avatar: '/static/images/avatar/12.jpg' },
        ],
    },
];

const StyledTypography = styled(Typography)(({ theme }) => ({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: (theme.vars || theme).palette.text.primary,
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
    position: 'relative',
    textDecoration: 'none',
    '&:hover': { cursor: 'pointer' },
    '& .arrow': {
        visibility: 'hidden',
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
    },
    '&:hover .arrow': {
        visibility: 'visible',
        opacity: 0.7,
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '3px',
        borderRadius: '8px',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: '1px',
        bottom: 0,
        left: 0,
        backgroundColor: (theme.vars || theme).palette.text.primary,
        opacity: 0.3,
        transition: 'width 0.3s ease, opacity 0.3s ease',
    },
    '&:hover::before': {
        width: '100%',
    },
}));

function Author({ authors }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                padding: '8px',
                borderRadius: '8px',
            }}
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
            >
                <AvatarGroup max={3}>
                    {authors.map((author, index) => (
                        <Avatar
                            key={index}
                            alt={author.name}
                            src={author.avatar}
                            sx={{ width: 24, height: 24 }}
                        />
                    ))}
                </AvatarGroup>
                <Typography variant="caption">
                    {authors.map((author) => author.name).join(', ')}
                </Typography>
            </Box>
            <Typography variant="caption">July 14, 2021</Typography>
        </Box>
    );
}

Author.propTypes = {
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            avatar: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export const Latest = () => {
    const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

    const handleFocus = (index) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <div>
            <Typography
                variant="h2"
                gutterBottom
                textAlign="center"
                sx={{
                    color: '#2e7d32', // Green color for the heading
                    fontWeight: 'bold',
                }}
            >
                Latest on PackPal
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    justifyContent: 'center',
                    my: 4,
                }}
            >
                {articleInfo.map((article, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 1,
                            width: { xs: '100%', sm: '45%', md: '30%' },
                            backgroundColor: '#e8f5e9', // Light green background
                            padding: 2,
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                backgroundColor: '#c8e6c9', // Darker green on hover
                            },
                        }}
                    >
                        <Typography
                            gutterBottom
                            variant="caption"
                            component="div"
                            sx={{
                                color: '#1b5e20', // Dark green for tags
                                fontWeight: 'bold',
                            }}
                        >
                            {article.tag}
                        </Typography>
                        <TitleTypography
                            gutterBottom
                            variant="h6"
                            onFocus={() => handleFocus(index)}
                            onBlur={handleBlur}
                            tabIndex={0}
                            className={focusedCardIndex === index ? 'Mui-focused' : ''}
                            sx={{
                                color: '#2e7d32', // Green for titles
                                '&:hover': {
                                    color: '#1b5e20', // Darker green on hover
                                },
                            }}
                        >
                            {article.title}
                            <NavigateNextRoundedIcon
                                className="arrow"
                                sx={{ fontSize: '1rem', color: '#2e7d32' }}
                            />
                        </TitleTypography>
                        <StyledTypography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                            sx={{
                                color: '#4caf50', // Medium green for descriptions
                            }}
                        >
                            {article.description}
                        </StyledTypography>

                        <Author authors={article.authors} />
                    </Box>
                ))}
            </Box>
        </div>
    );
};