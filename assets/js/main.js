setActiveNav();
setFooter();
window.onresize = setFooter;
var fix_btn = document.getElementById('fix_btn');
if(fix_btn){
  fix_btn.onclick = setFixedNav;
}

var timeline_btn = document.getElementById('timeline_btn');
if(timeline_btn){
  timeline_btn.onclick = setTimeline;
}

var gotop_widget = document.getElementById('gotop_widget');
gotop_widget.onclick = scrollToTop;
setGotopWidget();
window.onscroll = function(){
  setGotopWidget();
  setSiderbar();
};

//TODO 优化这段代码
var category_icon = document.getElementById('category_icon');
var tag_icon = document.getElementById('tag_icon');
var dismiss_category = document.getElementById('dismiss_category');
var dismiss_tag = document.getElementById('dismiss_tag');
var chapter_icon = document.getElementById('chapter_icon');
var dismiss_chapter = document.getElementById('dismiss_chapter');
var chapter_container = document.getElementById('chapter_container');
if(chapter_container){
  var chapter_item = chapter_container.getElementsByTagName('li');
}
if(category_icon){
  category_icon.onclick = function(){
    displayWidget('category');
  };
  dismiss_category.onclick = function(){
    displayWidget('category');
  };
}
if(tag_icon){
  tag_icon.onclick = function(){
    displayWidget('tag');
  };
  dismiss_tag.onclick = function(){
    displayWidget('tag');
  };
}
if(chapter_icon){
  chapter_icon.onclick = function(){
    displayWidget('chapter');
  };
  dismiss_chapter.onclick = function(){
    displayWidget('chapter');
  };
  var len = chapter_item.length;
  for(var i=0; i<len; i++){
    chapter_item[i].onclick = function(){
      displayWidget('chapter');
    };
  }
}

var contact_btn = document.getElementById('contact_btn');
if(contact_btn){
  contact_btn.onclick = setContactIcons;
}

setTimelineBtn();

var search_btn = document.getElementById('search_btn');
search_btn.onclick = function(){
  showSearchPage();
};
var dismiss_search_btn = document.getElementById('dismiss_search');
dismiss_search_btn.onclick = function(){
  hideSearchPage();
};
var search_input = document.getElementById('search_input');
var search_page_btn = document.getElementById('search_page_btn');
var search_form = document.getElementById('search_form');
search_input.onblur = function(){
  setSearchBtn();
};
search_input.onkeyup = function(){
  setSearchBtn();
};
search_form.onsubmit = function(e){
  e.preventDefault();
  makeASearch();
};

var wechat_btn = document.getElementById('wechat_btn');
var dismiss_wechat = document.getElementById('dismiss_wechat');
var wechat_container = document.getElementById('wechat_container');
if(wechat_btn){
  wechat_btn.onclick = setWechat;
  dismiss_wechat.onclick = setWechat;
  if(getStyle(document.getElementById('dismiss_wechat')).display != 'block'){
    wechat_container.onclick = setWechat;
  }
}
/* 设置当前菜单项 */
function setActiveNav(){
  var path = window.location.pathname;
  path = path.replace('/','');
  if(path === ''){
    path = 'home';
  }else{
    path = path.split('/')[0];
    if(path === 'blogs' || path === 'category' || path === 'tag'){
      path = 'blog';
    }else{
      path = path;
    }
  }
  var id = path + '_link';
  document.getElementById(id).className = 'active';
  if(path === 'about'){
    document.getElementById('contact_btn').style.display = 'none';
    var contact = document.getElementById('contact_container');
    contact.parentNode.removeChild(contact);
  }
}

/* 导航条固定转换 */
function setFixedNav(){
  var header = document.getElementsByTagName('header')[0];
  var isFixed = header.className === 'fixed' ? true : false;
  var handler = document.getElementById('fixed_btn_rotate_handler');
  if(isFixed){
    header.className = '';
    fix_btn.setAttribute('class','unfixed-btn');
    handler.setAttribute('transform','translate(20,20) rotate(30)');
  }else{
    header.className = 'fixed';
    fix_btn.setAttribute('class','fixed-btn');
    handler.setAttribute('transform','translate(20,20) rotate(0)');
  }
  header = null;
}

/* 时间轴显示切换 */
function setTimeline(){
  var handler = document.getElementById('timeline_btn_rotate_handler');
  var isShow = timeline.className === 'timeline' ? true : false;
  if(isShow){
    timeline.className = 'hidden';
    timeline_btn.setAttribute('class','hide-timeline');
    handler.setAttribute('transform','translate(100,100) rotate(0)');
  }else{
    timeline.className = 'timeline';
    timeline_btn.setAttribute('class','show-timeline');
    handler.setAttribute('transform','translate(100,100) rotate(90)');
  }
  setFooter();
}

/* 时间轴按钮显示切换 */
function setTimelineBtn(){
  var timeline = document.getElementById('timeline');
  if(!timeline){
    timeline_btn.parentNode.className = 'nav-right hidden';
  }else{
    timeline_btn.parentNode.className = 'nav-right';
  }
}

/* 页尾位置切换 */
function setFooter(){
  var header = document.getElementsByTagName('header')[0];
  var main = document.getElementsByTagName('main')[0];
  var footer = document.getElementsByTagName('footer')[0];

  var headHeight = header.clientHeight,
      mainHeight = main.clientHeight,
      footHeight = footer.clientHeight,
      baseHeight = headHeight + mainHeight + footHeight,
      windHeight = getWindowHeight(),
      diff = windHeight - baseHeight;
  if(diff > 0){
    footer.className = 'absolute';
  }else if(diff < 0){
    footer.className = '';
  }
}

/* 获取视口高度 */
function getWindowHeight(){
  var winHeight;
  if (window.innerHeight){
    winHeight = window.innerHeight;
  }else if ((document.body) && (document.body.clientHeight)){
    winHeight = document.body.clientHeight;
  }
  return winHeight;
}

/* 设置gotop部件 */
function setGotopWidget(){
  var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  if(scrollTop > 80){
    gotop_widget.className = 'gotop';
  }else{
    gotop_widget.className = 'gotop hidden';
  }
}

/* 滚动到顶部 */
function scrollToTop(){
  var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  function goTop(){
    scrollTop -= 10;
    scrollTop = scrollTop<0 ? 0 : scrollTop;
    document.documentElement.scrollTop = scrollTop;
    window.pageYOffset = scrollTop;
    document.body.scrollTop = scrollTop;
    if(scrollTop>0){
      setTimeout(goTop,5);
    }
  }
  goTop();
}

/* siderbar位置变化 */
function setSiderbar(){
  var siderbar = document.getElementById('siderbar');
  if(siderbar){
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var distance;
    if(getStyle(document.getElementById('dismiss_tag')).display === 'none'){
      if(getStyle(document.getElementsByTagName('header')[0]).position === 'fixed'){
        distance = scrollTop;
      }else{
        if(scrollTop > 80){
          distance = scrollTop - 80;
        }else{
          distance = 0;
        }
      }
      siderbar.style.marginTop = '' + distance + 'px';
    }
  }else{
    return;
  }
}

/* 类目/标签部件显示设置 */
function displayWidget(type){
  if(getStyle(document.getElementById('category_icon')).position === 'fixed'){
    var container = document.getElementById(type + '_container');
    if(container.className === type + '-container'){
      container.className = type + '-container show';
      document.documentElement.style.overflow='hidden';//禁止滚动
    }else{
      container.className = type + '-container';
      document.documentElement.style.overflow='scroll';//恢复滚动
    }
  }else{
    return;
  }
}

/* 获取元素计算后的样式 */
function getStyle(obj){
  var style = null;
  if (window.getComputedStyle) {
      style = window.getComputedStyle(obj, null);
  } else {
      style = obj.currentStyle;
  }
  return style;
}

/* 设置contact icon显示 */
function setContactIcons(){
  var container = document.getElementById('contact_container');
  if(container.className === 'contact-container'){
    container.className = 'contact-container show';
  }else{
    container.className = 'contact-container';
  }
}

/* TODO 常用工具函数整理 */
function createXHR(){
  if (typeof XMLHttpRequest != "undefined"){
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != "undefined"){
    if (typeof arguments.callee.activeXString != "string"){
      var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], i, len;
      for (i=0,len=versions.length; i < len; i++){
        try {
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          break;
        } catch (ex){
        //跳过
        }
      }
    }
    return new ActiveXObject(arguments.callee.activeXString);
  } else {
    throw new Error("No XHR object available.");
  }
}

function getSearchRes(keyword){
  var xhr = createXHR();
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
        //发送成功
        setSearchRes(xhr.responseText,true);
      } else {
        //发送失败
        setSearchRes(xhr.responseText,false);
      }
    }
  };
  xhr.open("get", "https://api.github.com/search/code?q=" + keyword + "+in:file+language:html+repo:ouhsub/ouhsub.github.io", true);
  xhr.send();
}

function setSearchRes(data,done){
  if(!done){

  }else{
    var container = document.getElementById('result_list');
    container.innerHTML = '';
    data = JSON.parse(data).items;
    for(var i=0; i<data.length; i++){
      if(data[i].path.indexOf('_posts') >= 0){
        var item = {};
        item.path = data[i].path.replace('_posts/','').replace(/-/g,'/');
        item.name = data[i].name.replace('.html','');
        var namearr = item.name.split('-');
        namearr.pop();
        item.dates = namearr.join('-');
        item.name = item.name.split('-')[3];

        var list = document.createElement('li');
        list.className = 'result-item';
        var link = document.createElement('a');
        var time = document.createElement('span');
        link.href = '/' + item.path;
        link.innerHTML = item.name;
        time.innerHTML = item.dates;
        list.appendChild(link);
        list.appendChild(time);
        container.appendChild(list);
      }
    }
  }
}

function showSearchPage(){
  var page = document.getElementById('search_result_container');
  page.className = 'search-result-container';
  document.documentElement.scrollTop = 0;
  window.pageYOffset = 0;
  document.body.scrollTop = 0;
  document.documentElement.style.overflow='hidden';//禁止滚动
}

function hideSearchPage(){
  var page = document.getElementById('search_result_container');
  page.className = 'search-result-container hidden';
  document.documentElement.style.overflow='scroll';//回复滚动
}

function setSearchBtn(){
  var val = search_input.value;
  val = val.replace(/(^\s*)|(\s*$)/g, '');
  if(val.length <= 0){
    search_page_btn.disabled = true;
  }else{
    search_page_btn.disabled = false;
  }
}

function makeASearch(){
  var target = search_input.value;
  target = target.replace(/(^\s*)|(\s*$)/g, '');
  if(target.length === 0){
    return false;
  }else{
    getSearchRes(target);
  }
}

/* set weChat display */
function setWechat(){
  var wechat = document.getElementById('wechat_container');
  if(wechat.className === 'wechat-container hidden'){
    wechat.className = 'wechat-container';
    if(getStyle(document.getElementById('dismiss_wechat')).display === 'block'){
      document.documentElement.style.overflow='hidden';
    }
  }else{
    wechat.className = 'wechat-container hidden';
    if(getStyle(document.getElementById('dismiss_wechat')).display === 'block'){
      document.documentElement.style.overflow='scroll';
    }
  }
}
