import React, { useState } from 'react'

import { Box } from '@mui/material'
import SearchAndInputMenu from '@/common/SearchAndInputMenu'
import { ALL_DESIGNATION_LIST } from '@/graphql/resume/resumeQuery';
import { useLazyQuery, useMutation } from '@apollo/client';
import Toaster from '@/common/Toaster';
import CModal from '@/common/CModal';
import CInput from '@/components/companyProfile/formElement/CInput';
import Button from '@/components/Common/UI/Button';
import { CREATE_DESIGNATION } from '../graphql/mutation';

const AddDesignation = ({ payload, setPayload, error, setError, label }) => {

    const [openModal, setOpenModal] = useState(false)
    const [name, setName] = useState('')
    const [inputError, setInputError] = useState({})

    const [getDesignationList, { data: designationList, loading: loadingDesignationList, refetch: refetchDesignationList }] = useLazyQuery(
        ALL_DESIGNATION_LIST,
        {
            nextFetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
            onError: (error) => {
                Toaster({
                    type: 'error',
                    message: error.message,
                });
            },
        },
    );



    const [addDesignation, { loading: addDesignationLoading }] = useMutation(CREATE_DESIGNATION, {
        onCompleted: (res) => {
            refetchDesignationList()
            handleModalClose()
            onDesignationOptionChange(name)
        },
        onError: (error) => {
            Toaster({
                message: error.message,
                type: 'error',
            });

        },
    });

    const handleModalClose = () => {
        setOpenModal(false)
        setName("")
        setInputError({})
    }

    const onDesignationOptionChange = (value) => {
        setPayload({
            ...payload,
            designationName: value,
            responsibilitiesTitle: [],
        });
        setError({ ...error, designationName: '' });
    };

    const onDesignationQueryChange = (e) => {
        getDesignationList({
            variables: {
                name_Icontains: e,
                first: 10,
            },
        });

        setName(e)

        setError({ ...error, designationName: '' });
    };

    const handleInputChange = (e) => {
        let { value } = e.target
        setName(value)
        setInputError({ ...inputError, name: "" })
    }

    const handleAddDesignation = () => {
        if (!name) {
            setInputError({ ...inputError, name: "This field is required." })
            return
        }

        addDesignation({
            variables: {
                input: { name }
            }
        })
    }

    return (
        <Box>
            <SearchAndInputMenu
                value={payload.designationName}
                label={label || "Job Title"}
                placeholder="e.g. UI/UX Designer"
                display="name"
                valueKey="name"
                options={designationList?.designationList?.edges?.map(
                    (el) => el.node,
                )}
                error={error?.designationName}
                onChange={onDesignationQueryChange}
                handleSelect={onDesignationOptionChange}
                loading={loadingDesignationList}
                addLabel="Add Job Title"
                setOpenAddModal={setOpenModal}
            >
                <CModal maxWidth="sm" title={label || "Add Job Title"} open={openModal} onClose={handleModalClose}>
                    <CInput
                        label="Name"
                        placeholder="e.g. Full Stack Developer"
                        value={name}
                        onChange={handleInputChange}
                        error={inputError?.name}
                    />
                    <Box mt={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            style={{ fontSize: 20, px: 10 }}
                            label={`Add ${label ? label : "Job Title"} `}
                            onClick={handleAddDesignation}
                            isLoading={addDesignationLoading}
                        />
                    </Box>
                </CModal>
            </SearchAndInputMenu>
        </Box>
    )
}

export default AddDesignation