import { Box } from '@mui/material';
import CTextArea from '../../companyProfile/formElement/CTextArea';

const Summary = ({ summary, setSummary, error, setError }) => {
    const handleSummaryChange = (e) => {
        let { value } = e.target;
        setSummary(value);
        setError({ ...error, summary: '' });
    };

    return (
        <Box>
            <CTextArea
                label="About your Background Summary"
                value={summary}
                onChange={handleSummaryChange}
                minRow={15}
                error={error?.summary}
            />
        </Box>
    );
};

export default Summary;
