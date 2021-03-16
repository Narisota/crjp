const PreviewFAB = () => {
    return (
        <div className="fixed-action-btn" style={{ bottom: 100, right: 100 }}>
            <a
                className="btn-floating btn-large red tooltipped"
                data-position="left"
                data-tooltip="Click me to preview your changes"
                id="menu"
            >
                <i className="large material-icons blue">remove_red_eye</i>
            </a>
        </div>
    );
};

export default PreviewFAB;
