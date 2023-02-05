import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";
import { Fragment } from "react";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cellsReducer }) => {
    if (cellsReducer) {
      let { order, data } = cellsReducer;
      return order.map((id) => data[id]);
    }
  });

  const renderedCells = cells?.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} />
    </div>
  );
};

export default CellList;
