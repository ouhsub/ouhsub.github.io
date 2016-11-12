var form = document.getElementById('email_form');
form.onsubmit = function(event){
  document.getElementById('submit_btn').disabled = true;
  event.preventDefault();
  submitData();
};

var msg_input = document.getElementsByTagName('textarea')[0];
msg_input.onkeyup = function(){
  setTextareaHeight();
  checkInput(msg_input);
  setEmailForm();
};
msg_input.onblur = function(){
  checkInput(msg_input);
  setEmailForm();
};
var email_input = document.getElementById('guest_email');
var name_input = document.getElementById('guest_name');
email_input.onkeyup = function(){
  checkInput(email_input);
  setEmailForm();
};
email_input.onblur = function(){
  checkInput(email_input);
  setEmailForm();
};
name_input.onkeyup = function(){
  checkInput(name_input);
  setEmailForm();
};
name_input.onblur = function(){
  checkInput(name_input);
  setEmailForm();
};

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

function submitData(){
  var xhr = createXHR();
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
        //发送成功
        setEmailResponse(true);
      } else {
        //发送失败
        setEmailResponse(false);
      }
    }
  };
  xhr.open("post", "https://formspree.io/ouhsub@gmail.com", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Accept","application/json");
  var form = document.getElementById("email_form");
  xhr.send(serialize(form));
}

function serialize(form){
  var parts = [],
      field = null,
      i,
      len,
      j,
      optLen,
      option,
      optValue;
  for (i=0, len=form.elements.length; i < len; i++){
    field = form.elements[i];
    switch(field.type){
      case "select-one":
      case "select-multiple":
        if (field.name.length){
          for (j=0, optLen = field.options.length; j < optLen; j++){
            option = field.options[j];
            if (option.selected){
              optValue = "";
              if (option.hasAttribute){
                optValue = (option.hasAttribute("value") ? option.value : option.text);
              } else {
                optValue = (option.attributes["value"].specified ? option.value : option.text);
              }
              parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
            }
          }
        }
        break;
      case undefined:
      case "file":
      case "submit":
      case "reset":
      case "button":
        break;
      case "radio":
      case "checkbox":
        if (!field.checked){
          break;
        }
      default:
        if (field.name.length){
          parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
        }
    }
  }
  return parts.join("&");
}

function setEmailResponse(res){
  var success = document.getElementById('email_success');
  var fail = document.getElementById('email_failure');
  if(res){
    //发送成功
    success.className = 'email-success';
    document.getElementById('guest_email').value = '';
    document.getElementById('guest_name').value = '';
    document.getElementById('guest_msg').value = '';
  }else{
    //发送失败
    success.className = 'email-failure';
  }
  setFooter();
  setTimeout(function(){
    success.className = 'email-success hidden';
    fail.className = 'email-failure hidden';
    setFooter();
  },5000);
}

/* 根据输入内容调整高度 */
function setTextareaHeight(){//只能加不能减
  var textarea = document.getElementsByTagName('textarea')[0];
  var scrollHeight = textarea.scrollHeight;
  var clientHeight = textarea.clientHeight;
  if(scrollHeight > clientHeight){
    textarea.style.height = '' + scrollHeight + 'px';
  }
  setFooter();
}

/* 禁用邮件表单 */
function setEmailForm(){
  var email = document.getElementById('guest_email').value;
  var name = document.getElementById('guest_name').value;
  var msg = document.getElementById('guest_msg').value;
  if(validateEmail(email) || name.length === 0 || msg.length === 0){
    document.getElementById('submit_btn').disabled = true;
  }else{
    document.getElementById('submit_btn').disabled = false;
  }
}

function checkInput(obj){
  var val = obj.value;
  if(obj.id === 'guest_email'){
    if(validateEmail(val)){
      obj.parentNode.className = 'form-item has-error';
    }else{
      obj.parentNode.className = 'form-item';
    }
  }else{
    if(val.length === 0){
      obj.parentNode.className = 'form-item has-error';
    }else{
      obj.parentNode.className = 'form-item';
    }
  }
  setFooter();
}

function validateEmail(str){
  var errorCode = 0;
  var emailRegex = "^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\.){1,4}[a-z]{2,4}$";
  var re=new RegExp(emailRegex);
  if (!re.test(str)){
    errorCode = 1;
  }
  return errorCode;
}
