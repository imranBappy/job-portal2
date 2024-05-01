import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Button from '../../UI/Button';
import Image from 'next/image';
import Link from 'next/link';

const NewsCard = (props) => {
    const { thumbnailUrl, title, content, category, id
    } = props.news;
    const sliceContent = content?.slice(0, 100) + '...';


    return (
        <Card sx={{
            flexBasis: 370,
            flexGrow: 1,
            maxWidth: 460,
            boxShadow: 'none',
            border: '1px solid rgba(11, 11, 29, 0.10)',
            borderRadius: '12px',
            '&:hover': {
                boxShadow: '0 0 11px rgba(33,33,33,.2)',
            },
        }}>
            <CardActionArea>
                <CardMedia sx={{ margin: 2, }}  >
                    <Image
                        width={365}
                        height={365}
                        alt="Blog Image"
                        style={{
                            borderRadius: "6px",
                            border: "1px solid #1C3E5E50",
                            width: "100%",
                        }}
                        src={thumbnailUrl || '/images/default-image.jpg'}
                    />
                </CardMedia>
                <CardContent>
                    <Typography mb={2} sx={{
                        bgcolor: "#FEF7E3",
                        py: '5px',
                        px: '5px',
                        display: 'inline-block',
                    }} variant='p' fontWeight={600} fontSize={16} component="div">
                        {category?.name}
                    </Typography>

                    <Typography color="black" gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography fontSize={"16px"} variant="body2" color="text.secondary">
                        {sliceContent}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Link
                        href={`/blog/${id}`}
                    >
                        <Button
                            style={{
                                mb: '1rem',
                                mx: '10px',
                                padding: '15px 50px',
                                borderWeight: '2px',
                                borderColor: 'primary.main',
                                color: "black",
                                '&:hover': {
                                    bgcolor: 'common.blue',
                                    color: 'white',
                                },
                            }}
                            variant='outlined' color='black' label="Read More" />

                    </Link>
                </CardActions>
            </CardActionArea>

        </Card>
    );
};

export default NewsCard;