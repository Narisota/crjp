import { useLocation } from "react-router";
import { useGetSectionsQuery } from "../../generated/graphql";
const Sections = () => {
    const location: any = useLocation();

    console.log(`location`, location);

    if (!!location.state) {
        if (location.state.reload) {
            window.location.reload();
        }
    }

    const { data, loading, error } = useGetSectionsQuery();

    if (loading) {
        return <>...loading</>;
    }

    if (error) {
        M.toast({ html: `${error}` });

        return (
            <div className="centered">
                <h1 className="red-text">An Error has occurred</h1>
            </div>
        );
    }

    console.log("data :>> ", data);

    return (
        <div className="container">
            <nav
                className="z-depth-0 black-text "
                style={{ backgroundColor: "transparent" }}
            >
                <div className="nav-wrapper">
                    <h5
                        className="left"
                        style={{
                            marginBottom: "48px",
                            marginLeft: "16px",
                            marginRight: "16px",
                            fontWeight: "bold",
                            fontSize: "26px",
                            color: "#14161a",
                        }}
                    >
                        Sections
                    </h5>
                    <ul className="right">
                        <li>
                            <a href="#/add-sections">
                                <i className="material-icons black-text">add</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="products-grid">
                {!!data ? (
                    data.getSections.map((_val, i) => {
                        return (
                            <div
                                className="card"
                                style={{ margin: "0px, 16px, 32px, 16px" }}
                                key={i}
                            >
                                <div className="card-image">
                                    <img src={data.getSections[i].thumbnail} />
                                    <a
                                        href={`#/edit-section:${data.getSections[i].section_id}`}
                                        className="btn-floating btn-large halfway-fab large blue-grey darken-4"
                                    >
                                        <i className="large material-icons">
                                            edit
                                        </i>
                                    </a>
                                </div>

                                <div className="card-content">
                                    <span className="card-title">
                                        {data.getSections[i].name}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Sections;
