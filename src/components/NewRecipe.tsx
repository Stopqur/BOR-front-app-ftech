import { Form, FormControl, Button, Modal } from "react-bootstrap"

import React, { useState } from 'react'

import createRecipe from '../api/recipeApi'
import { UseSelectorType } from '../hooks/hookUseSelector'

interface INewRecipe {
  show: boolean;
  close: any;
}


interface IRecipeProps {
  title: string;
  desc: string;
  steps: any[];
  id: number;
  img: string;
  complexity: number;
}

const NewRecipe = ({show, close}: INewRecipe) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [stepName, setStepName] = useState<string>('')
  const [cookingSteps, setCookingSteps] = useState<any[]>([])
  const [quantitySteps, setQuantitySteps] = useState<number>(5)
  const [complexity, setComplexity] = useState<any>('')
  const [img, setImg] = useState<any | null>(null)

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
  const dataToRecipe = () => {
    try {
      const formData = new FormData()
      formData.append('img', img) 
      createRecipe({title, description, cookingSteps, userId, complexity, formData})
      close()
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
          Добавить рецепт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormControl
            className='mb-3'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='title'
          />
          <FormControl
            className='mb-3'
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='description'
          />
          <div className='mb-3'>
            <div className='d-flex align-items-center'>
              <FormControl
                className='w-50'
                placeholder='cookingStep of recipe'
                value={stepName}
                onChange={(e) => setStepName(e.target.value)}
              />
              <div className='cooking-step__action'>
                <Button onClick={() => createStep()}>Добавить шаг</Button>
              </div>

            </div>
            <p className='cooking-step__helping'>(не больше {quantitySteps})</p>
            {cookingSteps.map((step, index) => {
              return <p key={index}>{index + 1}) {step.name}</p>
            })}
          </div>
          <FormControl
            className='mb-3'
            type='number'
            value={complexity}
            onChange={e => setComplexity(e.target.value)}
            placeholder='complexity of cooking (from 1 to 5)'
            min='0'
            max='5'
          />
          <FormControl
            type='file'
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setImg(e.target.files![0])}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={() => close()}>Закрыть</Button>
        <Button 
          variant='outline-success' 
          onClick={() => dataToRecipe()}
        >Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewRecipe