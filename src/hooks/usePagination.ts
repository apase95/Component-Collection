import { useMemo } from "react";

export const DOTS = "...";

const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

interface UsePaginationProps {
    totalCount: number;      
    pageSize: number;        
    siblingCount?: number;   
    currentPage: number;
}

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}: UsePaginationProps) => {
  
    // const paginationRange = useMemo(() => {
    //     const totalPageCount = Math.ceil(totalCount / pageSize);
        
    //     const totalPageNumbers = siblingCount + 5;
    //     if (totalPageNumbers >= totalPageCount) {
    //         return range(1, totalPageCount);
    //     }

    //     const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    //     const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    //     const shouldShowLeftDots = leftSiblingIndex > 2;
    //     const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    //     const firstPageIndex = 1;
    //     const lastPageIndex = totalPageCount;

    //     if (!shouldShowLeftDots && shouldShowRightDots) {
    //         let leftItemCount = 3 + 2 * siblingCount;
    //         let leftRange = range(1, leftItemCount);
    //         return [...leftRange, DOTS, totalPageCount];
    //     }

    //     if (shouldShowLeftDots && !shouldShowRightDots) {
    //         let rightItemCount = 3 + 2 * siblingCount;
    //         let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
    //         return [firstPageIndex, DOTS, ...rightRange];
    //     }

    //     if (shouldShowLeftDots && shouldShowRightDots) {
    //         let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    //         return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    //     }
        
    //     return [];
    // }, [totalCount, pageSize, siblingCount, currentPage]);

    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        if (totalPageCount <= 4) {
            return range(1, totalPageCount);
        }
        const activePages = new Set<number>();
        activePages.add(1);
        activePages.add(totalPageCount);
        activePages.add(currentPage);
        
        if (currentPage <= 2) {
            activePages.add(2);
        }
        if (currentPage >= totalPageCount - 1) {
           activePages.add(totalPageCount - 1);
        }

        const sortedPages = Array.from(activePages).sort((a, b) => a - b);
        
        const result: (number | string)[] = [];
        let prevPage: number | null = null;
        for (const page of sortedPages) {
            if (prevPage !== null) {
                const gap = page - prevPage;
                if (gap > 1) result.push(DOTS);
            }
            result.push(page);
            prevPage = page;
        }

        return result;
    }, [totalCount, pageSize, currentPage]);
    return paginationRange;
};