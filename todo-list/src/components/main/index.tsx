import styles from './main.module.scss';

import MyTitle from '../UI/myTitle';
import MyButton from '../UI/myButton';
import Form from '../form';
import { useState } from 'react';
import List from '../list';

interface ToDo {
  id: number,
  title: string,
  text: string,
}

function Main() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "School", text: "Do math ex.13 on page 256" },
    { id: 2, title: "Birthday", text: "Buy a present and flowers for my mom's birthday" },
  ]);

  function removeToDoItem(post: ToDo) {
    setTodoList(todoList.filter(item => item.id !== post.id));
  }

  function createToDoItem(newToDoItem: ToDo) {
    setTodoList([...todoList, newToDoItem]);
  }

  function changeToDoItem(oldToDo: ToDo, newToDo: ToDo) {
    const id = todoList.findIndex((item) => item.id === oldToDo.id);
    setTodoList([...todoList.slice(0, id), newToDo, ...todoList.slice(id + 1)]);
  }

  function saveInLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }
  
  return (
    <main className={styles.main}>
      <MyTitle title={"todo app"} />
      <Form createToDo={createToDoItem} />
      { todoList.length
        ? <div>
            <List todoList={todoList} removeItem={removeToDoItem} changeItem={changeToDoItem} />
            <MyButton text="save todos" onClick={saveInLocalStorage} style={styles.button} />
          </div>
        : <div className={styles.nothing}>Nothing to do</div>
      }
     
    </main>
  );
}

export default Main;
