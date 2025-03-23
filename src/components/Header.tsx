// states
import { useState } from "react";

// interfaces
import boardInterface from "../interfaces/boardInterface";

// image svgs
import iconDown from "../assets/dropdown.svg";
import iconUp from "../assets/dropdown-up.svg";
import logo from "../assets/Group 15.svg";
import plus from "../assets/+.svg";
import dots from "../assets/dots.svg";

// components
import { HeaderDropdown } from "./HeaderDropdown";
import { AddEditBoardModal } from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import { AddEditTaskModal } from "../modals/AddEditTaskModal";
import { ElipsisMenu } from "./ElipsisMenu";
import { DeleteModal } from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";


export enum BoardType {
  ADD = "add",
  EDIT = "edit",
}

interface HeaderProps {
  boardModelOpen: boolean;
  setBoardModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  boardModelOpen,
  setBoardModelOpen,
}) => {
  const dispatch = useDispatch();

  const [openDropdown, setDropdown] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isElipsisOpen, setIsElipsisOpen] = useState(false);
  const [boardType, setBoardType] = useState<BoardType>(BoardType.ADD); 
  const [taskType, setTaskType] = useState<"add" | "edit">("add"); 
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile"); 

  const boards = useSelector((state: boardInterface) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenEditModal = () => {
    setBoardModelOpen(true);
    setIsElipsisOpen(false);
    setBoardType(BoardType.EDIT);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard());
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    setIsDeleteModalOpen(false);
  };

  const onDropDownClick = () => {
    setDropdown((state) => !state);
    setIsElipsisOpen(false);
    setBoardType(BoardType.ADD); 
  };

  return (
    <div className="p-4 fixed left-0 right-0 bg-white dark:bg-[#2b2c37] z-50">
      <header className="flex justify-between dark:text-white items-center">
        <div className="flex items-center space-x-2 md:space-x-4">
          <img className="h-6 w-6" src={logo} alt="Logo" />
          <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl">
            Kanban
          </h3>
          <div className="flex items-center space-x-2">
            <h3 className="max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              {board?.name}
            </h3>
            <div className="h-4 flex items-center" onClick={onDropDownClick}>
              <img
                className="md:hidden cursor-pointer"
                src={openDropdown ? iconUp : iconDown}
                alt="Dropdown Icon"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-4 items-center md:space-x-6">
          <button
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
            className="button hidden md:inline-block"
          >
            + Add New Task
          </button>
          <button
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
            className="button py-1 px-3 w-[48px] flex items-center justify-center h-[32px] md:hidden"
          >
            <img className="w-3 h-3" src={plus} alt="Plus Icon" />
          </button>
          <img
            onClick={() => {
              setBoardType(BoardType.EDIT); 
              setDropdown(false);
              setIsElipsisOpen((state) => !state);
            }}
            className="cursor-pointer h-6"
            src={dots}
            alt="Options Menu"
          />

          {isElipsisOpen && (
            <ElipsisMenu
              setOpenDeleteModal={setOpenDeleteModal}
              setOpenEditModal={setOpenEditModal}
              type="Board"
            />
          )}
        </div>
      </header>

      {openDropdown && (
        <HeaderDropdown
        setBoardType = {setBoardType}
          setDropdown={setDropdown}
          setBoardModelOpen={setBoardModelOpen}
        />
      )}

      {boardModelOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setBoardModelOpen={setBoardModelOpen}
          setDropDown={setDropdown}
        />
      )}

      {openAddEditTask && (
        <AddEditTaskModal
          setopenAddEditTask={setOpenAddEditTask}
          type={taskType}
          device={device}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          type="board"
          title={board?.name}
          onDeleteBtnClick={onDeleteBtnClick}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
    </div>
  );
};

