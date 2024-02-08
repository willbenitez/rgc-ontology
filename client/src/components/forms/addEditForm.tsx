import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import type { OntologyItem } from '../../common/types';
import { useState, useCallback } from 'react';
import * as api from '../../common/api';
import type { OntologyFormData, OntologyPayload } from './types';
import { mapOntologyToFormData, crudApiRoutes } from './common';

interface AddEditOntologyFormProps {
    ontologyData: OntologyItem | null;
    formType: 'add' | 'edit'
    onDone: () => void;
}

const getFormValidationError = (formData: OntologyFormData): string | null => {
    if (!formData.conceptId) {
        return 'Concept Id is Required'
    }
    if (!formData.displayName) {
        return 'Display Name is Required'
    }
    return null;
}

const AddEditOntologyForm = ({ ontologyData, formType, onDone }: AddEditOntologyFormProps): JSX.Element => {
    const [formData, setFormData] = useState<OntologyFormData>(mapOntologyToFormData(ontologyData));
    const [error, setError] = useState<string>('')

    const handleChange = useCallback((field: keyof OntologyFormData, isNumberType = false) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [field]: isNumberType && value ? +value : value
        }))
    }, [formData]);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const validationError = getFormValidationError(formData);
        if (!validationError) {
            const apiRoute = crudApiRoutes[formType];
            api[apiRoute.type]<OntologyPayload>(apiRoute.route, {
                conceptId: formData.conceptId,
                displayName: formData.displayName,
                description: formData.description,
                parentIds: formData.parentIds?.replace(/\s/g, '').split(',').map(x => +x) ?? [],
                childIds: formData.childIds?.replace(/\s/g, '').split(',').map(x => +x) ?? [],
                alternateName: formData.alternateName,
            }).then(() => {
                onDone();
            }).catch((e: string) => {
                setError(e.toString())
            })
        } else {
            setError(validationError)
        }
    }, [formData]);

    return (
        <Form onSubmit={handleSubmit}>
            <Alert hidden={!error} variant='danger' dismissible={true}>{error}</Alert>
            <Form.Group className="mb-3" controlId="conceptId">
                <Form.Label>Concept Id</Form.Label>
                <Form.Control name="conceptId" type="text" placeholder='Concept Id' disabled={formType === 'edit'} value={formData.conceptId} onChange={handleChange('conceptId', true)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="displayName">
                <Form.Label>Display Name</Form.Label>
                <Form.Control name="displayName" type="text" placeholder="Display Name" value={formData.displayName} onChange={handleChange('displayName')} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" type="text" placeholder="Description" value={formData.description} onChange={handleChange('description')} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="parentIds">
                <Form.Label>Parent Ids <span style={{ fontSize: '.7rem' }}>(Enter string seperated ids, i.e. 1, 2)</span></Form.Label>
                <Form.Control name="parents" type="text" placeholder="Parent Ids" value={formData.parentIds} onChange={handleChange('parentIds')} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="childIds">
                <Form.Label>Child Ids <span style={{ fontSize: '.7rem' }}>(Enter string seperated ids, i.e. 3, 4)</span></Form.Label>
                <Form.Control name="children" type="text" placeholder="Child Ids" value={formData.childIds} onChange={handleChange('childIds')} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="alternateName">
                <Form.Label>Alternate Name</Form.Label>
                <Form.Control name="alternateName" type="text" placeholder="Alternate Name" value={formData.alternateName} onChange={handleChange('alternateName')} />
            </Form.Group>

            <Button variant="outline-primary" type="submit">
                {formType === 'add' ? 'Add' : 'Update'}
            </Button>
        </Form>
    );
}

export default AddEditOntologyForm;