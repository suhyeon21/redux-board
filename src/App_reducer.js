import { createAction, handleActions } from "redux-actions";

//action type
const BOARD_SAVE = "SAVE";
const BOARD_REMOVE = "REMOVE";
const BOARD_READ = "ONE";
const BOARD_LIST = "LIST";

export const board_save = createAction(BOARD_SAVE);
export const board_remove = createAction(BOARD_REMOVE, (brdno) => brdno); //다른 함수들처럼 brdno 받는 거 생략 가능
export const board_read = createAction(BOARD_READ);
export const board_list = createAction(BOARD_LIST);

const initialState = {
  maxNo: 3,
  boards: [
    {
      brdno: 1,
      brdwriter: "Lee SunSin",
      brdtitle: "If you intend to live then you die",
      brddate: new Date(),
    },
    {
      brdno: 2,
      brdwriter: "So SiNo",
      brdtitle: "Founder for two countries",
      brddate: new Date(),
    },
  ],
  selectedBoard: {},
};

export default handleActions(
  {
    [BOARD_SAVE]: (state, { payload: data }) => {
      let boards = state.boards;
      if (!data.brdno) {
        let maxNo = state.maxNo;
        return {
          maxNo: maxNo + 1,
          boards: boards.concat({ ...data, brdno: maxNo, brddate: new Date() }),
          selectBoard: {},
        };
      } else {
        return {
          ...state,
          boards: boards.map((row) =>
            data.brdno === row.brdno ? { ...data } : row,
          ),
          selectBoard: {},
        };
      }
    },
    [BOARD_REMOVE]: (state, { payload: brdno }) => {
      let boards = state.boards;
      return {
        ...state,
        boards: boards.filter((row) => row.brdno !== brdno),
        selectBoard: {},
      };
    },
    [BOARD_READ]: (state, { payload: brdno }) => {
      let boards = state.boards;
      return {
        ...state,
        selectedBoard: boards.find((row) => row.brdno === brdno),
      };
    },
  },
  initialState,
);

// export default function board_reducer(state = initialState, action) {
//   let boards = state.boards;

//   switch (action.type) {
//     case BOARD_SAVE:
//       let data = action.data;
//       let maxNo = state.maxNo;
//       if (!data.brdno) {
//         // new : Insert
//         return {
//           maxNo: maxNo + 1,
//           boards: boards.concat({ ...data, brdno: maxNo, brddate: new Date() }),
//           selectedBoard: {},
//         };
//       }
//       return {
//         ...state,
//         boards: boards.map((row) =>
//           data.brdno === row.brdno ? { ...data } : row,
//         ),
//         selectedBoard: {},
//       };
//     case BOARD_REMOVE:
//       return {
//         ...state,
//         boards: boards.filter((row) => row.brdno !== action.brdno),
//         selectedBoard: {},
//       };
//     case BOARD_READ:
//       return {
//         ...state,
//         selectedBoard: boards.find((row) => row.brdno === action.brdno),
//       };
//     default:
//       return state;
//   }
// }
