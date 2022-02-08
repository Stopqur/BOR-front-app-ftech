import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

import { getSortFilterRecipes } from '../store/actions/recipe';
import { UseSelectorType } from '../hooks/hookUseSelector';
import SortButtons from './SortButtons';

const Sorting = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const path = location.pathname
  const searchParams = location.search
  const { userId } = UseSelectorType(store => store.authUserId) 
  const [complexityValue, setComplexityValue] = useState<any>([])
  const [timeValue, setTimeValue] = useState<any>([])
  const [paramsUrl, setParamsUrl] = useState<any>([])

  useEffect(() => {
    if(path !== '/recipe' && path !=='/recipe/user/' + userId) {
      setParamsUrl([])
    }
  }, [path])

  useEffect(() => {
    let url = ''
    paramsUrl.map((item: any, index: number, arr: any[]) => {
      if(index === arr.length - 1) {
        return url = url + item.param + '=' + item.value
      } 
      return url = url + item.param + '=' + item.value + '&'
    })
    dispatch(getSortFilterRecipes(paramsUrl))
    navigate(`/recipe/by/?` + url) 
  }, [paramsUrl])
  
  useEffect(() => {
    getParamsUrl('cookingTime', timeValue)
  }, [timeValue])

  useEffect(() => {
    getParamsUrl('complexity', complexityValue)
  }, [complexityValue])

  const getParamsUrl: any = (paramName: string, paramValue: any) => { 
    const stringFromUrl: any = window.location
    const paramUrlValue: any = (new URL(stringFromUrl)).searchParams.get(paramName)
    const paramUrl: any = (new URL(stringFromUrl)).searchParams.has(paramName)

    if (paramUrlValue === null) {
      if((searchParams.indexOf('DESC') !== -1 || searchParams.indexOf('ASC') !== -1)) {
        if(Array.isArray(paramValue) && searchParams.indexOf(',') !== -1) {
          const newParams = paramsUrl.map((item: { param: string; value: string | any[]; }) => {
            if(item.param === 'complexity' && (item.value !== 'ASC' && item.value !== 'DESC')) {
              item.param = paramName
              item.value = paramValue
              return item
            }
            else if (item.param === 'cookingTime') {
              item.param = paramName
              item.value = paramValue
              return item
            }
            return item
          })
          setParamsUrl(newParams)
        }
        else if(Array.isArray(paramValue)) {
          const params = {
            param: paramName,
            value: paramValue
          }
          setParamsUrl([...paramsUrl, params])
        }
        else {
          const newParams = paramsUrl.map((item: { param: string; value: string | any[]; }) => {      
            if ((item.value === 'ASC' || item.value === 'DESC') && !Array.isArray(paramValue)) {
              item.param = paramName
              item.value = paramValue
              return item
            }
            else if (Array.isArray(paramValue) && Array.isArray(item.value)) {
              item.param = paramName
              item.value = paramValue
              return item
            }
            return item
          })
          setParamsUrl(newParams)
        }
      }
      else if(Array.isArray(paramValue)) {
        const params = {
          param: paramName,
          value: paramValue
        }
        if(paramsUrl.length ===  0) {
          setParamsUrl([...paramsUrl, params])
        } else {
          setParamsUrl([params])
        }
      }
      else {
        const params = {
          param: paramName,
          value: paramValue
        }
        setParamsUrl([...paramsUrl, params])
      }
    }
    else if(paramName === 'complexity' && (paramValue === 'ASC' || paramValue === 'DESC')) {
      if((searchParams.indexOf('DESC') !== -1 || searchParams.indexOf('ASC') !== -1)) {
        const newParams = paramsUrl.map((item: { param: string; value: string | any[]; }) => {
          if (item.value === 'ASC' || item.value === 'DESC') {
            item.param = paramName
            item.value = paramValue
            return item
          } return item
        })
        setParamsUrl(newParams)
      } else {
        const params = {
          param: paramName,
          value: paramValue
        }
        setParamsUrl([...paramsUrl, params])
      }
    }
    else if(paramUrl && paramUrlValue !== paramValue) {
      if(searchParams.indexOf(',') === -1 && paramName === 'complexity' && Array.isArray(paramValue)) {
        const params = {
          param: paramName,
          value: paramValue
        }
        setParamsUrl([...paramsUrl, params])
      }
      else if(Array.isArray(paramValue) && paramName === 'complexity') {
        const newParams = paramsUrl.map((item: { param: string; value: string | any[]; }) => {
          if(item.param === 'complexity' && (item.value !== 'ASC' && item.value !== 'DESC')) {
            item.value = paramValue
            return item
          }
          else if (item.param === 'cookingTime') {
            item.param = paramName
            item.value = paramValue
            return item
          }
          return item
        })
        setParamsUrl(newParams)
      }
      else if(Array.isArray(paramValue) && paramName === 'cookingTime') {
        const newParams = paramsUrl.map((item: { param: string; value: string | any[]; }) => {
          if(item.param === 'cookingTime') {
            item.value = paramValue
            return item
          }
          return item
        })
        setParamsUrl(newParams)
      }
      else {
        const newParams = paramsUrl.map((item: { param: string; value: string | any[]; }) => {
          if(item.param === paramName) {
            item.value = paramValue
            return item
          }
          return item
        })
        setParamsUrl(newParams)
      }
    }
  }

  const updateComplexitySlider = (value: any, handle: any) => {
    value = value.map((item: number): any => {
      return Math.round(item).toString()
    })
    setComplexityValue(value)
  }
  
  const updateTimeSlider = (value: any, handle: any) => {
    value = value.map((item: any): any => {
      return Math.round(item).toString()
    })
    setTimeValue(value)

  }

  return (
    <div className='sorting mb-5'>
      <div className='d-flex justify-content-between mb-4'>
        <div>
          <p className='text-center mb-2'>Sort by title:</p>
          <SortButtons getParamsUrl={getParamsUrl} paramName={'title'}/>
        </div>
        <div>
          <p className='text-center mb-2'>Sort by date:</p>
          <SortButtons getParamsUrl={getParamsUrl} paramName={'createdAt'}/>
        </div>
        <div>
          <p className='text-center mb-2'>Sort by complexity:</p>
          <SortButtons getParamsUrl={getParamsUrl} paramName={'complexity'}/>
        </div>
      </div>
       <div className='d-flex justify-content-center'>
        <div className='slider-wrapper'>
          <p className='slider-title'>Complexity:</p>
          <Nouislider 
            range={{ min: 0, max: 5 }} 
            start={[0, 5]} 
            step={1}
            onUpdate={updateComplexitySlider}
            connect 
          />
          <div className='slider-form'>
            <label className='d-flex align-items-center'>
              <span className='slider-text'>From:</span>
              <input 
                className='slider-input'
                type='text'
                min='0' 
                max='5'
                step='1'
                value={Math.round(complexityValue[0]).toString()}
                disabled
                />
            </label>
            <label className='mx-2 d-flex align-items-center'>
              <span className='slider-text'>To:</span>
              <input 
                className='slider-input'
                type='text'
                min='0'
                max='5'
                step='1'
                value={Math.round(complexityValue[1]).toString()}
                disabled
                />
            </label>
          </div> 
        </div>
        <div className='slider-wrapper'>
          <p className='slider-title'>Cooking time:</p>
          <Nouislider 
            range={{ min: 0, max: 300 }} 
            start={[0, 10]} 
            step={20}
            onUpdate={updateTimeSlider}
            connect 
          />
          <div className='slider-form'>
            <label className='d-flex align-items-center'>
              <span className='slider-text'>From:</span>
              <input 
                className='slider-input'
                type='text'
                min='0' 
                max='5'
                step='1'
                value={`${Math.round(timeValue[0]).toString()} min`}
                disabled
                />
            </label>
            <label className='mx-2 d-flex align-items-center'>
              <span className='slider-text'>To:</span>
              <input 
                className='slider-input'
                type='text'
                min='0'
                max='5'
                step='1'
                value={`${Math.round(timeValue[1]).toString()} min`}
                disabled
                />
            </label>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Sorting