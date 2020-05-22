import heic2any from "heic2any";
import { saveAs } from 'file-saver';

let image = null;
let fileName = '';
const input = document.querySelector('#file-input');
const downloadElem = document.querySelector('#download');
const downloadBtn = document.querySelector('#download-btn');
input.addEventListener('change', convertImage);
downloadBtn.addEventListener('click', () => {
    saveAs(image, fileName.replace('HEIC', 'jpeg'));
});

function convertImage() {
    const loadingElem = document.querySelector('#loading');
    loadingElem.classList.remove('d-none');
    input.setAttribute('disabled', '');

    if(input.files.length !== 1) {
        alert('Please choose one file only ');
    }

    const file = input.files[0];
    fileName = file.name;

    heic2any({blob: file, toType: "image/jpeg"})
        .then((conversionResult) => {
            image = conversionResult;
            loadingElem.classList.add('d-none');
            input.removeAttribute('disabled');
            downloadElem.classList.remove('d-none');
        })
        .catch((e) => {
            console.log(e.message);
            loadingElem.classList.add('d-none');
            input.removeAttribute('disabled');
        });
}