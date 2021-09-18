import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: 'Author';
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
};


export type AuthorPostsArgs = {
  findTitle?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  author: Author;
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', posts?: Maybe<Array<Maybe<{ __typename?: 'Post', id: number, title: string }>>>, postsWithAuthor?: Maybe<Array<Maybe<{ __typename?: 'Post', id: number, title: string, author: { __typename?: 'Author', id: number, firstName: string, lastName: string } }>>> };


export const GetPostsDocument = `
    query getPosts {
  posts: posts {
    id
    title
  }
  postsWithAuthor: posts {
    id
    title
    author {
      id
      firstName
      lastName
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getPosts(variables?: GetPostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostsQuery>(GetPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPosts');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;