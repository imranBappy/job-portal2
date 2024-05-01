import Toaster from '@/common/Toaster';
import Button from '@/components/Common/UI/Button';
import CTextArea from '@/components/companyProfile/formElement/CTextArea';
import { Add, Delete, Done, Edit } from '@mui/icons-material';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useRef, useState } from 'react';

const AddResponsibilityComponent = ({ value, onChange, handleDelete, handleAdd }) => {
    return <Box sx={{ my: 2, }}>
        <CTextArea value={value} onChange={(e) => onChange(e.target.value)} style={{ maxHeight: 100, }} label="Responsibility" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 2 }}>
            <IconButton
                onClick={handleDelete}
                sx={{
                    height: 35,
                    width: 35,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 1,
                    bgcolor: 'rgba(255,77,79,.2)',
                    '&:hover': {
                        bgcolor: 'rgba(255,77,79,.3)',
                    },
                }}

            >
                <Delete sx={{ fontSize: 20, color: 'common.red' }} />
            </IconButton>
            <Button label="Add" sx={{ px: 3 }} onClick={handleAdd} />
        </Box>

    </Box>
}

const JobResponsibilitiesListAndDescription = ({ list, selectedList, handleAdd, designation, label, errorMessage, clearError }) => {
    const containerRef = useRef();

    const [showAddInput, setShowAddInput] = useState(false)
    const [responsibilityText, setResponsibilityText] = useState('')
    const [responsibilityEditId, setResponsibilityEditId] = useState('')


    const handleAddData = (item) => {
        let keyName = item.title;

        if (selectedList.includes(keyName)) {
            let temp = selectedList.filter((val) => val !== keyName);
            handleAdd(temp);
        } else {
            handleAdd([...selectedList, keyName]);
        }
        if (clearError) {
            clearError()
        }
    };

    const handleAddResponsible = () => {
        let val = responsibilityText.trim()

        if (!val) return

        if (!selectedList.includes(val)) {
            handleAdd([...selectedList, val]);
        }
        setShowAddInput(false)
        setResponsibilityText("")
        if (clearError) {
            clearError()
        }
    };

    const handleDeleteResponsibility = () => {
        let temp = selectedList.filter((val) => val !== responsibilityText);
        handleAdd(temp);
        setResponsibilityText("")
        setShowAddInput(false)
        setResponsibilityEditId("")
    };

    const handleUpdateResponsibilityText = () => {
        let val = responsibilityText.trim()

        if (!val) return

        selectedList[responsibilityEditId] = val
        setResponsibilityEditId("")
        setResponsibilityText("")
        setShowAddInput(false)
        if (clearError) {
            clearError()
        }
    };

    const handleEditResponsibility = (val, key) => {
        setResponsibilityText(val)
        setResponsibilityEditId(key)
        setShowAddInput(true)
    }

    const handleOpenAddResponsible = () => {
        if (!designation) {
            Toaster({
                type: "error",
                message: errorMessage || "Please select job title"
            })
        }
        else {
            const container = containerRef.current;
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
            setShowAddInput(true)
        }
    }


    return (
        <Grid container sx={{ display: "flex" }} spacing={3}>
            <Grid item xs={12} md={6}>

                <Box
                    sx={{
                        border: 1,
                        bgcolor: 'white',
                        borderRadius: 2,
                        borderColor: '#1C3E5E33',
                        height: 'auto',
                        maxHeight: 400,
                        overflow: 'auto',
                        height: 400,
                        mt: 4
                    }}
                >
                    <Box sx={{ borderBottom: 1, borderColor: '#1C3E5E33', position: 'sticky', top: 0, bgcolor: "white", p: 1.5, zIndex: 99 }}>
                        <Typography variant="subHeader3">
                            Showing results for <Typography variant="span" color="text.darkBlue" fontWeight={600}>{designation}</Typography>
                        </Typography>
                    </Box>

                    {designation && list?.length > 0 ? list.map((item, key) => (
                        <Box
                            key={`search_list_${key}`}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                borderBottom: 1,
                                borderColor: '#1C3E5E33',
                                p: 2,
                                cursor: 'pointer',
                            }}
                            onClick={() => handleAddData(item)}
                        >
                            <IconButton

                                sx={{
                                    height: 30,
                                    width: 50,
                                    borderRadius: 1,
                                    bgcolor: 'primary.main',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    fontSize: 14,
                                    '&:hover': {
                                        bgcolor: 'primary.main',
                                    },
                                }}
                            >
                                {selectedList.includes(
                                    item.title,
                                ) ? (
                                    <Done />
                                ) : (
                                    'ADD'
                                )}
                            </IconButton>
                            <Typography>
                                {item.title}
                            </Typography>
                        </Box>
                    )) :
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "80%" }}>
                            <Typography sx={{ fontSize: 14 }}>No Responsibility available</Typography>
                        </Box>
                    }
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="subHeader3" fontWeight={700} color="text.darkBlue">{label || "Add the Job description"}</Typography>

                <Box sx={{ position: 'relative', }}>
                    <Box ref={containerRef} sx={{ position: 'relative', border: 1, height: 400, maxHeight: 400, overflowY: 'auto', borderColor: '#1C3E5E33', borderRadius: 2, mt: 1, p: 2, pb: 4 }}>
                        {selectedList?.length > 0 ?
                            selectedList.map((item, key) => {
                                return (

                                    <>
                                        {responsibilityEditId === key ?
                                            <AddResponsibilityComponent
                                                value={responsibilityText}
                                                onChange={(e) => setResponsibilityText(e)}
                                                handleDelete={handleDeleteResponsibility}
                                                handleAdd={handleUpdateResponsibilityText}
                                            />
                                            : <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                                <li>{item}</li>
                                                <IconButton
                                                    sx={{
                                                        height: 35,
                                                        width: 35,
                                                        border: 2,
                                                        borderColor: 'primary.light',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        borderRadius: 1,
                                                        mb: 1,
                                                    }}
                                                    onClick={() => handleEditResponsibility(item, key)}
                                                >
                                                    <Edit
                                                        sx={{ fontSize: 20, color: 'primary.dark' }}
                                                        color={'primary.dark'}
                                                    />
                                                </IconButton>
                                            </Box>}
                                    </>
                                )
                            })
                            : null}

                        {showAddInput && responsibilityEditId === "" &&
                            <AddResponsibilityComponent
                                value={responsibilityText}
                                onChange={(e) => setResponsibilityText(e)}
                                handleDelete={handleDeleteResponsibility}
                                handleAdd={handleAddResponsible}
                            />
                        }
                    </Box>
                    {!showAddInput ?
                        <IconButton
                            onClick={handleOpenAddResponsible}
                            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" }, position: 'absolute', right: 20, top: 335, zIndex: 99, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Add sx={{ fontSize: 30, color: 'white' }} />
                        </IconButton>
                        : null}
                </Box>
            </Grid>
        </Grid>
    )
}

export default JobResponsibilitiesListAndDescription