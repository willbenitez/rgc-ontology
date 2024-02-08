import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { useState, useEffect, useMemo, memo } from 'react';
import type { RootState } from '../../redux/store/store'
import { useSelector, useDispatch } from 'react-redux'
import OncologyGrid from '../../components/oncologyGrid/oncologyGrid';
import * as api from '../../common/api';
import type { OntologyItem } from '../../common/types';
import './style.css';
import type { Relative } from '../../redux/slices/relativesSlice';
import { clearLoading, setLoading } from '../../redux/slices/loadingSlice';

const GridTabs = memo(function GridTabs({ items }: {
    items: Array<{
        title: string,
        el: JSX.Element,
    }>
}): JSX.Element {
    const [key, setKey] = useState<string>('');

    useEffect(() => {
        if (items.length) {
            const activeTab = items[items.length - 1]
            setKey(activeTab.title)
        }
    }, [items])

    if (items.length === 0) {
        return <></>
    }

    return (
        <Tabs
            activeKey={key}
            onSelect={(k) => { setKey(k as string) }}
            variant='tabs'
            className='breadcrumb'
        >
            {items.map(({ title, el }, i) => (
                <Tab key={i} eventKey={title} title={title}>
                    {el}
                </Tab>
            ))}
        </Tabs>
    );
})

function SearchResults(): JSX.Element {
    const dispatch = useDispatch();
    const results = useSelector((state: RootState) => state.search.results);
    const resultsFor = useSelector((state: RootState) => state.search.resultsFor);

    const relatives = useSelector((state: RootState) => state.relatives.relatives);
    const [relativeResults, setRelativeResults] = useState<Array<Relative & {
        data: OntologyItem | null
    }>>([]);

    useEffect(() => {
        if (relatives.length) {
            const missingRelatives = relatives.filter(x => !relativeResults.find(r => r.relativeConceptId === x.relativeConceptId && r.sourceConceptId === x.sourceConceptId))
            if (missingRelatives.length) {
                dispatch(setLoading())
                Promise.all(missingRelatives.map(async (x) => await api.get<OntologyItem>(`/getById?conceptId=${x.relativeConceptId as number}`))).then((results) => {
                    setRelativeResults((prevRelativeResults) => {
                        dispatch(clearLoading())
                        return [
                            ...prevRelativeResults,
                            ...missingRelatives.map((x, i) => ({
                                ...x,
                                data: results[i]
                            }))
                        ]
                    })
                })
            }
        } else {
            setRelativeResults([])
        }
    }, [relatives])

    const gridTabItems = useMemo(() => {
        const tabs = [];
        if (results.length) {
            tabs.push({ title: `Search Results For: ${resultsFor ?? ''}`, el: <OncologyGrid ontologyData={results} /> })
        }

        const rels = relativeResults.map(({ sourceConceptId, sourceDisplayName, relativeType, relativeConceptId, data }) => {
            return {
                title: `${sourceDisplayName} (${sourceConceptId}) -> ${data?.displayName ?? ''} (${relativeConceptId ?? ''}) (${relativeType})`,
                el: <OncologyGrid ontologyData={data ? [data] : []} />
            }
        })

        tabs.push(...rels);
        return tabs;
    }, [results, relativeResults])

    const gridTabWrapperStyling = useMemo(() => ({ flexGrow: 1 }), [])
    return (
        <div className='mb-3' style={gridTabWrapperStyling}>
            <GridTabs items={gridTabItems} ></GridTabs>
        </div>
    );
}

export default SearchResults;
