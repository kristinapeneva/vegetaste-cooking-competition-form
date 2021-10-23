import React, { useState, useEffect } from 'react';
import validate from './validateInfo';
import TimeField from 'react-simple-timefield';


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

    const [errorEnd, setErrorEnd] = useState(null)
    const handleChange = e => {
        const { name, value } = e.target;
        setValues ({
            ...values,
            [name]: value
        })        
    }

    const[errors, setErrors] = useState({})
    const[isSubmitting, setIsSubmitting] = useState(false)
    let isSuccess = false

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    }

    const submit = () => {
        const body = prepareRequest()
        fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
            method: 'POST',
            headers: {"Accept": 'application/json', "Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        .then(response => { isSuccess = response.ok; return response.json() })
        .then(res => {
            submitForm(isSuccess, res)
            console.log(res)
        }).catch(err => {
            setErrorEnd(err.message)
        })
    }

    useEffect(
        () => {
          if (Object.keys(errors).length === 0 && isSubmitting) {
            submit();
          }
        },
        [errors]
      );

    const prepareRequest = () => {
        var body = {
            name: values.dishName,
            preparation_time: values.time,
            type: values.dishType
        }
        switch(body.type){
            case "pizza":
                body.no_of_slices = Number(values.noOfSlices)
                body.diameter = Number(values.diameter)
                break;
            case "soup":
                body.spiciness_scale  = Number(values.spicinessScale)
                break;
            case "sandwich":
                body.slices_of_bread  = Number(values.slicesOfBread)
                break;
        }
        return body;
    }
    
    return (
        <div className="wrapper">
            <div className="form-content">
            <form className="form" onSubmit={handleSubmit}>
                <h1>VegeTaste</h1>

            {/* Dish Name Field */}
                <div className="form-inputs">
                    <label className="form-label" htmlFor="name">Dish Name:</label>
                    <input
                        id="dish-name"
                        type="text"
                        name="dishName" 
                        className="input" 
                        placeholder="Enter dish name..."
                        onChange={handleChange}
                        value={values.dishName}
                    />
                    {errors.dishName && <p>{errors.dishName}</p>}
                </div>

            {/* Preparation Time Field */}
                <div className="form-inputs">
                    <label className="label" htmlFor="time">Preparation Time (hh:mm:ss):</label>
                    <TimeField value={values.time}
                    onChange={handleChange}
                    showSeconds={true}
                    className="input"
                    name="time" 
                    style={{width: '100%'}} />
                    {errors.time && <p>{errors.time}</p>}
                </div>

            {/* Dish Type Field */}
                <div className="form-inputs">
                    <label className="form-label" htmlFor="type">Dish Type:</label>                    
                    <div className="dish-type">
                        <div className="dish-type-choice">
                            <label className="radio-label">
                                <input 
                                type="radio" 
                                value="pizza" 
                                checked={values.dishType==="pizza"}
                                onChange={handleChange} 
                                name="dishType"
                                />
                                <span>Pizza</span>
                            </label>
                            <label className="radio-label">
                                <input
                                type="radio"
                                value="soup"
                                checked={values.dishType==="soup"}
                                onChange={handleChange}
                                name="dishType"
                                checked={values.dishType === "soup"}
                                />
                                <span>Soup</span>
                            </label>
                            <label className="radio-label">
                                <input
                                type="radio"
                                value="sandwich"
                                checked={values.dishType==="sandwich"}
                                onChange={handleChange}
                                name="dishType"
                                checked={values.dishType === "sandwich"}
                                />
                                <span>Sandwich</span>
                            </label>
                        {errors.dishType && <p>{errors.dishType}</p>}
                    </div>


            {/* --- Additional Fileds ---*/}

            {/* Pizza */}
                {values.dishType === "pizza" && 
                <div className="dish-type-fields">
                    <div className="form-inputs">
                        <label className="form-label" htmlFor="type">Slices:</label>
                        <input
                            id="no_of_slices"
                            onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}
                            onBlur={() => {parseInt(values.noOfSlices)}}
                            type="number"
                            min={1}
                            max={10}
                            name="noOfSlices" 
                            className="input"  
                            placeholder="Number of Slices"
                            onChange={handleChange}
                            value={Number(values.noOfSlices).toString()}
                        />
                        {errors.noOfSlices && <p>{errors.noOfSlices}</p>}
                    </div>
                    <div className="form-inputs">
                        <label className="form-label" htmlFor="type">Diameter:</label>
                        <input
                            id="diameter"
                            onKeyPress={(event) => {if (/-/.test(event.key)) {event.preventDefault();}}}
                            type="number"
                            min={1}
                            max={50}
                            name="diameter" 
                            className="input" 
                            placeholder="Diameter"
                            onChange={handleChange}
                            value={Number(values.diameter).toString()}
                        /> 
                        {errors.diameter && <p>{errors.diameter}</p>}
                    </div>
                </div>
                }
            
            {/* Soup */}
                {values.dishType === "soup" &&
                <div className="dish-type-fields">
                    <label className="form-label" htmlFor="type">Spiciness: {values.spicinessScale}</label>
                    <div className="spiciness-scale">
                        <h4>1</h4>
                        <input
                            id="spiciness-scale"
                            type="range"
                            min={1}
                            max={10}
                            step={1}
                            name="spicinessScale" 
                            className="input" 
                            onChange={handleChange}
                            value={values.spicinessScale}
                        />
                        <h4>10</h4>
                    </div>
                    {errors.spicinessScale && <p>{errors.spicinessScale}</p>}
                </div>
                }
            
            {/* Sandwich */}
                {values.dishType === "sandwich" &&
                <div className="dish-type-fields">
                    <label className="form-label" htmlFor="type">Slices Of Bread:</label>
                    <input
                        id="slices_of_bread"
                        onKeyPress={(event) => {if (!/^[0-9]\d*$/.test(event.key)) {event.preventDefault();}}}
                        type="number"
                        pattern={[0-9]}
                        step={1}
                        min={1}
                        max={5}
                        name="slicesOfBread" 
                        className="input" 
                        placeholder="Slices Of Bread"
                        onChange={handleChange}
                        value={Number(values.slicesOfBread).toString()}
                        required={true}
                    /> 
                    {errors.slicesOfBread && <p>{errors.slicesOfBread}</p>}
                </div>
                }
            </div>
        </div>
        {errorEnd && <div>{ errorEnd }</div>}
        <button type="submit" className="form-input-btn">Register Now!</button>
               
            </form>
        </div>
    </div>
    )
}

export default Form
