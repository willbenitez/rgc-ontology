
import { useState } from 'react';
import type { OntologyItem } from '../../common/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import GenericModal from '../common/modal';
import AddEditOntologyForm from '../forms/addEditForm';
import './style.css'

const Edit = ({ item }: { item: OntologyItem }): JSX.Element => {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <span className='cursor-pointer' onClick={() => { setShowForm(true) }}><FontAwesomeIcon color='green' title='Edit' icon={faEdit} /></span>
            <GenericModal
                show={showForm}
                title='Edit'
                handleClose={() => {
                    setShowForm(false)
                }}
            >
                <AddEditOntologyForm ontologyData={item} formType='edit' onDone={() => { setShowForm(false) }} />
            </GenericModal>
        </>
    )
}

export default Edit;