export interface NadeImageItem {
    imageUrl: string;
    orderImage: number;
}

export interface Nade {
    id: string;
    authorId: string;
    authorName: string;
    title: string;
    visibility: string;
    accuracyLevel: string | null;
    technique: string;
    description: string | null;
    side: string;
    map: string;
    type: string;
    videoUrl: string | null;
    tags: string[];
    rating: number;
    images: NadeImageItem[];
    accesses: string[];

    // Frontend extensions for map visualization
    startPosition?: { x: number; y: number };
    endPosition?: { x: number; y: number };
}
