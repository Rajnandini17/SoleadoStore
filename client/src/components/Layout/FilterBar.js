// FilterBar.js
import React from 'react';
import { Checkbox, Radio } from 'antd';
import {Prices}  from '../Layout/Prices';

const FilterBar = ({ categories, handleFilter, setRadio, resetFilters }) => {
  return (
    <div className="filter-bar">
      <div>
        <h4 className='mt-4' style={{fontWeight: 'bold'}}>Filter By Category</h4>
        <div>
          {categories?.map((c) => (
            <div key={c.id}>
              <Checkbox onChange={(e) => handleFilter(e.target.checked, c.id)}>
                {c.name}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className='mt-3' style={{fontWeight: 'bold'}}>Filter By Price</h4>
        <div>
          <Radio.Group onChange={e => setRadio(e.target.value)}>
            {Prices?.map(p => (
              <div key={p.id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
      </div>

      <div className="mt-3">
        <button className='btn btn-danger' onClick={resetFilters}>
          RESET FILTERS
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
