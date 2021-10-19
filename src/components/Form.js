import React, { useState, useEffect } from 'react';
import validate from './validateInfo'
import useForm from './useForm';


function Form({submitForm}) {
    const { handleChange, handleSubmit, values, errors} = useForm(
        submitForm,
        validate
      );
    
      let showExtraFields = null;

      if (values.dishType === "pizza") {
          showExtraFields = <input
                        id="time"
                        type="text"
                        name="time" 
                        className="form-input" 
                        placeholder="Time"
                        onChange={handleChange}
                        value={values.time}
                    />
      }


    return (
        <div className="form-content">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Dish React App</h1>
                <div className="form-inputs">
                    <label className="form-label" htmlFor="name">
                        Dish Name: 
                    </label>
                    <input
                        id="dish-name"
                        type="text"
                        name="dishName" 
                        className="form-input" 
                        placeholder="Enter dish name"
                        onChange={handleChange}
                        value={values.dishName}
                    />
                    {errors.dishName && <p>{errors.dishName}</p>}
                </div>
                <div className="form-inputs">
                    <label className="form-label" htmlFor="time">
                        Time:  
                    </label>
                    <input
                        id="time"
                        type="text"
                        name="time" 
                        className="form-input" 
                        placeholder="Time"
                        onChange={handleChange}
                        value={values.time}
                    />
                    {errors.time && <p>{errors.time}</p>}
                </div>
                <div className="form-inputs">
                    <label className="form-label" htmlFor="type">
                        Dish Type:
                    </label>
                    <select id="type" onChange={handleChange} value={values.dishType} name="dishType">
                            <option value="">Choose...</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="sandwich">Sandwich</option>
                    </select>
                    {errors.dishType && <p>{errors.dishType}</p>}
                </div>
                {values.dishType}
                {showExtraFields}
                <button type="submit" className="form-input-btn">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Form
