import React from "react";
// Add import statements below
import { useSelector, useDispatch } from "react-redux";
import {
  selectVisibleIDs,
  flipCard,
  selectMatchedIDs,
  resetCards,
} from "../../boardSlice";

let cardLogo = "./img/united.webp";

export const Card = ({ id, contents }) => {
  // Add selected/retrived data from selectors and dispatch variables below
  const visibleIDs = useSelector(selectVisibleIDs);
  const matchedIDs = useSelector(selectMatchedIDs);
  const dispatch = useDispatch();
  // flip card action
  const flipHandler = (id) => {
    dispatch(flipCard(id));
  };

  //Reset the unmatched cards by clicking any card
  const tryAgainHandler = () => {
    dispatch(resetCards());
  };

  let cardStyle = "resting";
  let click = () => flipHandler(id);

  let cardText = (
    <img src={cardLogo} className="logo-placeholder" alt="Card option" />
  );

  // 1st if statement
  // implement card id array membership check
  if (visibleIDs.includes(id) || matchedIDs.includes(id)) {
    cardText = contents;
    click = () => {};
  }

  // 2nd if statement
  // implement card id array membership check
  if (matchedIDs.includes(id)) {
    cardStyle = "matched";
  }

  // 3rd if statement
  // limit the number of flipped cards allowed to two cards only
  if (visibleIDs.length === 2) {
    click = tryAgainHandler;
  }

  if (visibleIDs.length >= 2 && !matchedIDs.includes(id)) {
    cardStyle = "no-match";
  }
  return (
    <button onClick={click} className={`card ${cardStyle}`}>
      {cardText}
    </button>
  );
};
