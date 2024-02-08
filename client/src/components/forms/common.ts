import type { OntologyItem } from '../../common/types';
import type { OntologyFormData } from './types';

export const mapOntologyToFormData = (
    data: OntologyItem | null
): OntologyFormData => ({
    conceptId: data?.conceptId,
    displayName: data?.displayName,
    description: data?.description,
    parentIds: data?.parents.map((x) => x.id).join(', '),
    childIds: data?.children.map((x) => x.id).join(', '),
    alternateName: data?.alternateName,
});

export type addEditTypes = 'add' | 'edit';

export const crudApiRoutes: Record<
    addEditTypes,
    {
        type: 'post' | 'put';
        route: string;
    }
> = {
    add: {
        type: 'post',
        route: '/add',
    },
    edit: {
        type: 'put',
        route: '/editById',
    },
};
