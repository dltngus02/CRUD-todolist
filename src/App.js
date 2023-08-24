//변경후 커밋
import React, {
  useEffect,
  useReducer,
  useCallback,
  useState,
  useRef,
} from "react";

const initalState = {
  todoData: [
    {
      idx: 0,
      content: "임시1",
      date: new Date(),
      done: false,
    },
    {
      idx: 1,
      content: "임시2",
      date: new Date(),
      done: false,
    },
    { idx: 2, content: "임시3", date: new Date(), done: false },
    //content, date, done
  ],
};

export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";
export const READ = "READ";
const reducer = (state, action) => {
  switch (action.type) {
    case CREATE:
      return { ...state, todoData: [action.newItem, ...state.todoData] };
    case UPDATE:
      // console.log(action.updateItem);
      const [updateIdx, updateItem] = action.updateItem;
      const todoData = [...state.todoData];
      todoData.map((it) => {
        if (it.idx === updateIdx) {
          it.content = updateItem;
        }
      });
      return { ...state, todoData: todoData };
    case DELETE:
      return {
        todoData: state.todoData.filter((it) => it.idx !== action.deleteItem),
      };
    case READ:
      const todoDataRead = [...state.todoData];
      todoDataRead.map((it) => {
        if (it.idx === action.targetIdx) {
          it.done = true;
        }
      });
      return {
        ...state,
        todoData: todoDataRead,
      };
  }
};
function App() {
  const index = useRef(3);
  const [state, dispatch] = useReducer(reducer, initalState);
  const [todo, setTodo] = useState("");
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const onClickDelete = (index) => {
    var returnBool = window.confirm("삭제할까요?");
    if (returnBool) {
      dispatch({ type: DELETE, deleteItem: index });
    }
  };
  const onClickUpdate = (index) => {
    var returnValue = prompt("수정하고 싶은 내용을 입력하세요");
    console.log(returnValue);
    while (!returnValue || !returnValue.replace(/\s/g, "").length) {
      returnValue = prompt("빈내용은 입력 할 수 없습니다");
    }
    var returnBool = window.confirm(returnValue + "로 수정할까요?");
    while (!returnBool) {
      returnValue = prompt("수정하고 싶은 내용을 입력하세요");
      returnBool = window.confirm(returnValue + "로 수정할까요?");
    }
    alert(returnValue + "로 수정완료!");
    dispatch({
      type: UPDATE,
      updateItem: [index, returnValue],
    });
  };
  const onClickBtn = () => {
    dispatch({
      type: CREATE,
      newItem: {
        idx: index.current,
        content: todo,
        date: new Date(),
        done: false,
      },
    });
    setTodo("");
    index.current += 1;
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onClickBtn();
    }
  };
  const onClickCheckBox = (e, idx) => {
    if (e.target.checked) {
      dispatch({ type: READ, targetIdx: idx });
    } else {
      state.todoData.map((it) => {
        if (it.idx === idx) {
          it.done = false;
        }
      });
    }
    console.log(state.todoData);
  };
  return (
    <div className="App">
      <h2>todolist</h2>
      <div>
        <div>
          <input
            placeholder="할일을 입력하세요"
            value={todo}
            onChange={handleChange}
            onKeyDown={onKeyDown}
          ></input>
          <button type="button" onClick={onClickBtn}>
            제출
          </button>
        </div>
        <ul>
          {state.todoData.map((it) => (
            <div key={it.data + it.content}>
              <input
                type="checkbox"
                onClick={(e) => onClickCheckBox(e, it.idx)}
              ></input>
              {it.done ? (
                <li>
                  <del>{it.content}</del>
                </li>
              ) : (
                <li>{it.content}</li>
              )}

              <button type="button" onClick={() => onClickUpdate(it.idx)}>
                업데이트
              </button>
              <button type="button" onClick={() => onClickDelete(it.idx)}>
                삭제
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
