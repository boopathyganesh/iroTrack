import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import { ReactComponent as Trash } from "../../../assets/trash.svg";
import { ReactComponent as Edit } from "../../../assets/edit.svg";
import ModalConfirm from "../../Utilities/ModalConfirm";
import ModalDirectory from "../../Utilities/ModalDirectory";

const ItemDirectory: React.FC<{ dir: string; classActive: string }> = ({
  dir,
  classActive,
}) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [modalIsShown, setModalIsShown] = useState<boolean>(false);
  const [modalDirIsShown, setModalDirIsShown] = useState<boolean>(false);

  const handleCloseModalDirectory = () => {
    setModalDirIsShown(false);
  };

  const handleDeleteDirectory = () => {
    dispatch(tasksActions.deleteDirectory(dir));
  };

  const handleConfirmEditDirName = (dirName: string) => {
    dispatch(
      tasksActions.editDirectoryName({
        previousDirName: dir,
        newDirName: dirName,
      })
    );
  };

  const dirLinkPrefix = "/dir/";
  const editButtonTitle = "Edit directory name";
  const deleteButtonTitle = "Delete directory";

  return (
    <>
      {modalDirIsShown && (
        <ModalDirectory
          onClose={handleCloseModalDirectory}
          onConfirm={handleConfirmEditDirName}
          dirName={dir}
          title="Edit directory name"
          btnText="Edit"
        />
      )}
      {modalIsShown && (
        <ModalConfirm
          onClose={() => setModalIsShown(false)}
          onConfirm={handleDeleteDirectory}
          text="This directory and all its tasks will be deleted."
        />
      )}
      <li
        className={`flex items-center pr-4 pl-9 py-2 itemDirectory ${
          pathname === `${dirLinkPrefix}${dir}` ? classActive : ""
        }`}
      >
        <NavLink
          to={`${dirLinkPrefix}${dir}`}
          title={dir}
          className="hover:text-rose-600 dark:hover:text-slate-200 transition text-ellipsis whitespace-nowrap overflow-hidden max-w-[7rem]"
        >
          {dir}
        </NavLink>
        {dir !== "Main" && (
          <div className="ml-auto buttonsDir">
            <button
              title={editButtonTitle}
              onClick={() => setModalDirIsShown(true)}
            >
              <Edit className="w-5 h-5 mr-2" />
            </button>
            <button
              title={deleteButtonTitle}
              onClick={() => setModalIsShown(true)}
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        )}
      </li>
    </>
  );
};

export default ItemDirectory;
