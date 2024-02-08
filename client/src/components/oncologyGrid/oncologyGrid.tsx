import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import type { GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { useMemo } from 'react';
import moment from 'moment';
import type { OntologyItem } from '../../common/types';
import './styles.css';
import Edit from '../actions/edit';
import Delete from '../actions/delete';
import Relatives from './relatives';

interface CrudActions {
    edit: null;
    delete: null;
}

const gridColumnDefs: GridOptions<OntologyItem & CrudActions>['columnDefs'] = [{
    field: 'edit',
    width: 50,
    headerName: '',
    sortable: false,
    cellRenderer: (params: any) => {
        const item = params.data as OntologyItem;
        return <Edit item={item} />
    }
}, {
    field: 'delete',
    width: 50,
    headerName: '',
    sortable: false,
    cellRenderer: (params: any) => {
        const item = params.data as OntologyItem;
        return <Delete item={item} />
    }
}, {
    field: 'conceptId',
}, {
    field: 'displayName',
    filter: true
}, {
    field: 'description',
}, {
    field: 'parents',
    autoHeight: true,
    cellRenderer: (params: any) => {
        const { conceptId, displayName, parents = [] } = params?.data as OntologyItem;
        return (
            <Relatives sourceConceptId={conceptId} sourceDisplayName={displayName} relativeIds={parents} relativeType='PARENT' />
        )
    }
}, {
    field: 'children',
    autoHeight: true,
    cellRenderer: (params: any) => {
        const { conceptId, displayName, children = [] } = params?.data as OntologyItem;
        return (
            <Relatives sourceConceptId={conceptId} sourceDisplayName={displayName} relativeIds={children} relativeType='CHILD' />
        )
    }
}, {
    field: 'alternateName'
}, {
    field: 'lastUpdated',
    headerName: 'Last Updated',
    filter: 'agDateColumnFilter',
    valueFormatter: (params) => {
        const { lastUpdated } = params.data as OntologyItem;
        return lastUpdated ? moment(lastUpdated).format('MMM-D-YYYY h:mm ss A') : '';
    }
}];

const OncologyGrid = ({ ontologyData }: { ontologyData: OntologyItem[] }): JSX.Element => {
    const autoSizeStrategy: any = useMemo(() => ({
        type: 'fitGridWidth',
        defaultMinWidth: 100,
    }), []);

    const rowData = ontologyData.map(x => ({
        ...x,
        edit: null,
        delete: null
    }))
    return (
        <>
            <div className='ag-theme-quartz'>
                <AgGridReact rowData={rowData} columnDefs={gridColumnDefs} domLayout='autoHeight' autoSizeStrategy={autoSizeStrategy} noRowsOverlayComponent={() => <div>No Ontology Record(s) found</div>} />
            </div>
        </>
    );
}

export default OncologyGrid;
