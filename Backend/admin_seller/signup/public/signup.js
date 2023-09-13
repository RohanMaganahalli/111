document.addEventListener('DOMContentLoaded', function(){
    const signupForm=document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(e){
        e.preventDefault();

        const name=document.getElementById('name').value;
        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;

        const xhr=new XMLHttpRequest();
        xhr.open('POST','/signup',true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                alert(xhr.responseText);
                signupForm.reset();
            }else if(xhr.readystate===4){
                alert('Error registering user');
            }
        };
        xhr.send(`name=${name}&email=${email}&password=${password}`);
    });
});