const fs = require('fs');

async function fetchDeshabhimaniData() {
    const url = 'https://www.deshabhimani.com/';
    try {
        console.log('Fetching data from Deshabhimani...');
        
        // ബ്രൗസറിൽ നിന്നാണെന്ന് തോന്നിപ്പിക്കാനുള്ള headers ഉൾപ്പെടുത്തുന്നു
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        });

        if (!response.ok) {
            console.error('Website blocked the request or failed. Status:', response.status);
        }

        const htmlContent = await response.text();

        if (htmlContent.trim() === '') {
            console.log('Warning: Website returned an empty page.');
        } else {
            console.log('Success: Downloaded ' + htmlContent.length + ' bytes of data.');
        }

        fs.writeFileSync('deshabhimani_data.html', htmlContent);
        console.log('HTML file successfully saved as deshabhimani_data.html');
        
    } catch (error) {
        console.error('Error fetching the website:', error);
    }
}

fetchDeshabhimaniData();
