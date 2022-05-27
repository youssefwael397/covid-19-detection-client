"use strict";


const form = document.getElementById('form')
const imageInput = document.getElementById('image-file')
const resultContainer = document.getElementById('result')
const error = 'Failed to predict image. please try again.';
const predictionImage = async (e, image) => {
    e.preventDefault();
    // resultContainer.innerHTML = '';
    displayLoading(resultContainer)
    console.log('predicting')
    let form = new FormData();
    form.append('image', image)

    const res = await fetch(`http://localhost:5000/covid-detection/`, {
        method: 'POST',
        body: form
    });

    if (!res.ok) {
        displayError(error, resultContainer)
    } else {
        resultContainer.innerHTML = '';
        console.log(res)
        const data = await res.json()
        // console.log(data)
        displayResultImg(data.img, data.probability, resultContainer)
    }

}


const displayResultImg = (base64, probability, resultContainer) => {
    const res_content = `
    
    <img class='w-50 shadow rounded text-center mx-auto' src='data:image/png;base64, ${base64}' alt='prediction-result'>`
    resultContainer.innerHTML = res_content;
}


const displayError = (error, errContainer) => {
    const err_content = `<p class="text-center text-danger">${error}</p>`
    errContainer.innerHTML = err_content;
}

const displayLoading = (container) => {
    const loading = `
    <p class="text-primary text-center">predicting...</p>
    <div class="d-flex justify-content-center ">
        <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `
    container.innerHTML = loading;
}


form.addEventListener('submit', (e) => predictionImage(e, imageInput.files[0]))