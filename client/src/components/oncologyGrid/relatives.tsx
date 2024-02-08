import { useCallback } from 'react';
import type { OntologyRelativeItem } from '../../common/types';
import { addRelative, type Relative } from '../../redux/slices/relativesSlice';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import type { RootState } from '../../redux/store/store';

interface RelativesProps {
    sourceConceptId: number;
    sourceDisplayName: string;
    relativeType: Relative['relativeType'];
    relativeIds: OntologyRelativeItem[];
}

const Relatives = ({ sourceConceptId, sourceDisplayName, relativeType, relativeIds }: RelativesProps): JSX.Element => {
    const dispatch = useDispatch();
    const relatives = useSelector((state: RootState) => state.relatives.relatives);

    const setRelative = useCallback((id: number, displayName?: string) => () => {
        if (displayName && relatives.length < 3) {
            dispatch(addRelative({
                sourceConceptId,
                sourceDisplayName,
                relativeType,
                relativeConceptId: id
            }))
        }
    }, [relativeType, relatives])

    return (
        <div>
            {relativeIds.map(({ id, displayName }) => (
                <div className='relative' key={id} onClick={setRelative(id, displayName)}>{displayName ?? 'Unknown'} ({id})</div>
            ))}
        </div>
    )
}

export default Relatives