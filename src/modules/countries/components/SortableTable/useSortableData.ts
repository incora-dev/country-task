import { Direction } from "@elastic/eui/src/services/sort";
import { useMemo } from "react"
import { CountryModel } from "../../../../models/country"
import get from 'lodash/get';

export const useSortableData = (
    data: CountryModel[],
    pageIndex: number,
    pageSize: number,
    sortField: keyof CountryModel,
    sortDirection: Direction,
    searchStr: string,
) => {
    const pageOfItems = useMemo(() => {
        let result = data.slice();
        if (sortDirection === 'asc') {
            result.sort((a, b) => get(a, sortField, '')
                .toString()
                .localeCompare(get(b, sortField, '').toString()));
                
        } else if (sortDirection === 'desc') {
            result.sort((a, b) => get(b, sortField, '')
                .toString()
                .localeCompare(get(a, sortField, '').toString()));
        }

        if (searchStr.trim()) {
            result = result.filter(el => [
                el.code.includes(searchStr),
                el.continent.name.includes(searchStr),
                el.name.includes(searchStr)
            ].some(Boolean));
        }

        const startInd = (pageIndex) * pageSize;
        const endInd = (pageIndex + 1) * pageSize;
        return {
            data: result.slice(startInd, endInd),
            total: result.length
        };
    }, [data, pageIndex, pageSize, sortField, sortDirection, searchStr]);

    return {
        pageOfItems: pageOfItems.data,
        totalItemCount: pageOfItems.total
    }
}