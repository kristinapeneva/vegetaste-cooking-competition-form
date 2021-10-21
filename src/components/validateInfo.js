import React from 'react'

function validateInfo(values) {
        let errors ={}

        if(!values.dishName.trim()) {
            errors.dishName = "Dish name required"
        }

        // if(!values.time.trim()) {
        //     errors.time = "Preparation time required"
        // }

        if(!values.dishType) {
            errors.dishType = "Dish type is required"
        }
        else {
            if(values.dishType === "pizza" && !values.noOfSlices) {
                errors.noOfSlices = "Number of slices is required"
            }
            if(values.dishType === "pizza" && !values.diameter) {
                errors.diameter = "Diameter is required"
            }
            if(values.dishType === "soup" && !values.spicinessScale) {
                errors.diameter = "Spiciness is required"
            }
            if(values.dishType === "sandwich" && !values.slicesOfBread) {
                errors.diameter = "SlicesOfBread is required"
            }
        }


        return errors;
}

export default validateInfo
