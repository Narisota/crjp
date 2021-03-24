import { useGetProductShippingQuery } from "../../../generated/graphql";
import { GetProductId } from "../GetProductId";

export const GetProductShipping = () => {
    var product_id = GetProductId();
    const getProductShipping = useGetProductShippingQuery({
        variables: {
            product_id,
        },
    });
    let shdata = getProductShipping.data,
        shloading = getProductShipping.loading;

    return { shdata, shloading };
};
