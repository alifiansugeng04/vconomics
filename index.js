const fetch = require('node-fetch');
const cheerio = require('cheerio');
const chalk = require('chalk');
const readlineSync = require('readline-sync');
const moment = require('moment');

function rndEmail(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charLength))
    }
    return result;
}

const name = () => new Promise((resolve, reject) => {

    fetch('https://api.namefake.com/', {
        headers: {
            'authority': 'api.namefake.com',
            'cache-control': 'max-age=0',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'same-site',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'referer': 'https://namefake.com/',
            'accept-language': 'en-US,en;q=0.9',
            'cookie': '_ga=GA1.2.1712758969.1641587539; _gid=GA1.2.1378957727.1641587539'
        }
    })
    .then(res => res.text())
    .then(res => {
        const names = JSON.parse(res)
        resolve(names.name)
    })
    .catch(err => {
        reject(err)
    })
});

const functionSignup = (emailRndm, myReff, nama) => new Promise((resolve, reject) => {

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
        body: JSON.stringify({"userName": emailRndm,"password":"fbr787pp48","rePassword":"fbr787pp48","fromReferralId": myReff,"fullName": nama}) 
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
    
        const emailRndm = `${rndEmail(10)}@gmailwe.com`; // Change domain here !
        const username = emailRndm.split('@')[0];
        const domain = emailRndm.split('@')[1];
    
        const nama = await name();
        const resultSignup = await functionSignup(emailRndm, myReff, nama);
        const resultSignupStatus = resultSignup.success;
        const message = resultSignup.messageCode;
    
        if (resultSignupStatus == true) {
            const token = resultSignup.data.token;
            console.log(chalk.greenBright(`[ ${moment().format('hh:mm:ss')} ] Success create ${emailRndm}`));
            console.log(chalk.greenBright(`[ ${moment().format('hh:mm:ss')} ] Waiting for OTP !`));
            // Check Otp
            do {
                var otpNum = await getVerifOtp(username, domain);
                if (otpNum) {
                    console.log(chalk.greenBright(`[ ${moment().format('hh:mm:ss')} ] OTP Code : ${otpNum}`));
                }
            } while(!otpNum)
    
            // Verif Signup
            const resultVerif = await functionVerif(token, otpNum);
            if (resultVerif.messageCode == 'VERIFY_OTP_SUCCESS') {
                console.log(chalk.greenBright(`[ ${moment().format('hh:mm:ss')} ] Congrats ! You got 150 MICS\n`));
            } else {
                console.log(chalk.redBright(`[ ${moment().format('hh:mm:ss')} ] Unfortunately , you didnt get anything !\n`));
            }
    
        } else {
            console.log(chalk.redBright(`[ ${moment().format('hh:mm:ss')} ] ${message}`));
        }
    }


})();
