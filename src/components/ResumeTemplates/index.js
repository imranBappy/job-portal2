import CustomContainer from '@/common/CustomContainer'
import ResumeTemplateHeader from './ResumeTemplateHeader'
import ResumeTemplateList from './ResumeTemplateList'
import ResumeTemplateFeatures from './ResumeTemplateFeatures'

const ResumeTemplatesComponent = () => {

    return (
        <CustomContainer>
            <ResumeTemplateHeader />
            <ResumeTemplateList />
            <ResumeTemplateFeatures />
        </CustomContainer>
    )
}

export default ResumeTemplatesComponent