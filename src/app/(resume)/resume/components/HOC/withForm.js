import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import StepperFooter from '../StepperFooter';
import { useForm } from 'react-hook-form';
// import Resume from '@/components/Resume/Resume';
import { toast } from 'react-toastify';

const withForm = (WrapperComponent) => {
    const NewComponent = (props) => {
        const {
            onSubmit,
            required = false,
            state,
            activeState,
            steps,
            handleNext,
            ...rest
        } = props;
        const [activeStep, setActiveStep] = activeState;
        const form = useForm();
        const { handleSubmit, formState } = form;

        const isStepOptional = (step) => {
            return step === 1;
        };
        const handleSkip = () => {
            if (!isStepOptional(activeStep)) {
                // You probably want to guard against something like this,
                // it should never occur unless someone's actively trying to break something.
                throw new Error("You can't skip a step that isn't optional.");
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped((prevSkipped) => {
                const newSkipped = new Set(prevSkipped.values());
                newSkipped.add(activeStep);
                return newSkipped;
            });
        };
        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };
        // if has no error then go to next step
        useEffect(() => {
            if (formState.isSubmitSuccessful && !Array.isArray(state[0])) {
                handleNext();
            }
        }, [formState.isSubmitSuccessful, handleNext, state]);

        useEffect(() => {
            if (formState.errors?.skills) {
                toast.error('Please Added your skills');
            }
        }, [formState.errors]);

        console.log(Array.isArray(state[0]), required, state);
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    display={'flex'}
                    justifyContent={'space-between'}
                    flexWrap={'wrap'}
                    gap={5}
                >
                    <Grid flexGrow={1} flexBasis={800}>
                        <Box
                            style={{
                                width: '100%',
                                flexGrow: 'grow',
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: 40,
                                justifyContent: 'center',
                            }}
                        >
                            <WrapperComponent
                                state={state}
                                {...rest}
                                onSubmit={onSubmit}
                                useForm={{ ...form }}
                            />
                        </Box>
                    </Grid>
                    {/* <Resume /> */}
                </Grid>
                <StepperFooter
                    mt={7}
                    activeStep={activeStep}
                    steps={steps}
                    isStepOptional={isStepOptional}
                    handleNext={
                        Array.isArray(state[0]) && required
                            ? handleNext
                            : Array.isArray(state[0]) && !required
                                ? handleNext
                                : handleSubmit(onSubmit)
                    }
                    // handleNext={handleNext}
                    handleSkip={handleSkip}
                    handleBack={handleBack}
                />
            </form>
        );
    };

    return NewComponent;
};

export default withForm;
