import React, { useState, useEffect } from 'react';
import validate from './validateInfo'
import TimeFormat from 'hh-mm-ss'
// import useForm from './useForm';
import TimeField from 'react-simple-timefield';
import axios from 'axios'
import Slider from 'rsuite/Slider';


function Form({submitForm}) {
    const [values, setValues] = useState({
        dishName: '',
        hours: 0,
        time: '',
        minutes: 0,
        seconds: 0,
        dishType: '',
        noOfSlices: 1,
        diameter: 1,
        spicinessScale: 1,
        slicesOfBread: 1
    })

    const [error, setError] = useState(null)
    const handleChange = e => {
        const { name, value } = e.target;
        setValues ({
            ...values,
            [name]: value
        })
    }

    let preparationTime = values.hours*3600 + values.minutes*60 + values.seconds;

    const[errors, setErrors] = useState({})
    const[isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true)
        console.log(values)
        fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
            method: 'POST',
            headers: {"Accept": 'application/json', "Content-Type": "application/json"},
            body: JSON.stringify({
                name: values.dishName,
                preparation_time: values.time,
                type: values.dishType,
                no_of_slices: Number(values.noOfSlices),
                diameter: Number(values.diameter)
            })
        }).then(res => {
            if(!res.ok) {
                throw Error('There`s an error. Check the submitted data.')
            }
            return res.json()
        })
        
        .then(function (response) {
            return response.json()
        }).then(function (response) {
            console.log(response);
        }).catch(err => {
            setError(err.message)
            console.log(err.message)
        })
    }

    

    useEffect(
        () => {
          if (Object.keys(errors).length === 0 && isSubmitting) {
            submitForm();
          }
        },
        [errors]
      );


    return (
        <div className="wrapper">
            <div className="content-wrapper">
            <div className="photo-left">
                <div className="text-left">
                <h1>VegeTaste</h1>
                </div>
            </div>
            <div className="form-content">
            <form className="form" onSubmit={handleSubmit}>
                <h1>What are you going to prepare for our judges?</h1>
                <div className="form-inputs">
                    <label className="form-label" htmlFor="name">
                        Dish Name: 
                    </label>
                    <input
                        id="dish-name"
                        type="text"
                        name="dishName" 
                        className="form-input" 
                        placeholder="Enter dish name..."
                        onChange={handleChange}
                        value={values.dishName}
                    />
                    {errors.dishName && <p>{errors.dishName}</p>}
                </div>
                <div className="form-inputs">
                    <label className="form-label" htmlFor="time">
                        Preparation Time (hh:mm:ss):  
                    </label>
                    <TimeField value={values.time} onChange={handleChange} showSeconds={true} className="form-input" name="time" style={{width: '100%'}} />
                    {errors.time && <p>{errors.time}</p>}
                </div>
                <div className="form-inputs">
                <label className="form-label" htmlFor="type">
                        Dish Type:
                    </label>
                    <div className="dish-type">
                    <div className="dish-type-choice">
                    <label>
                        <input type="radio" value="pizza" checked={values.dishType==="pizza"} onChange={handleChange} name="dishType"/><span>Pizza</span>
                    </label>
                    <label>
                        <input type="radio" value="soup" checked={values.dishType==="soup"} onChange={handleChange} name="dishType" /><span>Soup</span>
                    </label>
                    <label>
                        <input type="radio" value="sandwich" checked={values.dishType==="sandwich"} onChange={handleChange} name="dishType" /><span>Sandwich</span>
                    </label>
                    {errors.dishType && <p>{errors.dishType}</p>}
                    </div>
                {values.dishType === "pizza" && 
                <div className="dish-type-fields">
                    <div>
                    <label className="form-label" htmlFor="type">
                        Number of Slices:
                    </label>
                        <input
                            id="no_of_slices"
                            type="number"
                            pattern='[0-9]'
                            name="noOfSlices" 
                            className="form-input"  
                            placeholder="Number of Slices"
                            onChange={handleChange}
                            value={values.noOfSlices}
                            />
                        {errors.noOfSlices && <p>{errors.noOfSlices}</p>}
                        </div>
                        <div>
                        <label className="form-label" htmlFor="type">
                        Diameter: 
                        </label>
                        <input
                            id="diameter"
                            type="number"
                            name="diameter" 
                            className="form-input" 
                            placeholder="Diameter"
                            onChange={handleChange}
                            value={values.diameter}
                        /> 
                        {errors.diameter && <p>{errors.diameter}</p>}
                                </div>
                </div>
                                }
                {values.dishType === "soup" && <div className="dish-type-fields">
                <label className="form-label" htmlFor="type">
                        Spiciness Scale: 
                    </label>
                <input
                            id="spiciness_scale"
                            type="range"
                            pattern='[0-10]'
                            name="spicinessScale" 
                            className="form-input" 
                            placeholder="Spiciness Scale"
                            onChange={handleChange}
                            value={values.spicinessScale}
                        /> 
                        {errors.spicinessScale && <p>{errors.spicinessScale}</p>}
                                </div>}
                {values.dishType === "sandwich" && <div className="dish-type-fields">
                <label className="form-label" htmlFor="type">
                        Slices Of Bread: 
                    </label>
                <input
                            id="slices_of_bread"
                            type="number"
                            pattern='[0-10]'
                            name="slicesOfBread" 
                            className="form-input" 
                            placeholder="Slices Of Bread"
                            onChange={handleChange}
                            value={values.slicesOfBread}
                        /> 
                        {errors.slicesOfBread && <p>{errors.slicesOfBread}</p>}
                                </div>}
                </div>
                </div>
                
                <button type="submit" className="form-input-btn">
                    Register Now!
                </button>
                {error && <div>{ error }</div>}
            </form>
        </div>

        </div>
        </div>
    )
}

export default Form
