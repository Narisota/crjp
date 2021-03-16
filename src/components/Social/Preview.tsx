{
    /* <Footer
                Socials={
                    <DragDropContext
                        onDragEnd={({ destination, source }) => {
                            // dropped outside the list
                            if (!destination) {
                                return;
                            }

                            setSocialIcons(
                                reorderSocials(socialMap, source, destination)
                            );
                        }}
                    >
                        <div>
                            {Object.entries(socialMap).map(([key, val]) => (
                                <AuthorList
                                    internalScroll
                                    key={key}
                                    listId={key}
                                    listType="CARD"
                                    urls={val}
                                    id={key}
                                />
                            ))}
                        </div>
                    </DragDropContext>
                }
            /> */
}

export const Footer: React.FC<{ Socials: JSX.Element }> = ({ Socials }) => {
    return (
        <span>
            <footer
                className="noselect"
                style={{
                    backgroundColor: "#0a0a0a",
                    width: "100%",
                    height: "280px",
                }}
            >
                <div className="container">
                    <div
                        className="row"
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div className="col l6 s12"></div>

                        <div className="col l4 offset-12 s12">
                            <ul id="footer-info">
                                <li>
                                    <a
                                        href="#/shipping_policy"
                                        className="white-text"
                                    >
                                        <h4 style={{ fontWeight: 600 }}>
                                            Shipping Policy
                                        </h4>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/contact" className="white-text">
                                        <h4
                                            style={{
                                                marginTop: "0px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Contact Us
                                        </h4>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/FAQ" className="white-text">
                                        <h4
                                            style={{
                                                marginTop: "0px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            FAQ
                                        </h4>
                                    </a>
                                </li>
                                <li>{Socials}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </span>
    );
};
