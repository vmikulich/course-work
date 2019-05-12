import M from 'materialize-css/dist/js/materialize.js'

const Material = {
    toast(message) {
        M.toast({html: message});
    },
    updateTextFields() {
        M.updateTextFields();
    }
}

export default Material