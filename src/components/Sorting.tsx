import { Button, Form } from 'react-bootstrap'

interface ISorting {
  sortComplexity: Function;
  complexityValue: string;
}

const Sorting = ({sortComplexity, complexityValue}: ISorting) => {
  return (
    <div className='sorting mb-5'>
      <div className='d-flex justify-content-between mb-4'>
        <div>
          <p className='text-center mb-2'>Sort by title:</p>
          <div>
            <Button className='sort-btn' onClick={e => sortComplexity('title', 'ASC')}>Direct</Button>
            <Button className='sort-btn' onClick={e => sortComplexity('title', 'DESC')}>Reverse</Button>
          </div>
        </div>
        <div>
          <p className='text-center mb-2'>Sort by date:</p>
          <div>
            <Button className='sort-btn' onClick={e => sortComplexity('created', 'ASC')}>Direct</Button>
            <Button className='sort-btn' onClick={e => sortComplexity('created', 'DESC')}>Reverse</Button>
          </div>
        </div>
        <div>
          <p className='text-center mb-2'>Sort by complexity:</p>
          <div>
            <Button className='sort-btn' onClick={e => sortComplexity('complexity', 'ASC')}>Direct</Button>
            <Button className='sort-btn' onClick={e => sortComplexity('complexity', 'DESC')}>Reverse</Button>
          </div>
        </div>
      </div>
      <Form>
        <div className="d-flex justify-content-center align-items-center form-group">
          <label htmlFor="formControlRange">Complexity: {complexityValue}</label>
          <input 
            type="range" 
            className="form-control-range" 
            id="formControlRange" 
            step='1'
            min='0'
            max='5'
            value={complexityValue}
            onChange={e => sortComplexity('complexity', e.target.value)}
          />
        </div>        
      </Form>
    </div>
  )
}

export default Sorting