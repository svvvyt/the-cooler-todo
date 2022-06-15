import React from 'react';
import axios from 'axios';

import List from '../List/List';
import Badge from '../Badge/Badge';

import closeSvg from '../../assets/img/close.svg';

import './AddList.scss';

export default function AddList({ colors, onAdd }) {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(3);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const handleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const handleClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    setIsLoading(true);
    // const color = colors.filter((color) => color.id === selectedColor[0].name)
    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor
      })
      .then(({ data }) => {
        const color = colors.filter((color) => color.id === selectedColor[0].name);
        const listObj = {
          ...data,
          color,
          tasks: []
        };
        onAdd(listObj);
        handleClose();
      })
      .catch(() => {
        alert('Ошибка при добавлении списка');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={handleVisiblePopup}
        items={[
          {
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: 'Добавить список',
            className: 'list__add-button'
          }
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={handleClose}
            src={closeSvg}
            alt="Close button"
            className="add-list__popup-close-btn"
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            className="field"
            type="text"
            placeholder="Название списка"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                key={color.hex}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button onClick={addList} className="btn btn--main">
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
}
