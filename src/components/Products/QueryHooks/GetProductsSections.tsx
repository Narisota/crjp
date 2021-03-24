import { useGetProductsSectionsQuery } from "../../../generated/graphql";
import { GetProductId } from "../GetProductId";

export const GetProductsSections = () => {
    var product_id = GetProductId();
    const { data, loading } = useGetProductsSectionsQuery({
        variables: {
            product_id,
        },
    });

    let pdata = data,
        ploading = loading;

    return {
        pdata,
        ploading,
    };
};
