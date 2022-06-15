import React from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';

import './AddTask.scss';

export default function AddTask({ list, onAddTask }) {
  const [visibleForm, setVisibleForm] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [isSending, setIsSending] = React.useState('');

  const toggleVisibleForm = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false
    };
    setIsSending(true);
    axios
      .post('http://localhost:3001/tasks', obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleVisibleForm();
      })
      .catch((e) => {
        alert('Ошибка при добавлении задачи');
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="add-task__form">
      {!visibleForm ? (
        <div onClick={toggleVisibleForm} className="add-task__form-new">
          <img src={addSvg} alt="add button" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="add-task__form-expanded">
          <input
            onChange={(e) => setInputValue(e.currentTarget.value)}
            value={inputValue}
            className="field"
            type="text"
            placeholder="Текст задачи"
          />
          <button disabled={isSending} onClick={addTask} className="btn btn--main">
            {isSending ? 'Добавление...' : 'Добавить задачу'}
          </button>
          <button onClick={toggleVisibleForm} className="btn btn--secondary">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}
