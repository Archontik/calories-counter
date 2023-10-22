// Константы активности
const varActive = {
    min: 1.2,
    low: 1.375,
    medium: 1.55,
    high: 1.725,
    max: 1.9
}


// Объект с начальным данными
const initState = {
    gender: 'male',
    initNum: '',
    active: varActive.min,
    buttonCalc: 'disabled',
    infoBlock: 'none'
}

// Получение элемента инпута
function getElement(selector, isChecked = false) {
    let check
    if (!isChecked) {
        check = ''
    } else {
        check = ':checked'
    }

    return document.querySelector(`input[name="${selector}"]` + `${check}`)
}


// Формула счета каллорий
function calculateCal(init) {
    let k
    let activity = varActive[init.activity]

    if (init.gender === 'male') {
        k = 5
    } else if (init.gender === 'female') {
        k = -161
    }
    return ((10*init.weight) + (6.25*init.height) - (5*init.age) + k)*activity
}


// Кнопки
let buttonCalc = document.querySelector('.form__submit-button')
let buttonRes = document.querySelector('.form__reset-button')

// Поля ввода
let gender = getElement('gender', true)
let age = getElement('age')
let height = getElement('height')
let weight = getElement('weight')
let activity = getElement('activity', true)

// Окно результата и его данные
let countRes = document.querySelector('.counter__result')
let countMin = document.getElementById('calories-minimal')
let countNorm = document.getElementById('calories-norm')
let countMax = document.getElementById('calories-maximal')


// Класс для создания объекта с данным
class Init {
    constructor() {
        this.init = {
            gender: getElement('gender', true).value,
            age: getElement('age').value,
            height: getElement('height').value,
            weight: getElement('weight').value,
            activity: getElement('activity', true).value
        }
        this.res = calculateCal(this.init)
    }
}


// Вычисление и показ окна с результатом
function showRes(res) {
    countRes.classList.remove('counter__result--hidden')
    countMin.textContent = Math.floor(+res * (1 - 0.15))
    countNorm.textContent = Math.floor(res)
    countMax.textContent = Math.floor(+res * (1 + 0.15))
}


buttonCalc.addEventListener('click', (e) => {
    e.preventDefault()
    let init = new Init()
    showRes(init.res)
})

// Сброс

buttonRes.addEventListener('click', () => {
    gender.value = initState.gender
    age.value = initState.initNum
    height.value = initState.initNum
    weight.value = initState.initNum
    activity.value = initState.active
    buttonRes.disabled = true
    buttonCalc.disabled = true
 })

// Активация кнопок

let inputs = [age, weight, height]
window.addEventListener('input', (e) => {
    if (inputs.includes(e.target)) {
        if (age.value && weight.value && height.value) {
            buttonCalc.removeAttribute('disabled')
        }

        if (age.value || weight.value || height.value) {
            buttonRes.removeAttribute('disabled')
        }
    }
})
