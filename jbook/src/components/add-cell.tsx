import "./add-cell.css";
import { useActions } from "../hooks/useActions";

interface AddCellProps {
  // because we will need to put the cell before the cell
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();

  return (
    <div>
      <button onClick={() => insertCellBefore(nextCellId, "code")}>Code</button>
      <button onClick={() => insertCellBefore(nextCellId, "text")}>Text</button>
    </div>
  );
};

export default AddCell;
