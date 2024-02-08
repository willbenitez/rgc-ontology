export interface OntologyRelativeItem {
    id: number;
    displayName?: string;
}

export interface OntologyItem {
    conceptId: number;
    displayName: string;
    description: string;
    parents: OntologyRelativeItem[];
    children: OntologyRelativeItem[];
    alternateName: string;
    lastUpdated: number;
}
