'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Box, Input, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { Images } from '@/utils/imagePath';
import { getSizeInKb } from '@/utils';
import toast from 'react-hot-toast';
export default function UploadProfileImg({ existingImage, onChange }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleImageUpload = (file) => {


        if (file?.size && getSizeInKb(file?.size) <= 400) {
            onChange(file);
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);

        } else {
            toast.error(`Image is too large. Maximum size: 400KB`);
        }


    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDraggingOver(false);
        const file = event.dataTransfer.files[0];
        handleImageUpload(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };
    return (
        <>
            <Box
                className="App"
                maxWidth={550}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                flexWrap={'wrap'}
                gap={4}
                sx={{
                    '& .upload-container': {
                        border: '3px dashed #4640DE',
                        borderRadius: '10px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        backgroundColor: '#f8f8fd',
                        '&.drag-over': {
                            backgroundColor: '#f7f7f7',
                            border: '1px dashed #0A00FF',
                        },
                    },
                }}
            >
                <Box
                    flexBasis={130}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Image
                        style={{
                            borderRadius: '50%',
                            border: '1px solid #0A00FF',
                            objectFit: 'cover',
                        }}
                        width={130}
                        height={130}
                        src={
                            selectedImage || existingImage
                                ? selectedImage || existingImage
                                : Images.NO_IMAGE
                        }
                        alt="Preview"
                    />
                </Box>
                <Box
                    component={'label'}
                    htmlFor="image-input"
                    flexBasis={'250'}
                    flexGrow={1}
                >
                    <Box
                        className={`upload-container ${isDraggingOver ? 'drag-over' : ''
                            }`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                handleImageUpload(e.target.files[0])
                            }
                            id="image-input"
                        />

                        <ImageIcon color="primary" />
                        {/* show text in one line */}
                        <p>
                            <span
                                style={{
                                    color: '#0A00FF',
                                    fontSize: '1rem',
                                }}
                            >
                                Click to replace
                            </span>{' '}
                            or drag and drop{' '}
                        </p>
                        <Typography fontSize={'1rem'} color="grey">
                            SVG, PNG, JPG or GIF (max. 400 x 400px)
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
