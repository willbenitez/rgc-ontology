import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import type { OntologyItem } from '../../common/types';
import * as api from '../../common/api';
import { useState } from 'react'

interface DeleteOntologyFormProps {
    ontologyData: OntologyItem;
    onDone: () => void;
}

const DeleteOntologyForm = ({ ontologyData, onDone }: DeleteOntologyFormProps): JSX.Element => {
    const [error, setError] = useState<string>('')

    const doDelete = (): void => {
        api.del(`/deleteById?conceptId=${ontologyData.conceptId}`).then(() => {
            onDone();
        }).catch((e: string) => {
            setError(e.toString())
        })
    }
    return (
        <div>
            <Alert hidden={!error} variant='danger' dismissible={true}>{error}</Alert>
            <div className='mb-5'>
                <div className='mb-3'>
                    <h6>Concept Id</h6>
                    <span>{ontologyData.conceptId}</span>
                </div>
                <div className='mb-3'>
                    <h6>Display Name</h6>
                    <span>{ontologyData.displayName}</span>
                </div>
                <div className='mb-3'>
                    <h6>Description</h6>
                    <span>{ontologyData.description}</span>
                </div>
            </div>
            <Button style={{ marginRight: '10px' }} variant="primary" onClick={onDone}>
                Cancel
            </Button>
            <Button variant="danger" onClick={doDelete}>
                Confirm Delete
            </Button>
        </div>
    );
}

export default DeleteOntologyForm;