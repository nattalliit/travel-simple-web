const searchText = document.querySelector('#searchText');
const btnSearch = document.querySelector('#btnSearch');
const btnClear = document.querySelector('#btnClear');

btnSearch.addEventListener('click', function () {
    let searchArray = searchText.value.split(',');
    let resultsDiv = document.querySelector('#results');
    let validQueryCard = document.querySelector('#validQueryCard');

    fetch('https://kgsanchez.github.io/travel_recommendation/travel_recommendation.json')
        .then(response => response.json())
        .then(data => {
            let filteredData = [];

            searchArray.forEach(keyword => {
                keyword = keyword.trim().toLowerCase();

                switch (keyword) {
                    case 'beach':
                        keyword = 'beaches';
                        break;
                    case 'country':
                        keyword = 'countries';
                        break;
                    case 'temple':
                        keyword = 'temples';
                        break;
                }

                if (data.hasOwnProperty(keyword)) {
                    if (keyword === 'countries') {
                        data[keyword].forEach(country => {
                            country.cities.forEach(city => {
                                filteredData.push(city);
                            });
                        });
                    } else {
                        filteredData.push(...data[keyword]);
                    }
                }
            });

            // Clear previous results
            resultsDiv.classList.remove('hidden');
            validQueryCard.classList.add('hidden');
            resultsDiv.innerHTML = '';

            // Display new results
            filteredData.forEach(item => {
                let card = document.createElement('div');
                card.className = 'bg-white rounded-lg shadow-xl overflow-hidden';

                let img = document.createElement('img');
                img.src = item.imageUrl;
                img.alt = item.name;
                img.className = 'w-full h-64 object-cover rounded-t-lg';
                card.appendChild(img);

                let cardBody = document.createElement('div');
                cardBody.className = 'p-4';

                let h2 = document.createElement('h2');
                h2.textContent = item.name;
                h2.className = 'text-xl font-semibold';
                cardBody.appendChild(h2);

                let p = document.createElement('p');
                p.textContent = item.description;
                p.className = 'text-gray-600 mb-4';
                cardBody.appendChild(p);

                let a = document.createElement('a');
                a.href = '#';
                a.textContent = 'Visit';
                a.className = 'text-blue-500 hover:text-blue-600 px-4 py-2 border border-blue-500 rounded mb-2';
                cardBody.appendChild(a);

                card.appendChild(cardBody);
                resultsDiv.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
});

btnClear.addEventListener('click', function () {
    searchText.value = '';
    document.querySelector('#results').classList.add('hidden');
    document.querySelector('#validQueryCard').classList.remove('hidden');
});