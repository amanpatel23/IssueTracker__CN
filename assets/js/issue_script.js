const filter__form = document.getElementById('filter__form__outer');
const open__filter__button = document.getElementById('filter__button');
const close__filter__button = document.getElementById('close__filter_form');
const body = document.querySelector('body');

close__filter__button.addEventListener('click', function() {
    filter__form.style.display = 'none';
    body.classList.remove('overlay');
})

document.addEventListener('click', (event) => {
    let element = event.target;
    while (element != null) {
        if (element == open__filter__button) {
            filter__form.style.display = 'block';
            body.classList.add('overlay');
            return;
        }
        if (element == filter__form) {
            return;
        }
        element = element.parentNode;
    }
    filter__form.style.display = 'none';
    body.classList.remove('overlay');
    return;
    }
)