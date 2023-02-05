import "./add-cell.css";
import { useActions } from "../hooks/useActions";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AddCellProps {
  // because we will need to put the cell before the cell
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();

  return (
    <div className="add-cell">
      <span></span>
      <div>
        <button onClick={() => insertCellBefore(nextCellId, "code")}>
          <FontAwesomeIcon icon={faPlus} /> Code{"  "}
        </button>

        <button onClick={() => insertCellBefore(nextCellId, "text")}>
          {"  "}
          <FontAwesomeIcon icon={faPlus} />
          Text
        </button>
      </div>
    </div>
  );
};

export default AddCell;
