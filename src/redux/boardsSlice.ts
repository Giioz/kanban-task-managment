import { createSlice } from "@reduxjs/toolkit";
import data from '../data/data.json'


const boardsSlice = createSlice({
    name : "boards",
    initialState : data.boards,
    reducers : {
        addBoard : (state, action) => {
            const isActive = state.length > 0 ? false : true;
            const payload = action.payload
            const board = {
                name : payload.name,
                isActive,
                columns : [],
            };
            board.columns = payload.newColumns;
            state.push(board)
        },
        editBoard: (state, action) => {
            const payload = action.payload;
            const board = state.find((board) => board.isActive);
            if(board){
                board.name = payload.name;
                board.columns = payload.newColumns;
            }
        },
        deleteBoard: (state) => {
            const board = state.find((board) => board.isActive);
            if(board){
                state.splice(state.indexOf(board), 1);
            }
          },
          setBoardActive: (state, action) => {
            state.map((board, index) => {
              index === action.payload.index
                ? (board.isActive = true)
                : (board.isActive = false);
              return board;
            });
          },
          addTask: (state, action) => {
            const { title, status, description, subtasks, newColIndex } =
              action.payload;
            const task = { title, description, subtasks, status };
            const board = state.find((board) => board.isActive);
            const column = board && board.columns.find((col, index) => index === newColIndex);
            if(column)
                column.tasks.push(task);
          },
          editTask: (state, action) => {
            const {
              title,
              status,
              description,
              subtasks,
              prevColIndex,
              newColIndex,
              taskIndex,
            } = action.payload;
            const board = state.find((board) => board.isActive);
            const column = board && board.columns.find((col, index) => index === prevColIndex);

            const task = column  && column.tasks.find((task, index) => index === taskIndex);
            if(task){
                task.title = title;
                task.status = status;
                task.description = description;
                task.subtasks = subtasks;
            }
            if (prevColIndex === newColIndex) return;
            if(column){
                column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
                const newCol = board.columns.find((col, index) => index === newColIndex);
                if(newCol && task)
                    newCol.tasks.push(task);
            }
          },
          dragTask: (state, action) => {
            const { colIndex, prevColIndex, taskIndex } = action.payload;
            const board = state.find((board) => board.isActive);
            const prevCol = board && board.columns.find((col, i) => i === prevColIndex);
            const task = prevCol && prevCol.tasks.splice(taskIndex, 1)[0];
            const targetCol = board && board.columns.find((col, i) => i === colIndex);
            if(targetCol && task){
                targetCol.tasks.push(task);
            }
          },
          setSubtaskCompleted: (state, action) => {
            const payload = action.payload;
            const board = state.find((board) => board.isActive);
            const col = board && board.columns.find((col, i) => i === payload.colIndex);
            const task = col && col.tasks.find((task, i) => i === payload.taskIndex);
            const subtask = task && task.subtasks.find((subtask, i) => i === payload.index);
            if(subtask)
                subtask.isCompleted = !subtask.isCompleted;
          },
          setTaskStatus: (state, action) => {
            const payload = action.payload;
            const board = state.find((board) => board.isActive);
            const columns = board && board.columns;
            const col = columns && columns.find((col, i) => i === payload.colIndex);
            if (payload.colIndex === payload.newColIndex) return;
            const task = col && col.tasks.find((task, i) => i === payload.taskIndex);
            if(col && task){
                task.status = payload.status;
                col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
            }            
            const newCol = columns && columns.find((col, i) => i === payload.newColIndex);
            if(newCol && task)
                newCol.tasks.push(task);
          },
          deleteTask: (state, action) => {
            const payload = action.payload;
            const board = state.find((board) => board.isActive);
            const col = board && board.columns.find((col, i) => i === payload.colIndex);
            if(col)
                col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
          },
    }
})

export default boardsSlice