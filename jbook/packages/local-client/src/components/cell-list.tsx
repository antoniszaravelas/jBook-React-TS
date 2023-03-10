import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";
import { Fragment, useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { saveCells } from "../state/action-creators";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cellsReducer }) => {
    if (cellsReducer) {
      let { order, data } = cellsReducer;
      return order.map((id) => data[id]);
    }
  });

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells?.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <div className={cells?.length === 0 ? "force-visible" : ""}>
        <AddCell nextCellId={null} />
      </div>
    </div>
  );
};

export default CellList;
