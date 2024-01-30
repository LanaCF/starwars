const doc = document;
const boxInfo = doc.querySelector('.database-block');
const navBtnBack = doc.querySelector('.back');
const navBtnNext = doc.querySelector('.next');
const cardBox = doc.querySelectorAll('.card');
const btnBlock = doc.querySelector('.navigation__block');

let currentPage = 1;
let pageNumber;

const baseUrl = 'https://swapi.dev/api/vehicles/';
const resources = {
    count: 'count',
    next: 'next',
    previous: 'previous',
    results: 'results'
};

async function getPosts(url) {
    try {
        const resPosts = await fetch(url);
        const posts = await resPosts.json();
        console.log('results', posts.results);
      
        return posts.results;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return null;
    }
}

async function getPage(url) {
    try {
        const resPosts = await fetch(url);
        const posts = await resPosts.json();

        console.log('count', posts.count);

        pageNumber = Math.ceil(posts.count / 10);

        let pageUrl;

        for (let i = 1; i <= pageNumber; i++) {
            pageUrl = baseUrl + '?page=' + i;
            console.log(pageUrl);

            const navBtn = doc.createElement('div');
            const navUrl = doc.createElement('a');

            navBtn.className = 'navigation__btn';

            navUrl.href = '#';
            navUrl.innerText = i;

            btnBlock.append(navBtn);
            navBtn.append(navUrl);

            navBtn.dataset.pageUrl = pageUrl;

            navBtn.addEventListener('click', handleNavButtonClick);
        }

        toggleNavigationButtons();

        // Активуємо першу кнопку при завантаженні
        const firstNavBtn = document.querySelector('.navigation__btn');
        if (firstNavBtn) {
            firstNavBtn.classList.add('active');
        }

    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

async function handleNavButtonClick(event) {
    event.preventDefault();

    const pageUrl = this.dataset.pageUrl;

    if (pageUrl) {
        const newPosts = await getPosts(pageUrl);
        renderCard(newPosts);

        currentPage = getPageNumberFromUrl(pageUrl);
        toggleNavigationButtons();
        toggleActiveButton(this);
    }
}

async function init() {
    const initialPosts = await getPosts(baseUrl);
    renderCard(initialPosts);
    getPage(baseUrl);

    const firstNavBtn = document.querySelector('.navigation__btn');
    if (firstNavBtn) {
        firstNavBtn.classList.add('active');
    }
}

init();

navBtnBack.addEventListener('click', async () => {
    if (currentPage > 1) {
        const newPageUrl = baseUrl + '?page=' + (currentPage - 1);
        const newPosts = await getPosts(newPageUrl);
        renderCard(newPosts);
        currentPage = getPageNumberFromUrl(newPageUrl);
        toggleNavigationButtons();
        toggleActiveButton(document.querySelector(`.navigation__btn[data-page-url="${newPageUrl}"]`));
    }
});

navBtnNext.addEventListener('click', async () => {
    if (currentPage < pageNumber) {
        const newPageUrl = baseUrl + '?page=' + (currentPage + 1);
        const newPosts = await getPosts(newPageUrl);
        renderCard(newPosts);
        currentPage = getPageNumberFromUrl(newPageUrl);
        toggleNavigationButtons();
        toggleActiveButton(document.querySelector(`.navigation__btn[data-page-url="${newPageUrl}"]`));
    }
});

// FUNCTION =============================================

function renderCard(arr) {
    boxInfo.innerHTML = '';

    arr.forEach(function(item) {
        const baseUrlImg = 'https://starwars-visualguide.com/assets/img/vehicles/';
        const postId = item.url.split('/').slice(-2)[0];
        const imgUrl = baseUrlImg + postId + '.jpg';

        const postBox = `
            <div class="card" data-post-id="${postId}">
                <div class="card__img-box">
                    <img src="${imgUrl}" alt="" class="card__img" onerror="this.onerror=null;this.src='img/image_not_found.jpg';">
                </div>

                <div class="card__title-box">
                    <h2 class="card__title">
                        ${item.name}
                    </h2>
                </div>
            </div>
        `;

        boxInfo.insertAdjacentHTML('beforeend', postBox);
    });

    const cardBox = document.querySelectorAll('.card');

    cardBox.forEach(function(item, index) {
        item.onclick = (event) => {
            event.preventDefault();
            const postId = item.getAttribute('data-post-id');

            if (postId) {
                const selectedPost = arr.find(post => post.url.includes(postId));

                if (selectedPost) {
                    renderInfoBlock(selectedPost);
                }
            }
        };
    });
}

function getPageNumberFromUrl(url) {
    const pageNumberString = url.split('page=')[1];
    return pageNumberString ? parseInt(pageNumberString, 10) : 1;
}

function toggleNavigationButtons() {
    const backBtn = doc.querySelector('.back');
    const nextBtn = doc.querySelector('.next');

    const navBtns = doc.querySelectorAll('.navigation__btn');

    if (currentPage === 1) {
        backBtn.style.display = 'none';
    } else {
        backBtn.style.display = 'block';
    }

    if (currentPage === pageNumber) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
    }

    navBtns.forEach((navBtn, index) => {
        if (index + 1 === currentPage) {
            navBtn.classList.add('active');
        } else {
            navBtn.classList.remove('active');
        }
    });
}

function toggleActiveButton(clickedBtn) {
    const navBtns = document.querySelectorAll('.navigation__btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
}

function renderInfoBlock(postInfo) {
    console.log('Rendering info block');
    
    infoWindow = new ModalWindow(
        { w: 500, h: 570 }, 
        { top: 100, left: 500 }, 
        postInfo
    );
    
    console.log('After infoWindow:', infoWindow);
    infoWindow.create();
}




