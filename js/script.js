// =========================
// 深色模式
// =========================

const btn = document.getElementById("theme-btn");

if (btn) {

    btn.onclick = function () {

        document.body.classList.toggle("dark");


        if (document.body.classList.contains("dark")) {

            btn.innerHTML = "☀️";

        } else {

            btn.innerHTML = "🌙";

        }

    };

}




// =========================
// GitHub 数据
// =========================

const username = "xiuxxx0";


// 获取用户信息

fetch(`https://api.github.com/users/${username}`)

    .then(res => res.json())

    .then(data => {


        document.getElementById("repo-count").innerText =
            data.public_repos;


        document.getElementById("followers-count").innerText =
            data.followers;


    })

    .catch(err => {

        console.log("GitHub用户数据加载失败", err);

    });




// 获取 Star 数量

fetch(`https://api.github.com/users/${username}/repos`)

    .then(res => res.json())

    .then(repos => {


        let stars = 0;


        repos

            // 不统计fork项目

            .filter(repo => !repo.fork)

            .forEach(repo => {


                stars += repo.stargazers_count;


            });



        document.getElementById("star-count").innerText =
            stars;


    })

    .catch(err => {

        console.log("GitHub Star数据加载失败", err);

    });






// =========================
// 自动生成项目列表
// =========================


fetch("data/projects.json")

    .then(res => res.json())

    .then(projects => {


        let html = "";



        projects.forEach(p => {


            html += `

<div class="card">


    <img 
    src="${p.image}" 
    alt="${p.title}">


    <h3>
        ${p.title}
    </h3>


    <p>
        ${p.desc}
    </p>



    <div class="tags">

        ${p.tech.map(t => `
            <span>
                ${t}
            </span>
        `).join("")}


    </div>




    <a 
    class="project-btn"
    href="${p.link}"
    target="_blank">

        查看详情

    </a>



</div>

`;

        });



        document.getElementById(
            "project-list"
        ).innerHTML = html;



    })

    .catch(err => {

        console.log("项目加载失败", err);

    });







// =========================
// 自动生成博客列表
// =========================



fetch("data/blogs.json")

    .then(res => res.json())

    .then(blogs => {


        let html = "";



        blogs.forEach(blog => {


            html += `


<div class="blog-card">


    <h3>
        ${blog.title}
    </h3>



    <p>
        发布时间：
        ${blog.date}
    </p>




    <div class="blog-tags">


        <span>
            ${blog.tag}
        </span>


    </div>





    <a 
    href="${blog.url}"
    target="_blank">

        阅读全文 →

    </a>




</div>


`;

        });



        document.getElementById(
            "blog-list"
        ).innerHTML = html;



    })


    .catch(err => {

        console.log("博客加载失败", err);

    });