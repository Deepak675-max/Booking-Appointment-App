const btn = document.querySelector('.btn');
const form = document.querySelector('#my-box');

btn.addEventListener('mouseenter', (e) => {
    e.preventDefault();
    form.style.backgroundColor = "lightgreen";
})


btn.addEventListener('mouseleave', (e) => {
    e.preventDefault();
    form.style.backgroundColor = "white";
})


// Axois Instance

const axoisInstance = axios.create({
    baseURL: 'https://crudcrud.com/api/c8b99a7a58e64ee79647a04f2b8f7b67'
})


function getAppointmentData() {
    axoisInstance.get('/appointment-data')
        .then(res => {
            console.log(res.data);
            loadData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}


function addAppointmentData(data) {
    axoisInstance.post('/appointment-data', data)
        .then(res => {
            console.log(res.data);
            getAppointmentData();

        })
        .catch(err => {
            console.log(err);
        })
}


function updateAppointmentData(id, data) {
    console.log(id);
    const userData = {
        name: data[1],
        email: data[2],
        phone: data[3],
        date: data[4],
        time: data[5]
    }
    axoisInstance.put(`/appointment-data/${id}`, userData)
        .then(res => {
            console.log(res.data);
            getAppointmentData();
        })
        .catch(err => {
            console.log(err);
        })
}


function deleteAppointmentData(id) {
    axoisInstance.delete(`/appointment-data/${id}`)
        .then(res => {
            console.log(res.data);
            getAppointmentData();
        })
        .catch(err => {
            console.log(err);
        })
}

window.addEventListener('DOMContentLoaded', getAppointmentData);


// USER FORM SCRIPT

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const dateInput = document.querySelector('#date');
const timeInput = document.querySelector('#time');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

userList.addEventListener('click', removeItem);
userList.addEventListener('click', editItem);


function onSubmit(e) {
    e.preventDefault();

    if (nameInput.value === '' || emailInput.value === '' || phoneInput.value === '' || dateInput.value === '' || timeInput.value === '') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        console.log('Please enter all fields')

        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
    } else {

        const userData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            date: dateInput.value,
            time: timeInput.value
        }

        addAppointmentData(userData);

        // Clear fields
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        dateInput.value = '';
        timeInput.value = '';

    }
}


function loadData(appointmentData) {
    userList.innerHTML = '';
    appointmentData.map(data => {
        const li = document.createElement('li');
        li.className = 'mt-5';
        // Add text node with input values
        li.appendChild(document.createTextNode(`${data._id}>>${data.name}>>${data.email}>>${data.phone}>>${data.date}>>${data.time}`));

        var editBtn = document.createElement('button');

        // Add classes to del button
        editBtn.className = 'btn btn-danger btn-sm float-end edit';

        // Append text node
        editBtn.appendChild(document.createTextNode('edit'));

        // Append button to li
        li.appendChild(editBtn);

        var deleteBtn = document.createElement('button');

        // Add classes to del button
        deleteBtn.className = 'mx-2 btn btn-danger btn-sm float-end delete';

        // Append text node
        deleteBtn.appendChild(document.createTextNode('delete'));

        // Append button to li
        li.appendChild(deleteBtn);

        userList.appendChild(li);

    })

}

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            var li = e.target.parentElement;
            const data = li.firstChild.textContent.split('>>');
            deleteAppointmentData(data[0]);
        }
    }
}


function editItem(e) {
    if (e.target.classList.contains('edit')) {
        var li = e.target.parentElement;
        const data = li.firstChild.textContent.split('>>');
        const name = document.querySelector('#name');
        name.value = data[1];
        const email = document.querySelector('#email');
        email.value = data[2];
        const phone = document.querySelector('#phone');
        phone.value = data[3];
        const date = document.querySelector('#date');
        date.value = data[4];
        const time = document.querySelector('#time');
        time.value = data[5];
        updateAppointmentData(data[0], data);
        userList.removeChild(li);
    }
}