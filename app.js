let clickUpgrades = {
  shovel: {
    price: 100,
    quantity: 0,
    multiplier: 1
  },
  pixaxe: {
    price: 100,
    quantity: 0,
    multiplier: 1
  }
};

let automaticUpgrades = {
  multitool: {
    price: 600,
    quantity: 0,
    multiplier: 20
  },
  slimerig: {
    price: 600,
    quantity: 0,
    multiplier: 20
  }
};

let slime = 1000

function mine() {
  slime++
  update()
}

function update() {
  let slimeElem = document.getElementById('slime')
  slimeElem.innerText = slime.toString()
}

update()