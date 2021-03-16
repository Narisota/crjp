const Navbar = () => {
    return (
        <div>
            <nav
                className="white z-depth-0"
                style={{ borderBottom: "1px solid #dfe0e6" }}
            >
                <div className="nav-wrapper">
                    <div
                        className="row"
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <ul id="nav-mobile" className="center ">
                            <li>
                                <a className="black-text" href="#/orders">
                                    Orders
                                </a>
                            </li>
                            <li>
                                <a className="black-text" href="#/products">
                                    Products
                                </a>
                            </li>
                            <li>
                                <a className="black-text" href="#/sections">
                                    Sections
                                </a>
                            </li>
                            <li>
                                <a className="black-text" href="#/utils">
                                    Utils
                                </a>
                            </li>

                            <li>
                                <a className="black-text" href="#/edit-socials">
                                    Edit Socials
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
