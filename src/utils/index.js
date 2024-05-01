import Toaster from '@/common/Toaster';
import s3BucketApiCallWrapper from './S3BucketApi';
import { each } from 'lodash';

export const handleUploadMediaToBucket = async (file, dir) => {
    try {
        const method = {
            apiType: 'POST',
            payload: file,
            dir: dir,
        };
        const result = await s3BucketApiCallWrapper(method);
        return result.location;
    } catch (error) {
        console.log({ error });
        Toaster({
            type: 'error',
            message: 'Failed to upload attachment',
        });
    }
};
export const handleDeleteAttachmentFromS3 = async (link, dir) => {
    try {
        const method = {
            apiType: 'DELETE',
            payload: link,
            dir: dir,
        };

        await s3BucketApiCallWrapper(method);
        return true;
    } catch (error) {
        Toaster({
            type: 'error',
            message: 'Failed to delete attachment',
        });
    }
};

export function getMonthAndYear(startDate, endDate) {
    let start = new Date(startDate);
    let end = endDate ? new Date(endDate) : new Date();

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years: years, months: months };
}

export const getPaginationPageCount = (totalCount, pageSize) => {

    if (!isNaN(totalCount / pageSize)) {
        return totalCount / pageSize > 0 && totalCount / pageSize < 1
            ? 1
            : Math.ceil(totalCount / pageSize);
    }
    return 0;
};
export function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        value,
    );
}
export const getFilteredValue = (filter, skipIfFalse) => {
    const copyFilter = { ...filter };
    let newFilter = {};
    each(copyFilter, (val, key) => {
        if (typeof val.value === 'boolean' || val.value) {
            newFilter[key] = val.value;
        }
        if (val.type === 'date') {
            if (!val.value || !moment(val.value).isValid()) {
                delete newFilter[key];
            } else {
                newFilter[key] = moment(val.value).format('YYYY-MM-DD');
            }
        }
    });
    return newFilter;
};


export const getTemplateImage = async (content) => {


    if (typeof window !== 'undefined') {
        const html2pdf = (await import('html2pdf.js')).default
        const image = await html2pdf().from(`<Box Box id = "preview" style = {{ position: 'relative', width: "21cm" }}>

              ${content}
         </Box>`).toImg().outputImg()

        return image.src
    }


}
export const setTextLength = (text, length) => {
    if (text.length < length) return text;
    else return text.slice(0, length).concat("...");
};
export const getSizeInKb = (value) => {
    let KB = value / 1024;
    return `${Math.floor(KB)}`;
};
export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};