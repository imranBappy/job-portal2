export const template = `<div id="templateRoot" style="display: flex;">
<!-- this is profile block which will contains profile information like firt_name, last_name etc. To identify any block we need to set a attribute sc-name  -->
<div sc-name="profile" style="position: absolute; right: 0; top: 50px; width: 92%; background: white;">
    <div style="display: flex; margin: 10px; background: #99c7c7; align-items: center; height: 160px;">
        <svg>
            <image clip-path="url(#31d23d45-37a4-44b7-a8dc-a669475c912b)" el-name="photo_url" height="100"
                href="https://w3storage.s3-ap-south-1.amazonaws.com/wrightalent/profile/hqfuoJPn534VGYT8zy1N4S.png"
                image-rendering="optimizeSpeed" preserveaspectratio="xMidYMid slice" width="100" x="70"
                y="60" />
        </svg>
        <div style="color: white">
            <h1>
                <span el-name="first_name">Wright</span>
                <span el-name="last_name">Talent</span>
            </h1>
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">
                Embark on a transformative journey to unparalleled
                success .
            </p>
            <p style="font-size: 10px;" el-name="phone_number">8801724825060</p>
            <p style="font-size: 10px;" el-name="email">wrighttalent@yopmail.com</p>

        </div>
    </div>
</div>
<div style="background: black; width: 30%; min-height: 29.7cm;" >
    <div style="color: white; padding-top: 250px; display: flex; flex-direction: column; align-items: center; width: 100%;">
        <section style="width: 70%; margin-left: auto; margin-bottom: 25px;" sc-name="skills">
            <p style="color: grey">SKILLS</p>
            <div class="skillList" sb-name="item">
                <p class="skillName" el-name="name">Frontend Development</p>
                <div class="progressBar">
                    <div class="progressBarCompleted"></div>
                </div>
            </div>
        </section>
        <section class="blackBackgroundSection" sc-name="languages">
            <p style="color: grey">LANGUAGES</p>
        </section>
        <section class="blackBackgroundSection" sc-name="hobbies">
            <p style="color: grey">HOBBIES</p>

        </section>
        <section class="blackBackgroundSection" sc-name="social_media_links">
            <p style="color: grey">SOCIAL MEDIA LINKS</p>


            <div class="hobbieList" sb-name="item">
                <div class="hobbieSquareBox"></div>
                <p class="skillName" el-name="url_link">www.facebook.com</p>
            </div>
            <div class="hobbieList" sb-name="item">
                <div class="hobbieSquareBox"></div>
                <p class="skillName" el-name="url_link">www.facebook.com</p>
            </div>
        </section>
    </div>
</div>
<div class="whiteBackground">
    <div class="insideWhiteBackground">
        <div class="whiteBackgroundSections">
            <section sc-name="summary">
                <div>
                    <div class="sectionTitleBackground">SUMMARY</div>
                </div>
                <p class="description" el-name="summary">This is the summary</p>
            </section>
        </div>
        <section class="whiteBackgroundSections" sc-name="educations">
            <div>
                <div class="sectionTitleBackground">EDUCATION</div>
            </div>


            <div sb-name="item">
                <div class="whiteBackgroundSectionHeader">
                    <p class="headerTitle" el-name="institution">oxford</p>
                    <p class="headerDate">
                        <span el-name="start_date">September 22, 2023</span> -
                        <span el-name="end_date">September 22, 2023</span>
                    </p>
                </div>
                <p class="description">
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Fuga explicabo ex odio itaque
                    omnis?
                </p>
            </div>
        </section>
        <section class="whiteBackgroundSections" sc-name="experiences">
            <div>
                <div class="sectionTitleBackground">EMPLOYMENT</div>
            </div>

        </section>
    </div>
</div>
</div>`