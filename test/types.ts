
export interface GraphQLError {
    path: string;
    location: any[];
    message: string;
}

export interface GraphQLResponse {
    data: any;
    errors: GraphQLError[]
}