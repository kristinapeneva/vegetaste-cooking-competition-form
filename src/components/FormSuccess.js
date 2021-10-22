import React from 'react'

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

        <div className="form-content-right">
            {!isSuccess ? <div className="form-success">{extractErrorMessage(messages)}</div>
                     : <div className="form-success"> We have recived your request!</div>
            }
        </div>
    )
}

export default FormSuccess
