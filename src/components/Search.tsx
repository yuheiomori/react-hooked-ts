import React, { FC, useState } from "react";


type Props = {
    search: (searchValue: string) => void;

}


const Search: FC<Props> = (props) => {
    const [searchValue, setSearchValue] = useState<string>("");

    const handleSearchInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const resetInputField = () => {
        setSearchValue("")
    }

    const callSearchFunction = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }

    return (
        <form className="search">
            <input
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"
            />
            <input onClick={callSearchFunction} type="submit" value="SEARCH" />
        </form>
    );
}

export default Search;