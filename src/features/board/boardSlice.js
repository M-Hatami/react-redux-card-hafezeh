const initialState = [
  { id: 0, contents: "حق", visible: true, matched: true },
  { id: 1, contents: "حق", visible: true, matched: true },
  { id: 2, contents: "صداقت", visible: true, matched: true },
  { id: 3, contents: "صداقت", visible: true, matched: true },
  { id: 4, contents: "میزان", visible: true, matched: true },
  { id: 5, contents: "میزان", visible: true, matched: true },
  { id: 6, contents: "وفای به عهد", visible: true, matched: true },
  { id: 7, contents: "وفای به عهد", visible: true, matched: true },
  { id: 8, contents: "حقیقت", visible: true, matched: true },
  { id: 9, contents: "حقیقت", visible: true, matched: true },
  { id: 10, contents: "واقعیت", visible: true, matched: true },
  { id: 11, contents: "واقعیت", visible: true, matched: true },
];

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "board/setBoard":
      let setState = [];
      action.payload.forEach((element, index) =>
        setState.push({
          id: index,
          contents: element,
          visible: false,
          matched: false,
        })
      );
      return setState;
    case "board/flipCard":
      let flipState = [...state];
      const cardID = action.payload;
      flipState[cardID] = { ...state[cardID], visible: true };

      const [index1, index2] = flipState
        .filter((card) => card.visible)
        .map((card) => card.id);
      if (index2 !== undefined) {
        const card1 = flipState[index1];
        const card2 = flipState[index2];
        if (card1.contents === card2.contents) {
          flipState[index1] = { ...card1, visible: false, matched: true };
          flipState[index2] = { ...card2, visible: false, matched: true };
        }
      }

      return flipState;
    case "board/resetCards":
      return state.map((card) => ({ ...card, visible: false }));
    default:
      return state;
  }
};

const wordPairs = [
  "حق",
  "حق",
  "صداقت",
  "صداقت",
  "میزان",
  "میزان",
  "وفای به عهد",
  "وفای به عهد",
  "حقیقت",
  "حقیقت",
  "واقعیت",
  "واقعیت",
];

const randomWords = () => {
  let words = [];
  let newWordPairs = [...wordPairs];
  const reps = newWordPairs.length;
  for (let i = 0; i < reps; i++) {
    const wordIndex = Math.floor(Math.random() * newWordPairs.length);
    words.push(newWordPairs[wordIndex]);
    newWordPairs.splice(wordIndex, 1);
  }

  return words;
};

// action creators
export const setBoard = () => {
  const words = randomWords();
  return {
    type: "board/setBoard",
    payload: words,
  };
};

export const flipCard = (id) => {
  return {
    type: "board/flipCard",
    payload: id,
  };
};

export const resetCards = (indices) => {
  return {
    type: "board/resetCards",
  };
};

// Add selector export statments below: include the {} of the object in a set of () for not the {} of the object being mistaken as the function body
export const selectBoard = (state) =>
  state.board.map((card) => ({ id: card.id, contents: card.contents }));

export const selectVisibleIDs = (state) =>
  state.board.filter((card) => card.visible).map((card) => card.id);

export const selectMatchedIDs = (state) =>
  state.board.filter((card) => card.matched).map((card) => card.id);
