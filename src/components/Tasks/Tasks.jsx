import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Task from './Task';
import AddTask from '../AddTask/AddTask';

import editSvg from '../../assets/img/edit.svg';

import './Tasks.scss';

export default function Tasks({
  list,
  onEditTitle,
  onAddTask,
  isEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask
}) {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('http://localhost:3001/lists' + list.id, {
          name: newTitle
        })
        .catch('Не удалось обновить название списка');
    }
  };

  return (
    <div className="tasks">
      <Link to={`lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={editSvg} alt="Edit button" />
        </h2>
      </Link>

      <div className="tasks__items">
        {!isEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              onComplete={onCompleteTask}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              key={task.id}
              {...task}
            />
          ))}
        <AddTask key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
}
