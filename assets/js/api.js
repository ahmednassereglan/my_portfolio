/*
http://localhost:1337/api/movies

http://localhost:1337/api/movies?populate=poster
*/
/*                     1                    */
// fetch('http://localhost:1337/api/home', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// }).then(response => {
//     return response.json()
// }).then(data => {
//     return console.log(data)
// });
// fetch(`${api}/home`)
// ?populate=image
/*                     2                    */
const api = "https://strapi--profile.herokuapp.com/api";
async function getDataHome(){
    const req = await fetch(`${api}/home?populate=img_head,img_about,img_skill`);
    const res = await req.json();
    const print = res.data.attributes;
    console.log(print);
    printDataHome(print)
}
async function getDataSkill(){
    const req = await fetch(`${api}/skills?populate=image`);
    const res = await req.json();
    const print = res.data
    console.log(print);
    printDataSkill(print)
}
async function getDataWork(){
    const req = await fetch(`${api}/works?populate=image`);
    const res = await req.json();
    const print = res.data
    console.log(print);
    printDataWork(print)
}
function printDataHome(data){
    // header
    document.querySelector("#nav__logo_id").innerHTML = data.first_name;
    document.querySelector("#home__title_id span").innerHTML = data.first_name;
    document.querySelector("#home__title_id").innerHTML += data.work;
    document.querySelector("#social_linkedin_id").href = data.linkedin_link;
    document.querySelector("#social_cv_id").href = data.link_cv;
    document.querySelector("#social_github_id").href = data.git_link;
    document.querySelector("#blob_img_id").src =`https://strapi--profile.herokuapp.com${data.img_head.data.attributes.url}`;
    // about
    document.querySelector("#about__img_id").src =`https://strapi--profile.herokuapp.com${data.img_about.data.attributes.url}`;
    document.querySelector("#about__subtitle_id").innerHTML += data.first_name;
    document.querySelector("#about__text_id").innerHTML = data.about_me;
    // skills
    document.querySelector("#skills__text_id").innerHTML = data.text_skill;
    document.querySelector("#skills__img_id").innerHTML = 
    `
    ${data.img_skill.data? `<img src="https://strapi--profile.herokuapp.com${data.img_skill.data.attributes.url}" alt="" class="skills__img">` : `<img src="assets/img/work3.jpg" alt="" class="skills__img">` }
    `;
    // footer
    document.querySelector("#footer__icon_face_id").href = data.face_link;
    document.querySelector("#footer__icon_insta_id").href = data.link_insta;
    document.querySelector("#footer__icon_twit_id").href = data.link_twitter;
    document.querySelector("#footer__icon_you_id").href = data.link_any;
    document.querySelector("#footer__copy_id").innerHTML += data.text_footer;
    document.querySelector("#footer__title_id").innerHTML = data.first_name;

    document.querySelector("#footer__conatactData_email").innerHTML = data.email;
    document.querySelector("#footer__conatactData_phone").innerHTML = data.phone;
    document.querySelector("#footer__conatactData_address").innerHTML = data.address;
}
function printDataSkill(data){
    document.querySelector("#skills__skill_map").innerHTML += 
    data.map(skill =>
        `
        <div class="skills__data">
            <div class="skills__names">
                ${skill.attributes.icon? `<i class="bx ${skill.attributes.icon} skills__icon"></i>` : "" }
                ${skill.attributes.image.data? `<img style="width:31px;height:31px;margin-right:15px;" src="https://strapi--profile.herokuapp.com${skill.attributes.image.data.attributes.url}"  alt="">` : "" }
                <span class="skills__name">${skill.attributes.name}</span>
            </div>
            <div class="skills__bar" style="width: ${skill.attributes.num}%;">

            </div>
            <div>
                <span class="skills__percentage">${skill.attributes.num}%</span>
            </div>
        </div>`
    )
}

function printDataWork(data){
    // console.log(data[0].attributes.image.data[0].attributes.url);
    // data.map(work =>
        
    //     work.attributes.image.data.map(wrk =>
    //         console.log(wrk.attributes.url)
    //     )
    // );
    document.querySelector("#work__container_id").innerHTML += 
        data.map(work => 
        `
        <div id="carouselControls${work.id}" class="carousel slide work__img" data-bs-ride="carousel" >
            <div class="carousel-inner" data-bs-toggle="modal" data-bs-target="#Modal${work.id}">
                <div class="carousel-item active">
                    <img style="height:330px;width:350px" src="https://strapi--profile.herokuapp.com${work.attributes.image.data[0].attributes.url}" alt="">
                </div>
            ${work.attributes.image.data.map(wrk =>
                `
                    <div class="carousel-item">
                        <img style="height:330px;width:350px" src="https://strapi--profile.herokuapp.com${wrk.attributes.url}" alt="">
                    </div>
                `
            )};
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${work.id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${work.id}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
        </div>
        <!-- Modal -->
            <div class="modal fade" id="Modal${work.id}" tabindex="-1" aria-labelledby="ModalLabel${work.id}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel${work.id}">${work.attributes.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="assets/img/work6.jpg" alt="">
                        </div>
                        <div class="modal-footer">
                        <a href="${work.attributes.link_github}"><button type="button" class="btn btn-dark"><i class='bx bxl-github'></i> GitHub</button></a>
                        <a href="${work.attributes.link_live}"><button type="button" class="btn btn-primary"><i class='bx bx-show-alt'></i> live preview</button></a>
                        </div>
                    </div>
                </div>
            </div>
        `
    )
    
}
getDataHome()
getDataSkill()
getDataWork()
