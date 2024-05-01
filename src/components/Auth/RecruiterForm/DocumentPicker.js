import { getSizeInKb } from '@/utils';
import { Box } from '@mui/material';
import toast from 'react-hot-toast';

const DocumentPicker = ({ onDocumentChange }) => {
    const handleImageChange = (e,) => {
        let file = e.target?.files[0];

        if (file?.size && getSizeInKb(file?.size) <= 400) {

            onDocumentChange(file)
        } else {
            toast.error(`Document is too large. Maximum size: 400KB`);
        }
    };

    return (
        <Box sx={{ border: 1, borderRadius: 100, height: "48px", borderColor: "#c4c4c4", display: 'flex', alignItems: 'center', pl: 2, pr: 0.3, justifyContent: 'flex-end', mb: 2 }}>
            <label htmlFor={`profile_image_picker`}>
                <div className="profile_image_picker_icon">
                    <input
                        id={`profile_image_picker`}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />

                    <Box sx={{
                        fontWeight: 'bold', fontSize: "14px", borderRadius: 10, px: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: "42px", bgcolor: 'primary.main', color: 'white', "&:hover": {
                            bgcolor: "primary.dark"
                        }
                    }}>
                        Choose File
                    </Box>
                </div>
            </label>
        </Box>
    )
}

export default DocumentPicker