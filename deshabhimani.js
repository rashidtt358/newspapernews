const fs = require('fs');
const puppeteer = require('puppeteer');

async function fetchDeshabhimaniData() {
    console.log('Launching Headless Chrome Browser...');
    
    // GitHub Actions-ൽ റൺ ചെയ്യാൻ ഈ args നിർബന്ധമാണ്
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    
    const page = await browser.newPage();
    
    try {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        console.log('Navigating to Deshabhimani...');
        await page.goto('https://www.deshabhimani.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
        
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
