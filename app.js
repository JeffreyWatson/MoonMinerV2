const clickUpgrades = {
  Shovel: {
    price: 20,
    quantity: 0,
    multiplier: 1
  },
  PickAxe: {
    price: 50,
    quantity: 0,
    multiplier: 5
  }
};

const automaticUpgrades = {
  MultiTool: {
    price: 500,
    quantity: 0,
    multiplier: 10
  },
  SlimeRig: {
    price: 5000,
    quantity: 0,
    multiplier: 100
  }
};

let slime = 50000
let clickCount = 1
let autoCount = 0
let totalClickUpgrades = 0
let totalAutoUpgrades = 0
let clicksCompounded = 0
let autoCompounded = 0

function mine() {
  slime++
  clickUpgrade()
  update()
}

function update() {
  let slimeElem = document.getElementById('slime')
  // @ts-ignore
  slimeElem.innerText = slime.toString()
  let clickElem = document.getElementById('clickCount')
  // @ts-ignore
  clickElem.innerText = clickCount.toString()
  let autoElem = document.getElementById('autoCount')
  // @ts-ignore
  autoElem.innerText = autoCount.toString()
}

function buyClickUpgrades(key) {
  let purchase = clickUpgrades[key]
  if (purchase.price <= slime) {
    purchase.quantity++
    slime -= purchase.price
    purchase.price++
    clickCount += purchase.multiplier
    update()
    drawClicks()
    drawClickStats()
  }
}

function drawClicks() {
  let template = ''
  for (const key in clickUpgrades) {
    let upgrades = clickUpgrades[key]
    template += `
        <button type="button" class="btn btn-success" onclick="buyClickUpgrades('${key}')"><span class=" text-font">${upgrades.price}</span><span class="slime mdi mdi-liquid-spot"></span></button>
    `
  }
  // @ts-ignore
  document.getElementById('clickPrice').innerHTML = template
}

function drawClickStats() {
  let template = ''
  for (const key in clickUpgrades) {
    let upgrades = clickUpgrades[key]
    template += `
    <p class="game-controls p-0 text-font slime d-flex flex-row justify-content-around"><span>${upgrades.quantity}</span>${key}<span class="mdi mdi-arrow-right-bold-box-outline game-icons"></span><span title="Current click totals applied">${upgrades.multiplier * upgrades.quantity}</span></p>
    `
  }
  // @ts-ignore
  document.getElementById('clickStats').innerHTML = template
}

function clickUpgrade() {
  for (const key in clickUpgrades) {
    let click = clickUpgrades[key]
    if (click.quantity > 0) {
      slime += click.multiplier * click.quantity
    }
  }
}

function buyAutoUpgrades(key) {
  let purchase = automaticUpgrades[key]
  if (purchase.price <= slime) {
    purchase.quantity++
    slime -= purchase.price
    purchase.price++
    autoCount += purchase.multiplier
    update()
    drawAuto()
    drawAutoStats()
  }
}

function drawAuto() {
  let template = ''
  for (const key in automaticUpgrades) {
    let upgrades = automaticUpgrades[key]
    template += `
        <button type="button" class="btn btn-success" onclick="buyAutoUpgrades('${key}')"><span class="text-font">${upgrades.price}</span><span class="slime mdi mdi-liquid-spot"></span></button>
    `
  }
  // @ts-ignore
  document.getElementById('autoPrice').innerHTML = template
}

function drawAutoStats() {
  let template = ''
  for (const key in automaticUpgrades) {
    let upgrades = automaticUpgrades[key]
    template += `
        <p class="game-controls p-0 text-font slime d-flex flex-row justify-content-around"><span>${upgrades.quantity}</span> ${key}<span class="mdi mdi-timer game-icons"></span><span title="Current automatic totals applied">${upgrades.multiplier * upgrades.quantity}</span></p>
    `
  }
  // @ts-ignore
  document.getElementById('autoStats').innerHTML = template
}

function runAuto() {
  for (const key in automaticUpgrades) {
    let auto = automaticUpgrades[key]
    if (auto.quantity > 0) {
      slime += auto.multiplier * auto.quantity
    }
  }
  update()
}

let autoInterval = setInterval(runAuto, 3000)
drawClicks()
drawClickStats()
drawAuto()
drawAutoStats()