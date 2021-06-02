export default ({message, errorStatus = 500, stackTrace="" }) => {
    return{
        message,
        errorStatus,
        stackTrace
    }

}