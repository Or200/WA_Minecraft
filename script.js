const board = document.getElementById("gameBoard");
let currentTool = "";

const toolCapabilities = {
  shovel: "land",
  pickaxe: "rock",
  axe: "wood",
};

const inventory = {
  land: 0,
  rock: 0,
  wood: 0,
};

function craeteGame() {
  for (let idx = 1; idx <= 875; idx++) {
    const tile = document.createElement("div");
    // tile.innerHTML = `${idx}`;
    tile.id = `${idx}`;
    if (tile.id > 560 && tile.id <= 700) {
      tile.classList.add("land");
      // tile.classList.add("borderHover")
    } else if (tile.id > 700 && tile.id <= 875) {
      tile.classList.add("rock");
    }
    tile.classList.add("borderHover");
    tile.addEventListener("click", () => {
      let blockType = "";

      if (tile.classList.contains("land")) {
        blockType = "land";
      } else if (tile.classList.contains("rock")) {
        blockType = "rock";
      } else if (tile.classList.contains("wood")) {
        blockType = "wood";
      }

      if (toolCapabilities[currentTool] === blockType) {
        tile.classList.remove(blockType);
        tile.classList.add("sky");
        inventory[blockType]++;
        console.log(inventory);
      } else {
        console.log("Wrong tool for this block!");
      }
    });
    board.appendChild(tile);
  }
}

const tools1 = document.querySelectorAll(".footer_div1 img");
tools1.forEach((tool) => {
  tool.addEventListener("click", (e) => {
    tools1.forEach((t) => (t.style.border = "none"));
    e.target.style.border = "2px solid yellow";
    currentTool = e.target.alt;
    console.log(currentTool);
  });
});

document.querySelector(".footer_div2").addEventListener("click", () => {
  board.innerHTML = "";
  inventory.land = 0;
  inventory.rock = 0;
  inventory.wood = 0;
  currentTool = "";
  tools.forEach((t) => (t.style.border = "none"));
  craeteGame();
});

const modal = document.getElementById("inventory-modal");
const closeBtn = document.querySelector(".close-btn");
const tools = document.querySelectorAll(".footer_div1 img");

tools.forEach((tool) => {
  tool.addEventListener("click", (e) => {
    const clickedAlt = e.target.alt;

    if (clickedAlt === "box") {
      document.getElementById("count-land").innerText = inventory.land;
      document.getElementById("count-rock").innerText = inventory.rock;
      modal.style.display = "block";
    } else {
      tools.forEach((t) => (t.style.border = "none"));
      e.target.style.border = "2px solid yellow";
      currentTool = clickedAlt;
      console.log("Selected Tool:", currentTool);
    }
  });
});

closeBtn.onclick = () => modal.style.display = "none";

// סגירה בלחיצה מחוץ לחלונית
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};

craeteGame(); // קורא לפונקציה שיוצרת את המשחק בפעם הראשונה שהדף נטען