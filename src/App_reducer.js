const BOARD_SAVE = "SAVE";
const BOARD_REMOVE = "REMOVE";
const BOARD_READ = "ONE";
const BOARD_LIST = "LIST"; //CRUD 개념상 정의한 것이고 여기서 쓰진 않을 것

export const board_save = (data) => ({
  type: BOARD_SAVE,
  data,
});

export const board_remove = (brdno) => ({
  type: BOARD_REMOVE,
  brdno: brdno,
});

export const board_read = (brdno) => ({
  type: BOARD_READ,
  brdno: brdno,
});

export const board_list = () => ({ type: BOARD_LIST });

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
  selectedBoard: {}, //??
};

export default function board_reducer(state = initialState, action) {
  let boards = state.boards;

  switch (action.type) {
    case BOARD_SAVE:
      let data = action.data;
      let maxNO = state.maxNO;
      if (!data.brdno) {
        //new:Insert
        return {
          maxNo: maxNo + 1,
          boards: boards.concat({ ...data, brdno: maxNo, brddate: new data() }),
          selectedBoard: {},
        };
      }

      return {
        ...state,
        boards: boards.map((row) =>
          data.brdno === row.brdno ? { ...data } : row,
        ),
        selectedBoard: {},
      };
      console.log(...state);

    case BOARD_REMOVE: //삭제할 행을 찾아서 지우는 방식 아니고 삭제할 행 빼고 다시 배열 만드는 방식
      return {
        ...state,
        boards: boards.filter((row) => row.brdno !== action.brdno),
        selectedBoard: {},
      };
    case BOARD_READ:
      return {
        ...state,
        selectedBoard: boards.find((row) => row.brdno === action.brdno),
      };
    default:
      return state;
  }
}
