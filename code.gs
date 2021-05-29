//token 5239a69d495a46f4540de4c17cc9ec1e9268f6f5
function isValidWebUrl(url) {
   let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
   return regEx.test(url);
}
function getUrl(inputUrl) {
  let endPoint = "https://api-ssl.bitly.com/v4/shorten";
  let token = "5239a69d495a46f4540de4c17cc9ec1e9268f6f5";
  let payload = {
    "group_guid": "Bl5t3bPgWXB",  
    "domain": "bit.ly",  
    "long_url": inputUrl
  } ; 
const options = {
  headers: { Authorization: `Bearer ${token}` },
  method: 'post',
  contentType: 'application/json',
  payload: JSON.stringify(payload)
};
  let response = JSON.parse(UrlFetchApp.fetch(endPoint,options));
  return response.link;
}
function doPost(e){
  let updateObj = JSON.parse(e.postData.contents);
  let data = {};
  if(updateObj.message.text=="/start"){
    data = {
      text: "*Enter the url to shorten.*\nEg: https://www.google.com",
      parse_mode:"markdown",
      chat_id:updateObj.message.chat.id
    };
  }
  else{
    if(isValidWebUrl(updateObj.message.text)){
      let message = "URL requested : "+updateObj.message.text+"\nShortened URL : "+getUrl(updateObj.message.text);
      data = {
        text: message,
        parse_mode: "markdown",
        chat_id:updateObj.message.chat.id
      };
    }
    else{
      data = {
        text: "*Sorry! Invalid URL.*\nPlease try again.",
        parse_mode : "markdown",
        chat_id:updateObj.message.chat.id
      };
    }

  }
  let endPoint = "https://api.telegram.org/bot1883052135:AAFf47gC9ofYxsm7B1tdzV3D-9Uc3nbsdkI/sendMessage";
  const options = {
    method:'post',
    contentType: 'application/json',
    payload:JSON.stringify(data)
  };
  let response = UrlFetchApp.fetch(endPoint,options);
  Logger.log(response);
}





