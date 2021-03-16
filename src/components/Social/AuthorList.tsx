import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

interface Props {
    urls: string[];
    listId: string;
    listType?: string;
    internalScroll?: boolean;
    isCombineEnabled?: boolean;
    id: string;
}

export const AuthorList: React.FC<Props> = ({ listId, listType, urls, id }) => {
    return (
        <Droppable
            droppableId={listId}
            type={listType}
            direction="horizontal"
            isCombineEnabled={false}
        >
            {(dropProvided: DroppableProvided) => (
                <div {...dropProvided.droppableProps}>
                    <div
                        id={id}
                        style={{
                            display: "flex",
                            backgroundColor: "pink",
                            margin: 20,
                            minHeight: 60,
                        }}
                        ref={dropProvided.innerRef}
                    >
                        {urls.map((url, index: number) => (
                            <Draggable
                                key={url}
                                draggableId={url}
                                index={index}
                            >
                                {dragProvided => (
                                    <div
                                        {...dragProvided.dragHandleProps}
                                        {...dragProvided.draggableProps}
                                        ref={dragProvided.innerRef}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: url,
                                            }}
                                        >
                                            {url === "I" ? (
                                                <FaInstagram />
                                            ) : (
                                                <></>
                                            )}
                                            {url === "E" ? (
                                                <FaEnvelope />
                                            ) : (
                                                <></>
                                            )}
                                            {url === "T" ? (
                                                <FaTwitter />
                                            ) : (
                                                <></>
                                            )}
                                            {url === "F" ? (
                                                <FaFacebook />
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {dropProvided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};
