import React, { useEffect, useState } from "react";
import { FaInstagram, FaEnvelope, FaTwitter, FaFacebook } from "react-icons/fa";
import {
    useToggleSocialDisplayMutation,
    useUpdateSocialUrlMutation,
} from "../../generated/graphql";
import PreviewFAB from "./PreviewFAB";

interface Props {
    data: [
        {
            id: number;
            index: number;
            social_logo: string;
            social_url: string;
            display: string;
        }
    ];
    refresh: boolean;
    setRefresh: (value: React.SetStateAction<boolean>) => void;
}

const Socials: React.FC<Props> = ({ data, refresh, setRefresh }) => {
    console.log("data :>> ", data);

    const [updateSocialUrl] = useUpdateSocialUrlMutation();
    const [toggleSocialDisplay] = useToggleSocialDisplayMutation();

    const [socialMap, setSocialIcons] = useState<{ [key: string]: string[] }>({
        socials: ["I", "E", "T", "F"],
    });

    const [socials, setSocials] = useState(data);
    const [newSocials, setNewSocials] = useState([
        { social_url: "" },
        { social_url: "" },
        { social_url: "" },
        { social_url: "" },
    ]);

    return (
        <>
            <PreviewFAB />

            <div className="container">
                <div className="center-align table-wrapper">
                    <span className="table-header z-depth-2">
                        <h3 className="white-text noselect">Social Links</h3>
                    </span>

                    <span className="table-body z-depth-1">
                        <table className="striped responsive">
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <th>Icon</th>
                                    <th>URL</th>
                                    <th></th>
                                    <th>Display</th>
                                    <th>Index</th>
                                </tr>

                                {socials.map((_val, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <SocialIcon
                                                    social_logo={
                                                        socials[i].social_logo
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <div className="input-field">
                                                    <input
                                                        id={`social-input${i}`}
                                                        type="text"
                                                        className="validate"
                                                        value={
                                                            newSocials[i]
                                                                .social_url
                                                        }
                                                        onChange={async e => {
                                                            let updatedState = newSocials;
                                                            updatedState[
                                                                i
                                                            ].social_url =
                                                                e.target.value;

                                                            setNewSocials(
                                                                updatedState
                                                            );
                                                            setRefresh(
                                                                !refresh
                                                            );
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={`social-input${i}`}
                                                    >
                                                        {socials[i].social_url}
                                                    </label>
                                                    <span
                                                        id="coupon-helper"
                                                        className="helper-text"
                                                        data-error=" "
                                                    ></span>
                                                </div>
                                            </td>

                                            <td>
                                                <button
                                                    id={`update-social-${i}`}
                                                    className="btn black"
                                                    onClick={async () => {
                                                        let d = document;
                                                        d.getElementById(
                                                            `update-social-${i}`
                                                        )!.classList.add(
                                                            "disabled"
                                                        );
                                                        let tmp = await updateSocialUrl(
                                                            {
                                                                variables: {
                                                                    id:
                                                                        socials[
                                                                            i
                                                                        ].id,
                                                                    url:
                                                                        newSocials[
                                                                            i
                                                                        ]
                                                                            .social_url,
                                                                },
                                                            }
                                                        );

                                                        if (
                                                            tmp.data
                                                                ?.updateSocialUrl
                                                        ) {
                                                            window.location.reload();
                                                        } else {
                                                            M.toast({
                                                                html: `An error has occured.`,
                                                            });
                                                        }
                                                        d.getElementById(
                                                            `update-social-${i}`
                                                        )!.classList.remove(
                                                            "disabled"
                                                        );
                                                    }}
                                                >
                                                    UPDATE
                                                </button>
                                            </td>

                                            <td>
                                                {socials[i].display ? (
                                                    <button
                                                        className="btn green"
                                                        onClick={async () => {
                                                            let tmp = await toggleSocialDisplay(
                                                                {
                                                                    variables: {
                                                                        id:
                                                                            socials[
                                                                                i
                                                                            ]
                                                                                .id,
                                                                    },
                                                                }
                                                            );

                                                            if (
                                                                !tmp.data ||
                                                                !tmp.data
                                                                    .toggleSocialDisplay
                                                            ) {
                                                                M.toast({
                                                                    html:
                                                                        "An error occured",
                                                                });
                                                            } else {
                                                                window.location.reload();
                                                            }
                                                        }}
                                                    >
                                                        VISIBLE
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn red"
                                                        onClick={async () => {
                                                            let tmp = await toggleSocialDisplay(
                                                                {
                                                                    variables: {
                                                                        id:
                                                                            socials[
                                                                                i
                                                                            ]
                                                                                .id,
                                                                    },
                                                                }
                                                            );

                                                            if (
                                                                !tmp.data ||
                                                                !tmp.data
                                                                    .toggleSocialDisplay
                                                            ) {
                                                                M.toast({
                                                                    html:
                                                                        "An error occured",
                                                                });
                                                            } else {
                                                                window.location.reload();
                                                            }
                                                        }}
                                                    >
                                                        HIDDEN
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                <a
                                                    className="dropdown-trigger btn"
                                                    href="#"
                                                    data-target="dropdown1"
                                                >
                                                    Drop Me!
                                                </a>

                                                <ul
                                                    id="dropdown1"
                                                    className="dropdown-content"
                                                >
                                                    <IndexDropdown
                                                        socials={socials}
                                                    />
                                                </ul>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </span>
                </div>
            </div>
        </>
    );
};

const IndexDropdown: React.FC<{
    socials: [
        {
            id: number;
            index: number;
            social_logo: string;
            social_url: string;
            display: string;
        }
    ];
}> = ({ socials }) => {
    let indices = [0, 1, 2, 3];
    return (
        <>
            {indices.map((_val, ii) => {
                return (
                    <li className="" style={{ minWidth: 50 }}>
                        <span>
                            <span className="left black-text">
                                {socials.map((_val, j) => {
                                    if (socials[j].index === indices[ii]) {
                                        return (
                                            <SocialIcon
                                                social_logo={
                                                    socials[j].social_logo
                                                }
                                            />
                                        );
                                    }
                                })}
                            </span>
                            <span className="right black-text">
                                {indices[ii]}
                            </span>
                        </span>
                    </li>
                );
            })}
        </>
    );
};

const SocialIcon: React.FC<{ social_logo: string }> = ({ social_logo }) => {
    switch (social_logo) {
        case "I": {
            return (
                <FaInstagram
                    style={{
                        height: 30,
                        width: 30,
                    }}
                />
            );
        }

        case "E": {
            return (
                <FaEnvelope
                    style={{
                        height: 30,
                        width: 30,
                    }}
                />
            );
        }
        case "T": {
            return (
                <FaTwitter
                    style={{
                        height: 30,
                        width: 30,
                    }}
                />
            );
        }
        case "F": {
            return (
                <FaFacebook
                    style={{
                        height: 30,
                        width: 30,
                    }}
                />
            );
        }

        default: {
            return <>ERROR</>;
        }
    }
};

export default Socials;
