/**
* TodoModels.tsx
* Copyright: Microsoft 2018
*
* Data models used with Todo sample app.
*/

export interface Todo {
    token_address: string;
    token_id: number;
    owner_of: string;
    contract_type: string;
    name: string;
    symbol: string;
    rare: string;
    class: string;
    token_uri: string;
    _searchTerms: string;
}