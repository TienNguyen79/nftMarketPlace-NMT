import React, { useState } from 'react';
import './tabs.scss';
import { getVariablesLC, saveVariablesLC } from 'app/helpers/localStorage';

interface TabsProps {
  activeTab?: string;
  onChange?: (tab: string) => void;
  title?: string;
  quantity1?: string;
  title2?: string;
  quantity2?: string;
  title3?: string;
  quantity3?: string;
}

const Tabs: React.FC<TabsProps> = ({
  title = '',
  quantity1 = '',
  title2 = '',
  quantity2 = '',
  title3 = '',
  quantity3 = '',
  activeTab,
  onChange,
}) => {
  const [id, setId] = useState('');
  // const handleClick = (id: string) => {
  //   saveVariablesLC('tabs', id);
  //   setId(id);
  // };

  const handleClick = (id: string) => {
    if (onChange) {
      onChange(id); // Notify parent component about tab change
    }
  };

  return (
    <div className="tabs">
      {title && (
        <div
          className={`tabs-item ${activeTab === '1' ? 'active' : ''}`}
          onClick={() => handleClick('1')}
        >
          <h1 className="tabs-item__title">{title}</h1>
          <div className="tabs-item__quantity">{quantity1}</div>
        </div>
      )}

      {title2 && (
        <div
          className={`tabs-item ${activeTab === '2' ? 'active' : ''}`}
          onClick={() => handleClick('2')}
        >
          <h1 className="tabs-item__title">{title2}</h1>
          <div className="tabs-item__quantity">{quantity2}</div>
        </div>
      )}
      {title3 && (
        <div
          className={`tabs-item ${activeTab === '3' ? 'active' : ''}`}
          onClick={() => handleClick('3')}
        >
          <h1 className="tabs-item__title">{title3}</h1>
          <div className="tabs-item__quantity">{quantity3}</div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
