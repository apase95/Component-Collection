import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../base/Pagination";
import { usePagination, DOTS } from "../../hooks/usePagination";


export const PaginationForm = () => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalItems = 100;
    const itemsPerPage = 10;

    const paginationRange = usePagination({
        currentPage,
        totalCount: totalItems,
        siblingCount: 1,
        pageSize: itemsPerPage,
    });

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
        return null;
    }

    return (
        <div className="flex-col-center p-10 gap-4">
            <Pagination>
                <PaginationContent>                    
                    <PaginationItem>
                        <PaginationPrevious 
                            onClick={() => onPageChange(currentPage - 1)}
                            className={
                                currentPage === 1 
                                ? "pointer-events-none opacity-50" 
                                : ""
                            }
                        />
                    </PaginationItem>

                    {paginationRange?.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return (
                                <PaginationItem key={`dots-${index}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    href="#"
                                    size="icon"
                                    isActive={pageNumber === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onPageChange(pageNumber as number);
                                    }}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    <PaginationItem>
                        <PaginationNext 
                            onClick={() => onPageChange(currentPage + 1)}
                            className={
                                currentPage === paginationRange?.[paginationRange.length - 1] 
                                ? "pointer-events-none opacity-50" 
                                : ""
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};