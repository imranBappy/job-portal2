import JobCardV2 from '@/components/Common/card/Job/JobCardV2';
import JobRowCardV2 from '@/components/Common/card/Job/JobRowCardV2';
import { Box } from '@mui/material';


const DisplayJobs = ({ handleRefetch = () => { }, layout = 'grid', data }) => {
    let content = null;

    switch (layout) {
        case 'grid':
            content = data?.map((job) => <JobCardV2 handleRefetch={handleRefetch} key={job?.id} job={job} />);
            break;
        default:
            content = data?.map((job) => (
                <JobRowCardV2 handleRefetch={handleRefetch} key={job?.id} job={job} />
            ));
    }



    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: {
                        xs: 'center',
                        md: 'flex-start',
                    },
                    flexWrap: 'wrap',
                    gap: '20px',
                }}
            >
                {content}
            </Box>
        </>
    );
};

export default DisplayJobs;
