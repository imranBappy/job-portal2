import CModal from '@/common/CModal';
import { Box } from '@mui/material';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import RenderTemplate from './RenderTemplate';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1100 },
        items: 3.5
    },
    smallDesktop: {
        breakpoint: { max: 1100, min: 820 },
        items: 2.5
    },
    tablet: {
        breakpoint: { max: 820, min: 630 },
        items: 1.8
    },
    mobile: {
        breakpoint: { max: 630, min: 480 },
        items: 1.2
    },
    smallMobile: {
        breakpoint: { max: 480, min: 0 },
        items: 1
    }
};

const ChangeTemplateModal = ({ open, setOpen, onTemplateSelect, currentTemplate, templateList }) => {

    const handleModalClose = () => {
        setOpen(false)
    }



    return (
        <CModal maxWidth="lg" style={{ width: "100vw" }} title="Choose Template" open={open} onClose={handleModalClose}>
            <Box sx={{ height: 450 }}>

                <Carousel showDots={true} dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px" responsive={responsive}>
                    {templateList.map((item) => {
                        return <Box key={`template_${item.id}`} mr={2}>
                            <RenderTemplate data={item} onTemplateSelect={onTemplateSelect} currentTemplate={currentTemplate} />
                        </Box>
                    })}

                </Carousel>

            </Box>

        </CModal >
    )
}

export default ChangeTemplateModal

