const fs = require('fs');

async function fetchDeshabhimaniData() {
    // നേരിട്ടുള്ള URL-ന് പകരം Proxy സർവീസ് വഴി കൊടുക്കുന്നു
    const targetUrl = encodeURIComponent('https://www.deshabhimani.com/');
    const proxyUrl = `https://api.allorigins.win/get?url=${targetUrl}`;

    try {
        console.log('Fetching data from Deshabhimani via Proxy...');
        
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
            console.error('Failed to fetch from proxy. Status:', response.status);
            return;
        }

        const jsonResponse = await response.json();
        
        // Proxy നൽകുന്ന ഡാറ്റയിൽ നിന്നും യഥാർത്ഥ HTML വേർതിരിച്ചെടുക്കുന്നു
        const htmlContent = jsonResponse.contents;

        if (!htmlContent || htmlContent.trim() === '') {
            console.log('Warning: Website returned an empty page even with proxy.');
        } else {
            console.log('Success: Downloaded ' + htmlContent.length + ' bytes of HTML data.');
        }

        fs.writeFileSync('deshabhimani_data.html', htmlContent);
        console.log('HTML file successfully saved as deshabhimani_data.html');
        
    } catch (error) {
        console.error('Error fetching the website:', error);
    }
}

fetchDeshabhimaniData();
