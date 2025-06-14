let xp = 0;
let health = 100;
let gold = 500;
let currentWeapon = 0;
let fighting;
let monsterHeatlh;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealth = document.querySelector("#monsterHealth");

const weapons = [{name: "stick", power: 5,}, {name: "dagger", power: 30,}, {name: "claw hammer", power: 50,}, {name: "sword", power: 100,}];
const monsters = [
    {
        name: "slime", 
        level: 2, 
        health: 15
    },
    {
        name: "beast", 
        level: 8, 
        health: 60
    }, 
    {
        name: "dragon", 
        level: 20, 
        health: 300
    }
 ]

// repeatable things need to be stored on a const function so you can just call it
const locations = [
    {
        name: "town square", 
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. you see a sign that says \"store\"."

    },
    {
         name: "store", 
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You entered the store" 
    },
    {
         name: "cave", 
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You entered the cave. you see some monsters." 
    },
    {
         name: "fight", 
        "button text": ["Attact", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster." 
    },
    {
         name: "kill monster", 
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, miniGame],
        text: "The monster died and you gain gold and EXP!" 
    },
    {
         name: "lose", 
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "You died :(" 
    },
    {
         name: "Win", 
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "You Win the Game!" 
    },
    {
         name: "mini game",
        "button text": ["Random number!", "Lucky Number 7!", "Go to town"],
        "button functions": [pickRandom, luckySeven, goTown],
        text: "Pick the Lucky number 7 or pick a random number. /n If your number is shown below the 7 gueses, you win 100gold!" 
    }
]

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = showInventory;

// update function
function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function showInventory() {
    playerInventory.style.display = "block";
    button4.innerText = "Hide inventory";
    playerInventory.innerText = inventory;
    button4.onclick = hideInventory;
}

function hideInventory() {
    playerInventory.style.display = "none";
    button4.innerText = "show inventory";
    playerInventory.innerText = inventory;
    button4.onclick = showInventory;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else {
        text.innerText = "You don't have enough gold to buy health.";
    }
   
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
    if (gold >= 30){
        gold -=30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You now have a " + newWeapon + ".";
        inventory.push(newWeapon);
        text.innerText += " In your Incentory you have: " + inventory;
    }
    else {
        text.innerText = "You don't have enough gold to buy a weapon.";
    }
}
    else {
        text.innerText = "You already have the best weapon.";
        button2.innerText = "sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
    playerInventory.innerText = inventory;
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        //let currentWeapon = inventory.shift(); // remove the first weapon from the inventory;
        let currentWeapon = inventory.pop(); // remove the last weapon from the inventory;
        text.innerText = "You sold your " + currentWeapon + ".";
        text.innerText = " In your Inventory you have: " + inventory;
        playerInventory.innerText = inventory;
    }
    else {
        currentWeapon = 0;
        update(locations[1]);
        text.innerText = "You can't sell your only weapon.";
    }
}


function fightSlime() {
    fighting = 0;
    goFight();  
}

function fightBeast() {
    fighting = 1;
    goFight();  
}

function fightDragon() {
    fighting = 2;
    goFight();  
}

function goFight() {
    update(locations[3]);
    monsterHeatlh = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealth.innerText = monsterHeatlh;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attacked the monster with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHeatlh -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealth.innerText = monsterHeatlh;

    if (health <= 0 ) {
        lose();
    }
    else if (monsterHeatlh <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
}

function dodge() {
    text.innerText = "You dodge the attack from " + monsters[fighting].name + ".";
}

function lose() {
    update(locations[5]);
}

function winGame () {
    update(locations[6]);
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 500;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown()
}

function miniGame (){
    update(locations[7]);
}

function pickRandom() {
    let randomGuess = Math.floor(Math.random() * 8);
    easterRandomNumber(randomGuess);
}

function luckySeven() {
    easterRandomNumber(7)
}

function easterRandomNumber (guess) {
   let guessNumbers = [];
   while (guessNumbers.length < 7){
    guessNumbers.push(Math.floor(Math.random() * 8));
   }

   text.innerText = "your number is " + guess + "\n Here are the following guesses: \n";

   for (let i = 0; i < 7; i++){
        text.innerText += guessNumbers[i] + "\n";
    }

    if (guessNumbers.indexOf(guess) !== -1){
        text.innerText += "Your Number is on the list. you win 100 gold";
        gold += 100;
        goldText.innerText = gold;
    }
    else {
        text.innerText += "Your Number is not on the list. you lose 10 gold";
        gold -= 10;
        goldText.innerText = gold;
    }

}

