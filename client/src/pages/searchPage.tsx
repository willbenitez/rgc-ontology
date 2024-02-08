import Header from '../components/header';

import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import type { RootState } from '../redux/store/store'
import { useSelector, useDispatch } from 'react-redux'
import Add from '../components/actions/add';
import SearchInput from '../components/search/searchInput';
import SearchResults from '../components/search/searchResults';
import Loader from '../components/loader';
import { useEffect } from 'react'
import { clearLoading, setLoading } from '../redux/slices/loadingSlice';

function SearchPage(): JSX.Element {
    const dispatch = useDispatch();
    const searchStatus = useSelector((state: RootState) => state.search.status);
    const loading = useSelector((state: RootState) => state.loading.loading);

    useEffect(() => {
        if (searchStatus === 'loading') {
            dispatch(setLoading())
        } else {
            dispatch(clearLoading())
        }
    }, [searchStatus])

    return (
        <>
            <div className='app p-5'>
                <Header />
                <div className='d-flex flex-column h-100'>
                    <SearchInput />
                    <div className='mb-5'>
                        <Add><>Add a New Ontology Item</></Add>
                    </div>
                    <SearchResults />

                </div>
            </div>
            <Loader active={loading} />
        </>
    );
}

export default SearchPage;
