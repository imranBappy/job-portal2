import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Button from "../../UI/Button";
import Link from "next/link";


const BlogCard = ({ blog, sx }) => {
    const { thumbnailUrl, title, content, category
    } = blog;

    const sliceContent = content?.slice(0, 100) + '...';

    return (<>
        <Box

            sx={{
                maxWidth: 350,
                flexGrow: 1,
                padding: "20px",
                borderRadius: "6px",
                border: "1px solid rgba(28, 62, 94, 0.50)",
                display: "flex",
                flexDirection: "column",
                gap: 5,
                ...sx
            }}


        >
            <Box >
                <Image
                    width={330}
                    height={330}
                    alt="Blog Image"
                    style={{
                        borderRadius: "6px",
                        border: "1px solid #1C3E5E50",
                        width: "100%",
                    }}
                    src={thumbnailUrl || '/images/default-image.jpg'}
                />

            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}
            >
                <Typography

                    style={{
                        width: "fit-content",
                        display: "flex",
                        background: "#FEF7E3",
                        padding: "3px 20px",
                        justifyContent: 'space-around',
                        border: '1px solid  rgba(28, 62, 94, 0.50)',
                        borderRadius: 5,
                        fontWeight: "700"

                    }}
                >
                    {category?.name}
                </Typography>
                <Typography
                    variant="h6"
                >
                    {title}
                </Typography>
                <Typography
                    variant="bodyNormal">
                    {sliceContent}
                </Typography>

            </Box>
            <Box>
                <Link href={`/blog/${blog?.id}`}>
                    <Button
                        variant='normal'
                        style={{
                            border: '1px solid  rgba(28, 62, 94, 0.50)',
                            borderRadius: '5px',
                            fontWeight: "700",
                            '&:hover': {
                                background: "#5D5BFF",
                                color: "#fff"
                            }
                        }}
                    >
                        Read More
                    </Button>
                </Link>
            </Box>
        </Box>

    </>)
}


export default BlogCard;