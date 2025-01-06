document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');


    fetch('C:/Users/DrSavage/Desktop/faks/assignment 1/news.json')

        .then(response => response.json())
        .then(data => {
            displayNews(data);
        })
        .catch(error => console.error('Error fetching news:', error));

   
    function displayNews(newsData) {
        newsData.forEach(newsItem => {
            const newsCard = createNewsCard(newsItem);
            newsContainer.appendChild(newsCard);
        });
    }

  
    function createNewsCard(newsItem) {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.dataset.id = newsItem.id;

        newsCard.innerHTML = `
            <img src="${newsItem.image}" alt="${newsItem.alt}">
            <div class="news-content">
                <p class="category">${newsItem.category}</p>
                <h3>${newsItem.title}</h3>
                <p class="tags">${newsItem.tags.map(tag => `<span>${tag}</span>`).join(' ')}</p>
                <p class="time">${newsItem.time}</p>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

       
        const editButton = newsCard.querySelector('.edit');
        const deleteButton = newsCard.querySelector('.delete');

        editButton.addEventListener('click', () => handleEdit(newsCard));
        deleteButton.addEventListener('click', () => handleDelete(newsCard));

        return newsCard;
    }

   
    function handleEdit(newsCard) {
        const title = newsCard.querySelector('h3');
        const newTitle = prompt('Edit title:', title.textContent);

        if (newTitle) {
            title.textContent = newTitle;
            toastr.success('News title updated successfully!');
        } else {
            toastr.info('Edit cancelled.');
        }
    }


    function handleDelete(newsCard) {
        if (confirm('Are you sure you want to delete this news?')) {
            newsCard.remove();
            toastr.success('News deleted successfully!');
        } else {
            toastr.info('Delete cancelled.');
        }
    }
});
