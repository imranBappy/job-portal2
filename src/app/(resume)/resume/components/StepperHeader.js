import Button from '@/components/Common/UI/Button';
import CInput from '@/components/companyProfile/formElement/CInput';
import { ArrowBack, Done } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import "./style.css"


const StepperHeader = ({ activeStep, steps, isStepSkipped, setResumeName, resumeName }) => {
    const router = useRouter()

    const [innerWidth, setInnerWidth] = useState(0);
    const [isEditResumeName, setIsEditResumeName] = useState(false);


    const onKeyDown = (ev) => {
        if (ev.key === 'Enter') {
            setIsEditResumeName(false)

            ev.preventDefault();
        }
    };


    useEffect(() => {
        setInnerWidth(window.innerWidth);
        window.addEventListener('resize', () => {
            setInnerWidth(window.innerWidth);
        });
    }, [innerWidth]);

    return (
        <Box
            sx={{ borderBottom: 1, borderColor: "#1C3E5E4D", position: 'sticky', top: 0, zIndex: 990, bgcolor: 'white' }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '90%', margin: 'auto', alignItems: 'center', minHeight: 70, py: 1, gap: 2, height: 'auto', flexWrap: 'wrap' }}>
                <Button
                    onClick={() => router.push("/candidate/my_resume")}
                    style={{
                        background: 'transparent', color: 'black', border: 1, "&:hover": {
                            bgcolor: "primary.light",
                            borderColor: "primary.light",
                            boxShadow: "none",
                        }
                    }} label="Resume" startIcon={<ArrowBack />} />

                <Box className="resume_title_header">
                    <Box
                        className="resume_title"

                    >
                        {isEditResumeName ? (
                            <CInput
                                style={{ mt: 0 }}
                                value={resumeName}
                                onChange={(e) =>
                                    setResumeName(e.target.value)
                                }
                                size="small"
                                onKeyDown={onKeyDown}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setIsEditResumeName(
                                                        false,
                                                    )
                                                }
                                            >
                                                <Done />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        ) : (
                            <IconButton
                                onClick={() => setIsEditResumeName(true)}
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    borderRadius: 0,
                                    alignItems: 'center',
                                }}
                            >
                                <BiEdit />
                                <Typography sx={{ fontWeight: 700, fontSize: "24px" }}>
                                    {resumeName}
                                </Typography>
                            </IconButton>
                        )}
                    </Box>
                    <Stepper className="stepper_container" activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            // if (isStepSkipped(index)) {
                            //     stepProps.completed = false;
                            // }
                            return (
                                <Step key={index} {...stepProps}>
                                    <StepLabel {...labelProps}>
                                        {innerWidth < 755 ? '' : label}
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>
            </Box>

        </Box >
    );
};

export default StepperHeader;
