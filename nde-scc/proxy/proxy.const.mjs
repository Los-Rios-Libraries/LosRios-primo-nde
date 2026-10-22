//set the url of the server you want to test your code with and start the development server using the following command:
// ng serve --proxy-config ./proxy/proxy.conf.mjs   
const environments = {
    'production': 'https://caccl-lrccd.primo.exlibrisgroup.com',
    'sandbox': 'https://sandbox02-na.primo.exlibrisgroup.com',
  }
  
  export const PROXY_TARGET = environments['production']; 
  console.log(`[proxy] Active proxy target: ${PROXY_TARGET}`);