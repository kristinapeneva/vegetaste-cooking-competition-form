import React from 'react'

const FormSuccess = ({isSuccess, message}) => {
    const messages = JSON.stringify(message);

    return (

        <div className="form-content-right">
            {!isSuccess ? <div className="form-success"> { messages }</div>
                     : <div className="form-success"> We have recived your request!</div>
            }
        </div>
    )
}

export default FormSuccess
