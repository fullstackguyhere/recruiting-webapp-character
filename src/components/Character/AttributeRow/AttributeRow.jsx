import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementAttribute, decrementAttribute } from "../../../store/actions";
import styles from "./AttributeRow.module.css";

const AttributeRow = ({ currentAttribute, filteredCharacter }) => {
  const dispatch = useDispatch();
  const activeCharAttrPointsAvailable = useSelector((state) => state.activeCharAttrPointsAvailable);

  const handleIncrement = () => {
    if (activeCharAttrPointsAvailable === 0) { 
      
      alert(`A character can have up to 70 Delegated Attribute Points`); 
      return; 
    }

    dispatch(incrementAttribute(currentAttribute));
  };

  const handleDecrement = () => {
    dispatch(decrementAttribute(currentAttribute));
  };
  return (
    <div className={styles["attribute-row"]}>
      <span className="attribute-name">{currentAttribute}</span>
      <span className="attribute-value">
        {filteredCharacter?.attributes[currentAttribute].points}
      </span>
      <span className={styles["attribute-modifier"]}>
        ({filteredCharacter?.attributes[currentAttribute].modifier})
      </span>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
};

export default AttributeRow;
