import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Badge from '../Badge/Badge';

import removeSvg from '../../assets/img/remove.svg';

import './List.scss';

export default function List({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) {
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить этот список?')) {
      axios.delete(`http://localhost:3001/lists/${item.id}`).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <div>
      <ul onClick={onClick} className="list">
        {items.map((item, index) => (
          <li
            onClick={onClickItem ? () => onClickItem(item) : null}
            key={index}
            className={classNames(item.className, {
              active: item.active ? item.active : activeItem && activeItem.id === item.id
            })}>
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
            <span>
              {item.name}
              {item.tasks && ` (${item.tasks.length})`}
            </span>
            {isRemovable && (
              <img
                className="list__remove-button"
                src={removeSvg}
                alt="Remove icon"
                onClick={() => removeList(item)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
