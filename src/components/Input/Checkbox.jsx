import React from 'react';
import { Check } from 'react-feather';

const Checkbox = ({ value=true, isEnabled=true, onChange=()=>{} }) => {
  return (
    <label>
      <input type={'checkbox'} onChange={e => onChange(e)} defaultChecked={value} className={'hidden'} disabled={!isEnabled} />

      <div
        className={`w-6 h-6 mr-1 cursor-pointer transition-all rounded border border-gray-300 ${!isEnabled ? 'cursor-not-allowed' : ''}`}
      >
        <div className={`grid justify-center items-center h-full duration-50 transition-all ${!!value ? 'opacity-100' : 'opacity-0'}`}>
          <Check size={20} />
        </div>
      </div>
    </label>
  )
};

export default Checkbox;