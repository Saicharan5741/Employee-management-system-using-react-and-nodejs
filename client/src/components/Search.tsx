import React from "react";
import { Input } from "./ui/input";

type PropsTypes = {
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<PropsTypes> = ({ handleOnchange }) => {
  return (
    <div>
      <Input placeholder="Search" onChange={handleOnchange} />
    </div>
  );
};

export default Search;
