'use client';
import dynamic from 'next/dynamic';
import { template } from '@/utils/Template';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

const Template = () => {
    const [previewImg, setPreviewImg] = useState('')

    const createPreview = () => {
        return `
        <Box id="preview" style={{ position: 'relative', width: "21cm" }}>
            <div dangerouslySetInnerHTML={{ __html: ${template} }} />
        </Box>
        `
    }

    const getInit = async () => {
        if (typeof window !== 'undefined') {
            const html2pdf = (await import('html2pdf.js')).default
            html2pdf().from(`
            <Box id="preview" style={{ position: 'relative', width: "21cm" }}>
                <div dangerouslySetInnerHTML={{ __html: ${template} }} />
                </Box>
                `).toImg().outputImg()
                .then(res => {
                    setPreviewImg(res.src)
                }
                )
            // .then((res) => console.log(res))
        }
    }

    useEffect(() => {
        getInit()
    }, [])

    // console.log(JSON.stringify(previewImg))

    return (
        <div>
            <div dangerouslySetInnerHTML={{
                __html: `<div id="templateRoot" style="display: flex;">
                <div sc-name="profile" style="position: absolute; right: 0; top: 50px; width: 92%; background: white;">
                <div style="padding: 0 20px;display: flex; margin: 10px; background: #99c7c7; align-items: center; height: 160px;">
                <div style="height: 120px; width: 120px; margin-right: 50px; border-radius: 10px; overflow: hidden;">
                <img alt="no profile" el-name="photo_url" src="https://w3storage.s3-ap-south-1.amazonaws.com/wrightalentstage/profile/emdawaL8LkhUaqR7K8MjV1.jpeg" style="height: 100%;width: 100%;"/>
                </div>
                <div style="color: white">
                <h1 style="margin: 10px 0;">
                <span el-name="first_name">Akhil</span>
                <span el-name="last_name">Mundra</span>
                </h1>
                <div>
                <p el-name="phone_number" style="font-size: 12px;margin-bottom: 2px">8005744088</p>
                </div>
                <div>
                <p el-name="email" style="font-size: 12px;margin-bottom: 2px">wrighttalent@yopmail.com</p>
                </div>

                </div>
                </div>
                </div>
                <div style="background: black; width: 30%; min-height: 29.7cm;">
                <div style="color: white; padding-top: 250px; display: flex; flex-direction: column; align-items: center; width: 100%;">
                <section sc-name="skills" style="width: 70%; margin-left: auto; margin-bottom: 25px;">
                <p style="color: grey">SKILLS</p>

                <div sb-name="item" style="display: flex; align-items: center; gap: 10px; margin-top: 12px;">
                <div style="height: 5px; width: 5px;background-color: #99c7c7;"></div>
                <p el-name="name" style="font-size: 12px;">Frontend Development</p>
                </div><div sb-name="item" style="display: flex; align-items: center; gap: 10px; margin-top: 12px;">
                <div style="height: 5px; width: 5px;background-color: #99c7c7;"></div>
                <p el-name="name" style="font-size: 12px;">React Native</p>
                </div><div sb-name="item" style="display: flex; align-items: center; gap: 10px; margin-top: 12px;">
                <div style="height: 5px; width: 5px;background-color: #99c7c7;"></div>
                <p el-name="name" style="font-size: 12px;">Graphql</p>
                </div><div sb-name="item" style="display: flex; align-items: center; gap: 10px; margin-top: 12px;">
                <div style="height: 5px; width: 5px;background-color: #99c7c7;"></div>
                <p el-name="name" style="font-size: 12px;">REST Api</p>
                </div><div sb-name="item" style="display: flex; align-items: center; gap: 10px; margin-top: 12px;">
                <div style="height: 5px; width: 5px;background-color: #99c7c7;"></div>
                <p el-name="name" style="font-size: 12px;">Next.js</p>
                </div><div sb-name="item" style="display: flex; align-items: center; gap: 10px; margin-top: 12px;">
                <div style="height: 5px; width: 5px;background-color: #99c7c7;"></div>
                <p el-name="name" style="font-size: 12px;">React.js</p>
                </div></section>
                <section sc-name="social_media_links" style="width: 70%; margin-left: auto; margin-bottom: 25px;">
                <p style="color: grey">SOCIAL MEDIA</p>

                <div sb-name="item" style="display: flex; align-items: center; gap: 10px; margin-top: 12px;">
                <div style="height: 5px; width: 5px;background-color: #99c7c7;"></div>
                <p el-name="url_link" style="font-size: 12px;">www.facebook.com</p>
                </div><div sb-name="item" style="display: flex; align-items: center; gap: 10px; margin-top: 12px;">
                <div style="height: 5px; width: 5px;background-color: #99c7c7;"></div>
                <p el-name="url_link" style="font-size: 12px;">www.linkedin.com</p>
                </div></section>
                <section sc-name="languages" style="width: 70%; margin-left: auto; margin-bottom: 25px;">
                <p style="color: grey">LANGUAGES</p>

                </section>
                <section sc-name="hobbies" style="width: 70%; margin-left: auto; margin-bottom: 25px;">
                <p style="color: grey">HOBBIES</p>

                </section>
                </div>
                </div>
                <div style="width: 70%; min-height: 29.7cm;">
                <div style="color: black; padding-top: 250px; width: 95%; margin-left: auto;">
                <div style="display: flex; flex-direction: column; margin-bottom: 25px;">
                <section sc-name="summary">
                <div>
                <div style="font-size: 12px; background-color: #99c7c7; border: 2px solid; padding: 2px 5px; color: white; display: initial;">
                              SUMMARY
                            </div>
                </div>
                <p el-name="summary" style="font-size: 12px; color: grey; margin-top: 10px;">Experienced frontend developer with a proven track record in creating responsive and visually appealing web applications, adept at utilizing modern web technologies to enhance user experiences.</p>
                </section>
                </div>
                <section sc-name="educations" style="display: flex; flex-direction: column; margin-bottom: 25px;">
                <div>
                <div style="font-size: 12px; background-color: #99c7c7; border: 2px solid; padding: 2px 5px; color: white; display: initial;">
                            EDUCATION</div>
                </div>

                <div sb-name="item">
                <div style="margin-top: 15px; display: flex; justify-content: space-between;">
                <p el-name="institution" style="font-size: 12px; font-weight: bold;">Pune University</p>
                <p style="font-size: 12px;">
                <span el-name="start_date">September 27, 2023</span> -
                              <span el-name="end_date">September 27, 2023</span>
                </p>
                </div>
                <p style="font-size: 12px; color: grey; margin-top: 10px;">
                            Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Fuga explicabo ex odio itaque
                            omnis?
                          </p>
                </div><div sb-name="item">
                <div style="margin-top: 15px; display: flex; justify-content: space-between;">
                <p el-name="institution" style="font-size: 12px; font-weight: bold;">MDSU, Ajmer</p>
                <p style="font-size: 12px;">
                <span el-name="start_date">September 27, 2023</span> -
                              <span el-name="end_date">September 27, 2023</span>
                </p>
                </div>
                <p style="font-size: 12px; color: grey; margin-top: 10px;">
                            Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Fuga explicabo ex odio itaque
                            omnis?
                          </p>
                </div></section>
                <section sc-name="experiences" style="display: flex; flex-direction: column; margin-bottom: 25px;">
                <div>
                <div style="font-size: 12px; background-color: #99c7c7; border: 2px solid; padding: 2px 5px; color: white; display: initial;">
                            EXPERIENCES</div>
                </div>

                <div sb-name="item">
                <div style="margin-top: 15px; display: flex; justify-content: space-between;">
                <p el-name="company" style="font-size: 12px; font-weight: bold;">W3kernel.com</p>
                <p style="font-size: 12px;">
                <span el-name="start_date">September 27, 2023</span> -

                </p>
                <p el-name="designation" style="font-size: 12px;">Fronend Developer</p>
                </div>
                <section el-name="responsibilities" style="display: flex; flex-direction: column; margin-bottom: 25px;">

                <div sb-name="item">
                <p cl-name="title" style="font-size: 12px;">UI/UX design</p>
                </div><div sb-name="item">
                <p cl-name="title" style="font-size: 12px;">Frontend Development</p>
                </div></section></div></section>
                </div>
                </div>
                </div>` }} />
            {/* <div>
                <img src={previewImg} />
            </div> */}
        </div>
    );
};

export default Template;
