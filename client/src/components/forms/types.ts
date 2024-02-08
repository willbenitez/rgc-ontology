export interface OntologyFormData {
    conceptId: number | undefined;
    displayName: string | undefined;
    description: string | undefined;
    parentIds: string | undefined;
    childIds: string | undefined;
    alternateName: string | undefined;
}

export interface OntologyPayload
    extends Omit<OntologyFormData, 'parentIds' | 'childIds'> {
    parentIds: number[];
    childIds: number[];
}
