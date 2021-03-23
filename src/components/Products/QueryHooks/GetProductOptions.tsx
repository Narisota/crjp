import { useGetProductsOptionsQuery } from "../../../generated/graphql";
import { GetProductId } from "../GetProductId";

export const GetProductsOptions = () => {
    var product_id = GetProductId();
    const { data, loading } = useGetProductsOptionsQuery({
        variables: {
            product_id,
        },
    });

    let odata = data,
        oloading = loading;

    return {
        odata,
        oloading,
    };
};
