import React, { FC } from "react";

type Props = {
    text: string
}

const Header: FC<Props> = (props) => {
    return (
        <header className="App-header">
            <h2>{props.text}</h2>
        </header>
    );
};

export default Header;