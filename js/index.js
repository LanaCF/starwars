const doc = document;
const boxInfo = doc.querySelector('.database-block');
const navBtnBack = doc.querySelector('.back');
const navBtnNext = doc.querySelector('.next');
const cardBox = doc.querySelectorAll('.card');

const baseUrl = 'https://swapi.dev/api/vehicles/';
const resources = {
    count: 'count',
    next: 'next',
    previous: 'previous',
    results: 'results'
};

async function getPosts() {
    try {
        const resPosts = await fetch(baseUrl);
        const posts = await resPosts.json();
        console.log(posts.results);
      
        return posts.results;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return null;
    }
}

getPosts().then(posts => {
    renderCard(posts);

    const cardBox = document.querySelectorAll('.card');
    cardBox.forEach(function(item, index) {
        item.onclick = (event) => {
            event.preventDefault();
            const postId = item.getAttribute('data-post-id');

            if (postId) {
                const selectedPost = posts.find(post => post.url.includes(postId));

                if (selectedPost) {
                    renderInfoBlock(selectedPost);
                }
            }
        };
    });
});

// FUNCTION =============================================

function renderCard(arr) {
    boxInfo.innerHTML = '';

    arr.forEach(function(item) {
        const baseUrlImg = 'https://starwars-visualguide.com/assets/img/vehicles/';
        const postId = item.url.split('/').slice(-2)[0];
        const imgUrl = baseUrlImg + postId + '.jpg';

        const postBox = 
        `
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

        const cardElement = boxInfo.lastChild;
        cardElement.addEventListener('click', (event) => {
            event.preventDefault();
            const postId = cardElement.getAttribute('data-post-id');
            console.log('postId:', postId);

            if (postId) {
                const selectedPost = arr.find(post => post.url.includes(postId));

                if (selectedPost) {
                    renderInfoBlock(selectedPost);
                }
            }
        });
    });
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

















// getPosts().then(posts => {
//     renderCard(posts);
// });

// cardBox.forEach(function (item, index) {
//     item.onclick = (event) => {
//         event.preventDefault();
//         const postId = item.getAttribute('data-post-id');
//         console.log('postId:', postId);
//         if (postId) {
//             const selectedPost = posts.results.find(post => post.url.includes(postId));

//             if (selectedPost) {
//                 renderInfoBlock(selectedPost);
//             }
//         }
//     };
// });



// function renderCard(arr) {
//     boxInfo.innerHTML = '';

//     arr.forEach(function(item) {
//         const baseUrlImg = 'https://starwars-visualguide.com/assets/img/vehicles/';
//         const postId = item.url.split('/').slice(-2)[0];
//         const imgUrl = baseUrlImg + postId + '.jpg';

//         const postBox = 
//         `
//         <div class="card">
//             <div class="card__img-box">
//                 <img src="${imgUrl}" alt="" class="card__img" onerror="this.onerror=null;this.src='img/image_not_found.jpg';">
//             </div>

//             <div class="card__title-box">
//                 <h2 class="card__title">
//                     ${item.name}
//                 </h2>
//             </div>
//         </div>
//         `;

//         boxInfo.insertAdjacentHTML('beforeend', postBox);
//     });
// }



// =================================














// renderFormAdd();

// btnInfo.onclick = () => {
//     boxInfo.innerHTML = '';

//     fetch(baseUrl + resources.posts)
//         .then((response) => response.json())
//         .then((info) => renderListDatabase(info));
// }

// const inputTitle = doc.querySelector('.info-add');
// const inputBtn = doc.querySelector('.btn-add-post');

// inputBtn.onclick = () => {
//     const inputTitleValue = inputTitle.value;
//     const addError = doc.querySelector('.add-error');

//     if (inputTitleValue == '') {
//         addError.style.display = 'inline-block';
//     } else {
//         createPost(inputTitleValue);
//         addError.style.display = 'none';
//         inputTitle.value = '';
//     }
// }

// // FUNCTION ===============================================================

// function renderListDatabase(info) {
//     boxInfo.innerHTML = '';

//     for(let item of info) {
//         const { id, title } = item;
        
//         const listBlock = doc.createElement('ul');
//         const listItem = doc.createElement('li');
//         const listUrl = doc.createElement('a');
//         const editIcon = doc.createElement('img');
//         const editInput = doc.createElement('textarea');
//         const editSave = doc.createElement('img');
//         const deleteIcon = doc.createElement('img');

//         listItem.className = 'database-list';

//         listUrl.innerText = title;
//         listUrl.href = `#`;
//         listUrl.dataset.postId = id;

//         editIcon.className = 'edit-icon';
//         editIcon.src = 'img/edit.png';

//         editInput.value = title;
//         editInput.disabled = false;
//         editInput.className = 'edit-input';
//         editInput.dataset.postId = id;
//         editInput.style.display = 'none';

//         editSave.className = 'edit-save';
//         editSave.src = 'img/save.png';
//         editSave.style.display = 'none';

//         deleteIcon.className = 'edit-icon';
//         deleteIcon.src = 'img/remove.png';
//         deleteIcon.dataset.postId = id;
//         deleteIcon.onclick = deletePost;

//         listUrl.onclick = (event) => {
//             event.preventDefault();

//             const postId = event.target.dataset.postId;

//             if (postId) {
//                 const selectedPost = info.find(post => post.id === postId);

//                 if (selectedPost) {
//                     renderInfoBlock(selectedPost);
//                 }
//             }
//         };

//         editIcon.addEventListener('click', () => {
//             editInput.style.display = 'inline-block';
//             editInput.focus();
//             editSave.style.display = 'inline-block';
//             editIcon.style.display = 'none';
//             listUrl.style.display = 'none';
//         });

//         editSave.addEventListener('click', () => {
//             const postId = editInput.dataset.postId;
//             const updatedTitle = editInput.value;
        
//             fetch(baseUrl + resources.posts + '/' + postId, {
//                 method: 'PATCH',
//                 headers: {
//                     'content-type': 'application/json;charset=utf-8'
//                 },
//                 body: JSON.stringify({ title: updatedTitle })
//             })
//             .then(response => {
//                 if (response.ok) {
//                     editInput.disabled = true;
//                     editInput.style.display = 'none';
//                     editIcon.style.display = 'inline-block';
//                     listUrl.style.display = 'inline';
//                     editSave.style.display = 'none';
//                     fetchPosts();
//                 } else {
//                     console.error('Не вдалося оновити пост.', response);
//                 }
//             })
//             .catch(error => console.error('Помилка при взаємодії з сервером:', error));
//         });

//         function deletePost(event) {
//             event.preventDefault();
        
//             const postId = event.target.dataset.postId;
        
//             if (postId) {
//                 fetch(baseUrl + resources.posts + '/' + postId, {
//                     method: 'DELETE',
//                     headers: {
//                         'content-type': 'application/json;charset=utf-8'
//                     }
//                 })
//                 .then((response) => {
//                     if (response.ok) { // успішно видалено
//                         const posts = info.filter(post => post.id !== postId); 
//                         renderListDatabase(posts);
//                     } else {
//                         console.error(response.statusText);
//                     }
//                 })
//                 .catch(error => console.error('Не вдалося видалити пост.', error));
//             }
//         }

//         listItem.append(listUrl, editInput, editSave, editIcon, deleteIcon);
//         listBlock.append(listItem);
//         boxInfo.append(listBlock);
//     };
// }

// function renderFormAdd() {
//     const infoBlock = doc.querySelector('.info-block-wrapper');

//     infoBlock.innerHTML = 
//     `
//         Title
//         <input type="text" class="info-add" id="input-title">
//         <p class="add-error">Enter the value</p>

//         <button class="btn-add-post">
//           Add post
//         </button>
//     `;
// }

// function createPost(newPost) {
//     fetch(baseUrl + resources.posts, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify({ title: newPost })
//     })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//             fetchPosts();
//             renderListDatabase([data]);
//     });
// }

// function fetchPosts() {
//     fetch(baseUrl + resources.posts)
//         .then(res => res.json())
//         .then(posts => {
//             renderListDatabase(posts);
//             console.log(posts)
//         });
// }






