import { useEffect, useState } from "react";
import {
    useGetSocialsQuery,
    useInitSocialsMutation,
} from "../../generated/graphql";
import { Sorting } from "../../Sorting";
import Socials from "./Socials";

const initSocials = async (INIT_SOCIALS: any) => {
    let tmp = await INIT_SOCIALS();
    if (tmp.data?.initSocials) {
        window.location.reload();
    } else {
        return false;
    }
};

const EditSocials = () => {
    const { sortByProp } = Sorting();
    const [INIT_SOCIALS] = useInitSocialsMutation();
    const [refresh, setRefresh] = useState(false);
    const { data, loading, error } = useGetSocialsQuery({
        variables: { component: "footer" },
    });

    useEffect(() => {
        M.FloatingActionButton.init(
            document.querySelectorAll(".fixed-action-btn")
        );
        M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"));
        M.Tooltip.init(document.querySelectorAll(".tooltipped"));
    });

    if (loading) {
        return <>...loading</>;
    }

    if (error) {
        return <>error</>;
    }

    if (!data || data.getSocials.length === 0) {
        let tmp = initSocials(INIT_SOCIALS);
        if (!tmp) {
            return <>error occured while initializing Socials</>;
        }
        return <>NO data</>;
    }

    sortByProp(data.getSocials, "index");

    return (
        <Socials
            data={data.getSocials as any}
            setRefresh={setRefresh}
            refresh={refresh}
        />
    );
};

export default EditSocials;
