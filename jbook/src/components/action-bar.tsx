import { useActions } from "../hooks/useActions";
import {
  faArrowDown,
  faArrowUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./action-bar.css";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <span className="action-bar">
      <FontAwesomeIcon onClick={() => moveCell(id, "up")} icon={faArrowUp} />

      <FontAwesomeIcon
        onClick={() => moveCell(id, "down")}
        icon={faArrowDown}
      />

      <FontAwesomeIcon onClick={() => deleteCell(id)} icon={faTrashCan} />
    </span>
  );
};

export default ActionBar;
