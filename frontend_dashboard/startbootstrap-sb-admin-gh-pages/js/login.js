function login() {
  var email=document.querySelector('#inputEmail');
  var pw=document.querySelector('#inputPassword');

  if(email.value=="admin"&&pw.value=="admin") location.href='./index.html';
  else alert("로그인 실패");
}
