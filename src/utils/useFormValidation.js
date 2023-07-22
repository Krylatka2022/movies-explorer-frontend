import { useState, useCallback } from "react";


export function useFormValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = (e) => {
    // const {name, value, validationMessage, form} = ev.target
    const input = e.target;
    const name = input.name;
    const value = input.value;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  }

  const reset = (initialValues = {}, valid = false) => {
    setValues(initialValues)
    setErrors({})
    setIsValid(valid)
  }
  const setValue = useCallback((name, value) => {
    setValues((oldValues) => ({ ...oldValues, [name]: value }))
  }, [])


  return { values, setValue, setValues, errors, setErrors, isValid, setIsValid, handleChange, reset };
}

