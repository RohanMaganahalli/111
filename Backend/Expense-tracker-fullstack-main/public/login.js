const url = 'http://localhost:3002';

const save = async (e) => {
    e.preventDefault();
    console.log(e);
    console.log('hello');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const obj = {
        name: name.value,
        email: email.value,
        password: password.value
    };
    console.log(obj);

    try {
        const response = await axios.post(`${url}/signup`, obj);
        console.log(response);
        if (response.data.name === 'SequelizeUniqueConstraintError') {
            console.log('duplicate');
            const showResult = document.getElementById('showResult');
            showResult.innerHTML = 'User Already exists';
        } else {
            alert(response.data.message);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("isPremium", response.data.is_premium);
            window.location = `${url}/expense.html`;
        }
        name.value = '';
        email.value = '';
        password.value = '';
    } catch (err) {
        console.error(err);
    }
};

const login = async (e) => {
    console.log(e);
    console.log('login');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const obj = {
        email: email.value,
        password: password.value
    };
    console.log(obj);

    try {
        const response = await axios.post(`${url}/login`, obj);
        console.log(response);
        localStorage.setItem("userName", `${response.data.name}`);
        localStorage.setItem("token", `${response.data.token}`);
        localStorage.setItem("isPremium", `${response.data.is_premium}`);
        const showResult = document.getElementById('showResult');
        showResult.innerHTML = 'User login successfull';
        alert('user login successful');
        window.location = `${url}/expense.html`;
        email.value = '';
        password.value = '';
    } catch (err) {
        console.error(err);
        const showResult = document.getElementById('showResult');
        showResult.innerHTML = err.response.data.name;
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token === undefined || token === '' || token === null) {
    } else {
        alert("You are already logged in");
        window.location = `${url}/expense.html`;
    }


const forget_Password =document.getElementById ('forget_password');
if(forget_Password){
    forget_Password.addEventListener('click',()=>{
        window.location = `${url}/forget.html`;
    });
}
});

