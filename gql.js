
gql=function(q,url){
  url = url||'http://localhost:4000/graphql' // default is the tutorial server as per http://graphql.org/graphql-js
  q = q||'{"query":"{ hello }"}' // tutorial hellp world query
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = _=>{resolve(xhr.response)}
    xhr.onerror = _=>{reject(xhr)}
    xhr.send(q)
  })  
}

//example
gql().then(x=>{
  y=x
  return console.log('done, check y, it should be ',x)
})

/* 
// load gql.js (this file) from local source
s = document.createElement('script');s.src='http://localhost:8000//graphql/gql.js';document.head.appendChild(s)
*/
