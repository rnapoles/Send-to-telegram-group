const chatId = '#chatId';
const apiToken = '#apiToken';
const link = `https://api.telegram.org/bot${apiToken}/sendMessage`;


// A generic onclick callback function.
function onClick(info, tab) {

  chrome.tabs.getSelected(null,(tab) => {

      const tablink = tab.url;
      const url = new URL(link)
      const params = {
        'chat_id': chatId,
        'disable_web_page_preview': false,
        'text': `Shared with bot: <a href='${tablink}'>${tablink}</a>`,
        'parse_mode': 'HTML',//MarkdownV2
      }
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      setTimeout(()=>{
        fetch(url)
          .then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err)
          })
        ;
      },3000);
  });
}

const menuId = chrome.contextMenus.create({
  "title": "Send to friends",
  //"contexts":[context],
  "onclick": onClick
});

