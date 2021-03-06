import ListDocument from "components/DocumentList";
import HeaderListDocument from "components/HeaderListDocument";
import { fetchDocuments } from "features/ManageDocuments/documentsSlice";
import SearchGroup from "features/SearchGroup/SearchGroup";
import React from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchDocuments());
  }, []);

  return (
    <>
      <SearchGroup />
      <HeaderListDocument>
        <ListDocument />
      </HeaderListDocument>
    </>
  );
}
