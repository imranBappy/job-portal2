import { BASE_DIR } from './constant';
import S3 from 'react-aws-s3';

if (typeof window !== 'undefined') {
    window.Buffer = window.Buffer || require('buffer').Buffer;
}

export async function s3BucketApiCall(method) {
    const config = {
        bucketName: 'w3storage',
        dirName: method.dir ? `${BASE_DIR}${method.dir}` : `${BASE_DIR}`, 
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    };
    const ReactS3Client = new S3(config);
    if (method.apiType === 'DELETE') {
        return ReactS3Client.deleteFile(method.payload);
    } else {
        return ReactS3Client.uploadFile(method.payload);
    }
}

export default async function s3BucketApiCallWrapper(method) {
    return new Promise((resolve, reject) => {
        s3BucketApiCall(method)
            .then((response) => {
                resolve(response || {});
            })
            .catch((err) => {
                reject(err);
            });
    });
}
