import { InputGroup } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { type FormEventHandler, useState } from 'react';
import type { AppDispatch } from '../../redux/store/store'
import { useDispatch } from 'react-redux'
import { clearSearchResults, getSearchResults } from '../../redux/slices/searchSlice';
import { clearRelatives } from '../../redux/slices/relativesSlice';

const isSearchTextValid = (searchText: string): boolean => {
    return !!searchText && searchText.length >= 2;
}

function SearchInput(): JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState<string | null>(null)

    const search: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (isSearchTextValid(searchText)) {
            dispatch(clearRelatives());
            dispatch(getSearchResults(searchText));
            setError(null)
        } else {
            setError('Search input must have 2 or more characters');
            dispatch(clearSearchResults())
        }
    }

    return (
        <div className='mb-3'>
            <Form className='mb-2' onSubmit={search}>
                <InputGroup>
                    <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        value={searchText}
                        placeholder="Search"
                        onChange={e => {
                            setSearchText(e.target.value)
                        }}
                    />
                </InputGroup>
            </Form>
            <Alert variant='danger' hidden={!error} dismissible={true}>{error}</Alert>
        </div>
    );
}

export default SearchInput;
