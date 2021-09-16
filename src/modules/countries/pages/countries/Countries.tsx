import { useQuery } from '@apollo/client';
import { EuiPageTemplate } from '@elastic/eui';
import React from 'react';
import { SortableTable } from '../../components/SortableTable/SortableTable';
import { GET_COUNTRIES } from './gql';
import { GetCountryResponse } from './types';

export const Countries = () => {
    const { data, loading } = useQuery<GetCountryResponse>(GET_COUNTRIES);

    return (<EuiPageTemplate 
                pageHeader={{
                    pageTitle: 'Countries',
                }}
            >
            <SortableTable items={data?.countries || []} loading={loading} />
        </EuiPageTemplate>
    );
}