import React from 'react'

function validateInfo(values) {
        let errors ={}

        if(!values.dishName.trim()) {
            errors.dishName = "Dish name required"
        }

        if(!values.time.trim()) {
            errors.time = "Preparation time required"
        }

        if(!values.dishType) {
            errors.dishType = "Dish type is required"
        }

        return errors;
}

export default validateInfo
