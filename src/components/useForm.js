import React from 'react';
import { useState, useEffect } from 'react';

const useForm = (callback, validate)  => {
    const [values, setValues] = useState({
        dishName: '',
        time: '',
        dishType: ''
    })



    const handleChange = e => {
        const { name, value } = e.target;
        setValues ({
            ...values,
            [name]: value
        })
    }

    const[errors, setErrors] = useState({})
    const[isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true)
    }

    useEffect(
        () => {
          if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
          }
        },
        [errors]
      );


    return { handleChange, handleSubmit, values, errors }
}

export default useForm
