
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import GenericModal from '../common/modal';
import AddEditOntologyForm from '../forms/addEditForm';
import './style.css'

const Add = ({ children }: { children?: JSX.Element }): JSX.Element => {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <span className='cursor-pointer' onClick={() => { setShowForm(true) }}><FontAwesomeIcon color='green' title='Edit' icon={faPlus} /> {children}</span>
            <GenericModal
                show={showForm}
                title='Add'
                handleClose={() => {
                    setShowForm(false)
                }}
            >
                <AddEditOntologyForm ontologyData={null} formType='add' onDone={() => { setShowForm(false) }} />
            </GenericModal>
        </>
    )
}

export default Add;