var main = document.getElementsByTagName('main')[0];
var type = window.location.search.split('=')[1];
type = decodeURI(type);
var uls = main.getElementsByTagName('ul');
var len = uls.length;
for(var i=0; i<len; i++){
  if(uls[i].getAttribute('data-type') == type){
    uls[i].className = '';
  }
}
