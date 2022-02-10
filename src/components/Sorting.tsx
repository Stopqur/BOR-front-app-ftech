import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import Url from 'urls-tool';
import SortButtons from './SortButtons';
import { getParamsAction } from '../store/actions/params';

const Sorting = () => {
  const dispatch = useDispatch();
  const [complexityValue, setComplexityValue] = useState<any>([]);
  const [timeValue, setTimeValue] = useState<any>([]);

  const editParams = (anyParams: any) => {
    const obj = Url.getParams().object;
    let complexityRange;
    let cookingTimeRange;

    if (obj.complexity) {
      complexityRange = obj.complexity.split(',');
    } else if (obj.cookingTime) {
      cookingTimeRange = obj.cookingTime.split(',');
    }

    const groupParams: any = {
      sortBy: obj.sortBy,
      sortOrder: obj.sortOrder,
      complexity: complexityRange,
      cookingTime: cookingTimeRange,
    };

    for (const [name, value] of Object.entries(groupParams)) {
      if (anyParams.cookingTime && name === 'complexity') {
        delete groupParams[name];
        groupParams.cookingTime = anyParams.cookingTime;
      } else if (anyParams.complexity && name === 'cookingTime') {
        delete groupParams[name];
        groupParams.complexity = anyParams.complexity;
      } else if (anyParams[name]) {
        groupParams[name] = anyParams[name];
      } else if (value === undefined || value === 'undefined') {
        delete groupParams[name];
      }
    }

    Url.params = groupParams;
    dispatch(getParamsAction(groupParams));
  };

  const updateComplexitySlider = (value: any) => {
    value = value.map((item: number): any => {
      return Math.round(item).toString();
    });
    setComplexityValue(value);
    editParams({ complexity: value });
  };
  const updateTimeSlider = (value: any) => {
    value = value.map((item: number): any => {
      return Math.round(item).toString();
    });
    setTimeValue(value);
    editParams({ cookingTime: value });
  };

  return (
    <div className="sorting mb-5">
      <div className="d-flex justify-content-between mb-4">
        <div>
          <p className="text-center mb-2">Sort by title:</p>
          <SortButtons editParams={editParams} paramName={'title'} />
        </div>
        <div>
          <p className="text-center mb-2">Sort by date:</p>
          <SortButtons editParams={editParams} paramName={'createdAt'} />
        </div>
        <div>
          <p className="text-center mb-2">Sort by complexity:</p>
          <SortButtons editParams={editParams} paramName={'complexity'} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="slider-wrapper">
          <p className="slider-title">Complexity:</p>
          <Nouislider
            range={{ min: 0, max: 5 }}
            start={[0, 5]}
            step={1}
            onUpdate={updateComplexitySlider}
            connect
          />
          <div className="slider-form">
            <label className="d-flex align-items-center">
              <span className="slider-text">From:</span>
              <input
                className="slider-input"
                type="text"
                min="0"
                max="5"
                step="1"
                value={Math.round(complexityValue[0]).toString()}
                disabled
              />
            </label>
            <label className="mx-2 d-flex align-items-center">
              <span className="slider-text">To:</span>
              <input
                className="slider-input"
                type="text"
                min="0"
                max="5"
                step="1"
                value={Math.round(complexityValue[1]).toString()}
                disabled
              />
            </label>
          </div>
        </div>
        <div className="slider-wrapper">
          <p className="slider-title">Cooking time:</p>
          <Nouislider
            range={{ min: 0, max: 300 }}
            start={[0, 60]}
            step={20}
            onUpdate={updateTimeSlider}
            connect
          />
          <div className="slider-form">
            <label className="d-flex align-items-center">
              <span className="slider-text">From:</span>
              <input
                className="slider-input"
                type="text"
                min="0"
                max="5"
                step="1"
                value={`${Math.round(timeValue[0]).toString()} min`}
                disabled
              />
            </label>
            <label className="mx-2 d-flex align-items-center">
              <span className="slider-text">To:</span>
              <input
                className="slider-input"
                type="text"
                min="0"
                max="5"
                step="1"
                value={`${Math.round(timeValue[1]).toString()} min`}
                disabled
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sorting;
