const fs = require('fs');
const puppeteer = require('puppeteer');

async function fetchDeshabhimaniData() {
    console.log('Launching Headless Chrome Browser...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
        // ഒറിജിനൽ ബ്രൗസർ ആണെന്ന് സൈറ്റിനെ തോന്നിപ്പിക്കാൻ
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        console.log('Navigating to Deshabhimani...');
        await page.goto('https://www.deshabhimani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
        
        // ബ്രൗസറിൽ ലോഡ് ആയ യഥാർത്ഥ HTML ഡാറ്റ എടുക്കുന്നു
        const htmlContent = await page.content();
        
        fs.writeFileSync('deshabhimani_data.html', htmlContent);
        console.log('Success! Saved ' + htmlContent.length + ' bytes of data.');
        
    } catch (error) {
        console.error('Error fetching the website:', error);
    } finally {
        await browser.close();
    }
}

fetchDeshabhimaniData();
