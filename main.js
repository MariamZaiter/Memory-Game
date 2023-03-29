document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What's Your Name?");

  if (yourName == null || yourName == "")
    document.querySelector(".name span").innerHTML = "Unknown";
  else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

//duration

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);

//Add order css property
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});
//flip block function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  //collect all flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    console.log(`two flipped blocks`);

    //stop clicking
    stopClicking();

    //checkMatchedBlocks
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
//stop clicking funtion
function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

//checkMatchedBlocksFunction
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }

  document.getElementById("failed").play();
}

//shuffle function

function shuffle(array) {
  //settings vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    //get random numbers
    random = Math.floor(Math.random() * current);

    current--;
    //swap operation in the array

    // 1- Save current element in the temp
    temp = array[current];

    // 2- Current element = random element
    array[current] = array[random];

    // 3- random element = temp
    array[random] = temp;
  }
  return array;
}
