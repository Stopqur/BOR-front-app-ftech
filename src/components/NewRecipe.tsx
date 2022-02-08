import { Form, FormControl, Button, Modal } from "react-bootstrap"
import React, { useState } from 'react'
import { useDispatch } from "react-redux"

import createRecipe from '../api/recipeApi'
import { UseSelectorType } from '../hooks/hookUseSelector'
import { getRecipes } from "../store/actions/recipe"

interface INewRecipe {
  show: boolean;
  close: any;
}

const NewRecipe = ({show, close}: INewRecipe) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [stepName, setStepName] = useState<string>('')
  const [cookingSteps, setCookingSteps] = useState<any[]>([])
  const [quantitySteps, setQuantitySteps] = useState<number>(5)
  const [complexity, setComplexity] = useState<any>('')
  const [cookingTime, setCookingTime] = useState<string>('')
  const [img, setImg] = useState<any | null>(null)
  const [error, setError] = useState<boolean>(false)

  const { userId } = UseSelectorType(store => store.authUserId)

  const createStep = () => {
    if (quantitySteps > 0 && stepName !== '') {
      const newStep = {
        name: stepName
      }
      setCookingSteps([...cookingSteps, newStep])
      setStepName('')
      setQuantitySteps(quantitySteps - 1)
    }
  }
  const dataToRecipe = async() => {
    try {
      const formData = new FormData()
      formData.append('img', img) 
      console.log(title, description, cookingSteps, userId, complexity, cookingTime, formData)
      if(title !== undefined 
          && description !== undefined 
          && cookingSteps !== undefined
          && userId !== undefined
          && complexity !== undefined
          && cookingTime !== undefined
          ) {
            await createRecipe({title, description, cookingSteps, userId, complexity, cookingTime, formData})
            dispatch(getRecipes())
            close()
          } else {
            setError(true)
          }
    } catch(e) {
      console.log(e)
    }
  }
  
  return (
    <Modal
      show={show}
      onHide={close}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className='h5' id='contained-modal-title-vcenter'>
          Adding a recipe
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {error ?
      <div className='alert alert-danger'>Fill in all the fields!</div>
      : null
      }
        <Form>
          <FormControl
            className='mb-3'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Title'
          />
          <FormControl
            className='mb-3'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Description'
          />
          <div className='mb-3'>
            <div className='d-flex align-items-center'>
              <FormControl
                className='w-50'
                placeholder='Cooking step of recipe'
                value={stepName}
                onChange={(e) => setStepName(e.target.value)}
              />
              <div className='cooking-step__action'>
                <Button onClick={() => createStep()}>Add step</Button>
              </div>

            </div>
            <p className='cooking-step__helping'>(no more than {quantitySteps})</p>
            {cookingSteps.map((step, index) => {
              return <p key={index}>{index + 1}) {step.name}</p>
            })}
          </div>
          <FormControl
            className='mb-3'
            type='number'
            value={complexity}
            onChange={e => setComplexity(e.target.value)}
            placeholder='Complexity of cooking (from 1 to 5)'
            min='0'
            max='5'
          />
          <FormControl
            className='mb-3'
            // type='time'
            value={cookingTime}
            onChange={e => setCookingTime(e.target.value)}
            placeholder='Cooking time of recipe (in minutes)'
            min='0'
            max='2:00:00'
          />
          <label className='mb-2' htmlFor="recipe-img">Add recipe image</label>
          <FormControl
            id='recipe-img'
            type='file'
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setImg(e.target.files![0])}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={() => close()}>Close</Button>
        <Button 
          variant='outline-success' 
          onClick={() => dataToRecipe()}
        >Add</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewRecipe