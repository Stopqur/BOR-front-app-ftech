import { Form, FormControl, Button, Modal } from "react-bootstrap"
import React, { useState } from 'react'
import { useDispatch } from "react-redux"

import { createRecipeWithoutImg, updateRecipeImg } from '../api/recipeApi'
import { UseSelectorType } from '../hooks/hookUseSelector'
import { getRecipes } from "../store/actions/recipe"

interface INewRecipeProps {
  show: boolean;
  close: any;
}

const NewRecipe = ({show, close}: INewRecipeProps) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [stepName, setStepName] = useState<string>('')
  const [cookingSteps, setCookingSteps] = useState<any[]>([])
  const [complexity, setComplexity] = useState<any>('')
  const [cookingTime, setCookingTime] = useState<string>('')
  const [img, setImg] = useState<any | null>(null)
  const [error, setError] = useState<boolean>(false)

  const { userId } = UseSelectorType(store => store.authUserId)

  const createStep = () => {
    if (cookingSteps.length <= 5 && stepName !== '') {
      const newStep = {
        name: stepName
      }
      setCookingSteps([...cookingSteps, newStep])
      setStepName('')
    }
  }
  const dataToRecipe = async() => {
    try {
      const formData = new FormData()
      formData.append('img', img) 
      if(title !== undefined 
        && description !== undefined 
        && cookingSteps !== undefined
        && userId !== undefined
        && complexity !== undefined
        && cookingTime !== undefined
        && formData.get('img')
        ) {
        const recipe = await createRecipeWithoutImg({
          title, 
          description, 
          cookingSteps, 
          userId, 
          complexity, 
          cookingTime
        })
        const recipe_id: any = recipe.data.id
        await updateRecipeImg({recipe_id, formData})
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
                <Button onClick={createStep}>Add step</Button>
              </div>

            </div>
            <p className='cooking-step__helping'>(no more than {5 - cookingSteps.length})</p>
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
            value={cookingTime}
            onChange={e => setCookingTime(e.target.value)}
            placeholder='Cooking time of recipe (in minutes)'
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
        <Button variant='outline-danger' onClick={close}>Close</Button>
        <Button 
          variant='outline-success' 
          onClick={dataToRecipe}
        >Add</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewRecipe