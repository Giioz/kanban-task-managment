import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

import crossIcon from "../assets/crossIcon.svg";
import Boards, { Board, Column, Task } from "../interfaces/boardInterface"
import { BoardType } from "../components/Header";



interface AddEditBoardModalProps {
setBoardType?: (value:BoardType) => void;
  setDropDown?: (value: boolean) => void;
  setBoardModelOpen: (value: boolean) => void;
  type: "add" | "edit";
}

export const AddEditBoardModal = ({setBoardType,setBoardModelOpen,type}: AddEditBoardModalProps) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const board = useSelector((state:any) =>
    state.boards.find((board:Board) => board.isActive)
  );
  const [newColumns, setNewColumns] = useState<Column[]>([
    { name: "Todo", tasks: [], id: uuid() },
    { name: "Doing", tasks: [], id: uuid() },
  ]);

  const [isValid, setIsValid] = useState<boolean>(true);


  useEffect(() => {
    if (type === "edit" && isFirstLoad && board) {
      setNewColumns(
        board.columns.map((col:any) => ({
          ...col,
          id: uuid(),
        }))
      );
      setName(board.name);
      setIsFirstLoad(false);
    }
  }, [type, isFirstLoad, board]);

  const onChange = (id: string, newValue: string) => {
    setNewColumns((prevState) =>
      prevState.map((col) => (col.id === id ? { ...col, name: newValue } : col))
    );
  };

  const onDelete = (id: string) => {
    setNewColumns((prevState) => prevState.filter((cl) => cl.id !== id));
  };

  const validateModal = (): boolean => {
    setIsValid(false);
    if (!name.trim()) return false;
    for (const col of newColumns) {
      if (!col.name.trim()) return false;
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = (type: "add" | "edit") => {
    setBoardModelOpen(false);
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className="fixed right-0 left-0 top-0 bottom-0 px-2 py-2 scrollbar-hide overflow-scroll z-50
      flex justify-center items-center bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModelOpen(false);
      }}
    >
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white
        dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md
        shadow-[#364e7e1a] max-w-md mx-auto w-full p-8 rounded-xl"
      >
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Board</h3>
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm 
                border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        {/* Board Columns */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
          {newColumns.map((column, index) => (
            <div className="flex items-center w-full space-x-4" key={column.id}>
              <input
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm
                            border border-gray-600 outline-none focus:outline-[#735fc7]"
                type="text"
                value={column.name}
                onChange={(e) => onChange(column.id, e.target.value)}
              />
              <img
                src={crossIcon}
                className="cursor-pointer m-4"
                onClick={() => onDelete(column.id)}
              />
            </div>
          ))}
        </div>

        <div>
          <button
            className="transition w-full items-center hover:opacity-75 dark:text-[#635fc7]
                dark:bg-white text-white bg-[#635fc7] mt-2 py-2 rounded-full"
            onClick={() => {
              setNewColumns((state) => [
                ...state,
                { name: "", tasks: [], id: uuid() },
              ]);
            }}
          >
            + Add new Column
          </button>

          <button
            className="transition w-full items-center hover:opacity-75 dark:text-white
                dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full"
            onClick={() => {
              const isValid = validateModal();
              if (isValid) {
                onSubmit(type);
                setBoardModelOpen(false);
                
              }
            }}
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

