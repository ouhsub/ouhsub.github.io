setActiveNav();

var fix_btn = document.getElementById('fix_btn');
if(fix_btn){
  fix_btn.onclick = setFixedNav;
}

var timeline_btn = document.getElementById('timeline_btn');
if(timeline_btn){
  timeline_btn.onclick = setTimeline;
}

var timeline = document.getElementById('timeline');
if(!timeline){
  timeline_btn.parentNode.className = 'nav-right hidden';
}else{
  timeline_btn.parentNode.className = 'nav-right';
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
  console.log(path);
  var id = path + '_link';
  document.getElementById(id).className = 'active';
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
}
