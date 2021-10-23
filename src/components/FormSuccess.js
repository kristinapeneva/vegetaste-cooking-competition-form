import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'

function extractErrorMessage(message){
    if (message) {
        var regex = /\"/gi, result, indices = [];
        while ( (result = regex.exec(message))) {
            indices.push(result.index)
        }
        let element = message.slice(indices[0] + 1 , indices[1]).replaceAll("_", " ")
        let elementCapitalized = element.charAt(0).toUpperCase() + element.slice(1)
        return <div>Error: {elementCapitalized} - {message.slice(indices[2] + 1, indices[3])}. Please, fill in the form correctly.</div>
    }
}

const FormSuccess = ({isSuccess, message}) => {
    const messages = JSON.stringify(message);

    return (

        <div className="wrapper">
            {!isSuccess ? <div className="form-success">{extractErrorMessage(messages)} <FontAwesomeIcon icon={faTimesCircle} /></div>
                     : <div className="form-success">Your registration is complete. <FontAwesomeIcon icon={faCheckCircle} /></div>
            }
        </div>
    )
}

export default FormSuccess
