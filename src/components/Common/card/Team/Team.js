import { Images } from "@/utils/imagePath";

const { Typography, Box } = require("@mui/material")
const { default: Image } = require("next/image")



const TeamCard = ({
    data
}) => {

    const { memberName,
        imageUrl,
        role,
        linkedin,
        instagram } = data;
    return (
        <Box
            flexShrink={0}
            display={'flex'}
            gap={.5}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            flexBasis={220}
            borderRadius={1}
            border="1px solid #D6DDEB"
            p={3}
        >
            <Box>
                <Image
                    style={{
                        borderRadius: '50%'
                    }}
                    src={imageUrl || Images.NO_IMAGE} width={80} height={80} alt="Team" />
            </Box>
            <Box>
                <Typography
                    variant="h6"
                    align="center"
                    fontSize={18}
                    mb={1}
                >
                    {memberName}
                </Typography>
                <Typography
                    fontSize={16}
                    variant="bodyNormal"
                    component={'p'}
                    align="center"
                >
                    {role}
                </Typography>
            </Box>
            <Box
                display={'flex'}
                gap={1}
            >

                <a href={linkedin}>

                    <Image src={'/icons/linkedin.svg'} width={16} height={16} alt="Team" />
                </a>

                <a href={instagram}>
                    <Image src={'/icons/instagram.svg'} width={16} height={16} alt="Team" />
                </a>

            </Box>
        </Box>
    )
}

export default TeamCard;