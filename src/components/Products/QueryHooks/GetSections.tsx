import { useGetSectionsQuery } from "../../../generated/graphql";

export const GetSections = () => {
    const { data, loading } = useGetSectionsQuery();

    let sloading = loading;
    let sdata = data;
    return { sdata, sloading };
};
