import CSelect from '@/common/CSelect';
import Toaster from '@/common/Toaster';
import CInput from '@/components/companyProfile/formElement/CInput';
import {
    ADD_SOCIAL_MEDIA_LINKS,
    DELETE_RESUME_ITEM,
} from '@/graphql/resume/resumeMutation';
import { useMutation } from '@apollo/client';
import { Add, Edit } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import AddNewSecion from '../AddNewSecion/AddNewSecion';
import { validateUrl } from '@/utils';

const SOCIAL_MEDIA_LIST = [
    { name: 'Facebook', value: 'facebook' },
    { name: 'LinkedIn', value: 'linkedIn' },
    { name: 'Github', value: 'github' },
    { name: 'Twitter', value: 'twitter' },
    { name: 'Instagram', value: 'instagram' },
];

const AddLink = ({
    setSocialMediaLinks,
    socialMediaLinks,
    setSocialMediaLinksId,
}) => {
    const [error, setError] = useState({});
    const [openLinks, setOpenLinks] = useState(true);
    const [socialMediatempObj, setSocialMediaTempObj] = useState({
        name: '',
        urlLink: '',
    });

    const [deleteSocialMedia] = useMutation(DELETE_RESUME_ITEM, {
        onCompleted: (res) => {
            Toaster({
                type: 'success',
                message: res.deleteItem.message,
            });
        },
        onError: (err) => {
            Toaster({
                message: err.message,
                type: 'error',
            });
        },
    });

    const [addSocialMediaLinks, { loading }] = useMutation(
        ADD_SOCIAL_MEDIA_LINKS,
        {
            onCompleted: (res) => {
                if (socialMediatempObj?.id) {
                    setSocialMediaLinks((prev) => prev.map((item) => item.id === socialMediatempObj?.id ? socialMediatempObj : item));
                }
                else {
                    setSocialMediaLinksId((prev) => [
                        ...prev,
                        res?.cudSocialMediaLinks?.obj?.id,
                    ]);

                    setSocialMediaLinks((prev) => [
                        ...prev,
                        {
                            name: socialMediatempObj.name,
                            urlLink: socialMediatempObj.urlLink,
                            id: res?.cudSocialMediaLinks?.obj?.id,
                        },
                    ]);
                }

                setSocialMediaTempObj({
                    urlLink: '',
                    name: '',
                });
            },
            onError: (error) => {
                if (error?.graphQLErrors[0]?.extensions?.errors) {
                    setError(error.graphQLErrors[0].extensions.errors);
                } else {
                    Toaster({
                        message: error.message,
                        type: 'error',
                    });
                }
            },
        },
    );

    const socialMediaLinksFieldInputChange = (e) => {
        let { name, value } = e.target;

        setSocialMediaTempObj({ ...socialMediatempObj, [name]: value });
        setError({ ...error, [name]: '' });
    };

    const onSocialMediaHandler = () => {
        if (!socialMediatempObj.name) {
            setError({ ...error, name: 'This field is required.' });
            return;
        }
        if (!socialMediatempObj.urlLink) {
            setError({ ...error, urlLink: 'This field is required.' });
            return;
        }

        if (socialMediatempObj.urlLink && !validateUrl(socialMediatempObj.urlLink)) {
            setError({ ...error, urlLink: "Enter a valid URL." });
            return
        }

        addSocialMediaLinks({
            variables: {
                input: socialMediatempObj,
            },
        });
    };

    const handleDeleteSocialMediadObj = (id) => {
        deleteSocialMedia({
            variables: {
                modelName: 'socialmedialinks',
                ids: [id],
            },
        }).then(() => {
            setSocialMediaLinksId((prev) => prev.filter((e) => e !== id));
            setSocialMediaLinks((prev) => prev.filter((e) => e.id !== id));
        });
    };

    const getSocialMediaList = () => {
        let temp = socialMediaLinks?.map((item) => item.name)

        const socialLinks = []
        for (let i = 0; i < SOCIAL_MEDIA_LIST.length; i++) {
            const element = SOCIAL_MEDIA_LIST[i];
            if (!temp.includes(element.value)) {
                socialLinks.push(element)
            }
        }

        return socialLinks
    }

    const handleEditSocialMedia = (data) => {
        setSocialMediaTempObj({
            name: data.name,
            urlLink: data.urlLink,
            id: data.id
        })
    }

    return (
        <Box mt={5}>
            <AddNewSecion
                openLinks={openLinks}
                setOpenLinks={setOpenLinks}
                label="Add Social Link"
            />
            {openLinks ? (
                <Box mb={5}>

                    {socialMediaLinks.map((item, key) => {
                        return (
                            <Box
                                key={`social_media_links_${key}`}
                                sx={{
                                    display: 'flex',
                                    mb: 3,
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <CInput
                                    boxStyle={{ width: '100%' }}
                                    value={item.name ?? ''}
                                    disabled={true}
                                />
                                <CInput
                                    boxStyle={{ width: '100%' }}
                                    value={item.urlLink ?? ''}
                                    disabled={true}
                                />
                                <IconButton
                                    onClick={() =>
                                        handleEditSocialMedia(item)
                                    }
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    onClick={() =>
                                        handleDeleteSocialMediadObj(item.id)
                                    }
                                >
                                    <RiDeleteBinLine />
                                </IconButton>
                            </Box>
                        );
                    })}
                    <Box
                        sx={{
                            display: 'flex',
                            mb: 2,
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <CSelect
                            boxStyle={{ width: '100%', mt: error?.name ? 2 : 0 }}
                            label="Social Website"
                            name="name"
                            listData={socialMediatempObj?.id ? SOCIAL_MEDIA_LIST : getSocialMediaList()}
                            value="value"
                            display="name"
                            disabled={socialMediatempObj?.id}
                            selectValue={socialMediatempObj.name}
                            onChange={socialMediaLinksFieldInputChange}
                            error={error?.name}
                        />
                        <CInput
                            label="Social Links"
                            name="urlLink"
                            boxStyle={{ width: '100%', mt: error?.urlLink ? 2 : 0 }}
                            value={socialMediatempObj.urlLink}
                            onChange={socialMediaLinksFieldInputChange}
                            error={error?.urlLink}
                        />
                        <Box
                            sx={{
                                height: '40px',
                                minWidth: '40px',
                            }}
                        />
                    </Box>
                    <IconButton
                        disabled={loading}
                        onClick={onSocialMediaHandler}
                        sx={{
                            color: 'common.blue',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            fontSize: '14px',
                            borderRadius: 0,
                        }}
                    >
                        <Add />
                        Save & add more social links
                    </IconButton>
                </Box>
            ) : null}
        </Box>
    );
};

export default AddLink;
