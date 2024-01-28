const doc = document;
const btnInfo = doc.querySelector('.btn-database');
const boxInfo = doc.querySelector('.database-block');

const baseUrl = 'http://localhost:3000/';
const resources = {
    posts: 'posts',
    comments: 'comments',
    profile: 'profile'
};

renderFormAdd();

btnInfo.onclick = () => {
    boxInfo.innerHTML = '';

    fetch(baseUrl + resources.posts)
        .then((response) => response.json())
        .then((info) => renderListDatabase(info));
}

const inputTitle = doc.querySelector('.info-add');
const inputBtn = doc.querySelector('.btn-add-post');

inputBtn.onclick = () => {
    const inputTitleValue = inputTitle.value;
    const addError = doc.querySelector('.add-error');

    if (inputTitleValue == '') {
        addError.style.display = 'inline-block';
    } else {
        createPost(inputTitleValue);
        addError.style.display = 'none';
        inputTitle.value = '';
    }
}

// FUNCTION ===============================================================

function renderListDatabase(info) {
    boxInfo.innerHTML = '';

    for(let item of info) {
        const { id, title } = item;
        
        const listBlock = doc.createElement('ul');
        const listItem = doc.createElement('li');
        const listUrl = doc.createElement('a');
        const editIcon = doc.createElement('img');
        const editInput = doc.createElement('textarea');
        const editSave = doc.createElement('img');
        const deleteIcon = doc.createElement('img');

        listItem.className = 'database-list';

        listUrl.innerText = title;
        listUrl.href = `#`;
        listUrl.dataset.postId = id;

        editIcon.className = 'edit-icon';
        editIcon.src = 'img/edit.png';

        editInput.value = title;
        editInput.disabled = false;
        editInput.className = 'edit-input';
        editInput.dataset.postId = id;
        editInput.style.display = 'none';

        editSave.className = 'edit-save';
        editSave.src = 'img/save.png';
        editSave.style.display = 'none';

        deleteIcon.className = 'edit-icon';
        deleteIcon.src = 'img/remove.png';
        deleteIcon.dataset.postId = id;
        deleteIcon.onclick = deletePost;

        listUrl.onclick = (event) => {
            event.preventDefault();

            const postId = event.target.dataset.postId;

            if (postId) {
                const selectedPost = info.find(post => post.id === postId);

                if (selectedPost) {
                    renderInfoBlock(selectedPost);
                }
            }
        };

        editIcon.addEventListener('click', () => {
            editInput.style.display = 'inline-block';
            editInput.focus();
            editSave.style.display = 'inline-block';
            editIcon.style.display = 'none';
            listUrl.style.display = 'none';
        });

        editSave.addEventListener('click', () => {
            const postId = editInput.dataset.postId;
            const updatedTitle = editInput.value;
        
            fetch(baseUrl + resources.posts + '/' + postId, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ title: updatedTitle })
            })
            .then(response => {
                if (response.ok) {
                    editInput.disabled = true;
                    editInput.style.display = 'none';
                    editIcon.style.display = 'inline-block';
                    listUrl.style.display = 'inline';
                    editSave.style.display = 'none';
                    fetchPosts();
                } else {
                    console.error('Не вдалося оновити пост.', response);
                }
            })
            .catch(error => console.error('Помилка при взаємодії з сервером:', error));
        });

        function deletePost(event) {
            event.preventDefault();
        
            const postId = event.target.dataset.postId;
        
            if (postId) {
                fetch(baseUrl + resources.posts + '/' + postId, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json;charset=utf-8'
                    }
                })
                .then((response) => {
                    if (response.ok) { // успішно видалено
                        const posts = info.filter(post => post.id !== postId); 
                        renderListDatabase(posts);
                    } else {
                        console.error(response.statusText);
                    }
                })
                .catch(error => console.error('Не вдалося видалити пост.', error));
            }
        }

        listItem.append(listUrl, editInput, editSave, editIcon, deleteIcon);
        listBlock.append(listItem);
        boxInfo.append(listBlock);
    };
}

function renderFormAdd() {
    const infoBlock = doc.querySelector('.info-block-wrapper');

    infoBlock.innerHTML = 
    `
        Title
        <input type="text" class="info-add" id="input-title">
        <p class="add-error">Enter the value</p>

        <button class="btn-add-post">
          Add post
        </button>
    `;
}

function createPost(newPost) {
    fetch(baseUrl + resources.posts, {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ title: newPost })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            fetchPosts();
            renderListDatabase([data]);
    });
}

function fetchPosts() {
    fetch(baseUrl + resources.posts)
        .then(res => res.json())
        .then(posts => {
            renderListDatabase(posts);
            console.log(posts)
        });
}

function renderInfoBlock(postInfo) {
    infoWindow = new ModalWindow({ w: 500, h: 300 }, { top: 200, left: 500 }, postInfo.id, postInfo.title);
    infoWindow.create();
    console.log('test2', postInfo.id);
}




