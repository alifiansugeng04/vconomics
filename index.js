const fetch = require('node-fetch');
const cheerio = require('cheerio');
const chalk = require('chalk');
const readlineSync = require('readline-sync');

function rndEmail(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charLength))
    }
    return result;
}

const functionSignup = (emailRndm, myReff) => new Promise((resolve, reject) => {

    fetch('https://id.vscore.vn/api-v1/accounts/register/4', {
        method: 'POST',
        headers: {
            'accept': 'application/json, text/plain, */*',
            'x-user-agent': 'Mozilla/5.0 (Linux; Android 7.1.2; G011A Build/N2G48H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Mobile Safari/537.36',
            'x-location': '',
            'x-via': '3',
            'x-culture-code': 'EN',
            'Content-Type': 'application/json;charset=utf-8',
            'Content-Length': '129',
            'Host': 'id.vscore.vn',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.1'
        },
        body: JSON.stringify({"userName": emailRndm,"password":"fbr787pp48","rePassword":"fbr787pp48","fromReferralId": myReff,"fullName":"Sean"}) 
    })
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => {
        reject(err)
    })
});

const getVerifOtp = (username, domain) => new Promise((resolve, reject) => {

    fetch(`https://generator.email/${domain}/${username}`, {
        headers: {
            'Connection': 'keep-alive',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': `_ga=GA1.2.1780620157.1640362675; _gid=GA1.2.44486953.1641566799; surl=${domain}/${username}`
        }
    })
    .then(res => res.text())
    .then(res => {
        const $ = cheerio.load(res)
        const otp = $('p[style="color: #fa7800; font-weight: bold; text-align: center; font-size: 40px"]').text();
        resolve(otp)
    })
    .catch(err => {
        reject(err)
    })
});

const functionVerif = (token, otpNum) => new Promise((resolve, reject) => {

    fetch('https://id.vscore.vn/api-v1/tokens/verify-otp', {
        method: 'POST',
        headers: {
            'accept': 'application/json, text/plain, */*',
            'x-user-agent': 'Mozilla/5.0 (Linux; Android 7.1.2; G011A Build/N2G48H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Mobile Safari/537.36',
            'x-location': '',
            'x-via': '3',
            'x-culture-code': 'EN',
            'x-timestamp': '1641538382',
            'Content-Type': 'application/json;charset=utf-8',
            'Content-Length': '81',
            'Host': 'id.vscore.vn',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.1'
        },
        body: JSON.stringify({"validateToken": token,"otp":otpNum,"otpType":1})
    })
    .then(res => res.json())
    .then(res => {
        resolve(res)
    })
    .catch(err => {
        reject(err)
    })
});

(async () => {
    console.log(`
██╗   ██╗ ██████╗ ██████╗ ███╗   ██╗ ██████╗ ███╗   ███╗██╗ ██████╗███████╗    ██████╗  ██████╗ ████████╗
██║   ██║██╔════╝██╔═══██╗████╗  ██║██╔═══██╗████╗ ████║██║██╔════╝██╔════╝    ██╔══██╗██╔═══██╗╚══██╔══╝
██║   ██║██║     ██║   ██║██╔██╗ ██║██║   ██║██╔████╔██║██║██║     ███████╗    ██████╔╝██║   ██║   ██║   
╚██╗ ██╔╝██║     ██║   ██║██║╚██╗██║██║   ██║██║╚██╔╝██║██║██║     ╚════██║    ██╔══██╗██║   ██║   ██║   
 ╚████╔╝ ╚██████╗╚██████╔╝██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██║╚██████╗███████║    ██████╔╝╚██████╔╝   ██║   
  ╚═══╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═╝ ╚═════╝╚══════╝    ╚═════╝  ╚═════╝    ╚═╝                                                                                                            
`);

    const myReff = readlineSync.question('[+] Refferal Code : ');
    console.log('');

    while (true) {
    
        // Signup
    
        const emailRndm = `${rndEmail(10)}@gmailwe.com`;
        const username = emailRndm.split('@')[0];
        const domain = emailRndm.split('@')[1];
    
        const resultSignup = await functionSignup(emailRndm, myReff);
        const resultSignupStatus = resultSignup.success;
        const message = resultSignup.messageCode;
    
        if (resultSignupStatus == true) {
            const token = resultSignup.data.token;
    
            // Check Otp
            do {
                var otpNum = await getVerifOtp(username, domain);
            } while(!otpNum)
    
            // Verif Signup
            const resultVerif = await functionVerif(token, otpNum);
            if (resultVerif.messageCode == 'VERIFY_OTP_SUCCESS') {
                console.log(chalk.greenBright('[+] Congrats ! You got 150 MICS'));
            } else {
                console.log(chalk.redBright('[+] Unfortunately , you didnt get anything !'));
            }
    
        } else {
            console.log(chalk.redBright(`[+] ${message}`));
        }
    }


})();