
import { useState } from 'react';
import type { OntologyItem } from '../../common/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import GenericModal from '../common/modal';
import DeleteOntologyForm from '../forms/deleteForm';
import './style.css'

const Delete = ({ item }: { item: OntologyItem }): JSX.Element => {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <span className='cursor-pointer' onClick={() => { setShowForm(true) }}><FontAwesomeIcon color='red' title='Delete' icon={faMinusCircle} /></span>
            <GenericModal
                show={showForm}
                title='Delete'
                handleClose={() => {
                    setShowForm(false)
                }}
            >
                <DeleteOntologyForm ontologyData={item} onDone={() => { setShowForm(false) }} />
            </GenericModal>
        </>
    )
}

export default Delete;