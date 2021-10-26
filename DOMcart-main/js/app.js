//Variables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody');
      clearCartBtn = document.querySelector('#clear-cart');


//Listeners

loadEventListeners();

function loadEventListeners(){
     //when  a new course is added
     courses.addEventListener('click', buyCourse);

     // When the remove button is clicked
     shoppingCartContent.addEventListener('click', removeCourse);

     // Clear Cart Btn     
     clearCartBtn.addEventListener('click', clearCart);

    // Document Ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
    }




//Functions
function buyCourse(e) {
        e.preventDefault();
    //Use delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')){
        //read the course values
        const course =e.target.parentElement.parentElement;

        //read the values
        getCourseInfo(course);
    }
} 
// Reads the HTML information at the selected course
function getCourseInfo(course) {
    //Create an object with Course Data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id:course.querySelector('a').getAttribute('data-id')
    }
    // Insert into the shopping cart
    addIntoCart(courseInfo);
}
// Display the selected course into the shopping cart

function addIntoCart(course) {
    // create a <tr>
    const row = document.createElement('tr');

    // Build the template
    row.innerHTML = `
        <tr>
            <td>
                 <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    // Add into the shopping cart
    shoppingCartContent.appendChild(row);

    // Add course into storage
    saveIntoStorage(course);
}

// Add the courses into the local storage

function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    // add the course into the array
    courses.push(course);

    //since storage only saves strings, we need to convert JSON into string
    localStorage.setItem('courses', JSON.stringify(courses) );
}

// Get the contents from storage
function getCoursesFromStorage() {

    let courses;

    // if something exist on storage then we get the value, otherwise create an empty array
    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses =JSON.parse(localStorage.getItem('courses') );
    }
    return courses;

}

// remove course from the DOM
function removeCourse(e) {
    let course, courseId;

    // Remove from the DOM
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId);
    // remove from the local Storage
    removeCourseLocalStorage(courseId);
}
// remove from local storage
function removeCourseLocalStorage(id) {
    // get the local storage data
    let coursesLS = getCoursesFromStorage();

    // loop through the array and find the index to remove
    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });

    // Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));

}


// Clears the shopping cart
function clearCart() {
    //shoppingCartContent.innerHTML = '';

    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    // Clear from Local Storage
    clearLocalStorage();
}
// clears the whole local storage
function clearLocalStorage() {
    localStorage.clear();
}

// Loads when document is ready and print courses into shopping cart

function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    // LOOP through the courses and print into the cart
    coursesLS.forEach(function(course) {
        // create the <tr>
        const row = document.createElement('tr');

        // print the content
        row.innerHTML = `
            <tr>
                <td>
                        <img src="${course.image}" width=100>
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                        <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    })
}
