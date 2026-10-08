const fs = require('fs');

async function fetchDeshabhimaniData() {
    const url = 'https://www.deshabhimani.com/';
    try {
        console.log('Fetching data from Deshabhimani...');
        const response = await fetch(url);
        const htmlContent = await response.text();

        fs.writeFileSync('deshabhimani_data.html', htmlContent);
        console.log('HTML file successfully saved as deshabhimani_data.html');
    } catch (error) {
        console.error('Error fetching the website:', error);
    }
}

fetchDeshabhimaniData();
