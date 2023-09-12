function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

/** Dark & Light Mode Changer */
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('color-theme', 'dark');
  document.getElementById('mode').style.transform = 'rotateY(180deg)';
} else {
  document.documentElement.setAttribute('color-theme', 'light');
}
document.getElementById('mode').addEventListener('click', function () {
  if (document.documentElement.getAttribute('color-theme') == 'dark') {
    document.getElementById('mode').style.transform = 'rotateY(180deg)';
    document.documentElement.setAttribute('color-theme', 'light');
  } else {
    document.getElementById('mode').style.transform = 'rotateY(180deg)';
    document.documentElement.setAttribute('color-theme', 'dark');
  }
});

/**Scroll Events */
$(window).on('scroll', function () {
  let htSt = document.querySelector('html').scrollTop;
  let htSh = document.querySelector('html').scrollHeight;
  let clHt = document.querySelector('html').clientHeight;
  if (window.scrollY >= 100) {
    $('#up').removeClass('visually-hidden');
  } else {
    $('#up').addClass('visually-hidden');
  }
  if (htSh - (htSt + clHt) <= 10) {
    $('#down').addClass('visually-hidden');
  } else {
    $('#down').removeClass('visually-hidden');
  }
});

$('.scroll').on('click', function () {
  if (this.id == 'up') {
    $(window).scrollTop(0);
  } else {
    $(window).scrollTop(100000);
  }
});

/** Logo hover gif animaite */
const gifMe = './src/INIRU.gif';
const pngMe = './src/INIRU.png';
const logoMe = document.getElementById('logo');
const navBrand = document.querySelector('.navbar-brand');

navBrand.addEventListener('mouseover', function () {
  logoMe.src = gifMe;
});

navBrand.addEventListener('mouseout', function () {
  logoMe.src = pngMe;
});

/** Typing Animation*/
const letters = ['INIRU', 'YEON_JE', '연제'];

const speed = 100;
let i = 0;

const typingMe = async () => {
  const letter = letters[i].split('');

  while (letter.length) {
    await wait(speed);
    document.querySelector('.me').innerHTML += letter.shift();
  }

  await wait(2000);
  eraser();
};

const eraser = async () => {
  const letter = letters[i].split('');

  while (letter.length) {
    await wait(speed);

    letter.pop();
    document.querySelector('.me').innerHTML = letter.join('');
  }

  i = !letters[i + 1] ? 0 : i + 1;
  typingMe();
};

setTimeout(typingMe, 1500);

function levelCounter(max, doc) {
  let now = max;

  const handle = setInterval(() => {
    doc.innerHTML = `${Math.ceil(max - now)}%`;

    if (now < 1) {
      clearInterval(handle);
    }

    const step = now / 5;

    now -= step;
  }, 50);
}

fetch('./Data/info.json')
  .then((info) => info.json())
  .then((data) => {
    const skills = document.getElementById('skills-list');
    for (let i in data['skills']) {
      const badge = `
      <div class="skill-item d-flex shadow-sm justify-content-center align-items-center position-relative" id="${data['skills'][i]['name']}">
        <div class="overlay w-100 position-absolute d-flex justify-content-center">
          <p class="level text-center align-self-center">0%</p>
        </div>
        <div class="skill-badge">
          <img class="skill-item-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${data['skills'][i]['id']}/${data['skills'][i]['id']}-original.svg" alt=""/>
          <p class="badge-text text-center">${data['skills'][i]['name']}</p>
        </div>
      </div>`;
      skills.insertAdjacentHTML('beforeend', badge);
    }

    for (let i in data['skills']) {
      const lang = document.getElementById(data['skills'][i]['name']);
      const overlay = document.querySelectorAll('.overlay')[i];
      const level = document.querySelectorAll('.level')[i];
      lang.addEventListener('mouseover', function () {
        this.style.border = `5px solid ${data['skills'][i]['color']}`;
        overlay.style.opacity = '1';
        levelCounter(data['skills'][i]['level'], level);
      });

      lang.addEventListener('mouseout', function () {
        this.style.border = `0px solid ${data['skills'][i]['color']}`;
        overlay.style.opacity = '0';
      });
    }
  });

fetch('./Data/info.json')
  .then((info) => info.json())
  .then((data) => {
    const pfList = document.getElementById('portfolio-list');
    for (let i in data['portfolio']) {
      const portfolio = `
      <div class="portfolio-item shadow-sm p-4 d-flex flex-column justify-content-around mb-4">
        <div class="port-name d-flex w-100 justify-content-center gap-2 mb-1">
          ${data['portfolio'][i]['icon']}
          <h4 class="app-name">${data['portfolio'][i]['name']}</h4>
        </div>
      <p class="app-desc">
        ${data['portfolio'][i]['desc']}
      </p>
      <div>
        <a class="app-link p-2" href="${data['portfolio'][i]['link']}">
          <i class="fa-solid fa-up-right-from-square"></i>
          <span class="app-text">github.com</span>
        </a>
      </div> 
      </div>`;
      pfList.insertAdjacentHTML('beforeend', portfolio);
    }
  });

fetch('./Data/info.json')
  .then((info) => info.json())
  .then((data) => {
    const expList = document.querySelector('.experi-list-container');
    for (let i in data['experience']) {
      const experience = `<div
      class="experi-title-container d-flex justify-content-center align-items-center gap-2 w-100 mt-2"
    >
      <div
        class="experi-year d-flex justify-content-center align-items-center"
      >
        <p class="year"><span class="inline">${
          data['experience'][i]['year']
        }</span></p>
      </div>
      <div class="circle-container d-flex justify-content-center">
        <div class="circle"></div>
      </div>
      <div class="experi-title">
        <h2>${
          data['experience'][i]['title'] ??
          'To become a better Web Front-End developer'
        }</h2>
      </div>
    </div>
    <div
      class="experi-bar-container d-flex justify-content-center gap-2 mt-2 w-100"
    >
      <div class="experi-bar-null"></div>
      <div class="experi-bar-box d-flex justify-content-center">
        <div class="experi-bar"></div>
      </div>
      <div class="experience">
        <p>
          ${data['experience'][i]['experi'] ?? 'Coding for the future'}
        </p>
      </div>
    </div>`;
      expList.insertAdjacentHTML('beforeend', experience);
    }
  });

document.getElementById('contect').addEventListener('click', function () {
  $(window).scrollTop(100000);
});

document
  .querySelector('.info-image-flexbox')
  .addEventListener('mouseover', function () {
    document.querySelector('.ar-icon').style.opacity = 1;
    document.querySelector('.info-image').src = './src/INIRU.gif';
  });

document
  .querySelector('.info-image-flexbox')
  .addEventListener('mouseout', function () {
    document.querySelector('.ar-icon').style.opacity = 0;
    document.querySelector('.info-image').src = './src/INIRU.png';
  });

document
  .querySelector('.info-image-flexbox')
  .addEventListener('click', function () {
    const ar = `
    <div class="ar-camera w-100 h-100 z-2">
    <div class="position-fixed p-3 z-3">
      <i class="fa-solid fa-x ar-close"></i>
    </div>
    <a-scene
      mindar-face
      embedded
      vr-mode-ui="enable: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-camera active="false" position="0 0 0"></a-camera>
      <a-entity mindar-face-target="anchorIndex: 168">
        <a-gltf-model
          rotation="0 90 90"
          position="0 0 0.1"
          scale="0.07 0.07 0.07"
          src="./src/INIRU.gltf"
        ></a-gltf-model>
      </a-entity>
    </a-scene>
    </div>
  `;
    document.body.insertAdjacentHTML('beforebegin', ar);
    document.querySelector('.ar-close').addEventListener('click', function () {
      document.querySelector('.ar-camera').remove();
    });
  });
