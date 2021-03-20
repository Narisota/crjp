import {
    useAddProductToSectionMutation,
    useRemoveProductFromSectionMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useAddImgToProductMutation,
    useRemoveImgFromProductMutation,
    useAddOptionToProductMutation,
    useToggleProductDisplayMutation,
} from "../../generated/graphql";

const ProductsMutations = () => {
    const [addProductToSection] = useAddProductToSectionMutation();
    const [removeProductFromSection] = useRemoveProductFromSectionMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [addImgToProduct] = useAddImgToProductMutation();
    const [deleteImg] = useRemoveImgFromProductMutation();
    const [ADD_OPT_TO_PRODUCT] = useAddOptionToProductMutation();
    const [toggleDisplay] = useToggleProductDisplayMutation();
    return {
        addProductToSection,
        removeProductFromSection,
        updateProduct,
        deleteProduct,
        addImgToProduct,
        deleteImg,
        ADD_OPT_TO_PRODUCT,
        toggleDisplay,
    };
};

export default ProductsMutations;