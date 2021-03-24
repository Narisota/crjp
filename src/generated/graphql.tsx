import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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

export type Query = {
  __typename?: 'Query';
  getUsersOrders: Array<GetOrdersResponse>;
  getOrders: Array<GetOrdersResponse>;
  getOrderById: GetOrdersResponse;
  getProducts: Array<ProductsWithImages>;
  getProductsByIds: Array<ProductsWithOptionAndImages>;
  apiGetProducts: Array<ProductsWithImages>;
  getProduct: ProductsWithImages;
  apiGetProduct: ProductsWithImages;
  getApiUsers: Array<ApiUser>;
  getCurrUser: Users;
  getCoupons: Array<Coupons>;
  getAnnouncements: Array<Announcements>;
  getMaintenance: Scalars['Boolean'];
  getSocials: Array<Socials>;
  getSections: Array<Sections>;
  getSectionById: Sections;
  getProductsSections: Array<SectionsOrNull>;
  getSectionsProducts: Array<ProductsWithImages>;
  getProductsOptions: Array<Options>;
  getProductShipping: Array<Shipping>;
};


export type QueryGetOrderByIdArgs = {
  order_id: Scalars['Float'];
};


export type QueryGetProductsByIdsArgs = {
  products_str: Scalars['String'];
};


export type QueryGetProductArgs = {
  product_id: Scalars['Float'];
};


export type QueryApiGetProductArgs = {
  product_id: Scalars['Float'];
};


export type QueryGetSocialsArgs = {
  component: Scalars['String'];
};


export type QueryGetSectionByIdArgs = {
  section_id: Scalars['Float'];
};


export type QueryGetProductsSectionsArgs = {
  product_id: Scalars['Float'];
};


export type QueryGetSectionsProductsArgs = {
  section_id: Scalars['Float'];
};


export type QueryGetProductsOptionsArgs = {
  product_id: Scalars['Float'];
};


export type QueryGetProductShippingArgs = {
  product_id: Scalars['Float'];
};

export type GetOrdersResponse = {
  __typename?: 'GetOrdersResponse';
  products?: Maybe<Array<OrdersProductsWithImages>>;
  order_id: Scalars['Float'];
  tracking_num?: Maybe<Scalars['String']>;
  order_total?: Maybe<Scalars['Float']>;
  coupon?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['String']>;
  shipping?: Maybe<Scalars['String']>;
  warning?: Maybe<Scalars['String']>;
  date_of_purchase?: Maybe<Scalars['String']>;
};

export type OrdersProductsWithImages = {
  __typename?: 'OrdersProductsWithImages';
  product_id: Scalars['Int'];
  name: Scalars['String'];
  desc: Scalars['String'];
  price: Scalars['Int'];
  stock: Scalars['Int'];
  org_stock?: Maybe<Scalars['Int']>;
  exp_date?: Maybe<Scalars['String']>;
  quantityOrdered: Scalars['Float'];
  productSubtotal?: Maybe<Scalars['Float']>;
  images?: Maybe<Array<Images>>;
};

export type Images = {
  __typename?: 'Images';
  img_id: Scalars['Float'];
  img_url: Scalars['String'];
  index: Scalars['Float'];
};

export type ProductsWithImages = {
  __typename?: 'ProductsWithImages';
  product_id: Scalars['Int'];
  name: Scalars['String'];
  desc: Scalars['String'];
  price: Scalars['Int'];
  stock: Scalars['Int'];
  org_stock?: Maybe<Scalars['Int']>;
  exp_date?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Images>>;
  hidden: Scalars['Boolean'];
};

export type ProductsWithOptionAndImages = {
  __typename?: 'ProductsWithOptionAndImages';
  product_id: Scalars['Int'];
  name: Scalars['String'];
  desc: Scalars['String'];
  price: Scalars['Int'];
  stock: Scalars['Int'];
  org_stock?: Maybe<Scalars['Int']>;
  exp_date?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Images>>;
  options?: Maybe<Array<Options>>;
};

export type Options = {
  __typename?: 'Options';
  option_id: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Int'];
  stock: Scalars['Int'];
  index: Scalars['Int'];
};

export type ApiUser = {
  __typename?: 'ApiUser';
  uuid: Scalars['Float'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  uuid: Scalars['Float'];
  user_id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Coupons = {
  __typename?: 'Coupons';
  coupon_id: Scalars['String'];
  coupon_name: Scalars['String'];
  discount?: Maybe<Scalars['String']>;
};

export type Announcements = {
  __typename?: 'Announcements';
  id: Scalars['String'];
  text: Scalars['String'];
};

export type Socials = {
  __typename?: 'Socials';
  id: Scalars['Int'];
  index: Scalars['Int'];
  component: Scalars['String'];
  display: Scalars['Boolean'];
  social_logo: Scalars['String'];
  social_url: Scalars['String'];
};

export type Sections = {
  __typename?: 'Sections';
  section_id: Scalars['Int'];
  name: Scalars['String'];
  thumbnail: Scalars['String'];
};

export type SectionsOrNull = {
  __typename?: 'SectionsOrNull';
  section_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

export type Shipping = {
  __typename?: 'Shipping';
  shipping_id: Scalars['Int'];
  country: Scalars['String'];
  price: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  editTracking: Scalars['Boolean'];
  paypalCheckout: Scalars['String'];
  addPaypalOrder: Scalars['String'];
  checkout: Scalars['String'];
  toggleProductDisplay: Scalars['Boolean'];
  addProduct: Scalars['String'];
  deleteProduct: Scalars['Boolean'];
  updateProduct: Scalars['Boolean'];
  addImgToProduct: Scalars['Boolean'];
  removeImgFromProduct: Scalars['Boolean'];
  apiLogin: AuthResponse;
  deleteApiUser: Scalars['Boolean'];
  addApiUser: Scalars['Boolean'];
  removeWarning: Scalars['Boolean'];
  login: AuthResponse;
  addCoupon: Scalars['Boolean'];
  deleteCoupon: Scalars['Boolean'];
  validateCoupon: Scalars['String'];
  addAnnouncement: Scalars['Boolean'];
  deleteAnnouncement: Scalars['Boolean'];
  toggleMaintenance: Scalars['Boolean'];
  maintenanceLogin: AuthResponse;
  updateSocialUrl: Scalars['Boolean'];
  toggleSocialDisplay: Scalars['Boolean'];
  initSocials: Scalars['Boolean'];
  addSection: Scalars['Boolean'];
  deleteSection: Scalars['Boolean'];
  addProductToSection: Scalars['String'];
  removeProductFromSection: Scalars['Boolean'];
  updateSection: Scalars['Boolean'];
  addOptionToProduct: Scalars['Boolean'];
  updateOptions: Scalars['Boolean'];
  deleteOptions: Scalars['Boolean'];
  addShippingToProduct: Scalars['Boolean'];
};


export type MutationEditTrackingArgs = {
  order_id: Scalars['Float'];
  new_tracking_num: Scalars['String'];
};


export type MutationPaypalCheckoutArgs = {
  coupon: Scalars['String'];
  products: Scalars['String'];
};


export type MutationAddPaypalOrderArgs = {
  purchase_units: Scalars['String'];
  products: Scalars['String'];
  coupon: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationCheckoutArgs = {
  coupon: Scalars['String'];
  billing_info: Scalars['String'];
  shipping_info: Scalars['String'];
  products: Scalars['String'];
  user_id: Scalars['String'];
  token: Scalars['String'];
};


export type MutationToggleProductDisplayArgs = {
  product_id: Scalars['Float'];
};


export type MutationAddProductArgs = {
  stock: Scalars['Float'];
  price: Scalars['Float'];
  desc: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  product_id: Scalars['Float'];
};


export type MutationUpdateProductArgs = {
  stock: Scalars['Float'];
  price: Scalars['Float'];
  desc: Scalars['String'];
  product_id: Scalars['Float'];
  name: Scalars['String'];
};


export type MutationAddImgToProductArgs = {
  product_id: Scalars['Float'];
  img_url: Scalars['String'];
};


export type MutationRemoveImgFromProductArgs = {
  img_id: Scalars['Float'];
};


export type MutationApiLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteApiUserArgs = {
  uuid: Scalars['Float'];
};


export type MutationAddApiUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRemoveWarningArgs = {
  order_id: Scalars['Float'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationAddCouponArgs = {
  discount: Scalars['String'];
  coupon_name: Scalars['String'];
};


export type MutationDeleteCouponArgs = {
  coupon_name: Scalars['String'];
};


export type MutationValidateCouponArgs = {
  coupon_name: Scalars['String'];
};


export type MutationAddAnnouncementArgs = {
  text: Scalars['String'];
};


export type MutationDeleteAnnouncementArgs = {
  id: Scalars['String'];
};


export type MutationMaintenanceLoginArgs = {
  password: Scalars['String'];
  access_id: Scalars['String'];
};


export type MutationUpdateSocialUrlArgs = {
  id: Scalars['Float'];
  url: Scalars['String'];
};


export type MutationToggleSocialDisplayArgs = {
  id: Scalars['Float'];
};


export type MutationAddSectionArgs = {
  thumbnail: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteSectionArgs = {
  section_id: Scalars['Float'];
};


export type MutationAddProductToSectionArgs = {
  section_id: Scalars['Float'];
  product_id: Scalars['Float'];
};


export type MutationRemoveProductFromSectionArgs = {
  section_id: Scalars['Float'];
  product_id: Scalars['Float'];
};


export type MutationUpdateSectionArgs = {
  section_id: Scalars['Float'];
  thumbnail: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddOptionToProductArgs = {
  product_id: Scalars['Float'];
  options_str: Scalars['String'];
};


export type MutationUpdateOptionsArgs = {
  options_str: Scalars['String'];
};


export type MutationDeleteOptionsArgs = {
  options_str: Scalars['String'];
};


export type MutationAddShippingToProductArgs = {
  shipping_str: Scalars['String'];
  product_id: Scalars['Float'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type AddAnnouncementMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type AddAnnouncementMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addAnnouncement'>
);

export type AddApiUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type AddApiUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addApiUser'>
);

export type AddCouponMutationVariables = Exact<{
  coupon_name: Scalars['String'];
  discount: Scalars['String'];
}>;


export type AddCouponMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCoupon'>
);

export type AddImgToProductMutationVariables = Exact<{
  img_url: Scalars['String'];
  product_id: Scalars['Float'];
}>;


export type AddImgToProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addImgToProduct'>
);

export type AddOptionToProductMutationVariables = Exact<{
  options_str: Scalars['String'];
  product_id: Scalars['Float'];
}>;


export type AddOptionToProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addOptionToProduct'>
);

export type AddProductMutationVariables = Exact<{
  name: Scalars['String'];
  desc: Scalars['String'];
  price: Scalars['Float'];
  stock: Scalars['Float'];
}>;


export type AddProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addProduct'>
);

export type AddProductToSectionMutationVariables = Exact<{
  product_id: Scalars['Float'];
  section_id: Scalars['Float'];
}>;


export type AddProductToSectionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addProductToSection'>
);

export type AddSectionMutationVariables = Exact<{
  name: Scalars['String'];
  thumbnail: Scalars['String'];
}>;


export type AddSectionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addSection'>
);

export type AddShippingToProductMutationVariables = Exact<{
  product_id: Scalars['Float'];
  shipping_str: Scalars['String'];
}>;


export type AddShippingToProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addShippingToProduct'>
);

export type ApiLoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type ApiLoginMutation = (
  { __typename?: 'Mutation' }
  & { apiLogin: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken' | 'refreshToken'>
  ) }
);

export type DeleteAnnouncementMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteAnnouncementMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAnnouncement'>
);

export type DeleteApiUserMutationVariables = Exact<{
  uuid: Scalars['Float'];
}>;


export type DeleteApiUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteApiUser'>
);

export type DeleteCouponMutationVariables = Exact<{
  coupon_name: Scalars['String'];
}>;


export type DeleteCouponMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCoupon'>
);

export type DeleteOptionsMutationVariables = Exact<{
  options_str: Scalars['String'];
}>;


export type DeleteOptionsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteOptions'>
);

export type DeleteProductMutationVariables = Exact<{
  product_id: Scalars['Float'];
}>;


export type DeleteProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProduct'>
);

export type DeleteSectionMutationVariables = Exact<{
  section_id: Scalars['Float'];
}>;


export type DeleteSectionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSection'>
);

export type EditTrackingMutationVariables = Exact<{
  new_tracking_num: Scalars['String'];
  order_id: Scalars['Float'];
}>;


export type EditTrackingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editTracking'>
);

export type GetAnnouncementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAnnouncementsQuery = (
  { __typename?: 'Query' }
  & { getAnnouncements: Array<(
    { __typename?: 'Announcements' }
    & Pick<Announcements, 'id' | 'text'>
  )> }
);

export type GetApiUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApiUsersQuery = (
  { __typename?: 'Query' }
  & { getApiUsers: Array<(
    { __typename?: 'ApiUser' }
    & Pick<ApiUser, 'uuid' | 'username'>
  )> }
);

export type GetCouponsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCouponsQuery = (
  { __typename?: 'Query' }
  & { getCoupons: Array<(
    { __typename?: 'Coupons' }
    & Pick<Coupons, 'coupon_name' | 'coupon_id' | 'discount'>
  )> }
);

export type GetMaintenanceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMaintenanceQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getMaintenance'>
);

export type GetOrderByIdQueryVariables = Exact<{
  order_id: Scalars['Float'];
}>;


export type GetOrderByIdQuery = (
  { __typename?: 'Query' }
  & { getOrderById: (
    { __typename?: 'GetOrdersResponse' }
    & Pick<GetOrdersResponse, 'order_id' | 'tracking_num' | 'shipping' | 'warning' | 'order_total' | 'coupon' | 'discount' | 'date_of_purchase'>
    & { products?: Maybe<Array<(
      { __typename?: 'OrdersProductsWithImages' }
      & Pick<OrdersProductsWithImages, 'product_id' | 'name' | 'desc' | 'price' | 'stock' | 'exp_date' | 'quantityOrdered' | 'productSubtotal'>
      & { images?: Maybe<Array<(
        { __typename?: 'Images' }
        & Pick<Images, 'img_id' | 'img_url' | 'index'>
      )>> }
    )>> }
  ) }
);

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = (
  { __typename?: 'Query' }
  & { getOrders: Array<(
    { __typename?: 'GetOrdersResponse' }
    & Pick<GetOrdersResponse, 'order_id' | 'tracking_num' | 'order_total' | 'coupon' | 'discount' | 'shipping' | 'warning' | 'date_of_purchase'>
    & { products?: Maybe<Array<(
      { __typename?: 'OrdersProductsWithImages' }
      & Pick<OrdersProductsWithImages, 'product_id' | 'name' | 'desc' | 'price' | 'stock' | 'exp_date' | 'quantityOrdered' | 'productSubtotal'>
      & { images?: Maybe<Array<(
        { __typename?: 'Images' }
        & Pick<Images, 'img_id' | 'img_url' | 'index'>
      )>> }
    )>> }
  )> }
);

export type ApiGetProductQueryVariables = Exact<{
  product_id: Scalars['Float'];
}>;


export type ApiGetProductQuery = (
  { __typename?: 'Query' }
  & { apiGetProduct: (
    { __typename?: 'ProductsWithImages' }
    & Pick<ProductsWithImages, 'product_id' | 'name' | 'desc' | 'price' | 'stock' | 'exp_date' | 'hidden'>
    & { images?: Maybe<Array<(
      { __typename?: 'Images' }
      & Pick<Images, 'img_id' | 'img_url'>
    )>> }
  ) }
);

export type GetProductShippingQueryVariables = Exact<{
  product_id: Scalars['Float'];
}>;


export type GetProductShippingQuery = (
  { __typename?: 'Query' }
  & { getProductShipping: Array<(
    { __typename?: 'Shipping' }
    & Pick<Shipping, 'shipping_id' | 'country' | 'price'>
  )> }
);

export type ApiGetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ApiGetProductsQuery = (
  { __typename?: 'Query' }
  & { apiGetProducts: Array<(
    { __typename?: 'ProductsWithImages' }
    & Pick<ProductsWithImages, 'product_id' | 'name' | 'desc' | 'price' | 'stock' | 'exp_date'>
    & { images?: Maybe<Array<(
      { __typename?: 'Images' }
      & Pick<Images, 'img_id' | 'img_url'>
    )>> }
  )> }
);

export type GetProductsOptionsQueryVariables = Exact<{
  product_id: Scalars['Float'];
}>;


export type GetProductsOptionsQuery = (
  { __typename?: 'Query' }
  & { getProductsOptions: Array<(
    { __typename?: 'Options' }
    & Pick<Options, 'option_id' | 'name' | 'price' | 'stock' | 'index'>
  )> }
);

export type GetProductsSectionsQueryVariables = Exact<{
  product_id: Scalars['Float'];
}>;


export type GetProductsSectionsQuery = (
  { __typename?: 'Query' }
  & { getProductsSections: Array<(
    { __typename?: 'SectionsOrNull' }
    & Pick<SectionsOrNull, 'section_id' | 'name' | 'thumbnail'>
  )> }
);

export type GetSectionByIdQueryVariables = Exact<{
  section_id: Scalars['Float'];
}>;


export type GetSectionByIdQuery = (
  { __typename?: 'Query' }
  & { getSectionById: (
    { __typename?: 'Sections' }
    & Pick<Sections, 'section_id' | 'thumbnail' | 'name'>
  ) }
);

export type GetSectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSectionsQuery = (
  { __typename?: 'Query' }
  & { getSections: Array<(
    { __typename?: 'Sections' }
    & Pick<Sections, 'section_id' | 'name' | 'thumbnail'>
  )> }
);

export type GetSectionsProductsQueryVariables = Exact<{
  section_id: Scalars['Float'];
}>;


export type GetSectionsProductsQuery = (
  { __typename?: 'Query' }
  & { getSectionsProducts: Array<(
    { __typename?: 'ProductsWithImages' }
    & Pick<ProductsWithImages, 'product_id' | 'name' | 'desc' | 'price' | 'stock' | 'org_stock'>
  )> }
);

export type GetSocialsQueryVariables = Exact<{
  component: Scalars['String'];
}>;


export type GetSocialsQuery = (
  { __typename?: 'Query' }
  & { getSocials: Array<(
    { __typename?: 'Socials' }
    & Pick<Socials, 'id' | 'index' | 'social_url' | 'social_logo' | 'display'>
  )> }
);

export type InitSocialsMutationVariables = Exact<{ [key: string]: never; }>;


export type InitSocialsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'initSocials'>
);

export type RemoveImgFromProductMutationVariables = Exact<{
  img_id: Scalars['Float'];
}>;


export type RemoveImgFromProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeImgFromProduct'>
);

export type RemoveProductFromSectionMutationVariables = Exact<{
  product_id: Scalars['Float'];
  section_id: Scalars['Float'];
}>;


export type RemoveProductFromSectionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeProductFromSection'>
);

export type RemoveWarningMutationVariables = Exact<{
  order_id: Scalars['Float'];
}>;


export type RemoveWarningMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeWarning'>
);

export type ToggleMaintenanceMutationVariables = Exact<{ [key: string]: never; }>;


export type ToggleMaintenanceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'toggleMaintenance'>
);

export type ToggleProductDisplayMutationVariables = Exact<{
  product_id: Scalars['Float'];
}>;


export type ToggleProductDisplayMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'toggleProductDisplay'>
);

export type ToggleSocialDisplayMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ToggleSocialDisplayMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'toggleSocialDisplay'>
);

export type UpdateOptionsMutationVariables = Exact<{
  options_str: Scalars['String'];
}>;


export type UpdateOptionsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateOptions'>
);

export type UpdateProductMutationVariables = Exact<{
  product_id: Scalars['Float'];
  name: Scalars['String'];
  desc: Scalars['String'];
  price: Scalars['Float'];
  stock: Scalars['Float'];
}>;


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateProduct'>
);

export type UpdateSectionMutationVariables = Exact<{
  name: Scalars['String'];
  thumbnail: Scalars['String'];
  section_id: Scalars['Float'];
}>;


export type UpdateSectionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateSection'>
);

export type UpdateSocialUrlMutationVariables = Exact<{
  url: Scalars['String'];
  id: Scalars['Float'];
}>;


export type UpdateSocialUrlMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateSocialUrl'>
);


export const AddAnnouncementDocument = gql`
    mutation addAnnouncement($text: String!) {
  addAnnouncement(text: $text)
}
    `;
export type AddAnnouncementMutationFn = Apollo.MutationFunction<AddAnnouncementMutation, AddAnnouncementMutationVariables>;

/**
 * __useAddAnnouncementMutation__
 *
 * To run a mutation, you first call `useAddAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAnnouncementMutation, { data, loading, error }] = useAddAnnouncementMutation({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useAddAnnouncementMutation(baseOptions?: Apollo.MutationHookOptions<AddAnnouncementMutation, AddAnnouncementMutationVariables>) {
        return Apollo.useMutation<AddAnnouncementMutation, AddAnnouncementMutationVariables>(AddAnnouncementDocument, baseOptions);
      }
export type AddAnnouncementMutationHookResult = ReturnType<typeof useAddAnnouncementMutation>;
export type AddAnnouncementMutationResult = Apollo.MutationResult<AddAnnouncementMutation>;
export type AddAnnouncementMutationOptions = Apollo.BaseMutationOptions<AddAnnouncementMutation, AddAnnouncementMutationVariables>;
export const AddApiUserDocument = gql`
    mutation addApiUser($username: String!, $password: String!) {
  addApiUser(username: $username, password: $password)
}
    `;
export type AddApiUserMutationFn = Apollo.MutationFunction<AddApiUserMutation, AddApiUserMutationVariables>;

/**
 * __useAddApiUserMutation__
 *
 * To run a mutation, you first call `useAddApiUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddApiUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addApiUserMutation, { data, loading, error }] = useAddApiUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAddApiUserMutation(baseOptions?: Apollo.MutationHookOptions<AddApiUserMutation, AddApiUserMutationVariables>) {
        return Apollo.useMutation<AddApiUserMutation, AddApiUserMutationVariables>(AddApiUserDocument, baseOptions);
      }
export type AddApiUserMutationHookResult = ReturnType<typeof useAddApiUserMutation>;
export type AddApiUserMutationResult = Apollo.MutationResult<AddApiUserMutation>;
export type AddApiUserMutationOptions = Apollo.BaseMutationOptions<AddApiUserMutation, AddApiUserMutationVariables>;
export const AddCouponDocument = gql`
    mutation addCoupon($coupon_name: String!, $discount: String!) {
  addCoupon(coupon_name: $coupon_name, discount: $discount)
}
    `;
export type AddCouponMutationFn = Apollo.MutationFunction<AddCouponMutation, AddCouponMutationVariables>;

/**
 * __useAddCouponMutation__
 *
 * To run a mutation, you first call `useAddCouponMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCouponMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCouponMutation, { data, loading, error }] = useAddCouponMutation({
 *   variables: {
 *      coupon_name: // value for 'coupon_name'
 *      discount: // value for 'discount'
 *   },
 * });
 */
export function useAddCouponMutation(baseOptions?: Apollo.MutationHookOptions<AddCouponMutation, AddCouponMutationVariables>) {
        return Apollo.useMutation<AddCouponMutation, AddCouponMutationVariables>(AddCouponDocument, baseOptions);
      }
export type AddCouponMutationHookResult = ReturnType<typeof useAddCouponMutation>;
export type AddCouponMutationResult = Apollo.MutationResult<AddCouponMutation>;
export type AddCouponMutationOptions = Apollo.BaseMutationOptions<AddCouponMutation, AddCouponMutationVariables>;
export const AddImgToProductDocument = gql`
    mutation addImgToProduct($img_url: String!, $product_id: Float!) {
  addImgToProduct(img_url: $img_url, product_id: $product_id)
}
    `;
export type AddImgToProductMutationFn = Apollo.MutationFunction<AddImgToProductMutation, AddImgToProductMutationVariables>;

/**
 * __useAddImgToProductMutation__
 *
 * To run a mutation, you first call `useAddImgToProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddImgToProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addImgToProductMutation, { data, loading, error }] = useAddImgToProductMutation({
 *   variables: {
 *      img_url: // value for 'img_url'
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useAddImgToProductMutation(baseOptions?: Apollo.MutationHookOptions<AddImgToProductMutation, AddImgToProductMutationVariables>) {
        return Apollo.useMutation<AddImgToProductMutation, AddImgToProductMutationVariables>(AddImgToProductDocument, baseOptions);
      }
export type AddImgToProductMutationHookResult = ReturnType<typeof useAddImgToProductMutation>;
export type AddImgToProductMutationResult = Apollo.MutationResult<AddImgToProductMutation>;
export type AddImgToProductMutationOptions = Apollo.BaseMutationOptions<AddImgToProductMutation, AddImgToProductMutationVariables>;
export const AddOptionToProductDocument = gql`
    mutation addOptionToProduct($options_str: String!, $product_id: Float!) {
  addOptionToProduct(options_str: $options_str, product_id: $product_id)
}
    `;
export type AddOptionToProductMutationFn = Apollo.MutationFunction<AddOptionToProductMutation, AddOptionToProductMutationVariables>;

/**
 * __useAddOptionToProductMutation__
 *
 * To run a mutation, you first call `useAddOptionToProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOptionToProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOptionToProductMutation, { data, loading, error }] = useAddOptionToProductMutation({
 *   variables: {
 *      options_str: // value for 'options_str'
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useAddOptionToProductMutation(baseOptions?: Apollo.MutationHookOptions<AddOptionToProductMutation, AddOptionToProductMutationVariables>) {
        return Apollo.useMutation<AddOptionToProductMutation, AddOptionToProductMutationVariables>(AddOptionToProductDocument, baseOptions);
      }
export type AddOptionToProductMutationHookResult = ReturnType<typeof useAddOptionToProductMutation>;
export type AddOptionToProductMutationResult = Apollo.MutationResult<AddOptionToProductMutation>;
export type AddOptionToProductMutationOptions = Apollo.BaseMutationOptions<AddOptionToProductMutation, AddOptionToProductMutationVariables>;
export const AddProductDocument = gql`
    mutation addProduct($name: String!, $desc: String!, $price: Float!, $stock: Float!) {
  addProduct(name: $name, desc: $desc, price: $price, stock: $stock)
}
    `;
export type AddProductMutationFn = Apollo.MutationFunction<AddProductMutation, AddProductMutationVariables>;

/**
 * __useAddProductMutation__
 *
 * To run a mutation, you first call `useAddProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductMutation, { data, loading, error }] = useAddProductMutation({
 *   variables: {
 *      name: // value for 'name'
 *      desc: // value for 'desc'
 *      price: // value for 'price'
 *      stock: // value for 'stock'
 *   },
 * });
 */
export function useAddProductMutation(baseOptions?: Apollo.MutationHookOptions<AddProductMutation, AddProductMutationVariables>) {
        return Apollo.useMutation<AddProductMutation, AddProductMutationVariables>(AddProductDocument, baseOptions);
      }
export type AddProductMutationHookResult = ReturnType<typeof useAddProductMutation>;
export type AddProductMutationResult = Apollo.MutationResult<AddProductMutation>;
export type AddProductMutationOptions = Apollo.BaseMutationOptions<AddProductMutation, AddProductMutationVariables>;
export const AddProductToSectionDocument = gql`
    mutation addProductToSection($product_id: Float!, $section_id: Float!) {
  addProductToSection(product_id: $product_id, section_id: $section_id)
}
    `;
export type AddProductToSectionMutationFn = Apollo.MutationFunction<AddProductToSectionMutation, AddProductToSectionMutationVariables>;

/**
 * __useAddProductToSectionMutation__
 *
 * To run a mutation, you first call `useAddProductToSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductToSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductToSectionMutation, { data, loading, error }] = useAddProductToSectionMutation({
 *   variables: {
 *      product_id: // value for 'product_id'
 *      section_id: // value for 'section_id'
 *   },
 * });
 */
export function useAddProductToSectionMutation(baseOptions?: Apollo.MutationHookOptions<AddProductToSectionMutation, AddProductToSectionMutationVariables>) {
        return Apollo.useMutation<AddProductToSectionMutation, AddProductToSectionMutationVariables>(AddProductToSectionDocument, baseOptions);
      }
export type AddProductToSectionMutationHookResult = ReturnType<typeof useAddProductToSectionMutation>;
export type AddProductToSectionMutationResult = Apollo.MutationResult<AddProductToSectionMutation>;
export type AddProductToSectionMutationOptions = Apollo.BaseMutationOptions<AddProductToSectionMutation, AddProductToSectionMutationVariables>;
export const AddSectionDocument = gql`
    mutation addSection($name: String!, $thumbnail: String!) {
  addSection(name: $name, thumbnail: $thumbnail)
}
    `;
export type AddSectionMutationFn = Apollo.MutationFunction<AddSectionMutation, AddSectionMutationVariables>;

/**
 * __useAddSectionMutation__
 *
 * To run a mutation, you first call `useAddSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSectionMutation, { data, loading, error }] = useAddSectionMutation({
 *   variables: {
 *      name: // value for 'name'
 *      thumbnail: // value for 'thumbnail'
 *   },
 * });
 */
export function useAddSectionMutation(baseOptions?: Apollo.MutationHookOptions<AddSectionMutation, AddSectionMutationVariables>) {
        return Apollo.useMutation<AddSectionMutation, AddSectionMutationVariables>(AddSectionDocument, baseOptions);
      }
export type AddSectionMutationHookResult = ReturnType<typeof useAddSectionMutation>;
export type AddSectionMutationResult = Apollo.MutationResult<AddSectionMutation>;
export type AddSectionMutationOptions = Apollo.BaseMutationOptions<AddSectionMutation, AddSectionMutationVariables>;
export const AddShippingToProductDocument = gql`
    mutation addShippingToProduct($product_id: Float!, $shipping_str: String!) {
  addShippingToProduct(product_id: $product_id, shipping_str: $shipping_str)
}
    `;
export type AddShippingToProductMutationFn = Apollo.MutationFunction<AddShippingToProductMutation, AddShippingToProductMutationVariables>;

/**
 * __useAddShippingToProductMutation__
 *
 * To run a mutation, you first call `useAddShippingToProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddShippingToProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addShippingToProductMutation, { data, loading, error }] = useAddShippingToProductMutation({
 *   variables: {
 *      product_id: // value for 'product_id'
 *      shipping_str: // value for 'shipping_str'
 *   },
 * });
 */
export function useAddShippingToProductMutation(baseOptions?: Apollo.MutationHookOptions<AddShippingToProductMutation, AddShippingToProductMutationVariables>) {
        return Apollo.useMutation<AddShippingToProductMutation, AddShippingToProductMutationVariables>(AddShippingToProductDocument, baseOptions);
      }
export type AddShippingToProductMutationHookResult = ReturnType<typeof useAddShippingToProductMutation>;
export type AddShippingToProductMutationResult = Apollo.MutationResult<AddShippingToProductMutation>;
export type AddShippingToProductMutationOptions = Apollo.BaseMutationOptions<AddShippingToProductMutation, AddShippingToProductMutationVariables>;
export const ApiLoginDocument = gql`
    mutation apiLogin($username: String!, $password: String!) {
  apiLogin(username: $username, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export type ApiLoginMutationFn = Apollo.MutationFunction<ApiLoginMutation, ApiLoginMutationVariables>;

/**
 * __useApiLoginMutation__
 *
 * To run a mutation, you first call `useApiLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApiLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [apiLoginMutation, { data, loading, error }] = useApiLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useApiLoginMutation(baseOptions?: Apollo.MutationHookOptions<ApiLoginMutation, ApiLoginMutationVariables>) {
        return Apollo.useMutation<ApiLoginMutation, ApiLoginMutationVariables>(ApiLoginDocument, baseOptions);
      }
export type ApiLoginMutationHookResult = ReturnType<typeof useApiLoginMutation>;
export type ApiLoginMutationResult = Apollo.MutationResult<ApiLoginMutation>;
export type ApiLoginMutationOptions = Apollo.BaseMutationOptions<ApiLoginMutation, ApiLoginMutationVariables>;
export const DeleteAnnouncementDocument = gql`
    mutation deleteAnnouncement($id: String!) {
  deleteAnnouncement(id: $id)
}
    `;
export type DeleteAnnouncementMutationFn = Apollo.MutationFunction<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables>;

/**
 * __useDeleteAnnouncementMutation__
 *
 * To run a mutation, you first call `useDeleteAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAnnouncementMutation, { data, loading, error }] = useDeleteAnnouncementMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAnnouncementMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables>) {
        return Apollo.useMutation<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables>(DeleteAnnouncementDocument, baseOptions);
      }
export type DeleteAnnouncementMutationHookResult = ReturnType<typeof useDeleteAnnouncementMutation>;
export type DeleteAnnouncementMutationResult = Apollo.MutationResult<DeleteAnnouncementMutation>;
export type DeleteAnnouncementMutationOptions = Apollo.BaseMutationOptions<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables>;
export const DeleteApiUserDocument = gql`
    mutation deleteApiUser($uuid: Float!) {
  deleteApiUser(uuid: $uuid)
}
    `;
export type DeleteApiUserMutationFn = Apollo.MutationFunction<DeleteApiUserMutation, DeleteApiUserMutationVariables>;

/**
 * __useDeleteApiUserMutation__
 *
 * To run a mutation, you first call `useDeleteApiUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteApiUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteApiUserMutation, { data, loading, error }] = useDeleteApiUserMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDeleteApiUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteApiUserMutation, DeleteApiUserMutationVariables>) {
        return Apollo.useMutation<DeleteApiUserMutation, DeleteApiUserMutationVariables>(DeleteApiUserDocument, baseOptions);
      }
export type DeleteApiUserMutationHookResult = ReturnType<typeof useDeleteApiUserMutation>;
export type DeleteApiUserMutationResult = Apollo.MutationResult<DeleteApiUserMutation>;
export type DeleteApiUserMutationOptions = Apollo.BaseMutationOptions<DeleteApiUserMutation, DeleteApiUserMutationVariables>;
export const DeleteCouponDocument = gql`
    mutation deleteCoupon($coupon_name: String!) {
  deleteCoupon(coupon_name: $coupon_name)
}
    `;
export type DeleteCouponMutationFn = Apollo.MutationFunction<DeleteCouponMutation, DeleteCouponMutationVariables>;

/**
 * __useDeleteCouponMutation__
 *
 * To run a mutation, you first call `useDeleteCouponMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCouponMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCouponMutation, { data, loading, error }] = useDeleteCouponMutation({
 *   variables: {
 *      coupon_name: // value for 'coupon_name'
 *   },
 * });
 */
export function useDeleteCouponMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCouponMutation, DeleteCouponMutationVariables>) {
        return Apollo.useMutation<DeleteCouponMutation, DeleteCouponMutationVariables>(DeleteCouponDocument, baseOptions);
      }
export type DeleteCouponMutationHookResult = ReturnType<typeof useDeleteCouponMutation>;
export type DeleteCouponMutationResult = Apollo.MutationResult<DeleteCouponMutation>;
export type DeleteCouponMutationOptions = Apollo.BaseMutationOptions<DeleteCouponMutation, DeleteCouponMutationVariables>;
export const DeleteOptionsDocument = gql`
    mutation deleteOptions($options_str: String!) {
  deleteOptions(options_str: $options_str)
}
    `;
export type DeleteOptionsMutationFn = Apollo.MutationFunction<DeleteOptionsMutation, DeleteOptionsMutationVariables>;

/**
 * __useDeleteOptionsMutation__
 *
 * To run a mutation, you first call `useDeleteOptionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOptionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOptionsMutation, { data, loading, error }] = useDeleteOptionsMutation({
 *   variables: {
 *      options_str: // value for 'options_str'
 *   },
 * });
 */
export function useDeleteOptionsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOptionsMutation, DeleteOptionsMutationVariables>) {
        return Apollo.useMutation<DeleteOptionsMutation, DeleteOptionsMutationVariables>(DeleteOptionsDocument, baseOptions);
      }
export type DeleteOptionsMutationHookResult = ReturnType<typeof useDeleteOptionsMutation>;
export type DeleteOptionsMutationResult = Apollo.MutationResult<DeleteOptionsMutation>;
export type DeleteOptionsMutationOptions = Apollo.BaseMutationOptions<DeleteOptionsMutation, DeleteOptionsMutationVariables>;
export const DeleteProductDocument = gql`
    mutation deleteProduct($product_id: Float!) {
  deleteProduct(product_id: $product_id)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, baseOptions);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const DeleteSectionDocument = gql`
    mutation deleteSection($section_id: Float!) {
  deleteSection(section_id: $section_id)
}
    `;
export type DeleteSectionMutationFn = Apollo.MutationFunction<DeleteSectionMutation, DeleteSectionMutationVariables>;

/**
 * __useDeleteSectionMutation__
 *
 * To run a mutation, you first call `useDeleteSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSectionMutation, { data, loading, error }] = useDeleteSectionMutation({
 *   variables: {
 *      section_id: // value for 'section_id'
 *   },
 * });
 */
export function useDeleteSectionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSectionMutation, DeleteSectionMutationVariables>) {
        return Apollo.useMutation<DeleteSectionMutation, DeleteSectionMutationVariables>(DeleteSectionDocument, baseOptions);
      }
export type DeleteSectionMutationHookResult = ReturnType<typeof useDeleteSectionMutation>;
export type DeleteSectionMutationResult = Apollo.MutationResult<DeleteSectionMutation>;
export type DeleteSectionMutationOptions = Apollo.BaseMutationOptions<DeleteSectionMutation, DeleteSectionMutationVariables>;
export const EditTrackingDocument = gql`
    mutation editTracking($new_tracking_num: String!, $order_id: Float!) {
  editTracking(new_tracking_num: $new_tracking_num, order_id: $order_id)
}
    `;
export type EditTrackingMutationFn = Apollo.MutationFunction<EditTrackingMutation, EditTrackingMutationVariables>;

/**
 * __useEditTrackingMutation__
 *
 * To run a mutation, you first call `useEditTrackingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTrackingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTrackingMutation, { data, loading, error }] = useEditTrackingMutation({
 *   variables: {
 *      new_tracking_num: // value for 'new_tracking_num'
 *      order_id: // value for 'order_id'
 *   },
 * });
 */
export function useEditTrackingMutation(baseOptions?: Apollo.MutationHookOptions<EditTrackingMutation, EditTrackingMutationVariables>) {
        return Apollo.useMutation<EditTrackingMutation, EditTrackingMutationVariables>(EditTrackingDocument, baseOptions);
      }
export type EditTrackingMutationHookResult = ReturnType<typeof useEditTrackingMutation>;
export type EditTrackingMutationResult = Apollo.MutationResult<EditTrackingMutation>;
export type EditTrackingMutationOptions = Apollo.BaseMutationOptions<EditTrackingMutation, EditTrackingMutationVariables>;
export const GetAnnouncementsDocument = gql`
    query getAnnouncements {
  getAnnouncements {
    id
    text
  }
}
    `;

/**
 * __useGetAnnouncementsQuery__
 *
 * To run a query within a React component, call `useGetAnnouncementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnnouncementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnnouncementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAnnouncementsQuery(baseOptions?: Apollo.QueryHookOptions<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>) {
        return Apollo.useQuery<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>(GetAnnouncementsDocument, baseOptions);
      }
export function useGetAnnouncementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>) {
          return Apollo.useLazyQuery<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>(GetAnnouncementsDocument, baseOptions);
        }
export type GetAnnouncementsQueryHookResult = ReturnType<typeof useGetAnnouncementsQuery>;
export type GetAnnouncementsLazyQueryHookResult = ReturnType<typeof useGetAnnouncementsLazyQuery>;
export type GetAnnouncementsQueryResult = Apollo.QueryResult<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>;
export const GetApiUsersDocument = gql`
    query getApiUsers {
  getApiUsers {
    uuid
    username
  }
}
    `;

/**
 * __useGetApiUsersQuery__
 *
 * To run a query within a React component, call `useGetApiUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApiUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApiUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetApiUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetApiUsersQuery, GetApiUsersQueryVariables>) {
        return Apollo.useQuery<GetApiUsersQuery, GetApiUsersQueryVariables>(GetApiUsersDocument, baseOptions);
      }
export function useGetApiUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApiUsersQuery, GetApiUsersQueryVariables>) {
          return Apollo.useLazyQuery<GetApiUsersQuery, GetApiUsersQueryVariables>(GetApiUsersDocument, baseOptions);
        }
export type GetApiUsersQueryHookResult = ReturnType<typeof useGetApiUsersQuery>;
export type GetApiUsersLazyQueryHookResult = ReturnType<typeof useGetApiUsersLazyQuery>;
export type GetApiUsersQueryResult = Apollo.QueryResult<GetApiUsersQuery, GetApiUsersQueryVariables>;
export const GetCouponsDocument = gql`
    query getCoupons {
  getCoupons {
    coupon_name
    coupon_id
    discount
  }
}
    `;

/**
 * __useGetCouponsQuery__
 *
 * To run a query within a React component, call `useGetCouponsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCouponsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCouponsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCouponsQuery(baseOptions?: Apollo.QueryHookOptions<GetCouponsQuery, GetCouponsQueryVariables>) {
        return Apollo.useQuery<GetCouponsQuery, GetCouponsQueryVariables>(GetCouponsDocument, baseOptions);
      }
export function useGetCouponsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCouponsQuery, GetCouponsQueryVariables>) {
          return Apollo.useLazyQuery<GetCouponsQuery, GetCouponsQueryVariables>(GetCouponsDocument, baseOptions);
        }
export type GetCouponsQueryHookResult = ReturnType<typeof useGetCouponsQuery>;
export type GetCouponsLazyQueryHookResult = ReturnType<typeof useGetCouponsLazyQuery>;
export type GetCouponsQueryResult = Apollo.QueryResult<GetCouponsQuery, GetCouponsQueryVariables>;
export const GetMaintenanceDocument = gql`
    query getMaintenance {
  getMaintenance
}
    `;

/**
 * __useGetMaintenanceQuery__
 *
 * To run a query within a React component, call `useGetMaintenanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaintenanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaintenanceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMaintenanceQuery(baseOptions?: Apollo.QueryHookOptions<GetMaintenanceQuery, GetMaintenanceQueryVariables>) {
        return Apollo.useQuery<GetMaintenanceQuery, GetMaintenanceQueryVariables>(GetMaintenanceDocument, baseOptions);
      }
export function useGetMaintenanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaintenanceQuery, GetMaintenanceQueryVariables>) {
          return Apollo.useLazyQuery<GetMaintenanceQuery, GetMaintenanceQueryVariables>(GetMaintenanceDocument, baseOptions);
        }
export type GetMaintenanceQueryHookResult = ReturnType<typeof useGetMaintenanceQuery>;
export type GetMaintenanceLazyQueryHookResult = ReturnType<typeof useGetMaintenanceLazyQuery>;
export type GetMaintenanceQueryResult = Apollo.QueryResult<GetMaintenanceQuery, GetMaintenanceQueryVariables>;
export const GetOrderByIdDocument = gql`
    query getOrderById($order_id: Float!) {
  getOrderById(order_id: $order_id) {
    products {
      product_id
      name
      desc
      price
      stock
      exp_date
      quantityOrdered
      productSubtotal
      images {
        img_id
        img_url
        index
      }
    }
    order_id
    tracking_num
    shipping
    warning
    order_total
    coupon
    discount
    date_of_purchase
  }
}
    `;

/**
 * __useGetOrderByIdQuery__
 *
 * To run a query within a React component, call `useGetOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderByIdQuery({
 *   variables: {
 *      order_id: // value for 'order_id'
 *   },
 * });
 */
export function useGetOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
        return Apollo.useQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, baseOptions);
      }
export function useGetOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, baseOptions);
        }
export type GetOrderByIdQueryHookResult = ReturnType<typeof useGetOrderByIdQuery>;
export type GetOrderByIdLazyQueryHookResult = ReturnType<typeof useGetOrderByIdLazyQuery>;
export type GetOrderByIdQueryResult = Apollo.QueryResult<GetOrderByIdQuery, GetOrderByIdQueryVariables>;
export const GetOrdersDocument = gql`
    query getOrders {
  getOrders {
    products {
      product_id
      name
      desc
      price
      stock
      exp_date
      quantityOrdered
      productSubtotal
      images {
        img_id
        img_url
        index
      }
    }
    order_id
    tracking_num
    order_total
    coupon
    discount
    shipping
    warning
    date_of_purchase
  }
}
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, baseOptions);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, baseOptions);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const ApiGetProductDocument = gql`
    query apiGetProduct($product_id: Float!) {
  apiGetProduct(product_id: $product_id) {
    product_id
    name
    desc
    price
    stock
    exp_date
    images {
      img_id
      img_url
    }
    hidden
  }
}
    `;

/**
 * __useApiGetProductQuery__
 *
 * To run a query within a React component, call `useApiGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useApiGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApiGetProductQuery({
 *   variables: {
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useApiGetProductQuery(baseOptions: Apollo.QueryHookOptions<ApiGetProductQuery, ApiGetProductQueryVariables>) {
        return Apollo.useQuery<ApiGetProductQuery, ApiGetProductQueryVariables>(ApiGetProductDocument, baseOptions);
      }
export function useApiGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApiGetProductQuery, ApiGetProductQueryVariables>) {
          return Apollo.useLazyQuery<ApiGetProductQuery, ApiGetProductQueryVariables>(ApiGetProductDocument, baseOptions);
        }
export type ApiGetProductQueryHookResult = ReturnType<typeof useApiGetProductQuery>;
export type ApiGetProductLazyQueryHookResult = ReturnType<typeof useApiGetProductLazyQuery>;
export type ApiGetProductQueryResult = Apollo.QueryResult<ApiGetProductQuery, ApiGetProductQueryVariables>;
export const GetProductShippingDocument = gql`
    query getProductShipping($product_id: Float!) {
  getProductShipping(product_id: $product_id) {
    shipping_id
    country
    price
  }
}
    `;

/**
 * __useGetProductShippingQuery__
 *
 * To run a query within a React component, call `useGetProductShippingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductShippingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductShippingQuery({
 *   variables: {
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useGetProductShippingQuery(baseOptions: Apollo.QueryHookOptions<GetProductShippingQuery, GetProductShippingQueryVariables>) {
        return Apollo.useQuery<GetProductShippingQuery, GetProductShippingQueryVariables>(GetProductShippingDocument, baseOptions);
      }
export function useGetProductShippingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductShippingQuery, GetProductShippingQueryVariables>) {
          return Apollo.useLazyQuery<GetProductShippingQuery, GetProductShippingQueryVariables>(GetProductShippingDocument, baseOptions);
        }
export type GetProductShippingQueryHookResult = ReturnType<typeof useGetProductShippingQuery>;
export type GetProductShippingLazyQueryHookResult = ReturnType<typeof useGetProductShippingLazyQuery>;
export type GetProductShippingQueryResult = Apollo.QueryResult<GetProductShippingQuery, GetProductShippingQueryVariables>;
export const ApiGetProductsDocument = gql`
    query apiGetProducts {
  apiGetProducts {
    product_id
    name
    desc
    price
    stock
    exp_date
    images {
      img_id
      img_url
    }
  }
}
    `;

/**
 * __useApiGetProductsQuery__
 *
 * To run a query within a React component, call `useApiGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApiGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApiGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useApiGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<ApiGetProductsQuery, ApiGetProductsQueryVariables>) {
        return Apollo.useQuery<ApiGetProductsQuery, ApiGetProductsQueryVariables>(ApiGetProductsDocument, baseOptions);
      }
export function useApiGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApiGetProductsQuery, ApiGetProductsQueryVariables>) {
          return Apollo.useLazyQuery<ApiGetProductsQuery, ApiGetProductsQueryVariables>(ApiGetProductsDocument, baseOptions);
        }
export type ApiGetProductsQueryHookResult = ReturnType<typeof useApiGetProductsQuery>;
export type ApiGetProductsLazyQueryHookResult = ReturnType<typeof useApiGetProductsLazyQuery>;
export type ApiGetProductsQueryResult = Apollo.QueryResult<ApiGetProductsQuery, ApiGetProductsQueryVariables>;
export const GetProductsOptionsDocument = gql`
    query getProductsOptions($product_id: Float!) {
  getProductsOptions(product_id: $product_id) {
    option_id
    name
    price
    stock
    index
  }
}
    `;

/**
 * __useGetProductsOptionsQuery__
 *
 * To run a query within a React component, call `useGetProductsOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsOptionsQuery({
 *   variables: {
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useGetProductsOptionsQuery(baseOptions: Apollo.QueryHookOptions<GetProductsOptionsQuery, GetProductsOptionsQueryVariables>) {
        return Apollo.useQuery<GetProductsOptionsQuery, GetProductsOptionsQueryVariables>(GetProductsOptionsDocument, baseOptions);
      }
export function useGetProductsOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsOptionsQuery, GetProductsOptionsQueryVariables>) {
          return Apollo.useLazyQuery<GetProductsOptionsQuery, GetProductsOptionsQueryVariables>(GetProductsOptionsDocument, baseOptions);
        }
export type GetProductsOptionsQueryHookResult = ReturnType<typeof useGetProductsOptionsQuery>;
export type GetProductsOptionsLazyQueryHookResult = ReturnType<typeof useGetProductsOptionsLazyQuery>;
export type GetProductsOptionsQueryResult = Apollo.QueryResult<GetProductsOptionsQuery, GetProductsOptionsQueryVariables>;
export const GetProductsSectionsDocument = gql`
    query getProductsSections($product_id: Float!) {
  getProductsSections(product_id: $product_id) {
    section_id
    name
    thumbnail
  }
}
    `;

/**
 * __useGetProductsSectionsQuery__
 *
 * To run a query within a React component, call `useGetProductsSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsSectionsQuery({
 *   variables: {
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useGetProductsSectionsQuery(baseOptions: Apollo.QueryHookOptions<GetProductsSectionsQuery, GetProductsSectionsQueryVariables>) {
        return Apollo.useQuery<GetProductsSectionsQuery, GetProductsSectionsQueryVariables>(GetProductsSectionsDocument, baseOptions);
      }
export function useGetProductsSectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsSectionsQuery, GetProductsSectionsQueryVariables>) {
          return Apollo.useLazyQuery<GetProductsSectionsQuery, GetProductsSectionsQueryVariables>(GetProductsSectionsDocument, baseOptions);
        }
export type GetProductsSectionsQueryHookResult = ReturnType<typeof useGetProductsSectionsQuery>;
export type GetProductsSectionsLazyQueryHookResult = ReturnType<typeof useGetProductsSectionsLazyQuery>;
export type GetProductsSectionsQueryResult = Apollo.QueryResult<GetProductsSectionsQuery, GetProductsSectionsQueryVariables>;
export const GetSectionByIdDocument = gql`
    query getSectionById($section_id: Float!) {
  getSectionById(section_id: $section_id) {
    section_id
    thumbnail
    name
  }
}
    `;

/**
 * __useGetSectionByIdQuery__
 *
 * To run a query within a React component, call `useGetSectionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectionByIdQuery({
 *   variables: {
 *      section_id: // value for 'section_id'
 *   },
 * });
 */
export function useGetSectionByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSectionByIdQuery, GetSectionByIdQueryVariables>) {
        return Apollo.useQuery<GetSectionByIdQuery, GetSectionByIdQueryVariables>(GetSectionByIdDocument, baseOptions);
      }
export function useGetSectionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSectionByIdQuery, GetSectionByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetSectionByIdQuery, GetSectionByIdQueryVariables>(GetSectionByIdDocument, baseOptions);
        }
export type GetSectionByIdQueryHookResult = ReturnType<typeof useGetSectionByIdQuery>;
export type GetSectionByIdLazyQueryHookResult = ReturnType<typeof useGetSectionByIdLazyQuery>;
export type GetSectionByIdQueryResult = Apollo.QueryResult<GetSectionByIdQuery, GetSectionByIdQueryVariables>;
export const GetSectionsDocument = gql`
    query getSections {
  getSections {
    section_id
    name
    thumbnail
  }
}
    `;

/**
 * __useGetSectionsQuery__
 *
 * To run a query within a React component, call `useGetSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetSectionsQuery, GetSectionsQueryVariables>) {
        return Apollo.useQuery<GetSectionsQuery, GetSectionsQueryVariables>(GetSectionsDocument, baseOptions);
      }
export function useGetSectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSectionsQuery, GetSectionsQueryVariables>) {
          return Apollo.useLazyQuery<GetSectionsQuery, GetSectionsQueryVariables>(GetSectionsDocument, baseOptions);
        }
export type GetSectionsQueryHookResult = ReturnType<typeof useGetSectionsQuery>;
export type GetSectionsLazyQueryHookResult = ReturnType<typeof useGetSectionsLazyQuery>;
export type GetSectionsQueryResult = Apollo.QueryResult<GetSectionsQuery, GetSectionsQueryVariables>;
export const GetSectionsProductsDocument = gql`
    query getSectionsProducts($section_id: Float!) {
  getSectionsProducts(section_id: $section_id) {
    product_id
    name
    desc
    price
    stock
    org_stock
  }
}
    `;

/**
 * __useGetSectionsProductsQuery__
 *
 * To run a query within a React component, call `useGetSectionsProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectionsProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectionsProductsQuery({
 *   variables: {
 *      section_id: // value for 'section_id'
 *   },
 * });
 */
export function useGetSectionsProductsQuery(baseOptions: Apollo.QueryHookOptions<GetSectionsProductsQuery, GetSectionsProductsQueryVariables>) {
        return Apollo.useQuery<GetSectionsProductsQuery, GetSectionsProductsQueryVariables>(GetSectionsProductsDocument, baseOptions);
      }
export function useGetSectionsProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSectionsProductsQuery, GetSectionsProductsQueryVariables>) {
          return Apollo.useLazyQuery<GetSectionsProductsQuery, GetSectionsProductsQueryVariables>(GetSectionsProductsDocument, baseOptions);
        }
export type GetSectionsProductsQueryHookResult = ReturnType<typeof useGetSectionsProductsQuery>;
export type GetSectionsProductsLazyQueryHookResult = ReturnType<typeof useGetSectionsProductsLazyQuery>;
export type GetSectionsProductsQueryResult = Apollo.QueryResult<GetSectionsProductsQuery, GetSectionsProductsQueryVariables>;
export const GetSocialsDocument = gql`
    query getSocials($component: String!) {
  getSocials(component: $component) {
    id
    index
    social_url
    social_logo
    display
  }
}
    `;

/**
 * __useGetSocialsQuery__
 *
 * To run a query within a React component, call `useGetSocialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSocialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSocialsQuery({
 *   variables: {
 *      component: // value for 'component'
 *   },
 * });
 */
export function useGetSocialsQuery(baseOptions: Apollo.QueryHookOptions<GetSocialsQuery, GetSocialsQueryVariables>) {
        return Apollo.useQuery<GetSocialsQuery, GetSocialsQueryVariables>(GetSocialsDocument, baseOptions);
      }
export function useGetSocialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSocialsQuery, GetSocialsQueryVariables>) {
          return Apollo.useLazyQuery<GetSocialsQuery, GetSocialsQueryVariables>(GetSocialsDocument, baseOptions);
        }
export type GetSocialsQueryHookResult = ReturnType<typeof useGetSocialsQuery>;
export type GetSocialsLazyQueryHookResult = ReturnType<typeof useGetSocialsLazyQuery>;
export type GetSocialsQueryResult = Apollo.QueryResult<GetSocialsQuery, GetSocialsQueryVariables>;
export const InitSocialsDocument = gql`
    mutation initSocials {
  initSocials
}
    `;
export type InitSocialsMutationFn = Apollo.MutationFunction<InitSocialsMutation, InitSocialsMutationVariables>;

/**
 * __useInitSocialsMutation__
 *
 * To run a mutation, you first call `useInitSocialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitSocialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initSocialsMutation, { data, loading, error }] = useInitSocialsMutation({
 *   variables: {
 *   },
 * });
 */
export function useInitSocialsMutation(baseOptions?: Apollo.MutationHookOptions<InitSocialsMutation, InitSocialsMutationVariables>) {
        return Apollo.useMutation<InitSocialsMutation, InitSocialsMutationVariables>(InitSocialsDocument, baseOptions);
      }
export type InitSocialsMutationHookResult = ReturnType<typeof useInitSocialsMutation>;
export type InitSocialsMutationResult = Apollo.MutationResult<InitSocialsMutation>;
export type InitSocialsMutationOptions = Apollo.BaseMutationOptions<InitSocialsMutation, InitSocialsMutationVariables>;
export const RemoveImgFromProductDocument = gql`
    mutation removeImgFromProduct($img_id: Float!) {
  removeImgFromProduct(img_id: $img_id)
}
    `;
export type RemoveImgFromProductMutationFn = Apollo.MutationFunction<RemoveImgFromProductMutation, RemoveImgFromProductMutationVariables>;

/**
 * __useRemoveImgFromProductMutation__
 *
 * To run a mutation, you first call `useRemoveImgFromProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveImgFromProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeImgFromProductMutation, { data, loading, error }] = useRemoveImgFromProductMutation({
 *   variables: {
 *      img_id: // value for 'img_id'
 *   },
 * });
 */
export function useRemoveImgFromProductMutation(baseOptions?: Apollo.MutationHookOptions<RemoveImgFromProductMutation, RemoveImgFromProductMutationVariables>) {
        return Apollo.useMutation<RemoveImgFromProductMutation, RemoveImgFromProductMutationVariables>(RemoveImgFromProductDocument, baseOptions);
      }
export type RemoveImgFromProductMutationHookResult = ReturnType<typeof useRemoveImgFromProductMutation>;
export type RemoveImgFromProductMutationResult = Apollo.MutationResult<RemoveImgFromProductMutation>;
export type RemoveImgFromProductMutationOptions = Apollo.BaseMutationOptions<RemoveImgFromProductMutation, RemoveImgFromProductMutationVariables>;
export const RemoveProductFromSectionDocument = gql`
    mutation removeProductFromSection($product_id: Float!, $section_id: Float!) {
  removeProductFromSection(product_id: $product_id, section_id: $section_id)
}
    `;
export type RemoveProductFromSectionMutationFn = Apollo.MutationFunction<RemoveProductFromSectionMutation, RemoveProductFromSectionMutationVariables>;

/**
 * __useRemoveProductFromSectionMutation__
 *
 * To run a mutation, you first call `useRemoveProductFromSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductFromSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductFromSectionMutation, { data, loading, error }] = useRemoveProductFromSectionMutation({
 *   variables: {
 *      product_id: // value for 'product_id'
 *      section_id: // value for 'section_id'
 *   },
 * });
 */
export function useRemoveProductFromSectionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProductFromSectionMutation, RemoveProductFromSectionMutationVariables>) {
        return Apollo.useMutation<RemoveProductFromSectionMutation, RemoveProductFromSectionMutationVariables>(RemoveProductFromSectionDocument, baseOptions);
      }
export type RemoveProductFromSectionMutationHookResult = ReturnType<typeof useRemoveProductFromSectionMutation>;
export type RemoveProductFromSectionMutationResult = Apollo.MutationResult<RemoveProductFromSectionMutation>;
export type RemoveProductFromSectionMutationOptions = Apollo.BaseMutationOptions<RemoveProductFromSectionMutation, RemoveProductFromSectionMutationVariables>;
export const RemoveWarningDocument = gql`
    mutation removeWarning($order_id: Float!) {
  removeWarning(order_id: $order_id)
}
    `;
export type RemoveWarningMutationFn = Apollo.MutationFunction<RemoveWarningMutation, RemoveWarningMutationVariables>;

/**
 * __useRemoveWarningMutation__
 *
 * To run a mutation, you first call `useRemoveWarningMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWarningMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWarningMutation, { data, loading, error }] = useRemoveWarningMutation({
 *   variables: {
 *      order_id: // value for 'order_id'
 *   },
 * });
 */
export function useRemoveWarningMutation(baseOptions?: Apollo.MutationHookOptions<RemoveWarningMutation, RemoveWarningMutationVariables>) {
        return Apollo.useMutation<RemoveWarningMutation, RemoveWarningMutationVariables>(RemoveWarningDocument, baseOptions);
      }
export type RemoveWarningMutationHookResult = ReturnType<typeof useRemoveWarningMutation>;
export type RemoveWarningMutationResult = Apollo.MutationResult<RemoveWarningMutation>;
export type RemoveWarningMutationOptions = Apollo.BaseMutationOptions<RemoveWarningMutation, RemoveWarningMutationVariables>;
export const ToggleMaintenanceDocument = gql`
    mutation toggleMaintenance {
  toggleMaintenance
}
    `;
export type ToggleMaintenanceMutationFn = Apollo.MutationFunction<ToggleMaintenanceMutation, ToggleMaintenanceMutationVariables>;

/**
 * __useToggleMaintenanceMutation__
 *
 * To run a mutation, you first call `useToggleMaintenanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleMaintenanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleMaintenanceMutation, { data, loading, error }] = useToggleMaintenanceMutation({
 *   variables: {
 *   },
 * });
 */
export function useToggleMaintenanceMutation(baseOptions?: Apollo.MutationHookOptions<ToggleMaintenanceMutation, ToggleMaintenanceMutationVariables>) {
        return Apollo.useMutation<ToggleMaintenanceMutation, ToggleMaintenanceMutationVariables>(ToggleMaintenanceDocument, baseOptions);
      }
export type ToggleMaintenanceMutationHookResult = ReturnType<typeof useToggleMaintenanceMutation>;
export type ToggleMaintenanceMutationResult = Apollo.MutationResult<ToggleMaintenanceMutation>;
export type ToggleMaintenanceMutationOptions = Apollo.BaseMutationOptions<ToggleMaintenanceMutation, ToggleMaintenanceMutationVariables>;
export const ToggleProductDisplayDocument = gql`
    mutation toggleProductDisplay($product_id: Float!) {
  toggleProductDisplay(product_id: $product_id)
}
    `;
export type ToggleProductDisplayMutationFn = Apollo.MutationFunction<ToggleProductDisplayMutation, ToggleProductDisplayMutationVariables>;

/**
 * __useToggleProductDisplayMutation__
 *
 * To run a mutation, you first call `useToggleProductDisplayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleProductDisplayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleProductDisplayMutation, { data, loading, error }] = useToggleProductDisplayMutation({
 *   variables: {
 *      product_id: // value for 'product_id'
 *   },
 * });
 */
export function useToggleProductDisplayMutation(baseOptions?: Apollo.MutationHookOptions<ToggleProductDisplayMutation, ToggleProductDisplayMutationVariables>) {
        return Apollo.useMutation<ToggleProductDisplayMutation, ToggleProductDisplayMutationVariables>(ToggleProductDisplayDocument, baseOptions);
      }
export type ToggleProductDisplayMutationHookResult = ReturnType<typeof useToggleProductDisplayMutation>;
export type ToggleProductDisplayMutationResult = Apollo.MutationResult<ToggleProductDisplayMutation>;
export type ToggleProductDisplayMutationOptions = Apollo.BaseMutationOptions<ToggleProductDisplayMutation, ToggleProductDisplayMutationVariables>;
export const ToggleSocialDisplayDocument = gql`
    mutation toggleSocialDisplay($id: Float!) {
  toggleSocialDisplay(id: $id)
}
    `;
export type ToggleSocialDisplayMutationFn = Apollo.MutationFunction<ToggleSocialDisplayMutation, ToggleSocialDisplayMutationVariables>;

/**
 * __useToggleSocialDisplayMutation__
 *
 * To run a mutation, you first call `useToggleSocialDisplayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleSocialDisplayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleSocialDisplayMutation, { data, loading, error }] = useToggleSocialDisplayMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleSocialDisplayMutation(baseOptions?: Apollo.MutationHookOptions<ToggleSocialDisplayMutation, ToggleSocialDisplayMutationVariables>) {
        return Apollo.useMutation<ToggleSocialDisplayMutation, ToggleSocialDisplayMutationVariables>(ToggleSocialDisplayDocument, baseOptions);
      }
export type ToggleSocialDisplayMutationHookResult = ReturnType<typeof useToggleSocialDisplayMutation>;
export type ToggleSocialDisplayMutationResult = Apollo.MutationResult<ToggleSocialDisplayMutation>;
export type ToggleSocialDisplayMutationOptions = Apollo.BaseMutationOptions<ToggleSocialDisplayMutation, ToggleSocialDisplayMutationVariables>;
export const UpdateOptionsDocument = gql`
    mutation updateOptions($options_str: String!) {
  updateOptions(options_str: $options_str)
}
    `;
export type UpdateOptionsMutationFn = Apollo.MutationFunction<UpdateOptionsMutation, UpdateOptionsMutationVariables>;

/**
 * __useUpdateOptionsMutation__
 *
 * To run a mutation, you first call `useUpdateOptionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOptionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOptionsMutation, { data, loading, error }] = useUpdateOptionsMutation({
 *   variables: {
 *      options_str: // value for 'options_str'
 *   },
 * });
 */
export function useUpdateOptionsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOptionsMutation, UpdateOptionsMutationVariables>) {
        return Apollo.useMutation<UpdateOptionsMutation, UpdateOptionsMutationVariables>(UpdateOptionsDocument, baseOptions);
      }
export type UpdateOptionsMutationHookResult = ReturnType<typeof useUpdateOptionsMutation>;
export type UpdateOptionsMutationResult = Apollo.MutationResult<UpdateOptionsMutation>;
export type UpdateOptionsMutationOptions = Apollo.BaseMutationOptions<UpdateOptionsMutation, UpdateOptionsMutationVariables>;
export const UpdateProductDocument = gql`
    mutation updateProduct($product_id: Float!, $name: String!, $desc: String!, $price: Float!, $stock: Float!) {
  updateProduct(
    product_id: $product_id
    name: $name
    desc: $desc
    price: $price
    stock: $stock
  )
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      product_id: // value for 'product_id'
 *      name: // value for 'name'
 *      desc: // value for 'desc'
 *      price: // value for 'price'
 *      stock: // value for 'stock'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, baseOptions);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdateSectionDocument = gql`
    mutation updateSection($name: String!, $thumbnail: String!, $section_id: Float!) {
  updateSection(name: $name, thumbnail: $thumbnail, section_id: $section_id)
}
    `;
export type UpdateSectionMutationFn = Apollo.MutationFunction<UpdateSectionMutation, UpdateSectionMutationVariables>;

/**
 * __useUpdateSectionMutation__
 *
 * To run a mutation, you first call `useUpdateSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSectionMutation, { data, loading, error }] = useUpdateSectionMutation({
 *   variables: {
 *      name: // value for 'name'
 *      thumbnail: // value for 'thumbnail'
 *      section_id: // value for 'section_id'
 *   },
 * });
 */
export function useUpdateSectionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSectionMutation, UpdateSectionMutationVariables>) {
        return Apollo.useMutation<UpdateSectionMutation, UpdateSectionMutationVariables>(UpdateSectionDocument, baseOptions);
      }
export type UpdateSectionMutationHookResult = ReturnType<typeof useUpdateSectionMutation>;
export type UpdateSectionMutationResult = Apollo.MutationResult<UpdateSectionMutation>;
export type UpdateSectionMutationOptions = Apollo.BaseMutationOptions<UpdateSectionMutation, UpdateSectionMutationVariables>;
export const UpdateSocialUrlDocument = gql`
    mutation updateSocialUrl($url: String!, $id: Float!) {
  updateSocialUrl(url: $url, id: $id)
}
    `;
export type UpdateSocialUrlMutationFn = Apollo.MutationFunction<UpdateSocialUrlMutation, UpdateSocialUrlMutationVariables>;

/**
 * __useUpdateSocialUrlMutation__
 *
 * To run a mutation, you first call `useUpdateSocialUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSocialUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSocialUrlMutation, { data, loading, error }] = useUpdateSocialUrlMutation({
 *   variables: {
 *      url: // value for 'url'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateSocialUrlMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSocialUrlMutation, UpdateSocialUrlMutationVariables>) {
        return Apollo.useMutation<UpdateSocialUrlMutation, UpdateSocialUrlMutationVariables>(UpdateSocialUrlDocument, baseOptions);
      }
export type UpdateSocialUrlMutationHookResult = ReturnType<typeof useUpdateSocialUrlMutation>;
export type UpdateSocialUrlMutationResult = Apollo.MutationResult<UpdateSocialUrlMutation>;
export type UpdateSocialUrlMutationOptions = Apollo.BaseMutationOptions<UpdateSocialUrlMutation, UpdateSocialUrlMutationVariables>;