export function sanitize(html) {
     var doc = document.createElement('div');
     doc.insertAdjacentHTML("afterbegin", html)
     return doc.textContent;
   }