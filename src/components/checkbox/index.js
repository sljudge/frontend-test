import React, { useState } from "react";
import styled, { css } from 'styled-components';
import * as colors from '../../colors'

const Checkbox = props => {
  const { name, id, activeFilters } = { ...props }
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked)
    const currentFilters = activeFilters.get
    if (!currentFilters.includes(id)) {
      activeFilters.set([...activeFilters.get, id])
    } else {
      activeFilters.set(currentFilters.filter(item => item !== id))
    }
  }

  return (
    <CheckboxCont onClick={handleCheckboxClick}>
      <CheckBox isChecked={isChecked} />
      <CheckboxLabel htmlFor={name}>
        {name}
      </CheckboxLabel>
    </CheckboxCont>
  )
}

const CheckboxCont = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
`
const CheckBox = styled.span`
  min-width: 1rem;
  min-height: 1rem;
  border: 2px solid #1e1e1e;
  display: flex;
  justify-content: center;
  align-items:center;
  transition: background-color 0.2s;

  ${props => props.isChecked && css`
    background-color: ${colors.primaryColor};
  `}
`

const CheckboxLabel = styled.label`
  padding: 0 1rem;
`

export default Checkbox