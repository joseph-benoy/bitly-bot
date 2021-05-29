function isValidWebUrl(url) {
   let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
   return regEx.test(url);
}
function getUrl(inputUrl) {
  let endPoint = "https://api-ssl.bitly.com/v4/shorten";
  let bitlyToken = "1234567890";   //your bitly OAuth token
  let payload = {
    "group_guid": "123456789",   //your bitly group id
    "domain": "bit.ly",  
    "long_url": inputUrl
  } ; 
const options = {
  headers: { Authorization: `Bearer ${bitlyToken}` },
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
   const botToken = "1234567890";   //your telegram bot token
  let endPoint = "https://api.telegram.org/bot"+botToken+"/sendMessage";
  const options = {
    method:'post',
    contentType: 'application/json',
    payload:JSON.stringify(data)
  };
  let response = UrlFetchApp.fetch(endPoint,options);
  Logger.log(response);
}





